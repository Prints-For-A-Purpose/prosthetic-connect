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

export const getFirstThree = async (id) => {
  const [requests] = await fetchHandler(`${baseUrl}/home/${id}`);
  return requests || [];
};

export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) =>
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
