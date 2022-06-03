// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import './Library.sol';
import './Read.sol';
import './Token.sol';

contract Cart is Read {
	address TOKEN;
	constructor(Token _tokenInstance) {
		MODEL.P_ID = 1;
		MODEL.O_ID = 1;
		TOKEN = _tokenInstance;
	}

	event SignUp(address indexed user, bytes32 name);
    event AddItem(bytes32 user, uint256 product_id);
    event Order(address indexed user, uint256 id);

	function checkUser() public view returns (uint256 status) {
        if (uint256(MODEL.Users[msg.sender].userType) == 2) {
            return 2;
        } else if (uint256(MODEL.Users[msg.sender].userType) == 1) {
            return 1;
        } 
        return 0;
    }

	modifier newUser() {
        require(checkUser() == 0, "Not a new User");
        _;
    }

	function userSignup(
        bytes32 _userName,
        uint64 _userContact,
        uint8 _userGender,
        bytes32 _userEmail,
        string calldata _userAddr,
        uint8 _type) external newUser() {
        MODEL.Users[msg.sender].userName = _userName;
        MODEL.Users[msg.sender].userContact = _userContact;
        MODEL.Users[msg.sender].userGender = _userGender;
        MODEL.Users[msg.sender].userEmail = _userEmail;
        MODEL.Users[msg.sender].userAddr = _userAddr;
        MODEL.Users[msg.sender].userType = UserType(_type);
        emit SignUp(msg.sender, _userName);
    }

    function addProduct(
        bytes32 _itemName,
        uint256 _itemPrice,
        uint32 _availableCount,
        bytes32 _itemDetails,
        bytes32 _imageId
    ) external onlySeller {
        MODEL.Product[MODEL.P_ID].itemName = _itemName;
        MODEL.Product[MODEL.P_ID].itemPrice = _itemPrice;
        MODEL.Product[MODEL.P_ID].itemDetails = _itemDetails;
        MODEL.Product[MODEL.P_ID].availableCount = _availableCount;
        MODEL.Product[MODEL.P_ID].imageId = _imageId;
        MODEL.Product[MODEL.P_ID].seller = payable(msg.sender);
        MODEL.P_ID++;
        emit AddItem(_itemName, MODEL.P_ID);
    }

    function createOrder(
        string calldata _orderDetails,
        uint32[] calldata _prodIds,
        uint32[] calldata _prodCounts
    ) external onlyBuyer {
        for(uint32 i = 0; i < _prodIds.length; i++) {
            require(MODEL.MarketOrder[MODEL.O_ID].isOrdered[_prodIds[i]] == false);
            require(MODEL.Product[_prodIds[i]].availableCount >= _prodCounts[i]);
        }
    
        uint256 total = 0;
        for (uint32 i = 0; i < _prodIds.length; i++) {
            MODEL.orderList[MODEL.Product[_prodIds[i]].seller].push(MODEL.O_ID);
            MODEL.prodList[MODEL.Product[_prodIds[i]].seller][MODEL.O_ID].push(_prodIds[i]);
            MODEL.prodTotal[MODEL.O_ID][_prodIds[i]] = _prodCounts[i];
            total += MODEL.Product[_prodIds[i]].itemPrice * _prodCounts[i];
			TOKEN.transfer(MODEL.Product[_prodIds[i]].seller, MODEL.Product[_prodIds[i]].itemPrice * _prodCounts[i]);
            MODEL.Product[_prodIds[i]].availableCount -= _prodCounts[i];
            MODEL.MarketOrder[MODEL.O_ID].isOrdered[_prodIds[i]] = true;
        }

        MODEL.MarketOrder[MODEL.O_ID].BuyerAddr = payable(msg.sender);
        MODEL.MarketOrder[MODEL.O_ID].timeStamp = block.timestamp;
        MODEL.MarketOrder[MODEL.O_ID].orderDetails = _orderDetails;
        MODEL.MarketOrder[MODEL.O_ID].totalPrice = total;
        MODEL.Users[msg.sender].orders.push(MODEL.O_ID);
        MODEL.O_ID++;
        // ISpecToken(TOKEN).sendTokens(total, msg.sender);
		// TOKEN.transfer()
        emit Order(msg.sender, MODEL.O_ID);
    }
}