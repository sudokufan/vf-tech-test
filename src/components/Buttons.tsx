import React from "react";
import styles from "./styles/button.module.css";
import Button from "./Button";
import { ButtonValues } from "../types";

interface ButtonsProps {
  activeButton: ButtonValues;
}

const Buttons: React.FC<ButtonsProps> = ({ activeButton }) => {
  return (
    <div className={styles.buttons}>
      <Button active={activeButton == "eligibility"}>Role Eligibility</Button>
      <Button active={activeButton == "skills"}>Skills</Button>
    </div>
  );
};

export default Buttons;
