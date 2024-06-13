import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles/buttons.module.css";
import Button from "./Button";
import { ButtonValues } from "../types";

interface ButtonsProps {
  activeButton: ButtonValues;
}

const Buttons: React.FC<ButtonsProps> = ({ activeButton }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={styles.buttons}>
      <Link to={`/resources/${id}/role-eligibility`} className={styles.buttons}>
        <Button active={activeButton == "eligibility"}>Role Eligibility</Button>
      </Link>
      <Link to={`/resources/${id}/skills`} className={styles.buttons}>
        <Button active={activeButton == "skills"}>Skills</Button>
      </Link>
    </div>
  );
};

export default Buttons;
