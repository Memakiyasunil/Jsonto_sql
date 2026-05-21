function Sidebar({ setQueryType }) {
  return (
    <div className='sidebar bg-dark text-white p-3'>
      <h5 className='mb-4'>SQL Queries</h5>

      <button
        className='btn btn-outline-light w-100 mb-3'
        onClick={() => setQueryType('INSERT')}
      >
        INSERT QUERY
      </button>

      <button
        className='btn btn-outline-light w-100 mb-3'
        onClick={() => setQueryType('UPDATE')}
      >
        UPDATE QUERY
      </button>

      <button
        className='btn btn-outline-light w-100 mb-3'
        onClick={() => setQueryType('CREATE_TABLE')}
      >
        CREATE TABLE
      </button>

      <button
        className='btn btn-outline-light w-100 mb-3'
        onClick={() => setQueryType('DELETE')}
      >
        DELETE QUERY
      </button>
    </div>
  )
}

export default Sidebar