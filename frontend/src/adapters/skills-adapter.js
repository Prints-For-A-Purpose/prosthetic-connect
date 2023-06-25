import { fetchHandler, getPostOptions, deleteOptions } from "../utils";

const baseUrl = "/api/skills/";

export const createSkill = async (user_id, skill_name) =>
  fetchHandler(`${baseUrl}/${user_id}`, getPostOptions({ skill_name }));

export const getSkillsByUserID = async (id) => {
  const [skills] = await fetchHandler(`${baseUrl}/${id}`);
  return skills || [];
};

export const deleteSkillById = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);
