/*
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();


    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div>
            <span><b>Current Account Address:</b> {currentaccount}</span>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME</span>
            <h6><b>Supply Chain Flow:</b></h6>
            <p>Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h5><b>Step 1: Supply Raw Materials</b>(Only a registered Raw Material Supplier can perform this step):-</h5>
            <form onSubmit={handlerSubmitRMSsupply}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRMSsupply}>Supply</button>
            </form>
            <hr />
            <br />
            <h5><b>Step 2: Manufacture</b>(Only a registered Manufacturer can perform this step):-</h5>
            <form onSubmit={handlerSubmitManufacturing}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitManufacturing}>Manufacture</button>
            </form>
            <hr />
            <br />
            <h5><b>Step 3: Distribute</b>(Only a registered Distributor can perform this step):-</h5>
            <form onSubmit={handlerSubmitDistribute}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitDistribute}>Distribute</button>
            </form>
            <hr />
            <br />
            <h5><b>Step 4: Retail</b>(Only a registered Retailer can perform this step):-</h5>
            <form onSubmit={handlerSubmitRetail}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRetail}>Retail</button>
            </form>
            <hr />
            <br />
            <h5><b>Step 5: Mark as sold</b>(Only a registered Retailer can perform this step):-</h5>
            <form onSubmit={handlerSubmitSold}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitSold}>Sold</button>
            </form>
            <hr />
        </div>
    )
}

export default Supply

*/















// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import Web3 from "web3";
// import SupplyChainABI from "./artifacts/SupplyChain.json";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Supply() {
//   const history = useHistory();
//   useEffect(() => {
//     loadWeb3();
//     loadBlockchainData();
//   }, []);

//   const [currentAccount, setCurrentAccount] = useState("");
//   const [loader, setLoader] = useState(true);
//   const [SupplyChain, setSupplyChain] = useState();
//   const [MED, setMED] = useState([]);
//   const [MedStage, setMedStage] = useState([]);
//   const [ID, setID] = useState("");

//   const loadWeb3 = async () => {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum);
//       await window.ethereum.enable();
//     } else {
//       alert("Non-Ethereum browser detected. Please install MetaMask!");
//     }
//   };

//   const loadBlockchainData = async () => {
//     setLoader(true);
//     const web3 = window.web3;
//     const accounts = await web3.eth.getAccounts();
//     if (!accounts.length) {
//       alert("No Ethereum accounts found! Please check MetaMask.");
//       return;
//     }
//     setCurrentAccount(accounts[0]);

//     const networkId = await web3.eth.net.getId();
//     const networkData = SupplyChainABI.networks[networkId];

//     if (!networkData) {
//       alert("Smart contract not deployed on this network.");
//       return;
//     }

//     const supplyChainInstance = new web3.eth.Contract(
//       SupplyChainABI.abi,
//       networkData.address
//     );
//     setSupplyChain(supplyChainInstance);

//     const medCtr = await supplyChainInstance.methods.medicineCtr().call();
//     const meds = [];
//     const medStages = [];

//     for (let i = 0; i < medCtr; i++) {
//       meds.push(await supplyChainInstance.methods.MedicineStock(i + 1).call());
//       medStages.push(await supplyChainInstance.methods.showStage(i + 1).call());
//     }

//     setMED(meds);
//     setMedStage(medStages);
//     setLoader(false);
//   };

//   if (loader) {
//     return <h1 className="text-center mt-5">Loading...</h1>;
//   }

//   const redirectToHome = () => {
//     history.push("/");
//   };

//   const handleChangeID = (event) => {
//     setID(event.target.value);
//   };

//   const handleSubmit = async (method) => {
//     try {
//       const receipt = await SupplyChain.methods[method](ID).send({
//         from: currentAccount,
//       });
//       if (receipt) {
//         loadBlockchainData();
//       }
//     } catch (err) {
//       alert("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5><b>Current Account:</b> {currentAccount}</h5>
//         <button onClick={redirectToHome} className="btn btn-outline-danger">
//           HOME
//         </button>
//       </div>

