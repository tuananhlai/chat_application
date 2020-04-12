const Faker = require("faker");
let fakeUsers = [];
for (let i = 0; i < 10; i++) {
  fakeUsers.push({
    name: Faker.name.findName(),
    email: Faker.internet.email(),
    password: "password"
  });
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert(fakeUsers);
    });
};
