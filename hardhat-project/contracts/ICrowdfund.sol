// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
interface ICrowdfund {
    function closed() external view returns (bool);
    function goal() external view returns (uint);
    function goalReached() external view returns (bool);
    function raised() external view returns (uint);
    function donate() external payable;
    function withdraw() external;
    function checkIfContributor(address _checkAddress) external view returns (bool);
}