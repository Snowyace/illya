module.exports = {
    cookieSecret: 'your cookie secret goes here',
    mongo: {
        development: {
            connectionString: 'mongodb://snowyace:1234@ds029803.mongolab.com:29803/illya',
        },
        production: {
            connectionString: 'mongodb://<dbuser>:1234@ds029803.mongolab.com:29803/illya',
        }
    }
};



