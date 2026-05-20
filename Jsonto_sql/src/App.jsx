import React, { useState } from "react";
import ReactJson from "@microlink/react-json-view";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [tableName, setTableName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState({});
  const [customNames, setCustomNames] = useState({});
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [step, setStep] = useState(1);

  // Upload JSON File
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!Array.isArray(data)) {
          alert("JSON must be an array of objects");
          return;
        }

        setJsonData(data);

        const columns = Object.keys(data[0] || {});

        const initialSelection = columns.reduce((acc, col) => {
          acc[col] = true;
          return acc;
        }, {});

        setSelectedColumns(initialSelection);

        setStep(2);
      } catch (error) {
        alert("Invalid JSON File");
      }
    };

    reader.readAsText(file);
  };

  // Toggle Column
  const toggleColumn = (columnName) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  // Custom Column Name
  const handleNameChange = (columnName, value) => {
    setCustomNames((prev) => ({
      ...prev,
      [columnName]: value,
    }));
  };

  // Generate SQL
  const generateSQLQuery = () => {
    if (!tableName) {
      alert("Please Enter Table Name");
      return;
    }

    const columns = Object.keys(selectedColumns).filter(
      (col) => selectedColumns[col]
    );

    const updatedColumns = columns.map(
      (col) => customNames[col] || col
    );

    const valuesArray = jsonData.map((row) => {
      const values = columns.map((col) => {
        const value = row[col];

        if (value === null || value === undefined) {
          return "NULL";
        }

        return `'${String(value).replace(/'/g, "''")}'`;
      });

      return `(${values.join(", ")})`;
    });

    const query = `
INSERT INTO ${tableName}
(${updatedColumns.join(", ")})
VALUES
${valuesArray.join(",\n")};
`;

    setGeneratedQuery(query);
    setStep(3);
  };

  // Copy Query
  const copyQuery = async () => {
    try {
      await navigator.clipboard.writeText(generatedQuery);
      alert("SQL Query Copied Successfully");
    } catch (error) {
      alert("Copy Failed");
    }
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow-sm px-4">
        <span className="navbar-brand mb-0 h1">
          JSON → SQL Converter
        </span>
      </nav>

      <div className="container py-5">

        {/* Stepper */}
        <div className="d-flex justify-content-center mb-5">
          <div className="d-flex gap-3">

            <div className={`px-4 py-2 rounded-pill fw-bold ${step >= 1 ? "bg-primary text-white" : "bg-secondary text-white"}`}>
              1. Upload JSON
            </div>

            <div className={`px-4 py-2 rounded-pill fw-bold ${step >= 2 ? "bg-primary text-white" : "bg-secondary text-white"}`}>
              2. Select Columns
            </div>

            <div className={`px-4 py-2 rounded-pill fw-bold ${step >= 3 ? "bg-primary text-white" : "bg-secondary text-white"}`}>
              3. Generate SQL
            </div>

          </div>
        </div>

        {/* Upload Card */}
        <div className="card shadow border-0 rounded-4 mb-4">
          <div className="card-body p-4">

            <h3 className="fw-bold mb-3">
              Upload JSON File
            </h3>

            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="form-control form-control-lg"
            />

          </div>
        </div>

        {/* Column Selection */}
        {jsonData.length > 0 && (
          <div className="card shadow border-0 rounded-4 mb-4">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Database Configuration
              </h3>

              {/* Table Name */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Table Name
                </label>

                <input
                  type="text"
                  placeholder="Enter table name"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="form-control"
                />
              </div>

              {/* Columns */}
              <div className="row">

                {Object.keys(selectedColumns).map((col) => (
                  <div className="col-md-6 mb-3" key={col}>
                    <div className="border rounded-3 p-3 bg-light">

                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedColumns[col]}
                          onChange={() => toggleColumn(col)}
                        />

                        <label className="form-check-label fw-semibold">
                          {col}
                        </label>
                      </div>

                      {selectedColumns[col] && (
                        <input
                          type="text"
                          placeholder="Custom Column Name"
                          className="form-control form-control-sm"
                          onChange={(e) =>
                            handleNameChange(col, e.target.value)
                          }
                        />
                      )}

                    </div>
                  </div>
                ))}

              </div>

              <button
                onClick={generateSQLQuery}
                className="btn btn-success btn-lg mt-3"
              >
                Generate SQL Query
              </button>

            </div>
          </div>
        )}

        {/* SQL Output */}
        {generatedQuery && (
          <div className="card shadow border-0 rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold m-0">
                  Generated SQL Query
                </h3>

                <button
                  onClick={copyQuery}
                  className="btn btn-primary"
                >
                  Copy Query
                </button>
              </div>

              <textarea
                className="form-control"
                rows="12"
                value={generatedQuery}
                readOnly
              />

            </div>
          </div>
        )}

        {/* JSON Preview */}
        {jsonData.length > 0 && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-3">
                JSON Preview
              </h3>

              <div className="border rounded-3 p-3 bg-light overflow-auto">
                <ReactJson
                  src={jsonData}
                  theme="monokai"
                  collapsed={2}
                  displayDataTypes={false}
                />
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        © {new Date().getFullYear()} JSON SQL Converter
      </footer>

    </div>
  );
}

export default App; 