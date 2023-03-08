// importing express locally
const express = require('express'),
//declaring app variable
    app = express(),   
//importing morgan     
    morgan = require('morgan');
    path = require('path');
    fs = require('fs'),
//creating write stream to log.txt
    accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// top movies    
let topMovies = [
    {
        title: 'An Inconvenient Truth',
        director: 'Davis Guggenheim',
        writer: 'Al Gore',
        stars: 'Al Gore'
    },
    {
        title: 'Before the Flood',
        director: 'Fisher Stevens',
        writer: 'Mark Monroe',
        stars: 'Leonardo DiCaprio, Ban Ki-Moon'
    },
    {
        title: 'The Day After Tomorrow',
        director: 'Roland Emmerich',
        writer: 'Roland Emmerich',
        stars: 'Jake Gyllenhaal, Dennis Quaid, Emmy Rossum',
    },
    {
        title: 'Kiss the Ground',
        director: 'Joshua Tickell, Rebecca Harrell Tickell',
        writer: 'Johnny Ohara, Joshua Tickell, Rebecca Harrell Tickell',
        stars: 'Woody Harrelson, Ray Archuleta',
    },
    {
        title: 'Princess Mononoke',
        director: 'Hayao Miyazaki',
        writer: 'Hayao Miyazaki',
        stars: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka',
    },
    {
        title: 'Seaspiracy',
        director: 'Ali Tabrizi',
        writer: 'Ali Tabrizi',
        stars: 'Ali Tabrizi',
    },
    {
        title: 'Dont Look Up',
        director: 'Adam McKay',
        writer: 'Adam McKay',
        stars: 'Leonardo DiCaprio, Jennifer Lawrence, Meryl Streep',
    },
    {
        title: 'Mother!',
        director: 'Darren Aronofsky',
        writer: 'Darren Aronofsky',
        stars: 'Jennifer Lawrence, Javier Bardem, Ed Harris',
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan',
        writer: 'Christopher Nolan, Jonathan Nolan',
        stars: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    },
    {
        title: '2040',
        director: 'Damon Gameau',
        writer: 'Damon Gameau',
        stars: 'Damon Gameau, Eva Lazzaro',
    },
];

//Morgan middleware

app.use(morgan('combined', {stream: accessLogStream}));


// GET REQUESTS

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    console.log('Welcome to netZeroFlix!')
    res.send('Welcome to netZeroFlix!');
});

//express static

app.use(express.static('public'));

// error handling

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});


// listen for requests

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.')
});

