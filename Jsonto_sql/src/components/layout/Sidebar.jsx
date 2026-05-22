function Sidebar({ fileUploaded, setQueryType }) {

  return (
    <div className="sidebar bg-dark text-white p-3">

      <h5 className="mb-4">SQL Menu</h5>

      {/* Always Active */}
      <button className="btn btn-primary w-100 mb-3">
        Select File
      </button>

      {/* Enable After Upload */}
      <button
        disabled={!fileUploaded}
        className="btn btn-outline-light w-100 mb-3"
        onClick={() => setQueryType("INSERT")}
      >
        Insert Query
      </button>

      <button
        disabled={!fileUploaded}
        className="btn btn-outline-light w-100 mb-3"
        onClick={() => setQueryType("UPDATE")}
      >
        Update Query
      </button>

      <button
        disabled={!fileUploaded}
        className="btn btn-outline-light w-100 mb-3"
        onClick={() => setQueryType("DELETE")}
      >
        Delete Query
      </button>

      <button
        disabled={!fileUploaded}
        className="btn btn-outline-light w-100 mb-3"
        onClick={() => setQueryType("CREATE")}
      >
        Create Table
      </button>

    </div>
  )
}

export default Sidebar