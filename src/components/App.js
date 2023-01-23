import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);
  function onAddQuestion(newQuestion) {
    setQuestions([ ...questions,newQuestion]);
    console.log("new questions :", newQuestion);
  }
  function onDelete(deletedQuestion){
    const updatedItems = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedItems);
    console.log("deleted questions :", deletedQuestion);
  }
  function onUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map((q) => {
      if (q.id === updatedQuestion.id) return updatedQuestion;
      return q;
    });
    
    setQuestions(updatedQuestions);
    console.log(updatedQuestions);
    console.log("update questions :", updatedQuestions);
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
