import { ethers } from 'ethers';
import yieldYakAbi from './abi/yieldYak.abi.json';
import yetiTroveManagerAbi from './abi/yetiTroveManager.abi.json';
import beefyVaultAbi from './abi/beefyVault.abi.json';
import sampleYieldYakReinvestTx from './sampleData/sampleYieldYakReinvestTx.json';
import sampleYetiLiquidateTx from './sampleData/sampleYetiLiquidateTx.json';
import sampleBeefyVaultTx from './sampleData/sampleBeefyVaultTx.json';

const iface = new ethers.utils.Interface(yieldYakAbi);

const reinvestTxDescription = iface.parseTransaction({
    data: sampleYieldYakReinvestTx.input,
    value: sampleYieldYakReinvestTx.value,
});

// console.log(reinvestTxDescription);

const iface2 = new ethers.utils.Interface(yetiTroveManagerAbi);

const liquidateTxDescription = iface2.parseTransaction({
    data: sampleYetiLiquidateTx.input,
    value: sampleYetiLiquidateTx.value,
});

// console.log(liquidateTxDescription);

const iface3 = new ethers.utils.Interface(beefyVaultAbi);

const beefyTx = iface3.parseTransaction({
    data: sampleBeefyVaultTx.input,
    value: sampleBeefyVaultTx.value,
});

// console.log(beefyTx);
