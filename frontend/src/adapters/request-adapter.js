import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/requests";

// export const createUser = async ({ username, password, is_fabricator }) =>
//   fetchHandler(baseUrl, getPostOptions({ username, password, is_fabricator }));

export const getAllRequests = async () => {
  const [requests] = await fetchHandler(baseUrl);
  return requests || [];
};

export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) =>
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
