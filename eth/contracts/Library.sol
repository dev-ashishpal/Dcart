// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library Enums {
	enum UserType {noUser, buyer, seller}
}

library Library {
	using Enums for Enums.UserType;

	struct User {
        bytes32 userName;
        uint64 userContact;
        uint8 userGender;
        bytes32 userEmail;
        string userAddr;
        uint32[] orders;
        Enums.UserType userType;
    }
    struct Item {
        bytes32 itemName;
        uint256 itemPrice;
        string itemDetails;
        bytes32 itemBrand;
        uint32 availableCount;
        string imageUrl;
        address payable seller;
    }

    struct Order {
        address payable BuyerAddr;
        uint256 timeStamp;
        string orderDetails;
        uint256 totalPrice;
        mapping(uint32 => bool) isOrdered;
        mapping(uint32 => bool) isConfirmed;
        mapping(uint32 => bool) isRejected;
        mapping(uint32 => bool) isShipped;
        mapping(uint32 => bool) confirmDelivery;
        mapping(uint32 => bool) isCancelled;
    }

    struct CartModel {
        uint32 P_ID;
        uint32 O_ID;
        uint256 MIN_TIME;
        mapping(address => User) Users;
        mapping(uint32 => Item) Product;
        mapping(uint32 => Order) MarketOrder;
        mapping(address => uint32[]) orderList;
        mapping(address => mapping(uint32 => uint32[])) prodList;
        mapping(uint32 => mapping(uint32 => uint32)) prodTotal;
    }
}
