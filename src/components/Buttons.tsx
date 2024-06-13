import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styles from "./styles/buttons.module.css";
import Button from "./Button";

const Buttons: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className={styles.buttons}>
      <Link to={`/resources/${id}/role-eligibility`} className={styles.buttons}>
        <Button active={isActive("role-eligibility")}>Role Eligibility</Button>
      </Link>
      <Link to={`/resources/${id}/skills`} className={styles.buttons}>
        <Button active={isActive("skills")}>Skills</Button>
      </Link>
    </div>
  );
};

export default Buttons;
