// Home.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Resource, Role } from "../types";
import {
  getResource,
  getResourceRoleEligibility,
} from "../handlers/apiHandlers";
import styles from "./roleEligibility.module.css";
import Buttons from "../components/Buttons";

const RoleEligibility: React.FC = () => {
  const [resource, setResource] = useState<Resource>();
  const [availability, setAvailability] = useState<Role[]>([]);
  const [eligible, setEligible] = useState<boolean>(true);
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

  return (
    <>
      {resource && (
        <div>
          <h1>{resource.name}</h1>

          <Link to={`/skills/${id}`} className={styles.buttons}>
            <Buttons activeButton="eligibility" />
          </Link>

          <div>
            {availability &&
              availability.map((role) => <li key={role.id}>{role.name}</li>)}
          </div>
        </div>
      )}
    </>
  );
};

export default RoleEligibility;
