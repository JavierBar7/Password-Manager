// app.js

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));


app.use('/public', express.static(path.join(__dirname, '..', 'public'))); 

app.use(express.urlencoded({ extended: true }));


// LOGIN
app.get('/login', (req, res) => {
    res.render('login', { user: undefined });
});

// REGISTRO
app.get('/register', (req, res) => {
    res.render('register', { user: undefined });
});

// Ruta POST para manejar el login (ejemplo básico)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Intento de Login: Email - ${email}, Contraseña - ${password}`);
    res.send('Login exitoso (esto es un placeholder)');
});

// Ruta POST para manejar el registro (ejemplo básico)
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log(`Intento de Registro: Usuario - ${username}, Email - ${email}, Contraseña - ${password}`);
    res.send('Registro exitoso (esto es un placeholder)');
});

// Redireccionar al login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log('Accede al login en http://localhost:3000/login');
});