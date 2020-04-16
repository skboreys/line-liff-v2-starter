const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const liffId = process.env.LIFF_ID;
const endpoint = process.env.BLOCKCHAIN_ENDPOINT

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: liffId, blockchainEndpoint: endpoint});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));