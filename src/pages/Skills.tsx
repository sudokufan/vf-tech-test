// Home.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resource, Role } from "../types";
import { getResource } from "../handlers/apiHandlers";
import styles from "./roleEligibility.module.css";
import Buttons from "../components/Buttons";

const Skills: React.FC = () => {
  const [resource, setResource] = useState<Resource>();
  const [availability, setAvailability] = useState<Role[]>([]);
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

  return (
    <>
      {resource && (
        <div>
          <h1>{resource.name}</h1>

          <Buttons activeButton="skills" />
          <div>Skills!</div>
        </div>
      )}
    </>
  );
};

export default Skills;
