import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
  deleteOptions,
} from "../utils";

const baseUrl = "/api/comments";

export const createComment = async ({ request_id, content, is_public }) =>
  fetchHandler(baseUrl, getPostOptions({ request_id, content, is_public }));

export const getComments = async (id, page) => {
  const [comments] = await fetchHandler(`${baseUrl}/request/${id}/${page}`);
  return comments || [];
};

export const getPrivateComments = async (id, page) => {
  const [comments] = await fetchHandler(
    `${baseUrl}/private/request/${id}/${page}`
  );
  return comments || [];
};

export const deleteComment = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);

export const updateComment = async ({ id, user_id, content }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ user_id, content }));
