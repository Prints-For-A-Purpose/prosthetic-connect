import { fetchHandler, getPostOptions, deleteOptions } from "../utils";

const baseUrl = "/api/skills/";

export const createSkill = async ({ user_id, skill_name }) =>
  fetchHandler(`${baseUrl}/${user_id}`, getPostOptions({ skill_name }));

export const getSkillsByUserID = async (id) => {
  // user_id
  const [comments] = await fetchHandler(`${baseUrl}/${id}`);
  return comments || [];
};

export const deleteSkillById = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);
