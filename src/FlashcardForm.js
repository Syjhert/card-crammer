import { useState } from 'react';

const FlashcardForm = ({ folderID, addFlashcardToFolder }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // handles the submission of the create new flashcard form
  // prevents the form to reload the page
  // calls Home's addFlashcardToFolder function props
  // Sets the question and answer textareas to blank
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    addFlashcardToFolder(folderID, { question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      <textarea
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;