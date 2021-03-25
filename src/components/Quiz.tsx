import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const QuizStart = (props: any) => {
  // =========================
  // interface
  // =========================
  interface resultDataType {
    category?: string;
    correct_answer: string;
    difficulty?: string;
    incorrect_answers: string[];
    question: string;
    type?: string;
  }
  interface quizQuestionDataType {
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
  }
  interface finalDataType {
    attempt: number;
    correct: number;
    wrong: number;
  }

  const [quizData, setQuizData] = useState<quizQuestionDataType[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [identify, setIdntify] = useState<boolean>(true);
  const [Final, setFinal] = useState<finalDataType>({
    attempt: 0,
    correct: 0,
    wrong: 0,
  });

  const HISTORY = useHistory();
  useEffect(() => {
    if (Object.keys(props.recieveResultData).length < 1) {
      HISTORY.replace("/");
    } else {
      const filterQuizData = props.recieveResultData.map(
        (v: resultDataType) => {
          delete v.category;
          delete v.difficulty;
          delete v.type;
          v.incorrect_answers.splice(
            Math.trunc(Math.random() * v.incorrect_answers.length),
            0,
            v.correct_answer
          );
          return v;
        }
      );
      setQuizData(filterQuizData);
    }
  }, []);

  function identifyCorrect(e: any, v: string) {
    if (identify) {
      if (v === quizData[counter].correct_answer) {
        e.target.className = "green";
        setFinal({
          ...Final,
          correct: Final.correct + 1,
          attempt: Final.attempt + 1,
        });
      } else {
        e.target.className = "red";
        setFinal({
          ...Final,
          wrong: Final.wrong + 1,
          attempt: Final.attempt + 1,
        });
      }
      setIdntify(false);
    } else {
      return null;
    }
  }
  function changeCounter() {
    document.querySelectorAll(".optBox p").forEach((value: any) => {
      value.setAttribute("class", "");
    });
    if (quizData.length > counter + 1) {
      setCounter(counter + 1);
      setIdntify(true);
    } else {
      HISTORY.replace("/result");
      props.finalResult(Final);
    }
  }

  return (
    <div className="container-fluid mainBoxCustom px-0">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 startQuizCustom">
        <h2>
          Question {counter + 1} of {quizData?.length}
        </h2>
        <hr />
        <h3>{quizData.length < 1 ? "" : quizData[counter].question}</h3>
        <div className="optBox">
          {quizData.length < 1
            ? ""
            : quizData[counter].incorrect_answers.map((v, i) => (
                <p key={i} onClick={(e) => identifyCorrect(e, v)}>
                  {v}
                </p>
              ))}
        </div>
        <div className="bottomBoxCustom">
          <button className="customBttn" onClick={changeCounter}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
