import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./display_progress_page.css";


const repairData = {
  '12345': {
    status: 1, 
    updateDates: {
      queue: '2025-03-10 14:00:00',
      processing: '2025-03-11 09:30:00',
      done: '2025-03-11 15:00:00',
    },
  },
  
};

export default function RepairProgress() {
  const { state } = useLocation();
  const { jobNumber } = state || {};
  const [status, setStatus] = useState(null);
  const [updateDates, setUpdateDates] = useState({});

  useEffect(() => {
    if (jobNumber) {
      console.log("Fetching data for job number:", jobNumber);  
      const fetchedData = repairData[jobNumber];
      console.log(fetchedData);  

      if (fetchedData) {
        setStatus(fetchedData.status);
        setUpdateDates(fetchedData.updateDates);
        console.log("Status set:", fetchedData.status);  
      } else {
        alert("Job number not found.");
      }
    }
  }, [jobNumber]);

  
  const renderStatus = () => {
    if (status === null) return <p>Loading...</p>;

    switch (status) {
      case 1:
        return <p>Job is in Queue. <br /> Date: {updateDates.queue}</p>;
      case 2:
        return <p>Job is in Processing. <br /> Date: {updateDates.processing}</p>;
      case 3:
        return <p>Job is Done. <br /> Date: {updateDates.done}</p>;
      default:
        return <p>Unknown status.</p>;
    }
  };

  return (
    <div className="container">
      <div className="repair-status-card">
        <h1>Repair Progress for Job Number: {jobNumber}</h1>
        <div className="status">
          {renderStatus()}
        </div>
      </div>
    </div>
  );
}