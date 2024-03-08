require('dotenv').config()
const express = require('express');
const http = require('http');
const { selectQuotation } = require('./db-access');

const PORT = process.env.PORT;
const FILE_STORAGE_HOST = process.env.FILE_STORAGE_HOST;
const FILE_STORAGE_PORT = process.env.FILE_STORAGE_PORT;

const app = express();

app.get('/image', (req, res) => {
    const imagePath = req.query.path;
    const forwardRequest = http.request({
        host: FILE_STORAGE_HOST,
        port: FILE_STORAGE_PORT,
        path: `/image?path=${imagePath}`,
        method: 'GET',
        headers: req.headers,
    }, (forwardResponse) => {
        res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
    });
    req.pipe(forwardRequest);
});

app.get('/quotation', async (req, res) => {
    let quotation = await selectQuotation();
    res.status(200).json(quotation);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});