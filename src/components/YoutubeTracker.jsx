import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function YouTubeTracker({videoId}) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  // YouTube options (matches regular iframe attributes)
  const opts = {
    height: '420px',
    width: '100%',
    
    playerVars: {
      autoplay: 1
      
    },
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration()); // Get total video length
  };

  const onPlayerStateChange = (event) => {
    // YouTube player states: 1 = PLAYING
    if (event.data === 1) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  const startTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime(); // Get current seconds
        const totalTime = playerRef.current.getDuration();
        const percentage = (currentTime / totalTime) * 100;
        
        setProgress(percentage.toFixed(2));
       // console.log(`Current Time: ${currentTime.toFixed(1)}s (${percentage.toFixed(1)}%)`);
      }
    }, 1000); // Track every second
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (
    <div>
      <YouTube 
        videoId={videoId} // Replace with your YouTube Video ID
        opts={opts} 
        onReady={onPlayerReady} 
        onStateChange={onPlayerStateChange} 
      />
      <div style={{ marginTop: '10px' }}>
        {/* <p>Video Progress: <strong>{progress}%</strong></p> */}
        {/* <progress value={progress} max="100" style={{ width: '100%' }}></progress> */}
      </div>
    </div>
  );
}
