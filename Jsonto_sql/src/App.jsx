import React, { useState } from 'react';
import ReactJson from '@microlink/react-json-view';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [customNames, setCustomNames] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setJsonData(data);
        const columns = Object.keys(data[0] || {});
        const initialSelection = columns.reduce((acc, col) => {
          acc[col] = false;
          return acc;
        }, {});
        setSelectedColumns(initialSelection);
      };
      reader.readAsText(file);
    }
  };

  const toggleColumn = (columnName) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const handleNameChange = (columnName, newName) => {
    setCustomNames((prev) => ({
      ...prev,
      [columnName]: newName,
    }));
  };

  const generatesqlInsertQuery = () => {
    if (!jsonData) return;
    const columns = Object.keys(selectedColumns).filter((col) => selectedColumns[col]);
    const updatedColumns = columns.map((col) => customNames[col] || col);
    const comparisonArray = jsonData.map((row) => {
      const values = columns.map((col) => `'${row[col]}'`);
      return `(${values.join(', ')})`;
    });

    const query = `INSERT INTO table_name (${updatedColumns.join(', ')}) VALUES ${comparisonArray.join(', ')};`;
    return query;
  };

  const handleSubmit = () => {
    const query = generatesqlInsertQuery();
    navigator.clipboard.writeText(query).then(() => {
      alert('Query copied to clipboard:\n\n' + query);
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <header className="bg-primary text-white text-center p-3 fs-4 fw-bold shadow">
        JSON to SQL Query Converter
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="bg-white border-end p-3" style={{ width: '250px' }}>
          <h5 className="fw-semibold mb-3">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="#" className="nav-link text-primary">Upload JSON</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-primary">Select Columns</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-primary">Preview Query</a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 bg-white">
          <div className="mb-4">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          {jsonData && (
            <div className="mb-5">
              <h5 className="fw-semibold mb-3">Column Selection</h5>
              <div className="d-flex flex-column gap-2">
                {Object.keys(selectedColumns).map((col) => (
                  <div key={col} className="d-flex align-items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedColumns[col]}
                      onChange={() => toggleColumn(col)}
                      className="form-check-input"
                    />
                    <label className="form-check-label w-25">{col}</label>
                    {selectedColumns[col] && (
                      <input
                        type="text"
                        placeholder="Custom Name"
                        onChange={(e) => handleNameChange(col, e.target.value)}
                        className="form-control form-control-sm w-25"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-success mt-3"
              >
                Generate SQL & Copy
              </button>
            </div>
          )}

          {jsonData && (
            <div>
              <h5 className="fw-semibold mb-2">JSON Preview</h5>
              <div className="border rounded p-3 bg-white shadow-sm">
                <ReactJson src={jsonData} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center p-2 small mt-auto">
        &copy; {new Date().getFullYear()} JSON SQL Tool. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
