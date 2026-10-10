import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

export default function TypingMessage({ text="", speed = 10,messagesRef }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset the text if the prompt/text changes
    setDisplayedText(""); 
    let index = -1;

    
    
    // Create an interval loop to add characters one by one
    const intervalId = setInterval(() =>{
        index++;
        const el = messagesRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      if (index < text.length) {
        // Safe functional state update using the previous string value
        setDisplayedText((prev) => prev + text.charAt(index));
        
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    // Clean up the interval loop if the component unmounts
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <ReactMarkdown style={{ whiteSpace: "pre-wrap"}}>{displayedText}</ReactMarkdown>
  );
}
