import React, { useEffect, useState } from 'react';
import './Archive.css';

function Archive() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch Instagram posts (dummy data for illustration)
    fetch('/path/to/instagram/api')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching Instagram posts:', error));
  }, []);

  return (
    <div className="archive">
      <h1>Archive</h1>
      <div className="archive-grid">
        {posts.map((post, index) => (
          <div key={index} className="archive-post">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Archive;