let Token = artifacts.require("Token.sol");

contract("Token", (accounts) => {
  let tokenInstance;
  const totalPrice = 1000000000000000;

  it("initializes contract with correct values", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    const name = await tokenInstance.name();
    const symbol = await tokenInstance.symbol();
    const decimal = await tokenInstance.decimal();
    const price = await tokenInstance.tokenPrice();
    assert.equal(name, "Ashish Token", "has equal name");
    assert.equal(symbol, "ASH", "has equal symbol");
    assert.equal(decimal, 18, "has equal decimal");
    assert.equal(price, totalPrice, "has equal price");
  });

  it("allocate the initial supply upon deployment", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    const totalSupply = await tokenInstance.totalSupply();
    const adminBalance = await tokenInstance.balances(accounts[0]);
    assert.equal(totalSupply.toNumber(), 1000000, "set totalSupply to 100000");
    assert.equal(
      adminBalance.toNumber(),
      1000000,
      "allocate totalSupply to admin",
    );
  });

  it("transferring the Ash Token", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    try {
      await tokenInstance.transfer(accounts[1], 10000000);
      assert(false);
    } catch (err) {
      assert(err);
    }
    await tokenInstance.transfer(accounts[1], 100, { from: accounts[0] });
    const adminToken = await tokenInstance.balances(accounts[0]);
    const receiverToken = await tokenInstance.balances(accounts[1]);
    assert.equal(
      adminToken.toNumber(),
      999900,
      "100 tokens transferred from admin",
    );
    assert.equal(
      receiverToken.toNumber(),
      100,
      "100 token transferred to receiver",
    );
  });

  it("approve token for delegate transfer", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    const success = await tokenInstance.approve.call(accounts[2], 50, {
      from: accounts[1],
    });
    assert.equal(success, true, "does return true");
    const receipt = await tokenInstance.approve(accounts[2], 50, {
      from: accounts[1],
    });

    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(
      receipt.logs[0].event,
      "Approval",
      "Should be the Approval event",
    );
    assert.equal(
      receipt.logs[0].args.tokenOwner,
      accounts[1],
      "logs the account the tokens are authorized by",
    );
    assert.equal(
      receipt.logs[0].args.spender,
      accounts[2],
      "logs the account the tokens are authorized to",
    );

    assert.equal(receipt.logs[0].args.tokens, 50, "logs the transfer amount");
    const allowance = await tokenInstance.allowed(accounts[1], accounts[2]);
    assert.equal(allowance.toNumber(), 50, "has equal value");
  });

  it("handle delegate transfer token", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    fromAccount = accounts[2];
    toAccount = accounts[3];
    spendingAccount = accounts[4];
    await tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
    await tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
    try {
      await tokenInstance.transferFrom(fromAccount, toAccount, 9999, {
        from: spendingAccount,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }

    try {
      await tokenInstance.transferFrom(fromAccount, toAccount, 20, {
        from: spendingAccount,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }

    await tokenInstance.transferFrom(fromAccount, toAccount, 10, {
      from: spendingAccount,
    });
    const fromBalance = await tokenInstance.balances(fromAccount);
    const toBalance = await tokenInstance.balances(toAccount);
    const spendingToken = await tokenInstance.allowed(
      fromAccount,
      spendingAccount,
    );
    assert.equal(
      fromBalance.toNumber(),
      90,
      "10 tokens removed from fromAccount",
    );
    assert.equal(toBalance.toNumber(), 10, "10 tokens delegated to toAccount");
    assert.equal(spendingToken.toNumber(), 0, "all approved tokens spend");
  });

  it("approve minting of tokens", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    try {
      await tokenInstance.mint(1000000, { from: accounts[1] });
      assert(false);
    } catch (err) {
      assert(err);
    }
    const admin = await tokenInstance.adminAddress();
    await tokenInstance.mint(1000000, { from: admin });
    const tokens = await tokenInstance.totalSupply();
    const adminBalance = await tokenInstance.balances(admin);
    assert.equal(
      tokens.toNumber(),
      2000000,
      "minted tokens added to totalSupply",
    );
    assert.equal(
      adminBalance.toNumber(),
      1999800,
      "minted tokens added to admin balance",
    );
  });

  it("approve buying tokens from admin", async () => {
    const instance = await Token.deployed();
    tokenInstance = instance;
    const admin = await tokenInstance.adminAddress();
    try {
      await tokenInstance.buyToken(100000000, { from: accounts[5] });
      assert(false);
    } catch (err) {
      assert(err);
    }
    
    await tokenInstance.buyToken(100, { from: accounts[5] });
    const adminBalance = await tokenInstance.balances(admin);
    const buyerBalance = await tokenInstance.balances(accounts[5]);
    const tokenSold = await tokenInstance.tokensSold();
    assert.equal(adminBalance.toNumber(), 1999700, "100 deducted from admin");
    assert.equal(buyerBalance.toNumber(), 100, "100 added to buyer");
    assert.equal(tokenSold.toNumber(), 100, "100 tokens sold");
  });
});
