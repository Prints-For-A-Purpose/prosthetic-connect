const knex = require("../../db/knex");

const createRequest = async (req, res) => {
    const {
        session,
        db: { Request },
        body: { details, requirement, specifications, daily_routine, additional_requests },
    } = req;

    console.log(req.body);    // TODO: create a post request  
    //on submit sends the questionaire data to db
    const updateInfo = await knex("requests").insert({
        //user_id: session.userId,
        q1_disability_info: details,
        q2_functional_requirements: requirement,
        q3_physical_specifications: specifications,
        q4_lifestyle_usage: daily_routine,
        q5_additional: additional_requests
    });



    res.send(updateInfo);
};

module.exports = createRequest;
