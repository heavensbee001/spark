// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


library SharedStructs {
    struct Balance {
        uint WHTBalance;
        uint WHTPriceUSD;
        uint timestamp;
    }
    struct Source {
        uint index;
        string sourceID;
        string sourceType;
        string displayName;
        uint WHTPriceUSD;
        Balance currentBalance;
        Balance[] historyBalance;
    }
    struct Preferences {
        uint sourceIndex;
        uint percentage;
    }
    struct User {
        string displayName;
        string meterID;
        uint pendingUSDBalance;
        Balance[] pendingBalance;
        Balance[] historyBalance;
        Preferences[] preferences;
    }
}
