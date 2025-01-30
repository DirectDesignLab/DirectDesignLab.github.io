import React, { useEffect, useRef } from 'react';
import './FloatingImage.css';

function FloatingImage({ src, alt, onClick }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    const container = document.querySelector('.floating-container');
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;
    const speed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--image-speed"));

    // 초기 위치 설정
    const setInitialPosition = () => {
      let x = Math.random() * (containerWidth - imgElement.clientWidth);
      let y = Math.random() * (containerHeight - imgElement.clientHeight);
      imgElement.style.left = `${x}px`;
      imgElement.style.top = `${y}px`;
      return { x, y };
    };

    let { x, y } = setInitialPosition();
    let dx = speed * (Math.random() > 0.5 ? 1 : -1);
    let dy = speed * (Math.random() > 0.5 ? 1 : -1);

    // 애니메이션 함수
    const animate = () => {
      if (x <= 0 || x >= containerWidth - imgElement.clientWidth) dx = -dx;
      if (y <= 0 || y >= containerHeight - imgElement.clientHeight) dy = -dy;

      x += dx;
      y += dy;
      imgElement.style.left = `${x}px`;
      imgElement.style.top = `${y}px`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // 화면 크기 변경 시 위치 조정
    const handleResize = () => {
      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;

      x = Math.min(x, containerWidth - imgElement.clientWidth);
      y = Math.min(y, containerHeight - imgElement.clientHeight);
      imgElement.style.left = `${x}px`;
      imgElement.style.top = `${y}px`;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <img ref={imgRef} src={src} alt={alt} className="floating-image" onClick={onClick} />;
}

export default FloatingImage;