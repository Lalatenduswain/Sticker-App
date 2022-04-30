const auth = require('./auth');
const user = require('./user');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Sahi kam kar raha hai sab."});
    });
    app.use('/auth', auth);
    app.use('/user', user);
};