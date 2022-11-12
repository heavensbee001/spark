## Contract

- balance of energy generated per source KWHT (kWh Token) for each source & its price:
  - sources:

```
    [
        {
            _ID,
            Arweave_ID,
            KWHT_current_balance: {
                KWHT_balance,
                KWHT_price,
                timestamp,
            }],
            KWHT_balance_history: [{
                KWHT_balance,
                KWHT_price,
                timestamp,
            }],
        }
    ]
```

- balance per account of energy consumed (KHWT) each hour + source & price
  - accounts:

```
    [
        {
            _ID,
            totalDebt,
            sources: [_ID]
            KWHT_balance: [{
                _ID,
                KWHT_balance,
                KWHT_price,
                timestamp,
            }],
            KWHT_balance_history: [{
                _ID,
                KWHT_balance,
                KWHT_price,
                timestamp,
            }],
        }
    ]
```

### get

Source:

- getAllSources
- getSource
- getSourceCurrentBalance
- getSourceBalanceHistory

Account:

- getAccount
- getAccountSources
- getAccountBalance
- getAccountTotalDebt
- getAccountTimeFrameConsumption

### set

Source:

- addSource
- setSourceKWHT
- setSourcePrice

Account:

- setAccountBalance
- setAccountKWHT
