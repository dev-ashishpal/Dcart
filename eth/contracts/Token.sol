// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Token {
    string constant public name = "Ashish Token";
    string constant public symbol = "ASH";
    uint8 constant public decimal = 18;
    address admin;
    address self;
    uint256 _totalSupply;
    uint256 public tokensSold = 0;
    uint256 constant public tokenPrice = 9400000000000;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    constructor(uint256 total) {
        _totalSupply = total;
        balances[msg.sender] = _totalSupply;
        admin = msg.sender;
        self = address(this);
    }

	function adminAddress() public view returns (address) {
		return admin;
	}

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function tokensRemaining() public view returns(uint256) {
        return balances[admin];
    }

    function transfer(address sender, address reciever, uint numToken) public returns (bool) {
        require(numToken <= balances[sender]);
        balances[sender] = balances[sender] - numToken;
        balances[reciever] = balances[reciever] + numToken;
        emit Transfer(sender, reciever, numToken);
        return true;
    }

    function approve(address delegate, uint numToken) public returns (bool) {
        allowed[msg.sender][delegate] = numToken;
        emit Approval(msg.sender, delegate, numToken);
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address from, address to, uint numToken) public returns (bool) {
        require(numToken <= balances[from]);
        require(numToken <= allowed[from][msg.sender]);

        balances[from] -= numToken;
        allowed[from][msg.sender] -= numToken;
        balances[to] += numToken;
        emit Transfer(from, to, numToken);

        return true;
    }

    function mint(uint256 value) public returns (bool) {
        require(msg.sender == admin);
        _totalSupply += value;
        balances[msg.sender] += value;
        emit Transfer(address(0),msg.sender, value);
        return true;
    }

    function buyToken(uint256 numberOfToken) public payable {
        require(numberOfToken * tokenPrice == msg.value);
        require(balances[admin] >= numberOfToken);
        balances[admin] -= numberOfToken;
        balances[msg.sender] += numberOfToken;
        tokensSold += numberOfToken;
        emit Transfer(admin, msg.sender, numberOfToken);
    }

}