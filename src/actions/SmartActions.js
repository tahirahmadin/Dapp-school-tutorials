import pwrContract from "../utils/pwarConnection";
import web3 from "../web3";

// Call Method - Get User Pwar Balance
export const gerUserTokenBalance = async (address) => {
  let response = await pwrContract.methods.balanceOf(address).call();

  let weiBalance = web3.utils.fromWei(response);

  return weiBalance;
};

// Send Method - Transfer PWAR to some other account
export const transferPwar = async (fromAddress, toAddress, amount) => {
  let response = await pwrContract.methods
    .transfer(toAddress, amount)
    .send({ from: fromAddress });

  console.log(response);

  return response;
};
