import React, { useEffect, useState } from "react";

const PurchaseModal = ({ active, handleModal, token, id, userId,setErrorMessage }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getCustomer = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/api/customer/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the customer");
      } else {
        const data = await response.json();
        setName(data.name);
        setCategory(data.category);
        setBrand(data.brand);
        setCustomerId(data.customerId);
        setSellerId(data.sellerId);
        setQuantity(data.quantity);
        setPrice(data.price);
        setAddress(data.address);
      }
    };

    if (id) {
      getCustomer();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setName("");
    setCategory("");
    setBrand("");
    setCustomerId("");
    setSellerId("");
    setQuantity("");
    setPrice("");
    setAddress("");
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        owner_id: customerId,
        seller_id: userId,
        name: name,
        category: category,
        quantity: quantity,
        price: price,
        brand: brand,
        address: address
      }),
    };
    const response = await fetch("/api/purchase", requestOptions);
    console.log(response);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating customer");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        category: category,
        brand: brand,
        customerId: customerId,
        sellerId: userId,
        quantity: quantity,
        price: price,
        address: address
      }),
    };
    const response = await fetch(`/api/purchase/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating customer");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Update Purchase" : "Create Purchase"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Product Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Brand</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Enter Customer Id</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Customer Id"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Enter Quantity</label>
              <div className="control">
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Enter Price</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter  Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Enter Address</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateCustomer}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateCustomer}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PurchaseModal;