import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsHome.css';

function ProjectsHome() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 데이터 로드
    import('../../data/projects/1_cafe_chromatography.json')
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          setProjectsData(data);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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