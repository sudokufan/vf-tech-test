const baseURL = "http://localhost:4000";

async function handleFetchResponse(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${response.status} - ${errorMessage}`);
  }
  return response;
}

export const getResources = () =>
  fetch(`${baseURL}/resources`).then(handleFetchResponse);

export const getSkills = () =>
  fetch(`${baseURL}/skills`).then(handleFetchResponse);

export const getResource = (id: string) =>
  fetch(`${baseURL}/resources/${id}`).then(handleFetchResponse);

export const getResourceSkills = (id: string) =>
  fetch(`${baseURL}/resources/${id}/skills`).then(handleFetchResponse);

export const getResourceRoleEligibility = (id: string) =>
  fetch(`${baseURL}/resources/${id}/role-eligibility`).then(
    handleFetchResponse
  );

export const addSkillToResource = (resourceId: string, skillId: number) =>
  fetch(`${baseURL}/resources/${resourceId}/create-skill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: skillId }),
  }).then(handleFetchResponse);

export const deleteSkillFromResource = (resourceId: string, skillId: number) =>
  fetch(`${baseURL}/resources/${resourceId}/skill/${skillId}`, {
    method: "DELETE",
  }).then(handleFetchResponse);
