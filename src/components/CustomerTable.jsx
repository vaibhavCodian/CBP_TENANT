import React, { useContext, useState, useEffect } from "react";
import moment from "moment/moment";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import CustomerModal from "./Modals/CustomerModal";

const CustomerTable = () => {
    const [token] = useContext(UserContext);
    const [Customers, setCustomers] = useState(null);
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
        const response = await fetch(`http://3.110.44.102/api/customer/${id}`, requestOptions);
        if (!response.ok) {
          setErrorMessage("Failed to delete customer");
        }
    
        getCustomers();
      };

      const getUserId = async() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("http://3.110.44.102/api/user", requestOptions);
        
        if(!response.ok){
            setErrorMessage("Something Went Wrong. Couldn't load the User Id");
        } else {
            const data = await response.json();
            console.log(data)
            setUserId(data.id);
            setLoaded(true);
        }
  
    };
    const getCustomers = async() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("http://3.110.44.102/api/customer", requestOptions);
        
        if(!response.ok){
            setErrorMessage("Something Went Wrong. Couldn't load the Customers");
        } else {
            const data = await response.json();
            console.log(data)
            setCustomers(data);
            setLoaded(true);
        }

    };
 
    useEffect(() => {
        getUserId();
        getCustomers();
    }, []);
    
    const handleModal = () => {
    setActiveModal(!activeModal);
    getCustomers();
    setId(null);
    };
    
      return (
        <>
        
          <CustomerModal
            active={activeModal}
            handleModal={handleModal}
            token={token}
            id={id}
            setErrorMessage={setErrorMessage}
          /> 
          <button
            className="button is-fullwidth mb-5 is-primary"
            onClick={() => setActiveModal(true)}
          >
            Create customer
          </button>
          <ErrorMessage message={errorMessage} />
          <h4>Your User Id: {userId}</h4>
          {loaded && Customers ? (
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Customer ID </th>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Category</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {Customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.age}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.category}</td>
                    <td>{moment(customer.date_created).format("MMM Do YY")}</td>
                    <td>
                      <button
                        className="button mr-2 is-info is-light"
                        onClick={() => handleUpdate(customer.id)}
                      >
                        Update
                      </button>
                      <button
                        className="button mr-2 is-danger is-light"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
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
    
    export default CustomerTable;