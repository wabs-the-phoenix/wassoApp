let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let apiRouter = require('./apiRouter').router;

app.set('view engine', 'ejs');
//Middlewares
//parse application
app.use(bodyParser.urlencoded({extended: true}));
//parse application json
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
   secret: "ma session",
   resave: false,
   saveUninitialized: true,
   cookie: {secure: false}
}));

app.use(require('./middlewares/flash'));
app.use('/api/', apiRouter);
app.get('/filler', (req, res) => {
   res.render('tempoPages/addAdmin');
});
app.get('/', (req, res) => {
   res.render('auth/login');
});
app.get('/administration',( req, res) => {
   res.render('admin/home')
});


app.listen(8000);
