import axios from 'axios';

const AVAX_RPC_URL = 'http://13.113.39.140:11987/ext/bc/C/rpc';

let requestId = 0;

export function scratchMempoolTx() {
    const reqBody = {
        jsonrpc: '2.0',
        method: 'txpool_content',
        id: requestId++,
    };

    axios
        .post(AVAX_RPC_URL, reqBody)
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            console.log(JSON.stringify(res.data, null, 2));
        })
        .catch((error) => {
            console.error(error);
        });
}

// setInterval(scratchMempoolTx, 100);
