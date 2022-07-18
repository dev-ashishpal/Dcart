import { useState, useEffect } from "react";
import { useWeb3Context } from "../context/Web3Context";
// import web3 from "../wallet/Connect";
import useRefresh from "./useRefresh";

const useBalanceStats = () => {
  const { token, address, web3 } = useWeb3Context();
  const [tokenBalance, setTokenBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function fetchTokenBalance() {
      if (token) {
        const tokenBal = await token.methods.balanceOf(address).call();
        const ethBal = await web3.eth.getBalance(address);
        setTokenBalance(tokenBal);
        setEthBalance(web3.utils.fromWei(ethBal, 'ether'));
      }
    }
    fetchTokenBalance();
  }, [setTokenBalance,setEthBalance, fastRefresh]);

  return {tokenBalance, ethBalance};
};

export default useBalanceStats;
