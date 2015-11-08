var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fillseat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('connected');
});

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    groupId: [String],
    isConfirmed: Boolean
});

var GroupSchema = new mongoose.Schema({
    users: [String],
    flightID: String,
    name: String,
    isConfirmed: Boolean
});

var FlightSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    departTime: Date,
    price: Number,
    onboard: Number,
    emptyy: Number
});

var User = mongoose.model('User', UserSchema);
var Group = mongoose.model('Group', GroupSchema);
var Flight = mongoose.model('Flight', FlightSchema);


/* GET home page. */
router.get('/', function (req, res, next) {
    var flight_1 = new Flight({
        origin: 'CAS',
        destination: 'LAS',
        Date: Date.now(),
        price: 200,
        onboard: 352,
        emptyy: 62
    });
    flight_1.save(function (err) {
        if (err) console.log(err);
    });

    res.render('index', {
        title: 'Express'
    });
});

router.post('/insert', function (req, res, next) {
    var p_date = new Date();
    p_date.setHours(p_date.getHours() + 7);

    var src = req.body.src;
    var des = req.body.des;
    var price = req.body.price;
    var onboard = req.body.onboard;
    var emptyy = req.body.emptyy;
    /*console.log(Math.abs(p_date.getTime() - pp_date.getTime()) / 3600000);*/
    console.log(p_date);

    var flight_1 = new Flight({
        origin: src,
        destination: des,
        departTime: new Date(),
        price: price,
        onboard: onboard,
        emptyy: emptyy
    });
    flight_1.save(function (err, flight) {
        if (err) {
            console.log(err);
        } else {
            console.log('got it');
            res.send(JSON.stringify(flight));
        }
    });
});


router.post('/getDeals', function (req, res, next) {
    var src = req.body.src;
    var des = req.body.des;
    var qty = req.body.qty;

    console.log(src, des, qty);
    var finalA = [];
    Flight.find({
        origin: src,
        destination: des
    }, function (err, flights) {
        if (err) {
            console.log('we broke it.');
        } else {
            var dataSend = [];
            var curr = new Date();
            flights.forEach(function (f, index) {
                var current_date = new Date();
                var fifteenP = ((f.emptyy / f.onboard) * 100);
                console.log((f.price));
                if (Math.abs((f.departTime).getHours() - curr.getHours()) <= 7) {
                    if (fifteenP <= 15 || (f.emptyy >= 10)) {
                        var new_price = Math.round(f.price * (0.93 - (qty / fifteenP)));
                        var data = {
                            "origin": f.origin,
                            "destination": f.destination,
                            "date": (f.departTime).toDateString() + " at " + ((f.departTime).getHours() % 12) + ":" + (f.departTime).getMinutes(),
                            "originalPrice": f.price,
                            "price": new_price,
                            "empty": f.emptyy
                        };
                        dataSend.push(data);
                    }
                }
            });
            res.send(JSON.stringify(dataSend));
        }
    });

});

router.post('/register', function (req, res, next) {
    var user = new User({
        email: req.body.e,
        password: req.body.p,
        name: "",
        isConfirmed: false,
        flight: "",
        group: ""
    });
    user.save(function (err, usr) {
        if (err) {
            res.status(err.status || 500);
            res.send("Error registering user");
        } else {
            console.log("good");
            res.send(JSON.stringify(usr));
        }
    });
});

router.post('/login', function (req, res, next) {
    console.log("Received: " + req);
    User.find({
            email: req.body.e,
            password: req.body.p
        },
        function (err, users) {
            console.log(users);
            if (err) {
                res.send("Invalid username or password");
            } else {
                res.send("Success!");
            }
        });
});

router.post('/invite', function (req, res, next) {
    console.log(req.body.email[1]);
    // get a user with ID of 1
    // get the user starlord55
    User.find({
        email: req.body.email[0][0]
    }, function (err, user) {
        if (err) throw err;
        // object of the user
        user.groupId = req.body.email[1];
        user.save(function (err) {
            if (err) throw err;
            console.log('User successfully updated!');
        });
    });

    res.send('invite');
});

module.exports = router;