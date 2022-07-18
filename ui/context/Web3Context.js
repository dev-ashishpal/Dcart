import React, { createContext, useContext } from "react";
import { useWeb3 } from "../hooks/Web3Client";
import { web3InitialState } from "../reducers/Web3Provider";

const Web3Context = createContext();

export const Web3ContextProvider = (props) => {
  const web3ProviderState = useWeb3();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {props.children}
    </Web3Context.Provider>
  );
};


export const useWeb3Context = () => {
	return useContext(Web3Context);
}