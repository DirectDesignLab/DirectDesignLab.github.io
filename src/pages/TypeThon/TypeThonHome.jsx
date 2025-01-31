import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TypeThonHome.css';

function TypeThonHome() {
  const [typeThonList, setTypeThonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    import('../../data/typeThon/typeThonList.json')
      .then((module) => {
        const data = module.default;
        console.log('Loaded data:', data);
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

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      setScrollPosition((prevPosition) => prevPosition + event.deltaY * 0.1); // 스크롤 속도 조절
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const anglePerItem = 360 / typeThonList.length;
    const radius = 200; // 원의 반지름

    typeThonList.forEach((item, index) => {
      const angle = anglePerItem * index + scrollPosition;
      const radians = (angle * Math.PI) / 180;
      const x = radius * Math.cos(radians);
      const y = radius * Math.sin(radians);

      const element = containerRef.current.children[index];
      element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    });
  }, [typeThonList, scrollPosition]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="type-thon-home" ref={containerRef}>
      {typeThonList.map((topic, index) => (
        <Link
          key={index}
          to={`/type-thon/${topic.id}`}
          className={index % typeThonList.length === Math.floor(scrollPosition / (360 / typeThonList.length)) % typeThonList.length ? 'active' : 'inactive'}
        >
          {topic.title}
        </Link>
      ))}
    </div>
  );
}

export default TypeThonHome;