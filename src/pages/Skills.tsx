import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skill } from "../types";
import {
  getResourceSkills,
  getSkills,
  addSkillToResource,
  deleteSkillFromResource,
} from "../handlers/apiHandlers";
import styles from "./skills.module.css";
import Button from "../components/Button";
import ClipLoader from "react-spinners/ClipLoader";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resourceSkills, setResourceSkills] = useState<Skill[]>([]);
  const [updatingSkillId, setUpdatingSkillId] = useState<number | null>(null);
  const [showAcquiredSkills, setShowAcquiredSkills] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
        setError("Error fetching skills.");
      } finally {
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
        setError("Error fetching resource skills.");
      }
    };

    fetchSkills();
    fetchResourceSkills();
  }, [id]);

  const handleAddSkill = async (id: string, skillId: number) => {
    setUpdatingSkillId(skillId);
    try {
      await addSkillToResource(id, skillId);
      const response = await getResourceSkills(id);
      const data = await response.json();
      setResourceSkills(data);
    } catch (error) {
      console.error("Error adding skill:", error);
      setError("Error adding skill. Please try again.");
    } finally {
      setUpdatingSkillId(null);
    }
  };

  const handleRemoveSkill = async (id: string, skillId: number) => {
    setUpdatingSkillId(skillId);
    try {
      await deleteSkillFromResource(id, skillId);
      const response = await getResourceSkills(id);
      const data = await response.json();
      setResourceSkills(data);
    } catch (error) {
      console.error("Error removing skill:", error);
      setError("Error removing skill. Please try again.");
    } finally {
      setUpdatingSkillId(null);
    }
  };

  const handleRetry = () => {
    setError(null);
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
      {error && (
        <div className={`${styles.skill} ${styles.error}`}>
          <p>{error}</p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      )}
      {resourceSkills && (
        <ul>
          {filteredSkills.map((skill) => (
            <li
              key={skill.id}
              className={`${styles.skill} ${
                isSkillAcquired(skill.id) && styles.acquired
              }`}
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
                  onClick={() => handleRemoveSkill(id ? id : "", skill.id)}
                  disabled={updatingSkillId === skill.id}
                >
                  {updatingSkillId === skill.id ? (
                    <ClipLoader loading={updatingSkillId !== null} size={20} />
                  ) : (
                    "Remove"
                  )}
                </Button>
              ) : (
                <Button
                  transparent
                  onClick={() => handleAddSkill(id ? id : "", skill.id)}
                  disabled={updatingSkillId === skill.id}
                >
                  {updatingSkillId === skill.id ? (
                    <ClipLoader loading={updatingSkillId !== null} size={20} />
                  ) : (
                    "Add"
                  )}
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skills;
