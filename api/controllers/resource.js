const db = require("../db");

exports.getResources = async (req, res, next) => {
  await new Promise((res) => setTimeout(() => res(""), 1000));

  const basicInfo = db.resources.map((r) => ({ id: r.id, name: r.name }));

  res.status(200).json(basicInfo);
};

exports.getResource = async (req, res, next) => {
  await new Promise((res) => setTimeout(() => res(""), 500));

  const { id } = req.params;
  const resource = db.resources.find((r) => r.id === id);

  if (resource) {
    if (resource.id === "6b1889d9-d3af-4660-ad84-5491975ddd89") {
      await new Promise((res) => setTimeout(() => res(""), 2000));
    }
    res.status(200).json({
      id: resource.id,
      name: resource.name,
    });
  } else {
    res.status(404).json(resource);
  }
};

exports.getResourceSkills = async (req, res, next) => {
  const { id } = req.params;
  const resource = db.resources.find((r) => r.id === id);

  await new Promise((res) => setTimeout(() => res(""), 1000));
  if (resource && resource.skills) {
    res.status(200).json(resource.skills);
  } else {
    res.status(500).json();
  }
};

exports.getResourceRoleEligibility = async (req, res, next) => {
  const { id } = req.params;
  const resource = db.resources.find((r) => r.id === id);

  if (resource) {
    const roles = db.roles;
    const resourceSkills = resource.skills;

    const eligibility = roles.map((role) => {
      return {
        ...role,
        skillsRequired: role.skillsRequired.map((skill) => {
          return {
            ...skill,
            hasSkill: resourceSkills.find((rs) => rs.id === skill.id) ? true : false,
          };
        }),
      };
    });

    res.status(200).json(eligibility);
  } else {
    res.status(500).json();
  }
};

exports.deleteResourceSkill = async (req, res, next) => {
  const { id, skillId } = req.params;

  if (!id || !skillId) {
    res.status(400).json({ messsage: "id and skillId are required path variables" });
  } else {
    if (id === "6591501d-db06-46b4-9c82-329727e5319a" && Number(skillId) === 5) {
      await new Promise((res) => setTimeout(() => res(""), Math.random() * 3000));
      res.status(500).json({ status: 500, statusText: "Server Error" });
    } else {
      await new Promise((res) => setTimeout(() => res(""), Math.random() * 3000));
      const resourceIndex = db.resources.findIndex((r) => r.id === id);
      db.resources[resourceIndex].skills = db.resources[resourceIndex].skills.filter((skill) => skill.id !== Number(skillId));
      res.status(200).json({ success: true });
    }
  }
};

exports.createResourceSkill = async (req, res, next) => {
  const { id: resourceId } = req.params;
  const { id } = req.body;

  await new Promise((res) => setTimeout(() => res(""), Math.random() * 3000));

  if (!resourceId || !id) {
    res.status(400).json({ messsage: "resource id is a required path variable, skill id and name are required in the body" });
  } else {
    const resourceIndex = db.resources.findIndex((r) => r.id === resourceId);
    const skill = db.skills.filter((skill) => skill.id === id)[0];

    db.resources[resourceIndex].skills.push({ ...skill });

    res.status(200).json({ success: true });
  }
};
