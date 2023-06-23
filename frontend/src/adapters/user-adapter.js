import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/users";

export const createUser = async ({ username, password, is_fabricator }) =>
  fetchHandler(baseUrl, getPostOptions({ username, password, is_fabricator }));

// eating errors here for simplicity
export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));

export const updatePayment = async ({ id, payment_url }) =>
  fetchHandler(
    `${baseUrl}/payment/${id}`,
    getPatchOptions({ id, payment_url })
  );

export const getUserRequests = async (id) => {
  const [requests] = await fetchHandler(`${baseUrl}/${id}/requests`);
  return requests || [];
};
