// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreeToken is ERC20, Ownable {
    uint public transferAmount = 100;
    uint public cooldownTimer = 24 * 60 * 60; // 24 hours
    mapping(address => uint) public addressToAllowTime;

    constructor() ERC20("FreeToken", "FREE") {
        _mint(msg.sender, 100000 * 10 ** decimals());
        
    } 
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _addAddress(address _address) internal {
        // Allow immediate withdrawal when added
        addressToAllowTime[_address] = block.timestamp - cooldownTimer;
    }

    // add 24 hours functionality
    function giveTokens() external {
        require(msg.sender != address(0), "Sender is the zero address");
        if (!(addressToAllowTime[msg.sender] > 0)) {
            _addAddress(msg.sender);
        }
        require(block.timestamp >= addressToAllowTime[msg.sender] + cooldownTimer, "Too early");
        _transfer(owner(), msg.sender, transferAmount);
        addressToAllowTime[msg.sender] += cooldownTimer;
    }

    function setTransferAmount(uint _amount) external onlyOwner {
        transferAmount = _amount;
    }
}