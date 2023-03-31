// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Crowdfund.sol";

contract CrowdfundMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _funraiserIds;
    Counters.Counter public _fundsGoalsMet;
    //uint public _fundsGoalsMet;

    struct CrowdfundObj {
        uint fundId;
        string metaUrl;
        address crowdfundContract;
        address owner;
        uint goal;
        bool goalReached;
    }
    mapping(uint => CrowdfundObj) idToCrowdfund;
    mapping(address => uint) addressToId;

    event CrowdfundCreated(
        uint indexed fundId,
        string metaUrl,
        address indexed crowdfundContractAddress,
        address owner,
        uint256 goal
    );

    function createCrowdfund(
        uint _goal,
        string memory _metaUrl
    ) public nonReentrant {
        _funraiserIds.increment();
        uint fundId = _funraiserIds.current();

        Crowdfund crowdfundContract = new Crowdfund(_goal);
        address crowdfundContractAddress = address(crowdfundContract);
        addressToId[crowdfundContractAddress] = fundId;

        idToCrowdfund[fundId] = CrowdfundObj(
            fundId,
            _metaUrl,
            crowdfundContractAddress,
            payable(msg.sender),
            _goal,
            false
        );

        emit CrowdfundCreated(
            fundId,
            _metaUrl,
            crowdfundContractAddress,
            msg.sender,
            _goal
        );
    }

    function setGoalReached(address _fundContract) public {
      uint contractId = addressToId[_fundContract];
      idToCrowdfund[contractId].goalReached = true;
      _fundsGoalsMet.increment();
    }

    function getCrowdfund(uint _id) public view returns (CrowdfundObj memory) {
      return idToCrowdfund[_id];
    }

    function getActiveFundraisers() public view returns (CrowdfundObj[] memory) {
        uint fundraisersCount = _funraiserIds.current();
        uint goalNotReachedCount = _funraiserIds.current() - _fundsGoalsMet.current();
        uint index = 0;

        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](goalNotReachedCount);

        for (uint i = 0; i < fundraisersCount; i++) {
            if (!idToCrowdfund[i + 1].goalReached) {
                uint currentFundId = idToCrowdfund[i + 1].fundId;
                CrowdfundObj storage currentCrowdfund = idToCrowdfund[
                    currentFundId
                ];
                fundraisers[index] = currentCrowdfund;
                index++;
            }
        }
        return fundraisers;
    }

    function getMyFundraisers() public view returns (CrowdfundObj[] memory) {
        uint fundraisersCount = _funraiserIds.current();
        uint myFundraisersCount = 0;
        uint index = 0;

        for (uint i = 0; i < fundraisersCount; i++) {
            if (idToCrowdfund[i + 1].owner == msg.sender) {
                myFundraisersCount++;
            }
        }
        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            myFundraisersCount
        );

        for (uint i = 0; i < fundraisersCount; i++) {
            if (idToCrowdfund[i + 1].owner == msg.sender) {
                uint currentFundId = idToCrowdfund[i + 1].fundId;
                CrowdfundObj storage currentCrowdfund = idToCrowdfund[
                    currentFundId
                ];
                fundraisers[index] = currentCrowdfund;
                index++;
            }
        }
        return fundraisers;
    }

    function getMyActiveFundraisers()
        public
        view
        returns (CrowdfundObj[] memory)
    {
        uint fundraisersCount = _funraiserIds.current();
        uint myActiveFundraisersCount = 0;
        uint index = 0;

        for (uint i = 0; i < fundraisersCount; i++) {
            if (
                idToCrowdfund[i + 1].owner == msg.sender &&
                !idToCrowdfund[i + 1].goalReached
            ) {
                myActiveFundraisersCount++;
            }
        }
        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            myActiveFundraisersCount
        );

        for (uint i = 0; i < fundraisersCount; i++) {
            if (
                idToCrowdfund[i + 1].owner == msg.sender &&
                !idToCrowdfund[i + 1].goalReached
            ) {
                uint currentFundId = idToCrowdfund[i + 1].fundId;
                CrowdfundObj storage currentCrowdfund = idToCrowdfund[
                    currentFundId
                ];
                fundraisers[index] = currentCrowdfund;
                index++;
            }
        }
        return fundraisers;
    }

    function getMyCompletedFundraisers()
        public
        view
        returns (CrowdfundObj[] memory)
    {
        uint fundraisersCount = _funraiserIds.current();
        uint myCompletedFundraisersCount = 0;
        uint index = 0;

        for (uint i = 0; i < fundraisersCount; i++) {
            if (
                idToCrowdfund[i + 1].owner == msg.sender &&
                idToCrowdfund[i + 1].goalReached
            ) {
                myCompletedFundraisersCount++;
            }
        }
        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            myCompletedFundraisersCount
        );

        for (uint i = 0; i < fundraisersCount; i++) {
            if (
                idToCrowdfund[i + 1].owner == msg.sender &&
                idToCrowdfund[i + 1].goalReached
            ) {
                uint currentFundId = idToCrowdfund[i + 1].fundId;
                CrowdfundObj storage currentCrowdfund = idToCrowdfund[
                    currentFundId
                ];
                fundraisers[index] = currentCrowdfund;
                index++;
            }
        }
        return fundraisers;
    }
}
