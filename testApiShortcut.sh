# eth_getBalance
curl -X POST -H "Content-Type: application/json;" https://api.avax.network/ext/bc/C/rpc --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_getBalance", "params": ["0xa3889f5777c9D5021bA1D6D9600EDc72403D415a", "latest"]}'

# eth_getTransactionByHash
curl -X POST -H "Content-Type: application/json" https://api.avax.network/ext/bc/C/rpc --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xa1f0e4eab031128af537a36a3f2101fe6f297fb20f1085cc515446d5812510ca"],"id":1}'

# txpool_content
# this only works on validator URL and need to explicitly turn on the API
curl -X POST -H "Content-Type: application/json;" http://localhost:9650/ext/bc/C/rpc --data '{"jsonrpc":"2.0","method":"txpool_content","id":1}'

# connect websocket
wscat -c wss://api.avax.network/ext/bc/C/ws
# execute in ws connection (stream txHash)
{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}


curl -X POST -H "Content-Type: application/json;" http://localhost:9650/ext/bc/C/rpc --data '{"jsonrpc":"2.0","method":"eth_estimateGas","id":1, "params":[{"to":"0x4084f32a91f4d8636ca08386efe70c6e302f1d84","data":"0xfdb5a03e"}]}'
