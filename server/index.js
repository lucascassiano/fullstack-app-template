import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import sendevent from 'sendevent';

//Parcel Bundler wrapper
import ViewsBundler from './ViewsBundler';

const viewsPath = path.join(__dirname, '../dist/views');
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist/views')));

var events = sendevent('/eventstream');
app.use(events);

/*function that is called when app is ended bundling*/
let ReloadApp = (success, msg) => {
    events.broadcast({ msg: 'reload' });
    console.log('📦  App Bundled');
}

//execute bundler
let bundler = new ViewsBundler();

app.use(bundler.getDefault().middleware());

//usual routers
app.get('/', (req, res) => {
    res.clearCookie('data');
    res.cookie('data', JSON.stringify({ name: "universal secret" })).send();
    res.sendFile(path.join(viewsPath, '/index.html'));
});

app.get('/home', (req, res) => {
    //res.cookie('data', JSON.stringify({ name: "lucas" }));
    //res.credentials('data', "lucas");
    res.sendFile(path.join(viewsPath, '/home.html'));
});

app.listen(PORT, function () {
    console.log(`🚀 running @ port ${PORT}`);

    if (ENV == 'development') {
        console.log(`☕️  ${ENV} -> Creating Front-end bundle`);
        bundler.runBundle(ReloadApp);
    }

    else {
        console.log(`🍺  ${ENV} -> Building Front-end`);
        bundler.runBuild(() => { console.log('🚀  App Launched!') });
    }

    events.broadcast({ msg: 'reload' });

});

