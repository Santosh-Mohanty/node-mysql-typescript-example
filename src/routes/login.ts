import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
const username = 'sample';
const password = 'sample';
router.post('/', (req, res, next) => {
    let p_username = req.body.username;
    let p_password = req.body.password;
    if (p_username == username && p_password == password) {
        var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, username: username }, 'secretkey', (err, token) => {
            res.send({
                ok: true,
                message: 'Login successful',
                token
            });
        });
    } else {
        res.send({
            ok: false,
            message: 'Username or password incorrect'
        });
    }
});
export = router;
