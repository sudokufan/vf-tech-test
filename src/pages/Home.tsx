import React from "react";
import styles from "./styles/home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <p>
        Welcome to VF Resourcing. Select a resource to view role eligibility and
        skills for selected resources.
      </p>
    </div>
  );
};

export default Home;
