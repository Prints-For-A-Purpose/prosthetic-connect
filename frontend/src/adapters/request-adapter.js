import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/requests";

export const createRequests = async ({
  q1_disability_info,
  q2_functional_requirements,
  q3_physical_specifications,
  q4_lifestyle_usage,
  q5_additional,
}) =>
  fetchHandler(
    baseUrl,
    getPostOptions({
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
    })
  );
//postman
// {
//   "q1_disability_info": "sdasad",
//   "q2_functional_requirements": "sdasad",
//   "q3_physical_specifications": "sdasad",
//   "q4_lifestyle_usage": "sdasad",
//   "q5_additional": "sdasad"
// }
export const getAllRequests = async () => {
  const [requests] = await fetchHandler(baseUrl);
  return requests || [];
};

export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) =>
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
