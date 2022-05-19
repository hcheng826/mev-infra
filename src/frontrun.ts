import { ethers } from 'ethers';

/**
 * This function will try to match the target transaction and return the outbid transaction if it's profitable
 * input:
 * - mempool transactions
 * - target contract address
 * - target contract instance
 * - isPtofitable function: takes gas config and param, return if the setting is profitable
 * - out bid increment amount, default to be 1 (gwei)
 * output:
 * - populated outbid transaction (same tx data, new gas fee config)
 */

type TransactionConfig = {
    gasFeeConfig: {
        maxFeePerGas: ethers.BigNumber;
        maxPriorityFeePerGas: ethers.BigNumber;
    };
    param?: any;
    value?: ethers.BigNumber;
};

export async function getOutbidTx(
    // TODO: enforce txpool content type
    pendingTransactions: any,
    targetContractAddress: string,
    targetContractInstance: ethers.Contract,
    targetFunctionName: string,
    isProfitable: (txConfig: TransactionConfig) => boolean,
    outbidIncrement: number = 1
): Promise<Array<ethers.PopulatedTransaction>> {
    const outbidTxs = new Array<ethers.PopulatedTransaction>();
    for (const fromAddr in pendingTransactions) {
        const nonce = Object.keys(pendingTransactions[fromAddr])[0];
        const tx = pendingTransactions[fromAddr][nonce];

        // not target contract address, skip
        if (tx.to !== targetContractAddress) {
            continue;
        }

        const targetContractInterface = targetContractInstance.interface;
        let txDescription;
        try {
            txDescription = targetContractInterface.parseTransaction({
                data: tx.input,
            });
        } catch (e) {
            console.error('error on parsing the transaction: ', e);
            continue;
        }

        // not target contract function, skip
        if (txDescription.functionFragment && txDescription.functionFragment.name !== targetFunctionName) {
            continue;
        }

        const outbidGasConfig = {
            maxFeePerGas: ethers.BigNumber.from(tx.maxFeePerGas).add(
                ethers.utils.parseUnits(outbidIncrement.toString(), 'gwei')
            ),
            maxPriorityFeePerGas: ethers.BigNumber.from(tx.maxPriorityFeePerGas).add(
                ethers.utils.parseUnits(outbidIncrement.toString(), 'gwei')
            ),
        };

        // not profitable, skip
        if (
            !isProfitable({
                gasFeeConfig: outbidGasConfig,
                param: txDescription.args,
                value: ethers.BigNumber.from(txDescription.value),
            })
        ) {
            continue;
        }

        const outbidTx = await targetContractInstance.populateTransaction[targetFunctionName]({ ...outbidGasConfig });
        outbidTxs.push(outbidTx);
    }
    return outbidTxs;
}
