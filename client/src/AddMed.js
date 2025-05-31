import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedName, setMedName] = useState("");
  const [MedDes, setMedDes] = useState("");
  const [MedStage, setMedStage] = useState([]);

  const generateDescription = async () => {
    if (!MedName) {
      alert("Please enter a medicine name first!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/api/generate", {
        method: "POST",  // Change to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicine: MedName }), // Correctly send data in body
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch description");
      }
  
      const data = await response.json();
      setMedDes(data.description);
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again!");
    }
  };
  
  

  // const generateDescription = async () => {
  //   if (!MedName) {
  //     alert("Please enter a medicine name first!");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/generate?medicine=${encodeURIComponent(MedName)}`,
  //       { method: "GET" } // Remove body for GET request
  //     );
  
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch description");
  //     }
  
  //     const data = await response.json();
  //     setMedDes(data.description);
  //   } catch (error) {
  //     console.error("Error generating description:", error);
  //     alert("Failed to generate description. Please try again!");
  //   }
  // };
  




  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setCurrentaccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (let i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
    } else {
      alert("The smart contract is not deployed to the current network");
    }
    setloader(false);
  };

  if (loader) {
    return <h1 className="text-center my-5">Loading...</h1>;
  }

  const redirect_to_home = () => history.push("/");

  return (
    <div className="container text-center my-5">
      <div className="mb-3">
        <span className="fw-bold">Current Account Address:</span>{" "}
        {currentaccount}
      </div>
      <button
        className="btn btn-outline-danger mb-3"
        onClick={redirect_to_home}
      >
        Home
      </button>

      <h4 className="mb-3">Add Medicine Order</h4>
      <form
        className="d-flex flex-column align-items-center gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const receipt = await SupplyChain.methods
              .addMedicine(MedName, MedDes)
              .send({ from: currentaccount });
            if (receipt) loadBlockchaindata();
          } catch (err) {
            alert("An error occurred!");
          }
        }}
      >
        <input
          className="form-control w-50 m-1"
          type="text"
          onChange={(e) => setMedName(e.target.value)}
          placeholder="Medicine Name"
          required
        />
        <textarea
          className="form-control w-50 m-1"
          type="text"
          rows={3}
          value={MedDes}
          onChange={(e) => setMedDes(e.target.value)}
          placeholder="Medicine Description"
          required
          style={{ resize: "none" }}
        />
        <div className="d-flex justify-content-end w-50">
          <button
            className="btn btn-info m-2"
            type="button"
            onClick={generateDescription}
          >
            Generate Description
          </button>
          <button className="btn btn-success m-2">Order</button>
        </div>
      </form>

      <h4 className="mt-5">Ordered Medicines</h4>
      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(MED).map((key) => (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddMed;
