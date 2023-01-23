import React from "react";
import QuestionItem from './QuestionItem'
function QuestionList({questions, onDelete, updateQuestion}) {
 console.log(questions)
  const quiz= questions.map((question)=>(
    <QuestionItem key={question.id} question={question} onDelete={onDelete} updateQuestion={updateQuestion}></QuestionItem>
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quiz}</ul>
      
    </section>
  );
}

export default QuestionList;
