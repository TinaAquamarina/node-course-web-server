const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//INITIALIZING EXPRESS

let app = express();

//USING PARTIALS & SETTING HBS AS DEFAULT EXTENSION

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// USING MIDDLEWARE AND APPENDING TO LOG

app.use((req,res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.originalUrl}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

// SETTING UP MAINTENANCE MIDDLEWARE, STOPPING EVERYTHING ELSE FROM EXECUTING

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// SETTING PUBLIC FOLDER FOR STATIC FILES

app.use(express.static(__dirname + '/public'));

// HELPERS (JS FUNCTIONS)

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// ROUTES

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to the home page',
        pageTitle: 'Home page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/fancy', (req, res) => {
    res.send('I\'m so fancy');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You have errored me'
    });
});

// SERVER LISTENER

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});