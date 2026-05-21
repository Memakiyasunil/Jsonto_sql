function Header({ queryType }) {
  return (
    <div className='bg-white shadow-sm rounded p-4 mb-4'>
      <h2>{queryType} SQL Generator</h2>
      <p className='text-muted'>
        Upload JSON and generate professional SQL queries.
      </p>
    </div>
  )
}

export default Header