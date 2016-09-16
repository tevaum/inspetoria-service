import fs = require('fs');
import https = require('https');
import app = require('./app');
import models = require('./models');

app.set('models', models);

var opts = {
     key: fs.readFileSync('cert/prov-key.pem'),
    cert: fs.readFileSync('cert/prov-crt.pem')
};

var port = process.env.PORT || 8080;

models.sequelize.sync().then(() => {
    app.listen(port, '0.0.0.0');
    //https.createServer(opts, app).listen(port, '0.0.0.0');
});
