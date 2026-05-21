function SqlPreview({
  jsonData,
  selectedColumns,
  queryType,
}) {
  const generateInsertQuery = () => {
    const columns = Object.keys(selectedColumns).filter(
      (col) => selectedColumns[col]
    )

    const values = jsonData.map((row) => {
      const rowValues = columns.map(
        (col) => `'${row[col]}'`
      )

      return `(${rowValues.join(', ')})`
    })

    return `INSERT INTO table_name (${columns.join(', ')}) VALUES ${values.join(', ')};`
  }

  const query = generateInsertQuery()

  const copyQuery = () => {
    navigator.clipboard.writeText(query)
    alert('SQL Query Copied')
  }

  return (
    <div className='card border-0 shadow-sm rounded-4 p-4 mb-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h4>Generated SQL Query</h4>

        <button
          className='btn btn-primary'
          onClick={copyQuery}
        >
          Copy Query
        </button>
      </div>

      <textarea
        rows='10'
        className='form-control'
        value={query}
        readOnly
      />
    </div>
  )
}

export default SqlPreview