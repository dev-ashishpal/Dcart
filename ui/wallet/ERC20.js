import { web3 } from "./Connect"
import ERC20 from '../../eth/build/contracts/Token.json';

const ERC20Address = "0x992F199f6238873D398B56eA6BcBF91C1BF4Fd2a";

export const ERC20 = () => {
	return new web3.eth.Contract(ERC20.abi, ERC20Address);
}