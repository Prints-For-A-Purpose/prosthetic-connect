import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/invites";

// export const createUser = async ({ username, password, is_fabricator }) =>
//   fetchHandler(baseUrl, getPostOptions({ username, password, is_fabricator }));

// // eating errors here for simplicity
// export const getAllUsers = async () => {
//   const [users] = await fetchHandler(baseUrl);
//   return users || [];
// };

export const getPendingInvites = async (id) =>
  fetchHandler(`${baseUrl}/pending/${id}`);

export const getActiveFabricators = async (id) =>
  fetchHandler(`${baseUrl}/${id}`);

export const updateInviteStatus = async ({ status, user_id, id }) => {
  fetchHandler(
    `${baseUrl}/change-status/${id}`,
    getPatchOptions({ status, user_id })
  );
};

//status, user_id, request_id

// export const updatePayment = async ({ id, payment_url }) =>
//   fetchHandler(
//     `${baseUrl}/payment/${id}`,
//     getPatchOptions({ id, payment_url })
//   );

// export const getUserRequests = async (id) => {
//   const [requests] = await fetchHandler(`${baseUrl}/${id}/requests`);
//   return requests || [];
// };
