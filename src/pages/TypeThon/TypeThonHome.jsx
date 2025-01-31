import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TypeThonHome.css';

function TypeThonHome() {
  const [typeThonList, setTypeThonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const scrollSpeed = 0.2; // 스크롤 속도 조절
  const dampingFactor = 0.9; // 감속 계수
  const itemSpacing = 100; // 텍스트 간의 간격 (픽셀)
  const circleRadius = 440; // 원의 반지름 (픽셀)
  const displayAngle = 300; // 텍스트들이 배치될 각도 범위
  const yOffset = -84; // y 축 오프셋 추가 (픽셀)

  useEffect(() => {
    // 데이터 로드
    import('../../data/typeThon/typeThonList.json')
      .then((module) => {
        const data = module.default;
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

  const maxScroll = (typeThonList.length - 1) * itemSpacing; // 스크롤 최대 값 계산

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + event.deltaY * scrollSpeed;
        // 스크롤 범위를 0에서 maxScroll로 제한
        return Math.min(Math.max(newPosition, 0), maxScroll);
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [maxScroll]);

  const animateScroll = () => {
    setScrollPosition((prevPosition) => {
      const newPosition = prevPosition * dampingFactor;
      if (Math.abs(newPosition - prevPosition) < 0.0001) {
        // 감속 후 위치 보정
        const nearestIndex = Math.round(prevPosition / itemSpacing);
        const nearestPosition = nearestIndex * itemSpacing;
        cancelAnimationFrame(requestRef.current); // 애니메이션 종료
        return nearestPosition;
      }
      requestRef.current = requestAnimationFrame(animateScroll);
      return newPosition;
    });
  };

  const renderItems = () => {
    if (containerRef.current) {
      const anglePerItem = (itemSpacing / (2 * Math.PI * circleRadius)) * 360; // 각 텍스트 간의 각도 계산

      let closestIndex = null;
      let closestDistance = Infinity;

      typeThonList.forEach((item, index) => {
        const angle = (index * anglePerItem - scrollPosition / itemSpacing * anglePerItem) % 360;
        const radians = (angle * Math.PI) / 180;
        const x = circleRadius * Math.cos(radians);
        const y = circleRadius * Math.sin(radians) + yOffset; // y 좌표에 오프셋 추가

        const element = containerRef.current.children[index];
        element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) translateX(0px)`; // 텍스트의 좌측 경계가 원의 경계에 닿도록 조정

        // 모든 텍스트를 inactive로 설정
        element.classList.remove('active');
        element.classList.add('inactive');

        // 중앙에 가까운 텍스트 찾기
        const centerAngle = 0; // 중앙 각도 (0도로 설정)
        const distanceFromCenter = Math.abs(angle % 360 - centerAngle);
        if (distanceFromCenter < closestDistance) {
          closestIndex = index;
          closestDistance = distanceFromCenter;
        }
      });

      // 가장 가까운 텍스트에 active 클래스 설정
      if (closestIndex !== null) {
        const element = containerRef.current.children[closestIndex];
        element.classList.add('active');
        element.classList.remove('inactive');
        // 중앙에 있는 텍스트를 수평으로 설정
        element.style.transform = `translate(${circleRadius * Math.cos(0)}px, ${circleRadius * Math.sin(0) + yOffset}px) rotate(0deg) translateX(0px)`;

        // 다른 텍스트들의 위치를 선택된 텍스트의 위치를 기준으로 조정
        typeThonList.forEach((_, index) => {
          if (index !== closestIndex) {
            const relativeIndex = index - closestIndex;
            const adjustedAngle = relativeIndex * anglePerItem;
            const adjustedRadians = (adjustedAngle * Math.PI) / 180;
            const newX = circleRadius * Math.cos(adjustedRadians);
            const newY = circleRadius * Math.sin(adjustedRadians) + yOffset;
            const otherElement = containerRef.current.children[index];
            otherElement.style.transform = `translate(${newX}px, ${newY}px) rotate(${adjustedAngle}deg) translateX(0px)`;
          }
        });
      }
    }
  };

  useEffect(() => {
    renderItems();
  }, [typeThonList, scrollPosition]);

  useEffect(() => {
    const handleAnimation = () => {
      requestRef.current = requestAnimationFrame(handleAnimation);
      renderItems();
    };

    requestRef.current = requestAnimationFrame(handleAnimation);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="type-thon-home">
      <div className="type-thon-container" ref={containerRef}>
        {typeThonList.map((topic, index) => (
          <Link key={index} to={`/type-thon/${topic.id}`} className="inactive">
            {topic.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TypeThonHome;