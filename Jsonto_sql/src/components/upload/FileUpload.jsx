function FileUpload({ setJsonData, setSelectedColumns }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)

      setJsonData(data)

      const columns = Object.keys(data[0] || {})

      const initialColumns = {}

      columns.forEach((col) => {
        initialColumns[col] = true
      })

      setSelectedColumns(initialColumns)
    }

    reader.readAsText(file)
  }

  return (
    <div className='card border-0 shadow-sm rounded-4 p-4 mb-4'>
      <h4 className='mb-3'>Upload JSON File</h4>

      <input
        type='file'
        accept='.json'
        className='form-control'
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileUpload