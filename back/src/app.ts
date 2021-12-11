import app from '.';
import env from './configs';
import Socket from './socket';
const port: string | number = env.PORT || 4000;

const server = app.listen(port, () => {
    console.log('서버시작', port);
});

Socket(server, app);
