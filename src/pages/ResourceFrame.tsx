import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import { Resource } from "../types";
import { getResource } from "../handlers/apiHandlers";
import Buttons from "../components/Buttons";
import Skills from "./Skills";
import RoleEligibility from "./RoleEligibility";

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

  return (
    <>
      <div>
        <h1>{resource && resource.name}</h1>
        <Buttons />
      </div>
      <Routes>
        <Route path="" element={<Navigate to="role-eligibility" />} />
        <Route path="role-eligibility" element={<RoleEligibility />} />
        <Route path="skills" element={<Skills />} />
      </Routes>
    </>
  );
};

export default ResourceFrame;
