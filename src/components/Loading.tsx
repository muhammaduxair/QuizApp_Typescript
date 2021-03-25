import LoadingIMG from "./assets/loading2.gif";

const Loading = () => {
  return (
    <div className="container-fluid mainBoxCustom px-0">
      <div
        className="col-12 col-sm-10 col-md-8 col-lg-6 quizBoxCustom"
        style={{
          justifyContent: "center",
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={LoadingIMG}
          alt="loading_gif"
          style={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
};
export default Loading;
