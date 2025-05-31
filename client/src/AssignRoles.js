// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import SupplyChainABI from "./artifacts/SupplyChain.json";
// import { useHistory } from "react-router-dom";

// function AssignRoles() {
//   const history = useHistory();
//   useEffect(() => {
//     loadWeb3();
//     loadBlockchaindata();
//   }, []);
//   const [currentaccount, setCurrentaccount] = useState("");
//   const [loader, setloader] = useState(true);
//   const [SupplyChain, setSupplyChain] = useState();
//   const [RMSname, setRMSname] = useState();
//   const [MANname, setMANname] = useState();
//   const [DISname, setDISname] = useState();
//   const [RETname, setRETname] = useState();
//   const [RMSplace, setRMSplace] = useState();
//   const [MANplace, setMANplace] = useState();
//   const [DISplace, setDISplace] = useState();
//   const [RETplace, setRETplace] = useState();
//   const [RMSaddress, setRMSaddress] = useState();
//   const [MANaddress, setMANaddress] = useState();
//   const [DISaddress, setDISaddress] = useState();
//   const [RETaddress, setRETaddress] = useState();
//   const [RMS, setRMS] = useState();
//   const [MAN, setMAN] = useState();
//   const [DIS, setDIS] = useState();
//   const [RET, setRET] = useState();

//   const loadWeb3 = async () => {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum);
//       await window.ethereum.enable();
//     } else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider);
//     } else {
//       window.alert(
//         "Non-Ethereum browser detected. You should consider trying MetaMask!"
//       );
//     }
//   };

//   const loadBlockchaindata = async () => {
//     setloader(true);
//     const web3 = window.web3;
//     const accounts = await web3.eth.getAccounts();
//     const account = accounts[0];
//     setCurrentaccount(account);
//     const networkId = await web3.eth.net.getId();
//     const networkData = SupplyChainABI.networks[networkId];
//     if (networkData) {
//       const supplychain = new web3.eth.Contract(
//         SupplyChainABI.abi,
//         networkData.address
//       );
//       setSupplyChain(supplychain);
//       var i;
//       const rmsCtr = await supplychain.methods.rmsCtr().call();
//       const rms = {};
//       for (i = 0; i < rmsCtr; i++) {
//         rms[i] = await supplychain.methods.RMS(i + 1).call();
//       }
//       setRMS(rms);
//       const manCtr = await supplychain.methods.manCtr().call();
//       const man = {};
//       for (i = 0; i < manCtr; i++) {
//         man[i] = await supplychain.methods.MAN(i + 1).call();
//       }
//       setMAN(man);
//       const disCtr = await supplychain.methods.disCtr().call();
//       const dis = {};
//       for (i = 0; i < disCtr; i++) {
//         dis[i] = await supplychain.methods.DIS(i + 1).call();
//       }
//       setDIS(dis);
//       const retCtr = await supplychain.methods.retCtr().call();
//       const ret = {};
//       for (i = 0; i < retCtr; i++) {
//         ret[i] = await supplychain.methods.RET(i + 1).call();
//       }
//       setRET(ret);
//       setloader(false);
//     } else {
//       window.alert("The smart contract is not deployed to current network");
//     }
//   };
//   if (loader) {
//     return (
//       <div>
//         <h1 className="wait">Loading...</h1>
//       </div>
//     );
//   }
//   const redirect_to_home = () => {
//     history.push("/");
//   };
//   const handlerChangeAddressRMS = (event) => {
//     setRMSaddress(event.target.value);
//   };
//   const handlerChangePlaceRMS = (event) => {
//     setRMSplace(event.target.value);
//   };
//   const handlerChangeNameRMS = (event) => {
//     setRMSname(event.target.value);
//   };
//   const handlerChangeAddressMAN = (event) => {
//     setMANaddress(event.target.value);
//   };
//   const handlerChangePlaceMAN = (event) => {
//     setMANplace(event.target.value);
//   };
//   const handlerChangeNameMAN = (event) => {
//     setMANname(event.target.value);
//   };
//   const handlerChangeAddressDIS = (event) => {
//     setDISaddress(event.target.value);
//   };
//   const handlerChangePlaceDIS = (event) => {
//     setDISplace(event.target.value);
//   };
//   const handlerChangeNameDIS = (event) => {
//     setDISname(event.target.value);
//   };
//   const handlerChangeAddressRET = (event) => {
//     setRETaddress(event.target.value);
//   };
//   const handlerChangePlaceRET = (event) => {
//     setRETplace(event.target.value);
//   };
//   const handlerChangeNameRET = (event) => {
//     setRETname(event.target.value);
//   };
//   const handlerSubmitRMS = async (event) => {
//     event.preventDefault();
//     try {
//       var reciept = await SupplyChain.methods
//         .addRMS(RMSaddress, RMSname, RMSplace)
//         .send({ from: currentaccount });
//       if (reciept) {
//         loadBlockchaindata();
//       }
//     } catch (err) {
//       alert("An error occured!!!");
//     }
//   };
//   const handlerSubmitMAN = async (event) => {
//     event.preventDefault();
//     try {
//       var reciept = await SupplyChain.methods
//         .addManufacturer(MANaddress, MANname, MANplace)
//         .send({ from: currentaccount });
//       if (reciept) {
//         loadBlockchaindata();
//       }
//     } catch (err) {
//       alert("An error occured!!!");
//     }
//   };
//   const handlerSubmitDIS = async (event) => {
//     event.preventDefault();
//     try {
//       var reciept = await SupplyChain.methods
//         .addDistributor(DISaddress, DISname, DISplace)
//         .send({ from: currentaccount });
//       if (reciept) {
//         loadBlockchaindata();
//       }
//     } catch (err) {
//       alert("An error occured!!!");
//     }
//   };
//   const handlerSubmitRET = async (event) => {
//     event.preventDefault();
//     try {
//       var reciept = await SupplyChain.methods
//         .addRetailer(RETaddress, RETname, RETplace)
//         .send({ from: currentaccount });
//       if (reciept) {
//         loadBlockchaindata();
//       }
//     } catch (err) {
//       alert("An error occured!!!");
//     }
//   };

