import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/comments";

export const createComment = async ({ request_id, content, is_public }) =>
  fetchHandler(baseUrl, getPostOptions({ request_id, content, is_public }));

export const getComments = async (id) => {
  const [comments] = await fetchHandler(`${baseUrl}/request/${id}`);
  return comments || [];
};

// export const getRequest = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateComment = async ({ id, user_id, content }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ user_id, content }));
