import { useState, useEffect } from "react";

export default function TypingAnimation({ text = "Hello there!", speed = 100, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`inline-block font-mono whitespace-pre-wrap ${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
