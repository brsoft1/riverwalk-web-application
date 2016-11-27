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
                console.error(err);
                // should return response error like 
                return res.status(500).send();
            }
            var emailCheck = "SELECT id from public.user WHERE email=$1";
            client.query(emailCheck, [req.body.email], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                }
                if (result.rowCount > 0) {
                    let user = result.rows[0]
                        // return your user
                    return done(); // always close connection
                } else {
                    var sql = "insert into public.user (user_auth_level, email, account_locked, contract) " +
                        "values ('1', $1,'false','false') RETURNING *"
                    client.query(emailInsert, [req.body.email], function(err, result) {
                        if (err) {
                            console.error(err);
                            res.status(500).send();
                            return done(); // always close connection
                        } else {
                            if (result.rowCount > 0) {
                                let user = result.rows[0]
                                    // return your user
                                return done(); // always close connection
                            }
                        }

                    });
                }
            })
        })
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack)
        });
    },
    updateProfile: function(req, res) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                // should return response error like 
                return res.status(500).send();
            }
            // Setup the query
            var updatePersonal = "UPDATE public.user SET business_phone ='" + $1 + "', dob ='" + $2 + "', email ='" + $3 + "', fax_number ='" + $4 + "', first_name ='" + $5 + "', home_phone ='" + $6 + "', last_name='" + $7 + "', middle_name ='" + $8 + "', mobile_phone ='" + $9 + "', ssn ='" + $10 + "' WHERE email='" + $3 + "'";
            console.log(req.body.business_phone, req.body.dob, req.body.email, req.body.fax_number, req.body.first_name, req.body.home_phone, req.body.last_name, req.body.middle_name, req.body.mobile_phone, req.body.ssn);

            client.query(updatePersonal, [req.body.business_phone, req.body.dob, req.body.email, req.body.fax_number, req.body.first_name, req.body.home_phone, req.body.last_name, req.body.middle_name, req.body.mobile_phone, req.body.ssn], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                } else {
                    if (result.rowCount > 0) {
                        let user = result.rows[0]
                            // return your user
                        return done(); // always close connection
                    }
                }

            });
        })
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack)
        });
    }
};
