module.exports.pgConfig = {
    user: 'postgres',
    database: 'riverwalk',
    password: 'PASSWORD',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

module.exports.algorithm = 'aes-256-ctr';
module.exports.password = 'PASSWORD';