//       <h3 className="text-center mb-3">🛒 Supply Chain Flow</h3>
//       <p className="text-center text-muted">
//         Medicine Order → Raw Material Supplier → Manufacturer → Distributor →
//         Retailer → Consumer
//       </p>

//       {/* Medicine Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-primary">
//             <tr>
//               <th>Medicine ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Current Stage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {MED.map((medicine, index) => (
//               <tr key={index}>
//                 <td>{medicine.id}</td>
//                 <td>{medicine.name}</td>
//                 <td>{medicine.description}</td>
//                 <td><b>{MedStage[index]}</b></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Form Sections */}
//       {[
//         { step: "1", title: "Supply Raw Materials", method: "RMSsupply" },
//         { step: "2", title: "Manufacture", method: "Manufacturing" },
//         { step: "3", title: "Distribute", method: "Distribute" },
//         { step: "4", title: "Retail", method: "Retail" },
//         { step: "5", title: "Mark as Sold", method: "sold" },
//       ].map((action) => (
//         <div className="card my-3" key={action.step}>
//           <div className="card-body">
//             <h5 className="card-title">
//               <b>Step {action.step}: {action.title}</b>
//             </h5>
//             <form
//               onSubmit={(event) => {
//                 event.preventDefault();
//                 handleSubmit(action.method);
//               }}
//             >
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Medicine ID"
//                   onChange={handleChangeID}
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary">
//                   {action.title}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Supply;






























import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import "bootstrap/dist/css/bootstrap.min.css";

function Supply() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const [currentAccount, setCurrentAccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState([]);
  const [MedStage, setMedStage] = useState([]);
  const [ID, setID] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    setLoader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (!accounts.length) {
      alert("No Ethereum accounts found! Please check MetaMask.");
      return;
    }
    setCurrentAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];

    if (!networkData) {
      alert("Smart contract not deployed on this network.");
      return;
    }

    const supplyChainInstance = new web3.eth.Contract(
      SupplyChainABI.abi,
      networkData.address
    );
    setSupplyChain(supplyChainInstance);

    const medCtr = await supplyChainInstance.methods.medicineCtr().call();
    const meds = [];
    const medStages = [];

    for (let i = 0; i < medCtr; i++) {
      meds.push(await supplyChainInstance.methods.MedicineStock(i + 1).call());
      medStages.push(await supplyChainInstance.methods.showStage(i + 1).call());
    }

    setMED(meds);
    setMedStage(medStages);
    setLoader(false);
  };

  if (loader) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  const redirectToHome = () => {
    history.push("/");
  };

  const handleChangeID = (event) => {
    setID(event.target.value);
  };

  const handleSubmit = async (method) => {
    try {
      const receipt = await SupplyChain.methods[method](ID).send({
        from: currentAccount,
      });
      if (receipt) {
        loadBlockchainData();
      }
    } catch (err) {
      alert("An error occurred!");
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5><b>Current Account:</b> {currentAccount}</h5>
        <button onClick={redirectToHome} className="btn btn-outline-danger">
          HOME
        </button>
      </div>

      <h3 className="text-center mb-3">🛒 Supply Chain Flow</h3>
      <p className="text-center text-muted">
        Medicine Order → Raw Material Supplier → Manufacturer → Distributor → Retailer → Consumer
      </p>

      {/* Medicine Table with Scrollable Container */}
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered table-hover">
          <thead className="table-primary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>Medicine ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {MED.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td><b>{MedStage[index]}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Sections */}
      <div className="row mt-4">
        {[
          { step: "1", title: "Supply Raw Materials", method: "RMSsupply" },
          { step: "2", title: "Manufacture", method: "Manufacturing" },
          { step: "3", title: "Distribute", method: "Distribute" },
          { step: "4", title: "Retail", method: "Retail" },
          { step: "5", title: "Mark as Sold", method: "sold" },
        ].map((action) => (
          <div className="col-md-6" key={action.step}>
            <div className="card my-2">
              <div className="card-body">
                <h5 className="card-title text-center">
                  <b>Step {action.step}: {action.title}</b>
                </h5>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(action.method);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Medicine ID"
                      onChange={handleChangeID}
                      required
                    />
                    <button type="submit" className="btn btn-primary w-50">
                      {action.title}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supply;
