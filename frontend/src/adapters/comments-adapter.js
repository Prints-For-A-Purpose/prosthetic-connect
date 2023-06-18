import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/comments";

// export const createUser = async ({ username, password, is_fabricator }) =>
//   fetchHandler(baseUrl, getPostOptions({ username, password, is_fabricator }));

export const getComments = async (id) => {
  const [comments] = await fetchHandler(`${baseUrl}/${id}`);
  return comments || [];
};

// export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateUsername = async ({ id, username }) =>
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
