import React from "react";

function QuestionItem({ question, onDelete, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

   //delete
   function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(question));
    
    console.log("question deleted", question.id);
  }

  function changeAnswer(event){
    const correctIndex = parseInt(event.target.value)
    console.log("answer changed", correctIndex);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestions) => updateQuestion(updatedQuestions));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer} >{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;