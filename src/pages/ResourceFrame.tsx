import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import { Resource } from "../types";
import { getResource } from "../handlers/apiHandlers";
import Buttons from "../components/Buttons";
import Skills from "./Skills";
import RoleEligibility from "./RoleEligibility";
import styles from "./styles/resourceFrame.module.css";

const ResourceFrame: React.FC = () => {
  const [resource, setResource] = useState<Resource>();
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

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      {resource && (
        <div className={styles.name}>
          <div className={styles.initials}>{getInitials(resource.name)}</div>
          <h1>{resource.name}</h1>
        </div>
      )}
      <div className={styles.main}>
        <Buttons />
        <Routes>
          <Route path="" element={<Navigate to="role-eligibility" />} />
          <Route path="role-eligibility" element={<RoleEligibility />} />
          <Route path="skills" element={<Skills />} />
        </Routes>
      </div>
    </div>
  );
};

export default ResourceFrame;
