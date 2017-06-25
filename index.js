var baseDep = require('./base_dependencies');
var bodyParser = require('body-parser');

var app = baseDep.express();
var router = baseDep.express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow Cross Origin Requests
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Require other files from the routes files
var users = require('./routes/users.js');

// Use all routes here
app.use('/users', users);

app.all('*', function (req, res) {
    res.json("Invalid endpoint route");
});

app.listen(process.env.PORT || 3000);
