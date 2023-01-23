import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Add useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);
  function onAddQuestion(newQuestion) {
    setQuestions([ ...questions,newQuestion]);
    
  }
  //delete
  function onDelete(deletedQuestion){
    const updatedItems = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedItems);
    
  }
  function onUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map((q) => {
      if (q.id === updatedQuestion.id) return updatedQuestion;
      return q;
    });
    
    setQuestions(updatedQuestions);
    
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={onAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={onDelete} updateQuestion={onUpdateQuestion} />
      )}
    </main>
  );
}

export default App;

