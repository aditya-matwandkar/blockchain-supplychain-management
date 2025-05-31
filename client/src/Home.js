import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-100 text-center px-4" style={{ maxWidth: "500px" }}>
        <h2 className="fw-bold text-dark mb-3">
          Pharmaceutical Supply Chain Flow
        </h2>
        <p className="text-muted">
          <strong>Owner:</strong> The person who deployed the smart contract on
          the blockchain.
        </p>

        <div className="p-4 border rounded-4 bg-white shadow-sm">
          {/* Step 1 */}
          <h5 className="text-dark">Step 1: Register Participants</h5>
          <p className="text-muted small">
            (One-time step. Skip if already done.)
          </p>
          <button
            onClick={() => history.push("/roles")}
            className="btn btn-outline-primary w-100 rounded-pill py-2 mb-3"
          >
            Register
          </button>

          {/* Step 2 */}
          <h5 className="text-dark">Step 2: Order Medicines</h5>
          <button
            onClick={() => history.push("/addmed")}
            className="btn btn-outline-secondary w-100 rounded-pill py-2 mb-3"
          >
            Order Medicines
          </button>

          {/* Step 3 */}
          <h5 className="text-dark">Step 3: Control Supply Chain</h5>
          <button
            onClick={() => history.push("/supply")}
            className="btn btn-outline-danger w-100 rounded-pill py-2 mb-3"
          >
            Control Supply Chain
          </button>

          {/* Tracking */}
          <h5 className="text-dark ">Track Medicines</h5>
          <button
            onClick={() => history.push("/track")}
            className="btn btn-outline-success w-100 rounded-pill py-2"
          >
            Track Medicines
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
