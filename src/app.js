const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const generatePassword = require('generate-password');
const pool = require('./config/db');
const bcrypt = require('bcryptjs');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/public', express.static(path.join(__dirname, '..', 'public'))); 


app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));


app.get('/login', (req, res) => {
    res.render('login', { user: undefined });
});


app.post('/register', async (req, res) => {
    if (!req.body) {
    return res.status(400).send('No data received');
    }
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
    return res.send('Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (email, password) VALUES ($1, $2)';
        await pool.query(query, [email, hashedPassword]);

        console.log(`User registered: ${email}`);
        res.redirect('/login');
    } catch (err) {
    console.error('Registration error:', err);

    if (err.code === '23505') {  
        return res.send('Error: This email is already registered.');
    }

    res.send('Registration failed: ' + err.message);
    }
});


app.get('/register', (req, res) => {
    res.render('register', { user: undefined });
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.send('User not found');
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.send('Incorrect password');
        }

        req.session.userId = user.id;
        res.redirect('/dashboard');

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Server error');
    }
});



app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/dashboard', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    try {
        const result = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];

        res.render('dashboard', { user });
    } catch (err) {
        console.error('Error al obtener el usuario:', err.message);
        res.status(500).send('Server error');
    }
});


app.get('/add_password', (req, res) => {
    res.render('add_password', { password: null });
});

app.post('/add_password', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send("Unauthorized: no session.");
    }

    const { name, user, password, comment } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO credentials (name, username, password, comment, user_id)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [name, user, hashedPassword, comment, userId]);

        console.log(`Credencial añadida: ${name} - ${user}`);
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error al guardar credencial:', err.message);
        res.status(500).send('Error al guardar la credencial');
    }
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