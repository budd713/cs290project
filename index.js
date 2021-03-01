// initialize dependencies
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
// const SMTPTransport = require('nodemailer/lib/smtp-transport');
// const multiparty = require('multiparty');
// require('dotenv').config();

const PORT = process.env.PORT || 31858;

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API KEY pk_48ed691da2664891a33c171019d0bcb4
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_48ed691da2664891a33c171019d0bcb4', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) {
            // console.log(body);		
            finishedAPI(body);
        };
    });
};

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
    });
});

// set contact GET route
app.get('/contact.html', function (req, res) {
    res.render('contact', {
    });
});

// set contact POST route
app.post('/contact.html', function (req, res) {
    res.render('contact', {
    });
});

// set about me GET route
app.get('/about.html', function (req, res) {
    res.render('about', {
    });
});

// set stocklookup GET route
app.get('/stocklookup.html', function (req, res) {
    call_api(function (doneAPI) {
        res.render('stocklookup', {
            stock: doneAPI
        });
    }, "aapl");

});

// Set stocklookup POST route
app.post('/stocklookup.html', function (req, res) {
    call_api(function (doneAPI) {
        res.render('stocklookup', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);

});

// get sudoku GET route
app.get('/sudoku.html', function (req, res) {
    res.render('sudoku', {
    });
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));

