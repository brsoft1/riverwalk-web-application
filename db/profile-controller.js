var pg = require('pg');
var crypto = require('crypto');
var config = require('./config');

var pool = new pg.Pool(config.pgConfig);

function encrypt(text) {
    var cipher = crypto.createCipher(config.algorithm, config.password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(config.algorithm, config.password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

// Testing connection here
pool.connect(function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});

pool.on('error', function(err, client) {
    console.error('idle client error', err.message, err.stack)
});

module.exports = {
    checkRegister: function(req, res) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                // should return response error like 
                return res.status(500).send();
            }
            var emailCheck = "select * from public.user WHERE email=$1";
            client.query(emailCheck, [req.body.email], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                }
                if (result.rowCount > 0) {
                    if (result.rows[0].ssn) {
                        result.rows[0].ssn = decrypt(result.rows[0].ssn);
                    }
                    var user = result.rows[0];
                    res.send(user);
                    return done(); // always close connection
                } else {
                    var emailInsert = "insert into public.user (user_auth_level, email, account_locked, contract) " +
                        "values ('1', $1,'false','false') RETURNING *"
                    client.query(emailInsert, [req.body.email], function(err, result) {
                        if (err) {
                            console.error(err);
                            res.status(500).send();
                            return done(); // always close connection
                        } else {
                            if (result.rowCount > 0) {
                                var user = result.rows[0]
                                res.send(user)
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
    addAddress: function(req, res) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                // should return response error like 
                return res.status(500).send();
            }
            var updateAddress = 'update public.user SET street_address = $1, city_address = $2, state_address = $3, zip_address =$4 WHERE email= $5';
            client.query(updateAddress, [req.body.street_address, req.body.city_address, req.body.state_address, req.body.zip_address, req.body.email], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                } else {
                    res.send('Address has been updated!');
                    return done(); // always close connection
                }

            });
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
            var encryptSSN = encrypt(req.body.ssn);
            // Setup the query
            var updatePersonal = 'update public.user SET business_phone = $1, dob = $2, email = $3, fax_number =$4, first_name = $5, home_phone = $6, last_name= $7, middle_name = $8, mobile_phone = $9, ssn = $10 WHERE email= $3 RETURNING *';
            client.query(updatePersonal, [req.body.business_phone, req.body.dob, req.body.email, req.body.fax_number, req.body.first_name, req.body.home_phone, req.body.last_name, req.body.middle_name, req.body.mobile_phone, encryptSSN], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                } else {
                    if (result.rowCount > 0) {
                        if (result.rows[0].ssn) {
                            result.rows[0].ssn = decrypt(result.rows[0].ssn);
                        }
                        var user = result.rows[0];
                        res.send(user);
                        // return your user
                        return done(); // always close connection
                    }
                }

            });
        })
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack)
        });
    },
    updateCreditCard: function(req, res) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                // should return response error like
                return res.status(500).send();
            }
            var encryptSSN = encrypt(req.body.ssn);
            // Setup the query
            var updatePersonal = 'update public.user SET business_phone = $1, dob = $2, email = $3, fax_number =$4, first_name = $5, home_phone = $6, last_name= $7, middle_name = $8, mobile_phone = $9, ssn = $10 WHERE email= $3 RETURNING *';
            client.query(updatePersonal, [req.body.business_phone, req.body.dob, req.body.email, req.body.fax_number, req.body.first_name, req.body.home_phone, req.body.last_name, req.body.middle_name, req.body.mobile_phone, encryptSSN], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return done(); // always close connection
                } else {
                    if (result.rowCount > 0) {
                        if (result.rows[0].ssn) {
                            result.rows[0].ssn = decrypt(result.rows[0].ssn);
                        }
                        var user = result.rows[0];
                        res.send(user);
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
