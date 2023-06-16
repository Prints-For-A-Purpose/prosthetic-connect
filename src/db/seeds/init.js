const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("invitations").del();
  await knex("comments").del();
  await knex("requests").del();
  await knex("users").del();
  await knex("users").insert([
    { id: 1, username: "cool_cat", password_hash: "123", is_fabricator: false },
    { id: 2, username: "l33t-guy", password_hash: "123", is_fabricator: true },
    { id: 3, username: "wowow", password_hash: "123", is_fabricator: false },
  ]);
  await knex("requests").insert([
    {
      id: 1,
      user_id: 1,
      request_status: "Active",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
    },
    {
      id: 2,
      user_id: 3,
      request_status: "Active",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
    },
    {
      id: 3,
      user_id: 3,
      request_status: "In progress",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
    },
  ]);
  await knex("comments").insert([
    {
      id: 1,
      request_id: 1,
      user_id: 1,
      content: "my name is jeff",
      is_public: true,
    },
    {
      id: 2,
      request_id: 2,
      user_id: 2,
      content: "jjkj",
      is_public: true,
    },
    {
      id: 3,
      request_id: 3,
      user_id: 3,
      content: "mi nombre is jeff",
      is_public: false,
    }
  ])
  await knex("invitations").insert([
    {
      id: 1,
      request_id: 1,
      user_id: 1
    },
    {
      id: 2,
      request_id: 2,
      user_id: 2
    },
    {
      id: 3,
      request_id: 3,
      user_id: 3
    }
  ])
}
  
