import React, { useState } from 'react';
//import "../Courses/Modules/index.css";


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


const MultiVideoSearch = ({ videos}) => {
  return (
    <div className="m-2">
      {videos.map((video, index) => (
        <div key={index} className="video-wrapper">
          <VideoEmbed videoId={video.id} /> <br />
          <small className="text-muted p-2 m-4">{video.snippet.title}</small>
        </div>
      ))}
    </div>
  );
};

// Define TypeScript interfaces based on the YouTube API response structure
interface YouTubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      // Add other thumbnail sizes if needed
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

interface YouTubeApiResponse {
  items: YouTubeVideo[];
  // Include other properties from the API response if needed
}

const YouTubeSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]); // Use the YouTubeVideo interface

  const API_KEY = 'AIzaSyAucf9fw5MxWv8SYan5BD9F2SYlI1ry_BU'; // Replace with your YouTube Data API key
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const searchVideos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from submitting normally
    try {
      const response = await fetch(`${BASE_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`);
      const data: YouTubeApiResponse = await response.json(); // Cast the response to the YouTubeApiResponse interface
      setVideos(data.items);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };


 const embed_videos= [{_id: 'dQw4w9WgXcQ',description: "New Description"}, {_id: 'dQw4w9WgXcQ', description: "New Description"}, {_id: 'dQw4w9WgXcQ', description: "New Description"}];


  return (
    <div>

      
      <form onSubmit={searchVideos}>
      
     
      <input
          className="form-control w-8 m-2"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube videos"
        />
         <span className="float-end"><button className="btn btn-danger m-2" type="submit">Search</button></span>
    

      </form>
      <MultiVideoSearch videos={videos} />
  

      <br/>
      </div>

  );
};

export default YouTubeSearch;
