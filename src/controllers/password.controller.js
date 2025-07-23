const bcrypt = require('bcryptjs');
const Password = require('../models/Password');

exports.addPassword = async (req, res) => {
    const { site, username, password } = req.body;

    try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPassword = new Password({
        user: req.session.userId, 
        site,
        username,
        password: hashedPassword
    });

    await newPassword.save();
    res.redirect('/dashboard');
} catch (err) {
    console.error(err);
    res.status(500).send('Error saving password');
}
};
