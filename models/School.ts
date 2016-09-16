export = function (sequelize, DataTypes) {
    var School = sequelize.define('School', {
	name: {
	    type: DataTypes.STRING
	},
	alias: {
	    type: DataTypes.STRING,
	    unique: true
	},
	year: {
	    type: DataTypes.STRING
	}
    });

    return School;
}
