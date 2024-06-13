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
// import Spinner from "./Spinner";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resourceSkills, setResourceSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState<boolean>(true);
  const [loadingResourceSkills, setLoadingResourceSkills] =
    useState<boolean>(true);
  const [updatingSkillId, setUpdatingSkillId] = useState<number | null>(null);
  const [showAcquiredSkills, setShowAcquiredSkills] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSkills = async () => {
      setLoadingSkills(true);
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
        setLoadingSkills(false);
      }
    };

    const fetchResourceSkills = async () => {
      if (!id) {
        console.error("Resource ID is undefined.");
        return;
      }
      setLoadingResourceSkills(true);
      try {
        const response = await getResourceSkills(id);
        const data = await response.json();
        setResourceSkills(data);
      } catch (error) {
        console.error("Error fetching resource skills:", error);
        setError("Error fetching resource skills.");
      } finally {
        setLoadingResourceSkills(false);
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
    <>
      <div>
        <h1>Skills!</h1>
        <label>
          <input
            type="checkbox"
            checked={showAcquiredSkills}
            onChange={() => setShowAcquiredSkills(!showAcquiredSkills)}
          />
          Only show acquired skills
        </label>
        {error && (
          <div>
            <p>{error}</p>
            <button onClick={handleRetry}>Retry</button>
          </div>
        )}
        {loadingSkills || loadingResourceSkills ? (
          // <Spinner />
          <div>loading</div>
        ) : (
          <ul>
            {filteredSkills.map((skill) => (
              <li key={skill.id} className={styles.skill}>
                <div>
                  <strong>{skill.name}</strong>
                  <ul>
                    {skill.requiredForRoles.map((role) => (
                      <li key={role.id}>{role.name}</li>
                    ))}
                  </ul>
                  {isSkillAcquired(skill.id) ? (
                    <Button
                      onClick={() => handleRemoveSkill(id ? id : "", skill.id)}
                      disabled={updatingSkillId === skill.id}
                    >
                      {updatingSkillId === skill.id ? (
                        // <Spinner />
                        <div>loading</div>
                      ) : (
                        "Remove"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddSkill(id ? id : "", skill.id)}
                      disabled={updatingSkillId === skill.id}
                    >
                      {updatingSkillId === skill.id ? (
                        // <Spinner />
                        <div>loading</div>
                      ) : (
                        "Add"
                      )}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Skills;
