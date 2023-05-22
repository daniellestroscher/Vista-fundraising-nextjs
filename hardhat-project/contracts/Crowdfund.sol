// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error GoalNotReached();

contract Crowdfund is ReentrancyGuard {
    bool public closed = false;
    bool public goalReached;
    uint public raised;
    uint public immutable GOAL;
    address public immutable FUND_OWNER;

    mapping(address => uint) addressToContribution;

    constructor(uint _goal, address _owner) {
        GOAL = _goal;
        FUND_OWNER = _owner;
        goalReached = false;
        raised = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == FUND_OWNER, "You do not own this contract.");
        _;
    }
    event GoalReached(uint totalRaised);
    event FundsReceived(address contributor, uint amount);
    event CrowdfundClosed(uint256 totalRaised);

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function donate() public payable nonReentrant {
        require(!closed, "Funding goal already met or contract is closed");
        require(msg.value > 0, "Invalid donation amount");
        addressToContribution[msg.sender] += msg.value;
        raised += msg.value;
        emit FundsReceived(msg.sender, msg.value);
        if (raised >= GOAL) updateGoalStatus();
    }

    function updateGoalStatus() internal {
        require(raised >= GOAL, "The goal has not been reached yet.");
        goalReached = true;
        emit GoalReached(raised);
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "sorry, nothing to withdraw.");
        payable(FUND_OWNER).transfer(address(this).balance);
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
        //payable(FUND_OWNER).transfer(address(this).balance);
        //USING CALL
        (bool closeSuccess, ) = payable(FUND_OWNER).call{value:address(this).balance }("");
        require (closeSuccess, "transfer failed.");

        // mark the contract as closed
        closed = true;
        emit CrowdfundClosed(raised);
    }

    //safety functions
    receive() external payable {
        donate();
    }

    fallback() external payable {
        revert("Invalid transaction, fallback called.");
    }
}
