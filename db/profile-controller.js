var pg = require('pg');
var config = {
    user: 'postgres',
    database: 'riverwalk',
    password: 'PASSWORD',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

function retrieveUser() {

}

module.exports = {
    addAddress: function(req, res) {
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            } // end of error catch while creating pool connection
            var query = client.query("insert into address (street, city, state, zip) " +
                "values ('" + req.body.street + "','" + req.body.city + "','" +
                req.body.state + "','" + req.body.zip + "')"); // create the query
            query.on("end", function(result) {
                client.end();
                res.send('Success');
                res.end();
            }); // handle the query
            done(); // release the client back to the pool
        }); // end of pool connection
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack)
        }); // handle any error with the pool
    }, // End addAddress function

    checkRegister: function(req, res) {
            pool.connect(function(err, client, done) {
                if (err) {
                    return console.error('error fetching client from pool', err);
                } // end of error catch while creating pool connection
                var emailCheck = "SELECT id from public.user WHERE email=" + req.body.email;
                var emailInsert = "insert into public.user (user_auth_level,email,account_locked,contract) " +
                    "values ('1','" + req.body.email + "','false','false')"
                client.query(emailCheck, function(err, result) {
                    if (err) {
                        return console.error(err.message);
                    }

                });
                client.query(emailInsert, function(err, result) {
                    if (err) {
                        return console.error(err.message);
                    }

                });
                done(); // release the client back to the pool
            }); // end of pool connection
            pool.on('error', function(err, client) {
                console.error('idle client error', err.message, err.stack)
            }); // handle any error with the pool
        } // End checkRegister function
};
