// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title faucet
 * @dev Implements sending and recieving money on metamask
 */

contract faucet {
    //will store money
    receive() external payable {}

    //will send money to address that initiated smart contract
    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= 100000000000000000);
        //equivalent to 0.1 eth,  ensures that withdraw amount is not greater than this
        //to interact with SC we have to initiate a transaction, ever SC has the attr msg which has info about the address who iniate this transaction
        //sender is the variable in message who has the address of the entity who initiated this smart contract
        //have to cast addr as payable to send funds to it
        payable(msg.sender).transfer(withdrawAmount);
    }

    function sendCommission(address payable payee) external {
        payee.transfer(100000000000000000);
    }

    function getBalance() public returns (uint256) {
        return address(this).balance;
    }
}
