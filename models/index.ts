var Sequelize = require('sequelize');

var db = {
    sequelize: new Sequelize('visitas', 'username', 'password', {dialect: 'sqlite', storage: 'visitas.db'}),
    Sequelize: Sequelize,
    User: null,
    School: null,
    Attend: null
};

var models = [
    'User',
    'School',
    'Attend'
];

// Load models
models.forEach(function(model) {
    db[model] = db.sequelize.import(__dirname + '/' + model);
});

// Define relationships
db.User.belongsTo(db.School);
db.Attend.belongsTo(db.School);

db.School.hasMany(db.User);
db.School.hasMany(db.Attend);


export = db;
