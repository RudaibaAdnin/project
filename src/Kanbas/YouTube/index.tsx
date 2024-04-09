import React, { useState } from 'react';
//import "../Courses/Modules/index.css";
import YouTubeSearch from './search';


const VideoEmbed = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      className="m-4"
      width="300"
      height="100"
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};
// Component to embed multiple videos
const MultiVideoEmbed = ({ videos}) => {
  return (
    <div className="m-2">
      {videos.map((video, index) => (
        <div key={index} className="video-wrapper">
          <VideoEmbed videoId={video.id} /> <br />
          <small className="text-muted p-2 m-4">{video.description}</small>
        </div>
      ))}
    </div>
  );
};


const YouTubePage = () => {



 const embed_videos= [{_id: 'dQw4w9WgXcQ',description: "New Description"}, {_id: 'dQw4w9WgXcQ', description: "New Description"}, {_id: 'dQw4w9WgXcQ', description: "New Description"}];


  return (
    <div>

      <h1>My Favorite Videos</h1>
      <div className="row">
      <div className="col-md-5 m-4"> 
        <MultiVideoEmbed videos={embed_videos} />
        </div>
      <div className="col-md-5">  
         <YouTubeSearch/>
      </div>
      </div>

      <br/>
    </div>
  );
};

export default YouTubePage;
