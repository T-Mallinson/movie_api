// importing express locally
const express = require('express'),
 
// importing uuid and bodyParser and Morgan
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

//declaring app variable
const app = express();      
//creating write stream to log.txt
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

//Integrating Mongoose
const mongoose = require('mongoose');
const { title } = require('process');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });


// UsingMorgan logger, express, body-parser
app.use(morgan('common', {stream: accessLogStream}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
//Users
let users = [
    {
    id: 1,
    name: "Tristan",
    favouriteMovies: ["The Day After Tomorrow", "Interstellar"] 
    },
    {
    id: 2,
    name: "Ella",
    favouriteMovies: ["Before the Flood", "Interstellar"]
    }
]
//  movies    
let movies = [
    {
        Title: "An Inconvenient Truth",
        Description: "Filmmaker Davis Guggenheim follows Al Gore on the lecture circuit, as the former presidential candidate campaigns to raise public awareness of the dangers of climate change",
        Genre: {
            "Name":"Documentary",
            "Description":"A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record"
        },
        Director: {
            "Name": "Davis Guggenheim",
            "Bio": "Davis Guggenheim from St Louis, Missouri, is a producer and director best known for Training Day (2011), Waiting for Superman (2010) and An Inconvenient Truth (2006)",
            "Birth":"1963",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt0497116/mediaviewer/rm2695729664/?ref_=tt_ov_i",
        year: "2006",
        featured: "yes"
    },
    {
        Title: "Before the Flood",
        Description: "A look at how climate change affects our environment and what society can do to prevent the demise of endangered species, ecosystems and native communities across the planet.",
        Genre: {
            "Name": "Documentary",
            "Description": "A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record"
        },
        Director: {
            "Name": "Fisher Stevens",
            "Bio": "Fisher Stevens is an American actor, director and producer. As an actor, he is best known for his portrayal of Ben in Short Circuit. His most recent successes include winning the 2010 Academy Award for Best Documentary feature for The Cove",
            "Birth":"1963",
            "Death":"Present"
        },
        imageUrl: "",
        year: "2017",
        featured: "yes"
    },
    {
        Title: "The Day After Tomorrow",
        Description: "Jack Hall, paleoclimatologist, must make a daring trek from Washington DC to New York City to reach his son, trapped in the cross-hairs of a sudden international storm which plunges the planet into a new Ice Age",
        Genre: {
            "Name":"Adventure fiction",
            "Description":"Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement"
        },
        Director: {
            "Name": "Roland Emmerich",
            "Bio": "Roland Emmerich is a German film director and producer of blockbuster films like The Day After Tomorrow (2004), Godzilla (1998), Independence Day (1996) and The Patriot (2000)",
            "Birth":"1955",
            "Death":"Present"
        },
        imageUrl: "",
        year: "2004",
        featured: "yes"
    },
    {
        Title: "Kiss the Ground",
        Description: "A revolutionary group of activists, scientists, farmers and politicians band together in a global movement of regenerative architecture that could balance our climate, replenish our vast water supplies and feed the world",
        Genre: {
            "Name":"Documentary",
            "Description":"A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record"
        },
        Director: {
            "Name": "Joshua Tickell",
            "Bio": "Josh Tickell is a film Director who specialises in movies with a social message. His first feature movie, Fuel (2008) won the Sundance Audience Award for Best Documentary.",
            "Birth":"1975",
            "Death":"Present"
        },
        imageUrl: "",
        year: "2020",
        featured: "yes"
    },
    {
        Title: "Princess Mononoke",
        Description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony.",
        Genre: {
            "Name":"Fantasy",
            "Description":"Fantasy films contain fantastic themes, usually magic, supernatural events, mythology, folklore or exotic fantasy worlds. The genre is considered a form of speculative fiction."
        },
        Director: {
            "Name": "Hayao Miyazaki",
            "Bio": "Hayao Miyakazi is a Japanese animator, director, producer, screenwriter, author and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature fims, widely regarded as one of the most accomplished filmmakers in the history of animation.",
            "Birth":"1941",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt0119698/mediaviewer/rm2697706753/?ref_=tt_ov_i",
        year: "1997",
        featured: "yes"
    },
    {
        Title: "Seaspiracy",
        Description: "Passionate about ocean life, a filmmaker sets out to document the har  that humans do to marine species - and uncovers alarming globa corruption",
        Genre: {
            "Name":"Documentary",
            "Description":"A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record"
        },
        Director: {
            "Name": "Ali Tabrizi",
            "Bio": "Ali Tabrizi is a self-taught cinematographer, presenter and director. He is founder of Disrupt Studios and an inspiring speaker on sustainability, conservation, human and animal rights and the future of food.",
            "Birth":"1993",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt14152756/mediaviewer/rm399362305/?ref_=tt_ov_i",
        year: "2021",
        featured: "yes"
    },
    {
        Title: "Dont Look Up",
        Description: "Don't Look Up is a 2021 American apocalyptic political satire black comedy film with a stellar ensemble cast. Two low-level astronomers must go on a giant media tour to warn humankind of an approaching comet that will destroy planet earth.",
        Genre: {
            "Name":"Comedy",
            "Description":"Comedy is a genre that emphasises humour and is designed to make audiences laugh."
        },
        Director: {
            "Name": "Adam McKay",
            "Bio": "Adam McKay is an American screenwriter, director, comedian and actor. McKay has a comedy partnership with Will Ferrel, with whom he co-wrote the films Anchorman, Talladega Nights and The Other Guys.",
            "Birth":"1968",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt11286314/mediaviewer/rm1423829249/?ref_=tt_ov_i",
        year: "2021",
        featured: "yes"
    },
    {
        Title: "Mother!",
        Description: "Mother! is a 2017 American psychological horor ffilm starring Jennifer Lawrence, Javier Bardem, Ed Harris and Michelle Pfeiffer. It follows a young woman whose tranquil life with her husband at their country home is disrupted by the arrival of a mysterious couple. Lawrence stated that the film is an allegory and depicts the rape & torment of Mother Earth",
        Genre: {
            "Name":"Psychological Horror",
            "Description":"Psychological Horror is a subgenre of horror and psychological fiction with a particular focus on mental, emotional and psychological states to frighten, disturb or unsettle its audience."
        },
        Director: {
            "Name": "Darren Aronofsky",
            "Bio": "Darren Aronofsky is an American filmmaker. His films are noted for their surreal, melodramatic, and often disturbing elements, frequently in the form of psychological fiction.",
            "Birth":"1969",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt5109784/mediaviewer/rm3099402752/?ref_=tt_ov_i",
        year: "2017",
        featured: "yes"
    },
    {
        Title: "Interstellar",
        Description: "Interstellar is a 2014 epic science fiction film co-written, directed and produced by Christopher Nolan. It stars Matthew McConaughey, Anne Hathaway, Jessica Chastain and Matt Damon. Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind",
        Genre: {
            "Name":"Science Fiction",
            "Description":"Science fiction is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs etc."
        },
        Director: {
            "Name": "Christopher Nolan",
            "Bio": "Christopher Nolan is a British-American filmmaker known for his hollywood blockbusters with complex storytelling. He is considered a leading filmmaker of the 21st Cewntury. The recipient of many accolades, he has been nominated for 5 Academy Awards, 5 BAFTAs and 6 Golden Globes.",
            "Birth":"1970",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt0816692/mediaviewer/rm4043724800/?ref_=tt_ov_i",
        year: "2014",
        featured: "yes"
    },
    {
        Title: "2040",
        Description: "Practical solutions to environmental concerns are addressed with the hope that the filmmaker's daughter, 21 years old in the year 2040, will face a hopeful future",
        Genre: {
            "Name":"Documentary",
            "Description":"A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record"
        },
        Director: {
            "Name": "Damon Gameau",
            "Bio": "Damon Gameau is an Australian actor, director, and producer known for his documentaries That Sugar Film and 2040",
            "Birth":"1958",
            "Death":"Present"
        },
        imageUrl: "https://www.imdb.com/title/tt7150512/mediaviewer/rm3095312129/?ref_=tt_ov_i",
        year: "2019",
        featured: "yes"
    },
];
*/

// Return a list of ALL movies to the User

app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Return data about a single movie by title

app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: '+ err);
    });
});

// return data about a single movie by director
app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.directorName})
    .then((movie) => {
        res.json(movie.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: '+ err);
    });
});

//return data about a genre by name

app.get('/movies/genre/:genreName', (req, res) => {
    Movies.Genre.findOne({ genreName: req.params.genreName})
    .then((genre) => {
        res.json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// return data about a director by name

app.get('/movies/directors/:directorName', (req, res) => {
    Movies.Director.findOne({ directorName: req.params.directorName})
    .then((Director) => {
        res.json(Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
})

//allow new users to register

app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exists.');
        } else {
            Users.create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + err);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + err);
    });
});


//allow users to update their user info

app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }),
    { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true },
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    };
});

