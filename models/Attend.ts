export = function (sequelize, DataTypes) {
    var Attend = sequelize.define('Attend', {
	date: {
	    type: DataTypes.DATEONLY
	},
	shift: {
	    type: DataTypes.STRING
	},
    });

    return Attend;
}
