import { web3 } from "./Connect";
import Cart from "../../eth/build/contracts/Cart.json";

const CartAddress = "0x4F3F38B2A1b449Af1deDaFbcD2cf7a7a50Adf561";

export const ERC20 = () => {
  return new web3.eth.Contract(Cart.abi, CartAddress);
};
