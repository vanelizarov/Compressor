const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const huffman = require('./src/js/logic/transformations/huffman');
const rle = require('./src/js/logic/transformations/rle');
const lzw = require('./src/js/logic/transformations/lzw');

const port = process.env.PORT || 8080;
const isDevelopment = process.argv.indexOf('--development') !== -1;

if (isDevelopment) {

    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true
        }
    }));

    app.use(require('webpack-hot-middleware')(compiler));

} else {
    app.use(express.static(path.join(__dirname, 'dist')));
}

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, () => {
    console.log(`--> Server listening on port: ${port}`);
});

//
// Socket events
//

io.on('connection', (socket) => {
    console.log('--> Someone connected to socket');

    socket.on('client:sent_img_data', (payload) => {
        console.log(`----> Received data's first pixel: rgba(${payload.data[0]}, ${payload.data[1]}, ${payload.data[2]}, ${payload.data[3]})`);
    })
});