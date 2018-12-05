import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import config from "./config.json";
import ViewsManager from './ViewsManager';

const viewsPath = path.join(__dirname, config.viewsPath || '../dist/views');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || config.port || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist/views')));

//execute bundler
let views = new ViewsManager();
app.use(views.middlewareBundler());
app.use(views.middlewareReload());

//usual routers
app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, '/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(viewsPath, '/home.html'));
});

app.listen(PORT, function () {
    if (ENV == 'development') {
        console.log(`Environment:${ENV} -> Dynamic Front-end bundle`);
    }
    else {
        console.log(`Environment: ${ENV} -> Static - Building Front-end`);
    }
    console.log(`🚀 running: http://localhost:${PORT}`);
});