//   return (
//     <div>
//       <span>
//         <b>Current Account Address:</b> {currentaccount}
//       </span>
//       <span
//         onClick={redirect_to_home}
//         className="btn btn-outline-danger btn-sm"
//       >
//         HOME
//       </span>
//       <h4>Raw Material Suppliers:</h4>
//       <form onSubmit={handlerSubmitRMS}>
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeAddressRMS}
//           placeholder="Ethereum Address"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeNameRMS}
//           placeholder="Raw Material Supplier Name"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangePlaceRMS}
//           placeholder="Based In"
//           required
//         />
//         <button
//           className="btn btn-outline-success btn-sm"
//           onSubmit={handlerSubmitRMS}
//         >
//           Register
//         </button>
//       </form>
//       <table className="table table-sm">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Place</th>
//             <th scope="col">Ethereum Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(RMS).map(function (key) {
//             return (
//               <tr key={key}>
//                 <td>{RMS[key].id}</td>
//                 <td>{RMS[key].name}</td>
//                 <td>{RMS[key].place}</td>
//                 <td>{RMS[key].addr}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <h4>Manufacturers:</h4>
//       <form onSubmit={handlerSubmitMAN}>
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeAddressMAN}
//           placeholder="Ethereum Address"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeNameMAN}
//           placeholder="Manufacturer Name"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangePlaceMAN}
//           placeholder="Based In"
//           required
//         />
//         <button
//           className="btn btn-outline-success btn-sm"
//           onSubmit={handlerSubmitMAN}
//         >
//           Register
//         </button>
//       </form>
//       <table className="table table-sm">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Place</th>
//             <th scope="col">Ethereum Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(MAN).map(function (key) {
//             return (
//               <tr key={key}>
//                 <td>{MAN[key].id}</td>
//                 <td>{MAN[key].name}</td>
//                 <td>{MAN[key].place}</td>
//                 <td>{MAN[key].addr}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <h4>Distributors:</h4>
//       <form onSubmit={handlerSubmitDIS}>
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeAddressDIS}
//           placeholder="Ethereum Address"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeNameDIS}
//           placeholder="Distributor Name"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangePlaceDIS}
//           placeholder="Based In"
//           required
//         />
//         <button
//           className="btn btn-outline-success btn-sm"
//           onSubmit={handlerSubmitDIS}
//         >
//           Register
//         </button>
//       </form>
//       <table className="table table-sm">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Place</th>
//             <th scope="col">Ethereum Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(DIS).map(function (key) {
//             return (
//               <tr key={key}>
//                 <td>{DIS[key].id}</td>
//                 <td>{DIS[key].name}</td>
//                 <td>{DIS[key].place}</td>
//                 <td>{DIS[key].addr}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <h4>Retailers:</h4>
//       <form onSubmit={handlerSubmitRET}>
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeAddressRET}
//           placeholder="Ethereum Address"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangeNameRET}
//           placeholder="Retailer Name"
//           required
//         />
//         <input
//           className="form-control-sm"
//           type="text"
//           onChange={handlerChangePlaceRET}
//           placeholder="Based In"
//           required
//         />
//         <button
//           className="btn btn-outline-success btn-sm"
//           onSubmit={handlerSubmitRET}
//         >
//           Register
//         </button>
//       </form>
//       <table className="table table-sm">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">Place</th>
//             <th scope="col">Ethereum Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(RET).map(function (key) {
//             return (
//               <tr key={key}>
//                 <td>{RET[key].id}</td>
//                 <td>{RET[key].name}</td>
//                 <td>{RET[key].place}</td>
//                 <td>{RET[key].addr}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AssignRoles;














