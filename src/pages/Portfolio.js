import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PortfolioItem from "../components/PortfolioItem";

const Portfolio = ({ projects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id);

  const selectProject = (id) => {
    setSelectedProjectId(id);
  };

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-60px)]">
      <Sidebar
        projects={projects}
        selectProject={selectProject}
        selectedProjectId={selectedProjectId}
      />
      <div className="flex-grow">
        {selectedProject ? (
          <PortfolioItem
            key={selectedProject?.id}
            title={selectedProject?.title}
            description={selectedProject?.description}
            tags={selectedProject?.tags}
            imageUrl={selectedProject?.imageUrl}
            link={selectedProject?.link}
            images={selectedProject?.images}
            softSkills={selectedProject?.softSkills}
          />
        ) : (
          <p>No project selected.</p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
