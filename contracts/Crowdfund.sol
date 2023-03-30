// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

//import "./CrowdfundMarket.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Crowdfund {
  uint goal;
  address CrowdfundOwner;

  mapping (address => uint) addressToContribution;
    constructor(uint _goal) {
      goal = _goal;
      CrowdfundOwner = tx.origin;
    }

    modifier onlyOwner() {
        require(msg.sender == CrowdfundOwner, "You do not own this contract.");
        _;
    }

    function getOwner() public view returns (address) {
        return CrowdfundOwner;
    }

    function getBalance() public view returns (uint) {
      return address(this).balance;
    }

    function donate() public payable {
      //require (msg.value >= minContribution, "error: your donation didn't meet minimum requirment");
      addressToContribution[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
      require (address(this).balance > 0, "sorry, nothing to withdraw");
      payable(CrowdfundOwner).transfer(address(this).balance);
    }

    function checkIfContributor(address _checkAddress) public view returns (bool) {
      if(addressToContribution[_checkAddress] > 0) {
        return true;
      } else {
        return false;
      }
    }

    receive() external payable {}
}
