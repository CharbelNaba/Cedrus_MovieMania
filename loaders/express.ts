import express from 'express';
import bodyParser from 'body-parser';
import routes from '../controllers';
import config from '../configuration';
import session from 'express-session';
import sessionSettings from '../configuration/sessionSetting';
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from '../configuration/corsOptions';

// Instantiate everything related to express.
export default async ({ app }: { app: express.Application }) => {
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(session(sessionSettings));
    app.use(config.api.prefix, routes());

    app.use(express());

    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

    return app;
};