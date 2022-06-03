const Token = artifacts.require("Token.sol");
const Cart = artifacts.require("Cart.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Token, 1000000).then(() => {
    console.log("Token ADDRESS: ", Token.address);
  });
  await deployer.deploy(Cart, Token.address).then(() => {
    console.log("Cart ADDRESS: ", Cart.address);
  });
};
