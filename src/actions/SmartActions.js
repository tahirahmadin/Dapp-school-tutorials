import pwrContract from "../utils/pwarConnection";
import web3 from "../web3";

export const gerUserTokenBalance = async (address) => {
  let response = await pwrContract.methods.balanceOf(address).call();

  let weiBalance = web3.utils.fromWei(response);

  return weiBalance;
};
