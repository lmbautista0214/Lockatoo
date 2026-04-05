import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="getstarted-section">
      <div className="getstarted-container">
        <h2 className="getstarted-title">Ready to get started?</h2>

        <p className="getstarted-text">
          Join thousands of satisfied customers using Lockatoo for their storage
          needs
        </p>

        <button
          onClick={() => navigate("/register")}
          className="getstarted-btn"
        >
          Create free account
        </button>

        <div className="getstarted-bg-circle -bottom-10 -left-10"></div>
        <div className="getstarted-bg-circle -top-10 -right-10"></div>
      </div>
    </div>
  );
};
