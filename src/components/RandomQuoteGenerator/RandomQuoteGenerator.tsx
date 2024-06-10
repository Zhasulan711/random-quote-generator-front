import "../../styles/root/RandomQuoteGenerator.scss";

export const RandomQuoteGenerator = () => {
  return (
    <div className="quote-generator-wrapper">
      <p className="quote-text">
        Calling out leads to shame, calling up leads to belief. <br /> Leaders
        stir up belief.
      </p>
      <div className="quote-nav-bars">
        <div className="quote-author">
          {/* <img /> */}
          <h1>Kevin Jackson</h1>
        </div>
        <button className="quote-button">Get another button</button>
      </div>
    </div>
  );
};
