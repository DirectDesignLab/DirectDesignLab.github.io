import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectsTopic.css';

function ProjectsTopic() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 데이터 로드
    import('../../data/projects/1_cafe_chromatography.json')
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          const foundProject = data.find((p) => p.id === id);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError('Project not found');
          }
        } else {
          setError('Fetched data is not an array');
        }
      })
      .catch((error) => {
        setError('Error loading JSON data');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="projects-topic">
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} />
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectsTopic;