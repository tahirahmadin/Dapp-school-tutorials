import { useState } from "react";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getUserAddress,
} from "./actions/Web3Actions";
import { gerUserTokenBalance } from "./actions/SmartActions";
import "./App.css";

function App() {
  const [data, setData] = useState({
    wallet: false,
    chainId: "Unavailable",
    address: "Unavailable",
    balance: "0",
  });
  const [balance, setBalance] = useState(0);

  const connectButton = async () => {
    let wallet = await checkWalletAvailable();
    let address = await getUserAddress();
    let balance = await getMainBalance();
    let chainID = await checkCorrectNetwork();

    setData({
      wallet: wallet,
      chainId: chainID,
      address: address,
      balance: balance,
    });
  };

  //Function to get PolkaWar balance of user
  const getBalanceButton = async () => {
    let address = data.address;
    let tokenBalance = await gerUserTokenBalance(address);
    setBalance(tokenBalance);
  };

  return (
    <div>
      <div className="section">
        <div className="card">
          <h2>Account Details</h2>
          <div className="section-wrapper">
            <div className="card-section">
              <h3>Wallet available</h3>
              <p>
                <strong>{data.wallet ? "Yes" : "No"}</strong>
              </p>
            </div>
            <div className="card-section">
              <h3>Address</h3>
              <p>
                <strong>{data.address}</strong>
              </p>
            </div>
          </div>
          <div className="section-wrapper">
            {" "}
            <div className="card-section">
              <h3>Selected Network Chain ID</h3>

              <p>
                <strong>{data.chainId}</strong>
              </p>
            </div>
            <div className="card-section">
              <h3>Main Balance</h3>
              <p>
                <strong>{parseFloat(data.balance).toFixed(3)} BNB</strong>
              </p>
            </div>
          </div>
          <div className="section-wrapper">
            {" "}
            <div className="card-section">
              <h3>PolkaWar Balance</h3>
              <p>
                <strong>{balance} </strong>
              </p>
            </div>
          </div>
          <div className="section-wrapper">
            {" "}
            <button onClick={connectButton} className="buttonMain">
              {data.wallet ? "Connected" : "Connect Metamask"}
            </button>
            <button onClick={getBalanceButton} className="buttonBalance">
              Get Balance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
