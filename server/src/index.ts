import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet, { HelmetOptions } from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { SERVER_PORT } from './env.js';
import { api } from './api/api.js';

const app = express();

const corsOptions: CorsOptions = {
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    origin: 'http://localhost:3000',
};
const helmetOptions: HelmetOptions = {
    crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use(express.static('public'));

app.use('/api', api);

app.get('*', (_req: Request, res: Response) => {
    return res.status(200).json({ msg: 'What are you looking for? 👀' });
});

// custom 404
app.use((_req: Request, res: Response, _next: NextFunction) => {
    return res.status(404).json({ msg: "Sorry can't find that!" });
});

// custom error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    return res.status(500).json({ msg: 'Something broke!' });
});

app.listen(SERVER_PORT);