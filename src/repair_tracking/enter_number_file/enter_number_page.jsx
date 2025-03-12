import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./enter_number_page.css";

export default function EnterNumberPage() {
  const [jobNumber, setJobNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  
    if (jobNumber.trim()) {
      navigate("/repair_tracking/display_progress_file/display_progress_page", { state: { jobNumber } });
    } else {
      alert("Please enter a valid job number.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Enter Job Number</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter job number"
            value={jobNumber}
            onChange={(e) => setJobNumber(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <button 
          className="button" 
          onClick={() => navigate("/repair_tracking/progress_update_file/progress_update_page")}
          title="This page is under construction"
        >
          Under construction
        </button>
      </div>
    </div>
  );
}