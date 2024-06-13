// Home.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resource, Role } from "../types";
import {
  getResource,
  getResourceRoleEligibility,
} from "../handlers/apiHandlers";
import styles from "./roleEligibility.module.css";
import Buttons from "../components/Buttons";

const Eligibility: React.FC = () => {
  const [resource, setResource] = useState<Resource>();
  const [availability, setAvailability] = useState<Role[]>([]);
  const [eligible, setEligible] = useState<boolean>(true);
  const [skills, setSkills] = useState<boolean>(false);
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

  const toggleStates = () => {
    setEligible((prevEligible) => !prevEligible);
    setSkills((prevSkills) => !prevSkills);
  };

  return (
    <>
      {resource && (
        <div>
          <h1>{resource.name}</h1>

          <Buttons activeButton="eligibility" />

          {eligible && (
            <div>
              {availability &&
                availability.map((role) => <li key={role.id}>{role.name}</li>)}
            </div>
          )}

          {skills && <div>Skills!</div>}
        </div>
      )}
    </>
  );
};

export default Eligibility;
