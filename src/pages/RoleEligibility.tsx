// Home.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resource, Role } from "../types";
import {
  getResource,
  getResourceRoleEligibility,
} from "../handlers/apiHandlers";
import styles from "./styles/roleEligibility.module.css";

const RoleEligibility: React.FC = () => {
  const [resource, setResource] = useState<Resource | null>(null);
  const [availability, setAvailability] = useState<Role[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!id) {
        console.error("Resource ID is undefined.");
        return;
      }
      try {
        const response = await getResourceRoleEligibility(id);
        const data = await response.json();
        setAvailability(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchResource = async () => {
      if (!id) {
        console.error("Resource ID is undefined.");
        return;
      }
      try {
        const response = await getResource(id);
        const data = await response.json();
        setResource(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResource();
    fetchAvailability();
  }, [id]);

  const eligibleRoles = availability.filter((role) =>
    role.skillsRequired.every((skill) => skill.hasSkill)
  );

  return (
    <div>
      {resource && (
        <>
          <h2 className={styles.header}>
            {resource.name} is eligible for {eligibleRoles.length} role
            {eligibleRoles.length !== 1 ? "s" : ""}
          </h2>
          <ul>
            {availability.map((role) => {
              const acquiredSkills = role.skillsRequired.filter(
                (skill) => skill.hasSkill
              ).length;
              const isEligible = acquiredSkills === role.skillsRequired.length;
              return (
                <li
                  key={role.id}
                  className={`${styles.role} ${isEligible && styles.eligible}`}
                >
                  {role.name}
                  <span>
                    {acquiredSkills} of {role.skillsRequired.length} Required
                    Skills
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default RoleEligibility;
