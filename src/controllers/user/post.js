const createPost = async (req, res) => {
    const {
      session,
      db: { User },
      body: { user_id, details, requirement, specifications, daily_routine, additional_requests},
    } = req;
  
    // TODO: create a post request  
    //on submit sends the questionaire data to db
    const updateInfo = await User.update({
        q1_disability_info:details,
        q2_functional_requirements:requirement,
        q3_physical_specifications:specifications,  
        q4_lifestyle_usage:daily_routine,
        q5_additional:additional_requests
    });
    
  
    res.send(updateInfo);
  };
  
  module.exports = createPost;
  