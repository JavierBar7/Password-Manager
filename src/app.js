const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const generatePassword = require('generate-password');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));


app.use('/public', express.static(path.join(__dirname, '..', 'public'))); 

app.use(express.urlencoded({ extended: true }));


app.get('/login', (req, res) => {
    res.render('login', { user: undefined });
});


app.get('/register', (req, res) => {
    res.render('register', { user: undefined });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Intento de Login: Email - ${email}, Contraseña - ${password}`);
    res.render('dashboard', { user: { email } });
});


app.post('/register', (req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    console.log(`Intento de Registro: Usuario - ${username}, Email - ${email}, Contraseña - ${password}`);
    res.redirect('/login');
});


app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: undefined });
});

app.get('/add_password', (req, res) => {
    res.render('add_password', { password: null });
});

app.post('/add_password', (req, res) => {
    const {name, user, password, comment} = req.body;
    console.log(`Nueva contraseña añadida: ${name}, ${user}, ${password}, ${comment}`);
    res.redirect('/dashboard');
});

app.get('/gen_password', (req, res) => {
    res.render('gen_password', { password: null });
});

app.post('/gen_password', (req, res) => {
    const { length, numeric, uppercase, lowercase, special } = req.body;

    const genPassword = generatePassword.generate({
        length: parseInt(length),
        numbers: !!numeric,
        uppercase: !!uppercase,
        lowercase: !!lowercase,
        symbols: !!special,
        excludeSimilarCharacters: true
    });

    res.render('add_password', {password: genPassword});
});


module.exports = app;