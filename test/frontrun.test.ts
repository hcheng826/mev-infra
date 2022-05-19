import sampleTxpoolData from './sampleData/sampleTxpoolContent.json';
import beefyVaultAbi from './abi/beefyVault.abi.json';
import { getOutbidTx } from '../src';
import { ethers } from 'ethers';
import { expect } from 'chai';
import { AVALANCHE_PUBLIC_URL } from './const';

describe('front run test', () => {
    // try with the beefy vault contract: 0xdb054f4978a485bc5d9ae144b487340b141e41db
    it('can match the target transaction and frontrun it', async () => {
        // const [signer] = await ethers.getSigners();
        const txs = await getOutbidTx(
            sampleTxpoolData.result.pending,
            '0xdb054f4978a485bc5d9ae144b487340b141e41db',
            new ethers.Contract(
                '0xdb054f4978a485bc5d9ae144b487340b141e41db',
                beefyVaultAbi,
                ethers.getDefaultProvider(AVALANCHE_PUBLIC_URL)
            ),
            'depositAll',
            () => true,
            1
        );
        expect(txs[0].maxFeePerGas).is.eql(
            ethers.BigNumber.from('0x91494c600').add(ethers.utils.parseUnits('1', 'gwei'))
        );
        expect(txs[0].maxPriorityFeePerGas).is.eql(
            ethers.BigNumber.from('0x59682f00').add(ethers.utils.parseUnits('1', 'gwei'))
        );
    });
});