// allow users to add a movie to their list of favourites

app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
        {$push: { FavouriteMovies: req.params.MovieID}},
        {new: true}, 
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// allow users to remove a movie from their list of favourites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
        {$pull: { FavouriteMovies: req.params.MovieID}},
        {new: true}, 
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//Allow existing users to deregister

app.delete('/users(:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


/* OLD REQUESTS
// GET REQUESTS - READ

app.get('/', (req, res) => {
    console.log('Welcome to netZeroFlix!')
    res.send('Welcome to netZeroFlix!');
});

app.get('/documentation', (req, res) => {
    console.log('Documentation Request');
    res.sendFile(public/documentation.html, {root: __dirname});
});

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
    console.log('Request for list of movies')
});


app.get('/movies/:title', (req, res) => {
//  const title = req.params.title; same as below
    const {title} = req.params; 
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie')
    }
});

// READ Genre

app.get('/movies/genre/:genreName', (req, res) => {
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre')
    }
});

//READ Director

app.get('/movies/directors/:directorName', (req, res) => {
    const {directorName} = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director')
    }
});

//add new user - CREATE - POST
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names')
    }
})

// UPDATE - update user - PUT

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user){
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No such user')
    }

})

// CREATE - POST 

app.post('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);

    if (user){
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}s array`);
    } else {
        res.status(400).send('No such user')
    }

})

// DELETE a user's favourite movie 

app.delete('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);

    if (user){
        user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}s array`);
    } else {
        res.status(400).send('No such user')
    }

});

// DELETE a user 

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    let user = users.find(user => user.id == id);

    if (user){
        users = users.filter(user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('No such user')
    }

});

*/

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

