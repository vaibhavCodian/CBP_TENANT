import React, { useEffect, useState, useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import CustomerTable from "./components/CustomerTable";
import ProductTable from "./components/PurchaseTable";


function App() {
  const [msg, setMsg] = useState(''); 
  const [isPurchase, setIsPurchase] = useState(false); 
  const [token] = useContext(UserContext);

  const getMsg = async () => {
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("http://3.110.44.102/api/", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMsg(data.msg);
    }
  };

  useEffect(() => {
    getMsg();
  }, [])
  return (
    <>
      <Header title={msg} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {
            !token ? (
              <div className="columns">
                <Register />
                <Login />
              </div>
            ):(
              <div className="wrap">
               <button
                  className="button is-fullwidth mb-5 is-primary"
                  onClick={() => setIsPurchase(!isPurchase)}
                >SWITCH</button> 
                {
                  !isPurchase ? (
                    <CustomerTable/>
                  ): (<ProductTable/>) 
                }
               
              </div>
            )
          }
        </div>
        <div className="column">
          
        </div>
      </div>
    </>
  );
}

export default App;
