/**
 * Created by tunde on 5/21/17.
 */
var baseDep = require('../base_dependencies');
var passwordHash = require('bcrypt-nodejs');

var router = baseDep.express.Router();

var userSchema = baseDep.mongoose.Schema({
        firstname: String,
        lastname: String,
        email_address: String,
        password: String,
        phone_number: String,
        username: String,
        usertype: String,
        status: {type: String, default: baseDep.constants.ACTIVE}
    },
    {
        timestamps: true
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });


var User = baseDep.mongoose.model('User', userSchema);

var token = baseDep.jwt.sign({
    name: User.email_address,
    password: User.password
}, baseDep.env.secret, {expiresIn: 24 * 60 * 60});

router.post('/auth', function (req, res) {
    var params = req.body;
    User.findOne({email_address: params.email_address}, function (err, User) {
        if (User) {
            passwordHash.compare(params.password, User.password, function (err, isMatch) {
                if (isMatch) {
                    res.json(baseDep.responses.loginSuccessful(token));
                } else {
                    res.json(baseDep.responses.wrongLoginDetails);
                }
            });
        } else {
            res.json(baseDep.responses.wrongLoginDetails);
        }
    })
});


router.post('/register', function (req, res) {

    var params = req.body;
    var newUser = new User({
        email_address: params.email_address,   // required
        password: passwordHash.hashSync(params.password),      // required
        phone_number: params.phone_number,  // required
        firstname: params.firstname,    // required
        lastname: params.lastname,  // required
        username: params.username
    });

    User.findOne({email_address: params.email_address}, function (err, User) {
        if (!User) {
            newUser.save(function (err, newUser) {
                if (err || !newUser.user_type || !newUser.email_address || !newUser.password || !newUser.phone_number || !newUser.firstname || !newUser.lastname) {
                    res.json(newUser);
                } else {
                    res.json(baseDep.responses.registrationSuccessful(token));
                }
            });
        } else {
            res.json(baseDep.responses.userExists);
        }
    });

});

router.use(function (req, res, next) {
    var retrievedToken = baseDep.utils.getToken(req);
    if (retrievedToken) {
        baseDep.jwt.verify(retrievedToken, baseDep.env.secret, function (err, decoded) {
            if (err) {
                res.json(baseDep.responses.tokenAuthenticateFailure);
            } else {
                next();
            }
        });
    } else {
        res.json(baseDep.responses.noTokenProvided);
    }
}); // Validates token first before going to any endpoint below

router.get('/', function (req, res) {
    User.find({}, function (err, Users) {
        res.json({data: Users, token: baseDep.utils.getToken(req)});
    });
});


module.exports = router;