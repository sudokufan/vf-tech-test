import React, { useState, useEffect } from "react";
import styles from "../styles/sidebar.module.css";
import { getResources } from "../handlers/apiHandlers";

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
                setResources(data);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
    fetchResources();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2>VF RESOURCING</h2>

      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>{resource.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
