import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FloatingImage from '../../components/FloatingImage/FloatingImage';
import Modal from '../../components/Modal/Modal';
import './TypeThonTopic.css';

function TypeThonTopic() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, src: '', alt: '', content: '', style: '' });

  useEffect(() => {
    // JSON 파일 경로를 동적으로 설정
    const fileName = `topic${id}.json`;
    import(`../../data/typeThon/${fileName}`)
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          setError('Fetched data is not an array');
        }
      })
      .catch((error) => {
        setError(`Error loading JSON data from ${fileName}: ${error.message}`);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleImageClick = (src, alt, content, style) => {
    setModalData({ isOpen: true, src, alt, content, style });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, src: '', alt: '', content: '', style: '' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!topics.length) {
    return <div>No topics found</div>;
  }

  return (
    <div className="type-thon-topic">
      <div className="content-container floating-container">
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex}>
            {topic.images.map((image, imageIndex) => (
              <FloatingImage
                key={imageIndex}
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(image.src, image.alt, topic.description, image.style)}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal
        src={modalData.src}
        alt={modalData.alt}
        content={modalData.content}
        isOpen={modalData.isOpen}
        onClose={closeModal}
        style={modalData.style}
      />
      <div className="footer">Footer</div>
    </div>
  );
}

export default TypeThonTopic;