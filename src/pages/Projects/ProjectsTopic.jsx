import React from 'react';
import { useParams } from 'react-router-dom';
import projectsData from '../../data/projects/1_cafe_chromatography.json'; //파일 이름 확인
import './ProjectsTopic.css';

function ProjectsTopic() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  return (
    <div className="projects-topic">
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} />
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectsTopic;