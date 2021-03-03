require('dotenv').config();
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ShortURL = require('./models/ShortURL');
var app = express();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
    console.log('Server is running on port 3000!');
});

app.get('/', function(req, res) {
    res.render('pages/main', {shorturl: ''});
});

app.post('/', async function(req, res) {
    const shortUrl = await ShortURL.findOne({long: req.params.furl});
    var short = 'localhost:3000/';
    if(shortUrl == null) {
        const newShortUrl = await ShortURL.create({long: req.body.furl});
        short += newShortUrl.short;
        res.render('pages/main', {shorturl: short});
    } else {
        short += shortUrl.short;
        res.render('pages/main', {shorturl: short})
    }
});

app.get('/:shortUrl', async function(req, res) {
    const shorturl = await ShortURL.findOne({short: req.params.shortUrl});
    if(shorturl == null) return res.sendStatus(404);
    res.redirect(shorturl.long);
});