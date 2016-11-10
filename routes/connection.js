var objection = require('objection');
var Model = objection.Model;
var Knex = require('knex');

// Initialize knex connection.
var knex = Knex({client: 'sqlite3', connection: {filename: 'example.db'}});

// Give the connection to objection.
Model.knex(knex);

// Create database schema. You should use knex migration api to do this. We
// create it here for simplicity.
var schemaPromise = knex.schema.createTableIfNotExists('Person', function (table) {
  table.integer('id').primary();
  table.string('firstName');
});

// Person model.
function Person() {
  Model.apply(this, arguments);
}

Person.tableName = 'Person';
// Basic ES6 compatible prototypal inheritance.
Model.extend(Person);

schemaPromise.then(function () {
  // Create a person.
  return Person.query().insert({firstName: 'Sylvester'});
}).then(function (person) {
  console.log('created:', person.firstName, 'id:', person.id);
  // Fetch the created person.
  return Person.query().where('firstName', 'Sylvester');
}).then(function (sylvesters) {
  console.log('sylvesters:', sylvesters);
}).then(function () {
  return knex.destroy();
});