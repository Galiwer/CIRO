import React, { useEffect, useState } from "react";
import "./progress_update_page.css";

const ProgressUpdate = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, jobNumber: "J1001", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 2, jobNumber: "J1002", status: "Processing", timestamp: new Date().toISOString() },
      { id: 3, jobNumber: "J1003", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 4, jobNumber: "J1004", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 5, jobNumber: "J1005", status: "Processing", timestamp: new Date().toISOString() },
      { id: 6, jobNumber: "J1006", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 7, jobNumber: "J1007", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 8, jobNumber: "J1008", status: "Processing", timestamp: new Date().toISOString() },
      { id: 9, jobNumber: "J1009", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 10, jobNumber: "J1010", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 11, jobNumber: "J1011", status: "Processing", timestamp: new Date().toISOString() },
      { id: 12, jobNumber: "J1012", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 13, jobNumber: "J1013", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 14, jobNumber: "J1014", status: "Processing", timestamp: new Date().toISOString() },
      { id: 15, jobNumber: "J1015", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 16, jobNumber: "J1016", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 17, jobNumber: "J1017", status: "Processing", timestamp: new Date().toISOString() },
      { id: 18, jobNumber: "J1018", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 19, jobNumber: "J1019", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 20, jobNumber: "J1020", status: "Processing", timestamp: new Date().toISOString() },
      { id: 21, jobNumber: "J1021", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 22, jobNumber: "J1022", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 23, jobNumber: "J1023", status: "Processing", timestamp: new Date().toISOString() },
      { id: 24, jobNumber: "J1024", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 25, jobNumber: "J1025", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 26, jobNumber: "J1026", status: "Processing", timestamp: new Date().toISOString() },
      { id: 27, jobNumber: "J1027", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 28, jobNumber: "J1028", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 29, jobNumber: "J1029", status: "Processing", timestamp: new Date().toISOString() },
      { id: 30, jobNumber: "J1030", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 31, jobNumber: "J1031", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 32, jobNumber: "J1032", status: "Processing", timestamp: new Date().toISOString() },
      { id: 33, jobNumber: "J1033", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 34, jobNumber: "J1034", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 35, jobNumber: "J1035", status: "Processing", timestamp: new Date().toISOString() },
      { id: 36, jobNumber: "J1036", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 37, jobNumber: "J1037", status: "In Queue", timestamp: new Date().toISOString() },
      { id: 38, jobNumber: "J1038", status: "Processing", timestamp: new Date().toISOString() },
      { id: 39, jobNumber: "J1039", status: "Repaired", timestamp: new Date().toISOString() },
      { id: 40, jobNumber: "J1040", status: "In Queue", timestamp: new Date().toISOString() },
    ];


    
    const uniqueJobs = Array.from(new Set(mockData.map(job => job.id))).map(id =>
      mockData.find(job => job.id === id)
    );

    setJobs(uniqueJobs);
  }, []);

  const handleStatusChange = (jobId, newStatus) => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus, timestamp: new Date().toISOString() } : job
    );
    setJobs(updatedJobs);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Job Status Tracker</h2>
  <div className="table-container">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-blue-600 text-white sticky top-0">
        <tr>
          <th className="px-6 py-3 text-left">Job Number</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Last Updated</th>
          <th className="px-6 py-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr
            key={job.id}
            className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
          >
            <td className="px-6 py-4 text-gray-700">{job.jobNumber}</td>
            <td className="px-6 py-4 font-medium text-gray-900">{job.status}</td>
            <td className="px-6 py-4 text-gray-600">{new Date(job.timestamp).toLocaleString()}</td>
            <td className="px-6 py-4">
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="px-3 py-1 border rounded-md shadow-sm bg-white text-gray-700 focus:ring focus:ring-blue-300"
              >
                <option value="In Queue">In Queue</option>
                <option value="Processing">Processing</option>
                <option value="Repaired">Repaired</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ProgressUpdate;