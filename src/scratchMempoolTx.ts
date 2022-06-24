import axios from 'axios';

const RPC_URL = process.env.RPC_URL;

let requestId = 0;

export function scratchMempoolTx() {
    const reqBody = {
        jsonrpc: '2.0',
        method: 'txpool_content',
        id: requestId++,
    };

    axios
    // @ts-ignore
        .post(RPC_URL, reqBody)
        .then((res) => {
            console.log(`statusCode: ${res.status}`);
            console.log(JSON.stringify(res.data, null, 2));
        })
        .catch((error) => {
            console.error(error);
        });
}

// setInterval(scratchMempoolTx, 100);
