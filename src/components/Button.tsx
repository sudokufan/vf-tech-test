import React, { ReactNode } from "react";
import styles from "./styles/button.module.css";

interface ButtonProps {
    onClick?: () => void;
    active?: boolean;
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, active, children }) => {
  return (
    <button className={`${styles.button} ${active && styles.active}`} onClick={onClick}>

      {children}
    </button>
  );
};

export default Button;
