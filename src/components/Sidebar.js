import React from "react";

const Sidebar = ({ projects, selectProject, selectedProjectId }) => {

  return (
    <div className="bg-gray-800 p-4 text-white overflow-y-scroll h-48 lg:h-full lg:w-2/4 lg:max-w-64 custom-scrollbar">
      <div className="flex flex-col">
        {projects?.map((project) => (
          <button
            key={project.id}
            onClick={() => selectProject(project.id)}
            className={`p-4 my-2 lg:p-2 text-left ${
              selectedProjectId === project.id ? "bg-gray-700 rounded-lg" : ""
            }`}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="hidden lg:block rounded-lg mb-2 h-24 w-full object-cover"
            />
            <h3 className="text-sm font-bold mb-0 lg:mb-2">{project.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
