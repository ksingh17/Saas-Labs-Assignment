import React, { useEffect, useState } from "react";
import Api from "../Api.js";
import "./TableData.css";

const TableData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const recordsPerPage = 5;
  const pageLimit = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Api.get(
          "/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        setData(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate the range of records to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Data Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item["s.no"]}>
              <td>{item["s.no"]}</td>
              <td>{item["percentage.funded"]}</td>
              <td>{item["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(startPage - 1)}
            className="backArrow"
          >
            &lt;
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              backgroundColor: currentPage === page ? "#007BFF" : "#f0f0f0",
              color: currentPage === page ? "white" : "black",
            }}
            className="pageNumber"
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(endPage + 1)}
            className="nextArrow"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default TableData;
