const Faker = require("faker");
let fakeSessions = [{
  id: 1,
  name: "general",
  created_at: Faker.date.past()
}];
for (let i = 0; i < 10; i++) {
  fakeSessions.push({
    name: Faker.company.companyName(),
    created_at: Faker.date.past()
  });
}
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("channel")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("channel").insert(fakeSessions);
    });
};
