// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Crowdfund is ReentrancyGuard {
    bool public closed = false;
    uint public goal;
    bool public goalReached;
    uint public raised;
    address CrowdfundOwner;

    mapping(address => uint) addressToContribution;

    constructor(uint _goal, address _owner) {
        goal = _goal;
        CrowdfundOwner = _owner;
        goalReached = false;
        raised = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == CrowdfundOwner, "You do not own this contract.");
        _;
    }
    event GoalReached(uint totalRaised);
    event FundsReceived(address contributor, uint amount);
    event CrowdfundClosed(uint256 totalRaised);

    function getOwner() public view returns (address) {
        return CrowdfundOwner;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function donate() public payable nonReentrant {
        require(!closed, "Funding goal already met or contract is closed");
        require(msg.value > 0, "Invalid donation amount");
        addressToContribution[msg.sender] += msg.value;
        raised += msg.value;
        emit FundsReceived(msg.sender, msg.value);
        if (raised >= goal) updateGoalStatus();
    }

    function updateGoalStatus() internal {
        require(raised >= goal, "The goal has not been reached yet.");
        goalReached = true;
        emit GoalReached(raised);
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "sorry, nothing to withdraw.");
        payable(CrowdfundOwner).transfer(address(this).balance);
    }

    function checkIfContributor(
        address _checkAddress
    ) public view returns (bool) {
        if (addressToContribution[_checkAddress] > 0) {
            return true;
        } else {
            return false;
        }
    }

    function close() external onlyOwner {
        require(goalReached, "The funding goal has not been reached yet.");
        require(!closed, "The contract has already been closed.");

        // transfer funds to the owner
        payable(CrowdfundOwner).transfer(address(this).balance);

        // mark the contract as closed
        closed = true;
        emit CrowdfundClosed(raised);
    }

    //safety functions
    receive() external payable {
        addressToContribution[msg.sender] += msg.value;
        raised += msg.value;
        emit FundsReceived(msg.sender, msg.value);
        if (raised >= goal) updateGoalStatus();
    }

    fallback() external payable {
        revert("Invalid transaction, fallback called.");
    }
}
