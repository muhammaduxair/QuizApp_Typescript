import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = (props: any) => {
  // ======================
  // interfaces
  // ======================
  interface categoryType {
    id: number;
    name: string;
  }
  interface quizDataType {
    name: string;
    totalQuestion: string;
    category: string;
    difficulty: string;
  }
  interface resultDataType {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }
  //
  const [category] = useState<categoryType[]>([
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Nature and Science" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 18, name: "Computer Science" },
  ]);
  const [userName, setUserName] = useState<string>();
  const [selectQuestion, setSelectQuestion] = useState<string>();
  const [selectCategory, setSelectCategory] = useState<string>();
  const [selectDifficulty, setSelectDifficulty] = useState<string>();
  const HISTORY = useHistory();

  // ================
  // function area
  // ================
  function startQuiz() {
    if (
      selectQuestion === undefined ||
      selectCategory === undefined ||
      selectDifficulty === undefined ||
      userName === undefined
    ) {
      userName === undefined
        ? alert("Please Enter Your Name")
        : alert("Please Select All Fields");
    } else {
      HISTORY.push("/loading");
      const apiUrl = `https://opentdb.com/api.php?amount=${selectQuestion}&category=${selectCategory}&difficulty=${selectDifficulty}&type=multiple`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((result) => {
          const quizdata: quizDataType = {
            name: userName,
            totalQuestion: selectQuestion,
            category: selectCategory,
            difficulty: selectDifficulty,
          };
          const abx: resultDataType[] = result.results;
          props.quizData(quizdata, abx);
          HISTORY.replace("/quizstart");
        })
        .catch(() => {
          HISTORY.replace("/");
          alert("Please Check Your Network Connection");
        });
    }
  }

  return (
    <div className="container-fluid mainBoxCustom px-0">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 quizBoxCustom">
        {/* title */}
        <h1>quiz app</h1>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            style={{ fontSize: 20 }}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* selecting area */}
        <div className="selectionBoxCustom">
          <select
            name="totalQuestionSelect"
            id="questionSelector"
            className="form-select selectionCustom"
            aria-label="Default select example"
            defaultValue={"DEFAULT"}
            onChange={(e) => setSelectQuestion(e.target.value)}
            required
          >
            <option value="DEFAULT" disabled>
              Select Questions
            </option>
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <option key={i} value={v * 5}>
                {v * 5}
              </option>
            ))}
          </select>
          <select
            name="totalQuestionSelect"
            id="questionSelector"
            className="form-select selectionCustom"
            aria-label="Default select example"
            defaultValue={"DEFAULT"}
            onChange={(e) => setSelectCategory(e.target.value)}
            required
          >
            <option value="DEFAULT" disabled>
              Select Category
            </option>
            {category.map((v, i) => (
              <option key={i} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <select
            name="totalQuestionSelect"
            id="questionSelector"
            className="form-select selectionCustom"
            aria-label="Default select example"
            defaultValue={"DEFAULT"}
            onChange={(e) => setSelectDifficulty(e.target.value)}
            required
          >
            <option value="DEFAULT" disabled>
              Select Difficulty
            </option>
            {["easy", "medium", "hard"].map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100 mt-3 fw-bold"
          style={{ fontSize: 20, color: "#fff", backgroundColor: "#3498db" }}
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
export default Home;
