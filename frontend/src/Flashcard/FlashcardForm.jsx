import { useState } from 'react';

const FlashcardForm = ({ addFlashcardToFolder }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // handles the submission of the create new flashcard form
  // prevents the form to reload the page
  // calls EditFolder's addFlashcardToFolder function props
  // Sets the question and answer textareas to blank
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    addFlashcardToFolder(question, answer);
    setQuestion("");
    setAnswer("");
  };

  return (
    <form className="w-full mx-auto my-2.5 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
      <textarea
        type="text"
        className="w-1/2 border p-2 rounded"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <textarea
        type="text"
        className="w-1/2 border p-2 rounded"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className='h-10 px-3 border rounded cursor-pointer flashcard-form-button' type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;