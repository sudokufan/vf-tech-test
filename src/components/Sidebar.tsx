import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/sidebar.module.css";
import { getResources } from "../handlers/apiHandlers";
import Logo from "./Logo";

interface Resource {
    id: string;
    name: string;
  }

const Sidebar: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    
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

  return (
    <div className={styles.sidebar}>
      <Link to={`/`}><Logo /></Link>

      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <Link to={`/resources/${resource.id}`}>{resource.name}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
