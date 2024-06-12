const baseURL = "http://localhost:4000"

export const getResources = () => fetch(`${baseURL}/resources`)
export const getSkills = () => fetch(`${baseURL}/skills`)

export const getResource = (id: string) =>
  fetch(`${baseURL}/resources/${id}`)

export const getResourceSkills = (id: string) =>
  fetch(`${baseURL}/resources/${id}/skills`)

export const getResourceRoleEligibility = (id: string) =>
    fetch(`${baseURL}/resources/${id}/role-eligibility`)

export const addSkillToResource = (resourceId: string, skillId: number) =>
    fetch(`${baseURL}/resources/${resourceId}/create-skill`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: skillId })
    })

export const deleteSkillFromResource = (resourceId: string, skillId: number) =>
    fetch(`${baseURL}/resources/${resourceId}/skill/${skillId}`, {
        method: 'DELETE'
    })