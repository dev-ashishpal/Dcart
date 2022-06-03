// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import './Library.sol';

contract Read {
	using Library for Library.CartModel;
	Library.CartModel MODEL;

	modifier onlySeller() {
        require(uint256(MODEL.Users[msg.sender].userType) == 2, "only seller");
        _;
    }
    modifier onlyBuyer() {
        require(uint256(MODEL.Users[msg.sender].userType) == 1, "only buyer");
        _;
    }

    function totalProductID() external view returns (uint256) {
        return MODEL.P_ID;
    }

    function currentOrderID() external view returns (uint256) {
        return MODEL.O_ID;
    }

    function Orders(address _seller) external view returns (uint32[] memory orderId) {
        return (MODEL.orderList[_seller]);
    }

    function product(uint32 _id)
        public
        view
        returns (
            bytes32 itemName,
            uint256 itemPrice,
            bytes32 itemDetails,
            bytes32 imageId,
            uint32 availableCount
        )
    {
        return (
            MODEL.Product[_id].itemName,
            MODEL.Product[_id].itemPrice,
            MODEL.Product[_id].imageId,
            MODEL.Product[_id].itemDetails,
            MODEL.Product[_id].availableCount
        );
    }

    function productsList(address _seller, uint32 _o_id) external view returns (uint32[] memory prodId) {
        return (MODEL.prodList[_seller][_o_id]);
    }

    function productCount(uint32 _o_id, uint32 _p_id) external view returns (uint32 count) {
        return (MODEL.prodTotal[_o_id][_p_id]);
    }

    function userOrderDetails(address _addr) 
        external 
        view 
        returns (
            bytes32 userName,
            uint256 userContact,
            bytes32 userEmail,
            string memory userAddr
        )
    {
        return (
            MODEL.Users[_addr].userName,
            MODEL.Users[_addr].userContact,
            MODEL.Users[_addr].userEmail,
            MODEL.Users[_addr].userAddr
        );
    }

    function userDetails() 
        external 
        view 
        returns (
            bytes32 userName,
            uint256 userContact,
            uint8 userGender,
            bytes32 userEmail,
            string memory userAddr,
            uint32[] memory orders,
            uint8 userType
        )
    {
        return (
            MODEL.Users[msg.sender].userName,
            MODEL.Users[msg.sender].userContact,
            MODEL.Users[msg.sender].userGender,
            MODEL.Users[msg.sender].userEmail,
            MODEL.Users[msg.sender].userAddr,
            MODEL.Users[msg.sender].orders,
            uint8(MODEL.Users[msg.sender].userType)
        );
    }

    function marketOrder(uint32 _id)
        external
        view
        returns (
            address BuyerAddr,
            uint256 timeStamp,
            string memory orderDetails,
            uint256 totalPrice
        )
    {
        return (
            MODEL.MarketOrder[_id].BuyerAddr,
            MODEL.MarketOrder[_id].timeStamp,
            MODEL.MarketOrder[_id].orderDetails,
            MODEL.MarketOrder[_id].totalPrice
        );
    }

    function productOrder(uint32 _o_id, uint32 _p_id)
        external
        view
        returns (
            bool isConfirmed,
            bool isRejected,
            bool isShipped,
            bool isCancelled,
            bool confirmDelivery
        )
    {
        return (
            MODEL.MarketOrder[_o_id].isConfirmed[_p_id],
            MODEL.MarketOrder[_o_id].isRejected[_p_id],
            MODEL.MarketOrder[_o_id].isShipped[_p_id],
            MODEL.MarketOrder[_o_id].isCancelled[_p_id],
            MODEL.MarketOrder[_o_id].confirmDelivery[_p_id]
        );
    }

    
}