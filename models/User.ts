export = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
	name: {
	    type: DataTypes.STRING
	},
	alias: {
	    type: DataTypes.STRING
	},
	email: {
	    type: DataTypes.STRING
	},
	password: {
	    type: DataTypes.STRING
	},
	role: {
	    type: DataTypes.STRING
	},
	facebook_id: {
	    type: DataTypes.STRING
	}
    });

    return User;
}
