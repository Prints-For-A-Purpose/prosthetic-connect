const User = require("../models/user");
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
    { username: "cool_csat", password_hash: "123", is_fabricator: false },
    { username: "l33ts-guy", password_hash: "123", is_fabricator: true },
    { username: "wowow", password_hash: "dsa", is_fabricator: false },
    { username: "cdadascat", password_hash: "sda", is_fabricator: true },
    { username: "ldas3s3tas-guy", password_hash: "123d", is_fabricator: true },
    { username: "sdssd", password_hash: "1as23", is_fabricator: false },
    { username: "coodsdl_cat", password_hash: "12sa3", is_fabricator: false },
    { username: "dssa-guy", password_hash: "12dsa3", is_fabricator: true },
    { username: "wowdsssssow", password_hash: "12sda3", is_fabricator: false },
  ]);
  await knex("requests").insert([
    {
      user_id: 1,
      request_status: "Pending",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
      fabricators_needed: 3,
    },
    {
      user_id: 3,
      request_status: "Documentation",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
      fabricators_needed: 2,
    },
    {
      user_id: 3,
      request_status: "Testing",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
      fabricators_needed: 3,
    },
    {
      user_id: 1,
      request_status: "Iteration",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
      fabricators_needed: 1,
    },
    {
      user_id: 3,
      request_status: "Planning",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
      fabricators_needed: 2,
    },
    {
      user_id: 3,
      request_status: "Design",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
      fabricators_needed: 3,
    },
    {
      user_id: 1,
      request_status: "Planning",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
      fabricators_needed: 3,
    },
    {
      user_id: 3,
      request_status: "Design",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
      fabricators_needed: 2,
    },
    {
      user_id: 3,
      request_status: "Archived",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
      fabricators_needed: 1,
    },
    {
      user_id: 1,
      request_status: "Review",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
      fabricators_needed: 3,
    },
    {
      user_id: 3,
      request_status: "Development",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
      fabricators_needed: 1,
    },
    {
      user_id: 3,
      request_status: "Development",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
      fabricators_needed: 2,
    },
    {
      user_id: 1,
      request_status: "Pending",
      q1_disability_info: "cerebral palsy",
      q2_functional_requirements: "For easier eating with utensils.",
      q3_physical_specifications: "7 inch hands",
      q4_lifestyle_usage:
        "I'd need it 3 times a day for eating and it must be safe for washing.",
      fabricators_needed: 3,
    },
    {
      user_id: 3,
      request_status: "Deployment",
      q1_disability_info: "blindness",
      q2_functional_requirements:
        "To know understand the layout of my new school.",
      q3_physical_specifications: "Must fit in a medium sized book bag.",
      q4_lifestyle_usage: "I will use to navigate myself everyday at school.",
      q5_additional: "I will need one for 2 different floors",
      fabricators_needed: 2,
    },
    {
      user_id: 3,
      request_status: "Deployment",
      q1_disability_info: "craniofacial deformity",
      q2_functional_requirements:
        "I need glasses frames that can stay on my face.",
      q3_physical_specifications: "I am missing my left ear.",
      q4_lifestyle_usage: "It would be for daily use to see better.",
      fabricators_needed: 2,
    },
  ]);
  await knex("comments").insert([
    {
      request_id: 1,
      user_id: 1,
      content: "my ndasdasame is jeff",
      is_public: true,
    },
    {
      request_id: 2,
      user_id: 2,
      content: "jjkj",
      is_public: true,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nodasdambre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nomdasdabre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nomadasdbre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nombre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nombre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nombre is jeff",
      is_public: false,
    },
    {
      request_id: 3,
      user_id: 3,
      content: "mi nocdasdambre is jeff",
      is_public: false,
    },
  ]);
  await knex("invitations").insert([
    {
      request_id: 1,
      user_id: 1,
      status: "rejected",
    },
    {
      request_id: 2,
      user_id: 2,
      status: "pending",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "rejected",
    },
    {
      request_id: 4,
      user_id: 1,
      status: "accepted",
    },
    {
      request_id: 5,
      user_id: 2,
      status: "pending",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "rejected",
    },
    {
      request_id: 1,
      user_id: 2,
      status: "pending",
    },
    {
      request_id: 2,
      user_id: 2,
      status: "accepted",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "pending",
    },
    {
      request_id: 1,
      user_id: 1,
      status: "pending",
    },
    {
      request_id: 2,
      user_id: 2,
      status: "rejected",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "pending",
    },
    {
      request_id: 1,
      user_id: 1,
      status: "accepted",
    },
    {
      request_id: 2,
      user_id: 2,
      status: "rejected",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "pending",
    },
    {
      request_id: 1,
      user_id: 1,
      status: "accepted",
    },
    {
      request_id: 2,
      user_id: 2,
      status: "rejected",
    },
    {
      request_id: 3,
      user_id: 3,
      status: "pending",
    },
  ]);
};
