import { useState, useEffect, useContext } from "react";
import { UIContext } from "../context/UiContext";
import ReactMarkdown from "react-markdown";

function SlowText({ text, speed, markdown = true }) {
    const { setShowBtn } = useContext(UIContext);
    const [displayedText, setDisplayedText] = useState('');


    // function scrollToBottom() {
    //     window.scrollTo({
    //         top: document.body.scrollHeight,
    //         behavior: 'smooth' // This makes the scroll smooth
    //     });
    // }

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
        // eslint-disable-next-line
    }, [text, speed, setShowBtn]);

    return markdown  ? <ReactMarkdown>{displayedText}</ReactMarkdown> : <span> {displayedText} </span>
}

export default SlowText;
