import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useReducer, useCallback } from "react";
import { ethers } from "ethers";
import { web3InitialState, web3Reducer } from "../reducers/Web3Provider";
import ERC20TokenContract from "../../eth/build/contracts/Token.json";
import CartContract from "../../eth/build/contracts/Cart.json";

import Web3 from "web3";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

let web3Modal;
let ERC20Address = "0x9060211d78B3f2856b5401FcF8066c81b783a6b4";
let CartAddress = "0x90f999E14CBc4ECB9D4CD3201e14ca6329CAeA9E";
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

// Web3Modal code goes here

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const { provider, web3, address, network, token, cart, admin } = state;

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        // const network = await web3Provider.getNetwork();

        const web3 = new Web3(provider);
        const addr = await web3.eth.getAccounts();
        const address = addr[0];
        const token = new web3.eth.Contract(
          ERC20TokenContract.abi,
          ERC20Address,
        );
        const admin = token.methods.adminAddress().call();
        const cart = new web3.eth.Contract(CartContract.abi, CartAddress);
        // console.log("cart", cart);

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3,
          address,
          network,
          token,
          cart,
          admin,
        });
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  //Auto connect to cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3,
    address,
    network,
    connect,
    disconnect,
    token,
    cart,
    admin,
  };
};
