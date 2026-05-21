function ColumnSelector({
  selectedColumns,
  setSelectedColumns,
}) {
  const toggleColumn = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }))
  }

  return (
    <div className='card border-0 shadow-sm rounded-4 p-4 mb-4'>
      <h4 className='mb-4'>Select Columns</h4>

      <div className='row'>
        {Object.keys(selectedColumns).map((col) => (
          <div className='col-md-4 mb-3' key={col}>
            <div className='border rounded p-3'>
              <input
                type='checkbox'
                checked={selectedColumns[col]}
                onChange={() => toggleColumn(col)}
                className='form-check-input me-2'
              />

              {col}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColumnSelector