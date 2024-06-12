// Home.tsx
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./home.module.css"

const RoleEligibility: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Resource Details</h1>
      <p>Resource ID: {id}</p>
    </div>
  );
}

export default RoleEligibility;