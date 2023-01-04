import React, { useContext, useState, useEffect } from "react";
import moment from "moment/moment";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import PurchaseModal from "./Modals/PurchaseModal";

const ProductTable = () => {
    const [token] = useContext(UserContext);
    const [Purchases, setPurchases] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);

    const [userId, setUserId] = useState(null); 

    const handleUpdate = async (id) => {
        setId(id);
        setActiveModal(true);
    };
    
    const handleDelete = async (id) => {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(`/api/purchase/${id}`, requestOptions);
        if (!response.ok) {
          setErrorMessage("Failed to delete purchase");
        }
    
        getPurchases();
      };
    
      const getUserId = async() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/api/user", requestOptions);
        
        if(!response.ok){
            setErrorMessage("Something Went Wrong. Couldn't load the User Id");
        } else {
            const data = await response.json();
            console.log(data)
            setUserId(data.id);
            setLoaded(true);
        }
  
    };

    const getPurchases = async() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/api/purchase", requestOptions);
        
        if(!response.ok){
            setErrorMessage("Something Went Wrong. Couldn't load the Purchases");
        } else {
            const data = await response.json();
            console.log(data)
            setPurchases(data);
            setLoaded(true);
        }

    };
    useEffect(() => {
        getPurchases();
        getUserId();
    }, []);
    
    const handleModal = () => {
    setActiveModal(!activeModal);
    getPurchases();
    setId(null);
    };
    
      return (
        <>
          <PurchaseModal
            active={activeModal}
            handleModal={handleModal}
            token={token}
            id={id}
            userId={userId}
            setErrorMessage={setErrorMessage}
          /> 
          <button
            className="button is-fullwidth mb-5 is-primary"
            onClick={() => setActiveModal(true)}
          >
            Create purchase
          </button>
          <ErrorMessage message={errorMessage} />
          <h4>Your User Id: {userId}</h4>
          {loaded && Purchases ? (
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Purchased By</th>
                  <th>Sold By</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date Sold</th>
                </tr>
              </thead>
              <tbody>
                {Purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.name}</td>
                    <td>{purchase.brand}</td>
                    <td>{purchase.category}</td>
                    <td>{purchase.owner.name}</td>
                    <td>{purchase.seller.email}</td>
                    <td>{purchase.price}</td>
                    <td>{purchase.quantity}</td>
                    <p>{moment(purchase.date_created).format("D MMM YY")}</p>
                    <td>
                      <button
                        className="button mr-2 is-info is-light"
                        onClick={() => handleUpdate(purchase.id)}
                      >
                        Update
                      </button>
                      <button
                        className="button mr-2 is-danger is-light"
                        onClick={() => handleDelete(purchase.id)}
                      >
                        &#9747;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading</p>
          )}
        </>
      );
    };
    
    export default ProductTable;