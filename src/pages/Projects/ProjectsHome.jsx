import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../../data/projects/1_cafe_chromatography.json'; //파일 이름 확인
import './ProjectsHome.css';

function ProjectsHome() {
  return (
    <div className="projects-home">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <Link key={index} to={`/projects/${project.id}`}>
            <img src={project.image} alt={project.title} />
            <p>{project.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsHome;