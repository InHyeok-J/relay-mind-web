const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(['/api', '/socket.io'], {
            target: '*',
            changeOrigin: true,
            ws: true,
            router: {
                '/socket.io': 'ws://*',
            },
        }),
    );
};