import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";

function AssignRoles() {
  const history = useHistory();
  const [currentAccount, setCurrentAccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [supplyChain, setSupplyChain] = useState(null);
  const [RMS, setRMS] = useState([]);
  const [MAN, setMAN] = useState([]);
  const [DIS, setDIS] = useState([]);
  const [RET, setRET] = useState([]);

  // Form state variables
  const [formData, setFormData] = useState({
    RMSname: "",
    RMSplace: "",
    RMSaddress: "",
    MANname: "",
    MANplace: "",
    MANaddress: "",
    DISname: "",
    DISplace: "",
    DISaddress: "",
    RETname: "",
    RETplace: "",
    RETaddress: "",
  });

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("Web3 Loaded Successfully");
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    try {
      setLoader(true);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        alert("No Ethereum accounts found! Please check MetaMask.");
        return;
      }
      setCurrentAccount(accounts[0]);
      console.log("Current Account:", accounts[0]);

      const networkId = await web3.eth.net.getId();
      console.log("Network ID:", networkId);
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

      // Load data from blockchain
      const rmsCtr = await supplyChainInstance.methods.rmsCtr().call();
      const rmsList = [];
      for (let i = 0; i < rmsCtr; i++) {
        rmsList.push(await supplyChainInstance.methods.RMS(i + 1).call());
      }
      setRMS(rmsList);

      const manCtr = await supplyChainInstance.methods.manCtr().call();
      const manList = [];
      for (let i = 0; i < manCtr; i++) {
        manList.push(await supplyChainInstance.methods.MAN(i + 1).call());
      }
      setMAN(manList);

      const disCtr = await supplyChainInstance.methods.disCtr().call();
      const disList = [];
      for (let i = 0; i < disCtr; i++) {
        disList.push(await supplyChainInstance.methods.DIS(i + 1).call());
      }
      setDIS(disList);

      const retCtr = await supplyChainInstance.methods.retCtr().call();
      const retList = [];
      for (let i = 0; i < retCtr; i++) {
        retList.push(await supplyChainInstance.methods.RET(i + 1).call());
      }
      setRET(retList);

      setLoader(false);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      alert("Failed to load blockchain data. Check console for errors.");
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (role) => {
    try {
      const { [`${role}address`]: address, [`${role}name`]: name, [`${role}place`]: place } = formData;
      const methodMapping = {
        RMS: "addRMS",
        MAN: "addManufacturer",
        DIS: "addDistributor",
        RET: "addRetailer",
      };

      const receipt = await supplyChain.methods[methodMapping[role]](address, name, place)
        .send({ from: currentAccount });

      if (receipt) {
        loadBlockchainData();
      }
    } catch (err) {
      alert("An error occurred!");
    }
  };

  const redirectToHome = () => {
    history.push("/");
  };

  if (loader) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5><b>Current Account Address:</b> {currentAccount}</h5>
        <button onClick={redirectToHome} className="btn btn-outline-danger">HOME</button>
      </div>

      {["RMS", "MAN", "DIS", "RET"].map((role) => (
        <div key={role} className="mb-4">
          <h4>{role === "RMS" ? "Raw Material Suppliers" : role === "MAN" ? "Manufacturers" : role === "DIS" ? "Distributors" : "Retailers"}:</h4>
          <div className="row g-2">
            <div className="col-md-3">
              <input type="text" className="form-control" name={`${role}address`} placeholder="Ethereum Address" onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name={`${role}name`} placeholder={`${role} Name`} onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name={`${role}place`} placeholder="Based In" onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-success w-100" onClick={() => handleSubmit(role)}>Register</button>
            </div>
          </div>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Place</th>
                <th>Ethereum Address</th>
              </tr>
            </thead>
            <tbody>
              {(role === "RMS" ? RMS : role === "MAN" ? MAN : role === "DIS" ? DIS : RET).map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.addr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AssignRoles;
