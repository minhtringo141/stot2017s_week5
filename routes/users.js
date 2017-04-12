var express = require('express');
var router = express.Router();
var User = require('./users.model');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/userlist', function(req, res) {
    User.find().exec(function(err, data) {
        res.json(data);
    })
});
router.post('/adduser', function(req, res) {
    User.create(req.body).exec(function(err, data) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

router.delete('/deleteuser/:id', function(req, res) {
    User.findOne({ '_id': req.params.id })
        .exec(function(err, data) {
            if (data) {
                console.log(data);
                data.remove(function(err) {
                    res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
                })
            } else {
                res.json({ status: false, message: 'delete failed!!!' });
            }
        })
});

module.exports = router;