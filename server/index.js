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
//

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

    if (ENV == 'development') {
        console.log(`☕️  ${ENV} -> Creating Front-end bundle`);
        bundler.runBundle();
        console.log(`🚀 running: http://localhost:${PORT}`);
    }

    else {
        console.log(`🍺  ${ENV} -> Building Front-end`);
        bundler.runBuild(() => { console.log(`🚀 running: http://localhost:${PORT}`) });
    }


    events.broadcast({ msg: 'reload' });

});

