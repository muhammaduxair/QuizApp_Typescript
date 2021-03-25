import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Result = (props: any) => {
  interface resultInterface {
    attempt: number;
    correct: number;
    wrong: number;
  }
  interface userInterface {
    name: string;
    totalQuestion: string;
    category: string;
    difficulty: string;
  }

  const HISTORY = useHistory();
  const [userData, setUserData] = useState<userInterface>({
    name: "",
    totalQuestion: "",
    category: "",
    difficulty: "",
  });
  const [result, setResult] = useState<resultInterface>({
    attempt: 0,
    correct: 0,
    wrong: 0,
  });

  useEffect(() => {
    if (props.result !== undefined) {
      setUserData(props.userData);
      setResult(props.result);
    } else {
      HISTORY.replace("/");
    }
  }, []);

  return (
    <div className="container-fluid mainBoxCustom px-0">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 result">
        <h1>Quiz Result</h1>
        <div>
          <p style={{ color: "#3498db" }}>User Name</p>
          <p style={{ color: "#3498db" }}>{userData?.name}</p>
        </div>
        <div>
          <p>Total Questions</p>
          <p>{userData.totalQuestion}</p>
        </div>
        <div>
          <p>Attempt Questions</p>
          <p>{result?.attempt}</p>
        </div>
        <div>
          <p>Correct Questions</p>
          <p>{result?.correct}</p>
        </div>
        <div>
          <p>Wrong Questions</p>
          <p>{result?.wrong}</p>
        </div>
        <div>
          <p>Your Percentage</p>
          <p>
            {(
              (result?.correct / Number.parseInt(userData.totalQuestion)) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
        <div>
          <p>Your Total Score</p>
          <p>
            {result?.correct}/{userData.totalQuestion}
          </p>
        </div>
        <button className="bttn" onClick={() => HISTORY.replace("/")}>
          Go To Home
        </button>
      </div>
    </div>
  );
};
export default Result;
