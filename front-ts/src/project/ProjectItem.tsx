import * as React from 'react';

const ProjectItem = ({project}: any) => {

  return (
    <div className="tile">
      <div className="tile-content">
        <p className="tile-title">{project.project}</p>
        <p className="tile-subtitle text-gray">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
