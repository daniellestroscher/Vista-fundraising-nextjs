// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ICrowdfund.sol";
import "./Crowdfund.sol";

contract CrowdfundMarket is ReentrancyGuard {
    string public version = "1.0.0";
    using Counters for Counters.Counter;
    Counters.Counter private _funraiserIds;

    struct CrowdfundObj {
        uint fundId;
        string metaUrl;
        address crowdfundContract;
        address owner;
        uint goal;
    }
    mapping(uint => CrowdfundObj) public idToCrowdfund;
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
        require(_goal > 0, "goal received is not greater then 0");
        _funraiserIds.increment();
        uint fundId = _funraiserIds.current();

        Crowdfund crowdfundContract = new Crowdfund(_goal, msg.sender);
        address crowdfundContractAddress = address(crowdfundContract);
        addressToId[crowdfundContractAddress] = fundId;

        idToCrowdfund[fundId] = CrowdfundObj(
            fundId,
            _metaUrl,
            crowdfundContractAddress,
            payable(msg.sender),
            _goal
        );

        emit CrowdfundCreated(
            fundId,
            _metaUrl,
            crowdfundContractAddress,
            msg.sender,
            _goal
        );
    }

    function getCrowdfund(uint _id) public view returns (CrowdfundObj memory) {
        ICrowdfund crowdfundInterface = ICrowdfund(
            idToCrowdfund[_id].crowdfundContract
        );
        require(!crowdfundInterface.closed(), "this contract has been closed");
        return idToCrowdfund[_id];
    }

    function getActiveFundraisers()
        public
        view
        returns (CrowdfundObj[] memory)
    {
        uint fundraisersCount = _funraiserIds.current();
        uint fundraiserGoalsMet = 0;
        ICrowdfund crowdfundInterface;
        bool goalReached;
        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (goalReached) fundraiserGoalsMet++;
        }

        uint goalNotReachedCount = _funraiserIds.current() - fundraiserGoalsMet;
        uint index = 0;

        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            goalNotReachedCount
        );
        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (!goalReached) {
                uint currentFundId = idToCrowdfund[i + 1].fundId;
                CrowdfundObj storage currentCrowdfund = idToCrowdfund[ //maybe call get function here to make sure its not closed..
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
        ICrowdfund crowdfundInterface;
        bool goalReached;
        uint index = 0;

        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (idToCrowdfund[i + 1].owner == msg.sender && !goalReached) {
                myActiveFundraisersCount++;
            }
        }
        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            myActiveFundraisersCount
        );

        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (idToCrowdfund[i + 1].owner == msg.sender && !goalReached) {
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
        ICrowdfund crowdfundInterface;
        bool goalReached;
        uint index = 0;

        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (idToCrowdfund[i + 1].owner == msg.sender && goalReached) {
                myCompletedFundraisersCount++;
            }
        }
        CrowdfundObj[] memory fundraisers = new CrowdfundObj[](
            myCompletedFundraisersCount
        );

        for (uint i = 0; i < fundraisersCount; i++) {
            crowdfundInterface = ICrowdfund(
                idToCrowdfund[i + 1].crowdfundContract
            );
            goalReached = crowdfundInterface.goalReached();
            if (idToCrowdfund[i + 1].owner == msg.sender && goalReached) {
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
