// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract myToken {
    string constant public name = "Ashish";
    string constant public symbol = "ASH";
    uint8 constant public decimal = 18;
    address admin;
    address self;
    uint256 _totalSupply;
    uint256 tokensSold = 0;
    uint256 tokenPrice = 1000000000000000;

    mapping(address => uint256)balances;
    mapping(address => mapping(address => uint256)) allowed;


    event Approval(address indexed tokenOwner, address indexed sepnder, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    constructor(uint256 total) {
        _totalSupply = total;
        balances[msg.sender] = _totalSupply;
        admin = msg.sender;
        self = address(this);
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

    function transfer(address reciever, uint numToken) public returns (bool) {
        require(numToken <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numToken;
        balances[reciever] = balances[reciever] + numToken;
        emit Transfer(msg.sender, reciever, numToken);
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

    function transferFrom(address owner, address buyer, uint numToken) public returns (bool) {
        require(numToken <= balances[owner]);
        require(numToken <= allowed[owner][buyer]);

        balances[owner] = balances[owner] - numToken;
        allowed[owner][buyer] = allowed[owner][buyer] - numToken;
        balances[buyer] = balances[owner] - numToken;
        emit Transfer(owner, buyer, numToken);

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
        // require(numberOfToken * tokenPrice == msg.value);
        require(balances[admin] >= numberOfToken);
        balances[admin] -= numberOfToken;
        balances[msg.sender] += numberOfToken;
        tokensSold += numberOfToken;
        emit Transfer(admin, msg.sender, numberOfToken);
    }

}