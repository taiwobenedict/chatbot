import { useState, useEffect, useContext } from "react";
import { UIContext } from "../context/UiContext";
import ReactMarkdown from "react-markdown";

function SlowText({ text, speed }) {
  const { setShowBtn } = useContext(UIContext);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setShowBtn(true); // Set the button visibility once when the text display is complete
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [text, speed, setShowBtn]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
}

export default SlowText;
