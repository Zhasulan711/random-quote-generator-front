export const fetchQuote = async (randomNumber: number) => {
  try {
    const response = await fetch(
      `https://random-quote-generator-api-4-beginner.onrender.com/api/quotes/${randomNumber}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.content && data.author && data.avatarPath) {
      return {
        content: data.content,
        author: data.author,
        avatarPath: data.avatarPath,
      };
    } else {
      throw new Error("Incomplete data");
    }
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
