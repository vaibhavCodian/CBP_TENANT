import React, { useEffect, useState } from "react";

const CustomerModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");

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
        setEmail(data.email);
        setAge(data.age);
        setGender(data.gender);
        setCategory(data.category);
      }
    };

    if (id) {
      getCustomer();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setCategory("");
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
        name: name,
        email: email,
        age: age,
        gender: gender,
        category: category,
      }),
    };
    const response = await fetch("/api/customer", requestOptions);
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
        email: email,
        age: age,
        gender: gender,
        category: category,
      }),
    };
    const response = await fetch(`/api/customer/${id}`, requestOptions);
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
            {id ? "Update Customer" : "Create Customer"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">gender</label>
              <div className="control">
                <input
                  type="gender"
                  placeholder="Enter gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
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

export default CustomerModal;