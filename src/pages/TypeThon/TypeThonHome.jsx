import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TypeThonHome.css';

function TypeThonHome() {
  const [typeThonList, setTypeThonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    import('../../data/typeThon/typeThonList.json')
      .then((module) => {
        const data = module.default; // default 키를 통해 데이터에 접근
        console.log('Loaded data:', data); // 데이터 로드 확인
        if (Array.isArray(data)) {
          setTypeThonList(data);
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
    <div className="type-thon-home">
      {typeThonList.map((topic, index) => (
        <Link key={index} to={`/type-thon/${topic.id}`}>
          {topic.title}
        </Link>
      ))}
    </div>
  );
}

export default TypeThonHome;