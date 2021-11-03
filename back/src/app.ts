import app from '.';
import env from './configs';

const port: string | number = env.PORT || 4000;

app.listen(port, () => {
    console.log('서버시작', port);
});
