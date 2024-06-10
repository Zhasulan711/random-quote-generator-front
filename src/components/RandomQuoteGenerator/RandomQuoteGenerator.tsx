import { useState, useEffect } from "react";

import "../../styles/root/RandomQuoteGenerator.scss";
import { fetchQuote } from "../../api/quotes/route";
import { LoadingIndicator } from "./LoadingIndicator";

export const RandomQuoteGenerator = () => {
  const [quoteData, setQuoteData] = useState({
    quote: "",
    author: "",
    image: "",
  });
  const [randomNumber, setRandomNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchQuote(randomNumber);
        setQuoteData({
          quote: data.content,
          author: data.author,
          image: `http://localhost:8000/images/${data.avatarPath}`,
        });
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError("Failed to fetch quote. Please try again.");
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  const { quote, author, image } = quoteData;
  
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
