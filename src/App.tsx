import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./components/bootstrap.min.css";
import "./components/main.css";
import Home from "./components/Home";
import QuizStart from "./components/Quiz";
import Loading from "./components/Loading";
import Result from "./components/Result";
import { useState } from "react";
import Error from "./components/Error";

function App() {
  interface quizDataType {
    name: string;
    totalQuestion: string;
    category: string;
    difficulty: string;
  }
  interface finalDataType {
    attempt: number;
    correct: number;
    wrong: number;
  }

  const [quizData, setQuizData] = useState<object>({});
  const [resultData, setResultData] = useState<object>({});
  const [result, setResult] = useState<finalDataType>();

  const gettingQuizData = (quizData: quizDataType, resultData: object) => {
    setQuizData(quizData);
    setResultData(resultData);
  };
  const finalResult = (res: finalDataType) => {
    setResult(res);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home quizData={gettingQuizData} />}
        />
        <Route
          path="/quizstart"
          render={() => (
            <QuizStart
              recieveResultData={resultData}
              finalResult={finalResult}
            />
          )}
        />
        <Route
          path="/result"
          render={() => <Result result={result} userData={quizData} />}
        />
        <Route path="/loading" component={Loading} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
