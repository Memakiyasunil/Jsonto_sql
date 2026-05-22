function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow">
      <div className="d-flex align-items-center w-100">

        <h3 className="text-info fw-bold m-0">
          JSON → SQL AI
        </h3>

        <div className="mx-4 flex-grow-1">
          <input
            type="text"
            placeholder="Search Query..."
            className="form-control"
          />
        </div>

        <div className="text-white fw-semibold">
          JSON To Convert SQL Query's
        </div>

      </div>
    </nav>
  )
}

export default Navbar