import { useState } from "react";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getUserAddress,
} from "./actions/Web3Actions";
import { gerUserTokenBalance, transferPwar } from "./actions/SmartActions";
import "./App.css";

function App() {
  const [data, setData] = useState({
    wallet: false,
    chainId: "Unavailable",
    address: "Unavailable",
    balance: 0,
  });
  const [balance, setBalance] = useState(0);

  // 3. States to handle transfer menthod
  const [transferAddress, setTransferAddress] = useState("");
  const [amount, setAmount] = useState(0);

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

  //2. Function to get PolkaWar balance of user
  const getBalanceButton = async () => {
    let address = data.address;
    let tokenBalance = await gerUserTokenBalance(address);
    setBalance(tokenBalance);
  };

  //3. Function to transfer PolkaWar to other user
  const transferPwartoUser = async () => {
    let fromAdrress = data.address;
    let toAddress = transferAddress;
    let res = await transferPwar(fromAdrress, toAddress, amount);
  };

  return (
    <div>
      <div className="section">
        <div
          className="card"
          style={{ backgroundColor: data.wallet ? "#e3f2fd" : "white" }}
        >
          <h2>Account Details</h2>
          <div className="section-wrapper">
            <div className="card-section">
              <h3>Wallet available</h3>
              <p>
                <strong>{data.wallet ? "Yes" : "No"}</strong>
              </p>
            </div>

            <div className="card-section">
              <h3>Selected Network Chain ID</h3>

              <p>
                <strong>{data.chainId}</strong>
              </p>
            </div>
            <div className="card-section">
              <h3>PolkaWar Balance</h3>
              <p>
                <strong>{parseFloat(balance).toFixed(1)} </strong>
              </p>
            </div>
          </div>

          <div className="section-wrapper">
            {data.wallet ? (
              ""
            ) : (
              <button onClick={connectButton} className="buttonMain">
                Connect Metamask
              </button>
            )}

            <button onClick={getBalanceButton} className="buttonBalance">
              Get Balance
            </button>
          </div>
        </div>
      </div>
      <div className="section">
        <div
          className="card"
          style={{ backgroundColor: data.wallet ? "#e3f2fd" : "white" }}
        >
          <h2>Transfer PolkaWar</h2>

          <div className="section-wrapper">
            <div>
              <h3>Address</h3>
              <input
                type="text"
                onChange={(e) => setTransferAddress(e.target.value)}
                placeholder="Transfer Address"
              />
            </div>
            <div>
              <h3>Amount</h3>
              <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Pwar Amount"
              />
            </div>
          </div>
          <div className="section-wrapper">
            <button onClick={transferPwartoUser} className="buttonBalance">
              Transfer balance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
