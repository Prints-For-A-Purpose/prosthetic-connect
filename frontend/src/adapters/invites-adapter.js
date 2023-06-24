import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
  deleteOptions,
} from "../utils";

const baseUrl = "/api/invites";

export const sendInvite = async ({ id }) =>
  fetchHandler(`${baseUrl}/${id}`, getPostOptions());

export const archiveRequest = async (id) =>
  fetchHandler(`${baseUrl}/archive/${id}`, deleteOptions);

export const startProject = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);

export const getPendingInvites = async (id) =>
  fetchHandler(`${baseUrl}/pending/${id}`);

export const getActiveFabricators = async (id) =>
  fetchHandler(`${baseUrl}/${id}`);

export const canInviteThyself = async (id) =>
  fetchHandler(`${baseUrl}/can-invite/${id}`);

export const isAnActiveFabricator = async (id) =>
  fetchHandler(`${baseUrl}/authorized/${id}`);

export const updateInviteStatus = async ({ status, user_id, id }) => {
  fetchHandler(
    `${baseUrl}/change-status/${id}`,
    getPatchOptions({ status, user_id })
  );
};
