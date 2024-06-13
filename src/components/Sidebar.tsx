import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/sidebar.module.css";
import { getResources } from "../handlers/apiHandlers";
import Logo from "./Logo";
import { Resource } from "../types";

const Sidebar: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources();
        const data = await response.json();
        data.sort((a: Resource, b: Resource) => a.name.localeCompare(b.name));
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  const isActive = (id: string) =>
    location.pathname.includes(`/resources/${id}`);

  return (
    <div className={styles.sidebar}>
      <Link to={`/`}>
        <Logo />
      </Link>

      <ul className={styles.list}>
        {resources.map((resource) => (
          <li
            key={resource.id}
            className={`${styles.resource} ${
              isActive(resource.id) ? styles.active : ""
            }`}
          >
            <Link to={`/resources/${resource.id}`}>{resource.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
