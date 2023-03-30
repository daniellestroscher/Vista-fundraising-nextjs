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
    //Counters.Counter public _fundsGoalsMet;
    uint public _fundsGoalsMet;

    struct CrowdfundObj {
        uint fundId;
        string metaUrl;
        address crowdfundContract;
        address owner;
        uint goal;
        bool goalReached;
    }
    mapping(uint => CrowdfundObj) idToCrowdfund;

    event CrowdfundCreated(
        uint indexed fundId,
        string metaUrl,
        address indexed crowdfundContractAddress,
        address owner,
        uint256 goal
    );

    function createCrowdfund(
        uint _goal,
        uint _minContribution,
        string memory _metaUrl
    ) public nonReentrant {
        _funraiserIds.increment();
        uint fundId = _funraiserIds.current();

        Crowdfund crowdfundContract = new Crowdfund(_goal, _minContribution);
        address crowdfundContractAddress = address(crowdfundContract);

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

    function checkActiveStatus(
        uint _id,
        address fundContract,
        uint _goal
    ) public {
        if (address(fundContract).balance >= _goal) {
            idToCrowdfund[_id].goalReached = true;
            _fundsGoalsMet++;
        }
    }

    function getActiveFundraisers() public returns (CrowdfundObj[] memory) {
        uint fundraisersCount = _funraiserIds.current();
        for (uint i = 0; i < fundraisersCount; i++) {
            checkActiveStatus(
                i + 1,
                idToCrowdfund[i + 1].crowdfundContract,
                idToCrowdfund[i + 1].goal
            );
        }
        uint goalNotReached = _funraiserIds.current() - _fundsGoalsMet;
        uint index = 0;

        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](goalNotReached);

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
