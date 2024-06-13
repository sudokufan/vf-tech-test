import React, { ReactNode } from "react";
import styles from "./styles/button.module.css";

interface ButtonProps {
  onClick?: () => void;
  active?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  active,
  transparent,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${active && styles.active} ${
        transparent && styles.transparent
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
