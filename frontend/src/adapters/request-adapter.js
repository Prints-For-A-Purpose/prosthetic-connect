import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
  deleteOptions,
} from "../utils";

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

export const homePagination = async (id) => {
  const [requests] = await fetchHandler(`${baseUrl}/home/${id}`);
  return requests || [];
};

export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const deleteRequest = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);

export const updateQuestionnaire = async ({
  id,
  q1_disability_info,
  q2_functional_requirements,
  q3_physical_specifications,
  q4_lifestyle_usage,
  q5_additional,
}) =>
  fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      q1_disability_info,
      q2_functional_requirements,
      q3_physical_specifications,
      q4_lifestyle_usage,
      q5_additional,
    })
  );

export const moveStatusProgress = async (id, request_status) => {
  fetchHandler(`${baseUrl}/edit/${id}`, getPatchOptions({ request_status }));
};
