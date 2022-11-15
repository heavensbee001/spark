// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./SharedStructs.sol";

contract WHTVendor {
    address payable public owner;
    
    mapping (address => SharedStructs.User) private users;
    // mapping (string => SharedStructs.Source) private sources;
    SharedStructs.Source[] public sources;

    event AddedSource(string sourceID, uint when);
    event AddedBalanceToSource(string sourceID, SharedStructs.Balance balance, uint when);

    constructor() {
      
    }

    function addSource(string memory sourceType, string memory sourceID, string memory displayName, uint WHTPriceUSD) public {
        // require (!sources[sourceID]);

        sources.push();
        uint256 newIndex = sources.length - 1;

        sources[newIndex].index = newIndex;
        sources[newIndex].sourceID = sourceID;
        sources[newIndex].sourceType = sourceType;
        sources[newIndex].displayName = displayName;
        sources[newIndex].WHTPriceUSD = WHTPriceUSD;
        sources[newIndex].currentBalance = SharedStructs.Balance({
            WHTBalance: 0,
            WHTPriceUSD: WHTPriceUSD,
            timestamp: block.timestamp
        });

        sources[newIndex].historyBalance.push();
        uint256 newHistoryIndex = sources[newIndex].historyBalance.length - 1;
        sources[newIndex].historyBalance[newHistoryIndex].WHTBalance = 0;
        sources[newIndex].historyBalance[newHistoryIndex].WHTPriceUSD = WHTPriceUSD;
        sources[newIndex].historyBalance[newHistoryIndex].timestamp = block.timestamp;

        emit AddedSource(sourceID, block.timestamp);
    }

    function newSourceBalance(uint sourceIndex, uint WHTBalance) public {
        // require (!sources[sourceID]);

        sources[sourceIndex].historyBalance.push();
        uint256 newHistoryIndex = sources[sourceIndex].historyBalance.length - 1;
        sources[sourceIndex].historyBalance[newHistoryIndex].WHTBalance = WHTBalance;

        emit AddedBalanceToSource(sources[sourceIndex].sourceID, sources[sourceIndex].historyBalance[newHistoryIndex], block.timestamp);
        
    }
}
