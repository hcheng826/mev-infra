# mev-infra

This repo includes some common tools or optimization components in MEV (Maximal Extractable Value) strategies.

## Outbid and frontrun
The function `getOutbidTx` can be used when the user wants to monitor a certain method call of a certain contract, such as swap or liquidation transaction, and output a transaction with a higher gas price bid. This can be useful when there are other player(s) competing on a profitable transaction. If the user observed the opportunity and quickly response with the higher-gas bid transaction, it can get the chance to take the profit.

The function takes the following inputs
- pendingTransactions: The list of pending transactions to be processed. General use case would be streaming the transactions from mempool and input here.
- targetContractInstance: The target contract to monitor. The purpose here is to decode the transaction by contract interface.
- targetFunctionName: The function (method) name to monitor and outbid. If the method name is matched, the outbid processing would be triggered.
- isProfitable: This param is a function that takes in the observed transaction data and outputs a boolean. This function is responsible for evaluating whether the transaction would be profitable after the outbid considering the gas cost. If it's profitable then the output boolean is true and false otherwise.
- outbidIncrement: The gas price increment the user wants to add. Default value is 1.


## Mempool transaction decoding and monitoring
The function `scratchMempoolTx` scratches the mempool transaction for further processing.

