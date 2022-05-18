import { ethers } from 'ethers';
import yieldYakAbi from '../abi/yieldYak.abi.json';
import yetiTroveManagerAbi from '../abi/yetiTroveManager.abi.json';
import sampleYieldYakReinvestTx from '../sampleData/sampleYieldYakReinvestTx.json';
import sampleYetiLiquidateTx from '../sampleData/sampleYetiLiquidateTx.json';

const iface = new ethers.utils.Interface(yieldYakAbi);

const reinvestTxDescription = iface.parseTransaction({
    data: sampleYieldYakReinvestTx.input,
    value: sampleYieldYakReinvestTx.value,
});

console.log(reinvestTxDescription);

const iface2 = new ethers.utils.Interface(yetiTroveManagerAbi);

const liquidateTxDescription = iface2.parseTransaction({
    data: sampleYetiLiquidateTx.input,
    value: sampleYetiLiquidateTx.value,
});

console.log(liquidateTxDescription);
