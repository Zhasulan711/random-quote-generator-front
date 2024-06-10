import { useState, useEffect } from "react";

import "../../styles/root/RandomQuoteGenerator.scss";
import { fetchQuote } from "../../api/quotes/route";
import { LoadingIndicator } from "./LoadingIndicator";

export const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [randomNumber, setRandomNumber] = useState<number>(1);
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getQuote = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuote(randomNumber);
        setQuote(data.content);
        setAuthor(data.author);
        setImage(`http://localhost:8000/images/${data.avatarPath}`);
      } catch (error: any) {
        console.error("Fetch error:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    getQuote();
  }, [randomNumber]);

  const handleClick = () => {
    setRandomNumber(Math.floor(Math.random() * 10 + 1));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="quote-generator-wrapper">
      <p className="quote-text">{quote}</p>
      <div className="quote-nav-bars">
        <div className="quote-author">
          <img src={image} alt={author} />
          <h1>{author}</h1>
        </div>
        <button className="quote-button" onClick={handleClick}>
          Get another button
        </button>
      </div>
    </div>
  );
};
