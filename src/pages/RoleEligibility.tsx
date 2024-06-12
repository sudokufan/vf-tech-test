// Home.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resource, Role } from "../types";
import { getResource, getResourceRoleEligibility } from "../handlers/apiHandlers";
import Button from "../components/Button";
import styles from "./roleEligibility.module.css"

const RoleEligibility: React.FC = () => {
  const [resource, setResource] = useState<Resource>();
  const [availability, setAvailability] = useState<Role[]>([]);
  const [eligible, setEligible] = useState<boolean>(true);
  const [skills, setSkills] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
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
}, [id]);


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
    fetchAvailability();
  }, [id]);

  const toggleStates = () => {
    setEligible(prevEligible => !prevEligible);
    setSkills(prevSkills => !prevSkills);
  };


  return (
    <>
      {resource && 
      <div>
        <h1>{resource.name}</h1>
        
        <div className={styles.buttons}>
        <Button active={eligible} onClick={() => toggleStates()}>Role Eligibility</Button>
        <Button active={skills} onClick={() => toggleStates()}>Skills</Button>
        </div>
        
        {eligible && 
        <div>{availability && availability.map((role) => (
          <li key={role.id}>
            {role.name}
            </li>
        ))}</div>
        }

{skills && 
        <div>Skills!</div>
        }

      </div>
      }
    </>
  );
}

export default RoleEligibility;