module.exports = {
    development: {
    url: 'postgres://postgres:PASSWORD@localhost:5432/riverwalk',
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
  },
    production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
  },
    staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
  },
    test: {
    url: process.env.DATABASE_URL || 'postgres://postgres:PASSWORD@localhost:5432/riverwalk',
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
  }
};