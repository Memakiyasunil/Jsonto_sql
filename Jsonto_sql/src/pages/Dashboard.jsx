import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import FileUpload from '../components/upload/FileUpload'
import ColumnSelector from '../components/columns/ColumnSelector'
import SqlPreview from '../components/sql/SqlPreview'

function Dashboard() {
  const [jsonData, setJsonData] = useState([])
  const [selectedColumns, setSelectedColumns] = useState({})
  const [queryType, setQueryType] = useState('INSERT')
  const [generatedQuery, setGeneratedQuery] = useState('')

  return (
    <div className='main-layout'>
      <Navbar />

      <div className='d-flex'>
        <Sidebar setQueryType={setQueryType} />

        <div className='content-area'>
          <Header queryType={queryType} />

          <FileUpload
            setJsonData={setJsonData}
            setSelectedColumns={setSelectedColumns}
          />

          {jsonData.length > 0 && (
            <>
              <ColumnSelector
                jsonData={jsonData}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
              />

              <SqlPreview
                jsonData={jsonData}
                selectedColumns={selectedColumns}
                queryType={queryType}
                generatedQuery={generatedQuery}
                setGeneratedQuery={setGeneratedQuery}
              />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard