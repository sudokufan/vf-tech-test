import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skill } from "../types";
import {
  getResourceSkills,
  getSkills,
  addSkillToResource,
  deleteSkillFromResource,
} from "../handlers/apiHandlers";
import styles from "./styles/skills.module.css";
import Button from "../components/Button";
import ClipLoader from "react-spinners/ClipLoader";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resourceSkills, setResourceSkills] = useState<Skill[]>([]);
  const [updatingSkillIds, setUpdatingSkillIds] = useState<number[]>([]);
  const [showAcquiredSkills, setShowAcquiredSkills] = useState<boolean>(false);
  const [errorId, setErrorId] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        const data = await response.json();
        setSkills(
          data.sort((a: Skill, b: Skill) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchResourceSkills = async () => {
      if (!id) {
        console.error("Resource ID is undefined.");
        return;
      }

      try {
        const response = await getResourceSkills(id);
        const data = await response.json();
        setResourceSkills(data);
      } catch (error) {
        console.error("Error fetching resource skills:", error);
      }
    };

    fetchSkills();
    fetchResourceSkills();
  }, [id]);

  const handleAddSkill = async (id: string, skillId: number) => {
    setUpdatingSkillIds((prev) => [...prev, skillId]);
    try {
      await addSkillToResource(id, skillId);
      const response = await getResourceSkills(id);
      const data = await response.json();
      setResourceSkills(data);
    } catch (error) {
      console.error("Error adding skill:", error);
    } finally {
      setUpdatingSkillIds((prev) => prev.filter((sid) => sid !== skillId));
    }
  };

  const handleRemoveSkill = async (id: string, skillId: number) => {
    setErrorId(null);
    setUpdatingSkillIds((prev) => [...prev, skillId]);
    try {
      await deleteSkillFromResource(id, skillId);
      const response = await getResourceSkills(id);
      const data = await response.json();
      setResourceSkills(data);
    } catch (error) {
      console.error("Error removing skill:", error);
      setErrorId(skillId);
    } finally {
      setUpdatingSkillIds((prev) => prev.filter((sid) => sid !== skillId));
    }
  };

  const isSkillAcquired = (skillId: number) => {
    return resourceSkills.some((skill) => skill.id === skillId);
  };

  const filteredSkills = showAcquiredSkills
    ? skills.filter((skill) => isSkillAcquired(skill.id))
    : skills;

  return (
    <div>
      <label>
        <input
          className={styles.label}
          type="checkbox"
          checked={showAcquiredSkills}
          onChange={() => setShowAcquiredSkills(!showAcquiredSkills)}
        />
        Only show acquired skills
      </label>
      <ul>
        {filteredSkills.map((skill) => (
          <li
            key={skill.id}
            className={`${styles.skill} ${
              isSkillAcquired(skill.id) && styles.acquired
            } ${errorId === skill.id && styles.error}`}
          >
            <div className={styles.info}>
              <div>{skill.name}</div>
              <ul>
                {skill.requiredForRoles.map((role) => (
                  <li key={role.id} className={styles.roleName}>
                    Roles: {role.name}
                  </li>
                ))}
              </ul>
            </div>
            {isSkillAcquired(skill.id) ? (
              <Button
                transparent
                onClick={() => handleRemoveSkill(id || "", skill.id)}
                disabled={updatingSkillIds.includes(skill.id)}
              >
                {updatingSkillIds.includes(skill.id) ? (
                  <ClipLoader loading={true} size={20} />
                ) : errorId ? (
                  "Retry"
                ) : (
                  "Remove"
                )}
              </Button>
            ) : (
              <Button
                transparent
                onClick={() => handleAddSkill(id || "", skill.id)}
                disabled={updatingSkillIds.includes(skill.id)}
              >
                {updatingSkillIds.includes(skill.id) ? (
                  <ClipLoader loading={true} size={20} />
                ) : (
                  "Add"
                )}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
