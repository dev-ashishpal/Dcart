import Web3 from 'web3';

let web3;

if (window.ethereum !== "undefined") {
  web3 = new Web3(Web3.givenProvider);
} else {
  let provider = new Web3.providers.HttpProvider("http:localhost:7545");
  web3 = new Web3(provider);
}

export default web3;