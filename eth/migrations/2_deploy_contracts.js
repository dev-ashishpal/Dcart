const Token = artifacts.require("Token.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Token, 1000000).then(() => {
    console.log("Token ADDRESS: ", Token.address);
  });
};
