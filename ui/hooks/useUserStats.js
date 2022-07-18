import React, { useState, useEffect } from "react";
import useRefresh from "./useRefresh";
import { useWeb3Context } from "../context/Web3Context";

const useUserStats = () => {
  const { fastRefresh } = useRefresh();
  const { web3, cart, address } = useWeb3Context();
  const [userDetails, setUserDetails] = useState({});
  let data = {};
  useEffect(() => {
    async function userStats() {
      if (cart) {
        const res = await cart.methods.userDetails().call({ from: address });
        data.name = web3.utils.hexToAscii(res.userName);
        data.email = web3.utils.hexToAscii(res.userEmail);
        data.contact = res.userContact;
        data.orders = res.orders;
        let gender;
        let type;
        if (res.userGender == 1) {
          gender = "Male";
        } else if (res.userGender == 2) {
          gender = "Female";
        }
        if (res.userType == 1) {
          type = "Buyer";
        } else if (res.userType == 2) {
          type = "Seller";
        }
        data.type = type;

        data.gender = gender;
        data.address = res.userAddr;
        setUserDetails(data);
        //   console.log(data);
      }
    }
    userStats();
  }, [setUserDetails, fastRefresh]);

  return userDetails;
};

export default useUserStats;
