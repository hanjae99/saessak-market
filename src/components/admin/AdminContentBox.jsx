import React from 'react'
import AdminEdit from './AdminEdit'
import AdminViewer from './AdminViewer'
import AdminUserPage from './AdminUserPage'
import AdminBoardPage from './AdminBoardPage'

const AdminContentBox = React.memo(({ selectedCg, setModalData, page, rsl, setRsl }) => {
  return (
    <div className='admincontentBox'>
      {(() => {
        if (page === 'freeboard' || page === 'productboard' || page === '') {
          return (<>
            <AdminEdit setModalData={setModalData} page={page} />
            <AdminViewer selectedCg={selectedCg} setModalData={setModalData} page={page} rsl={rsl} setRsl={setRsl} />
          </>)
        } else if (page === 'user') {
          return (
            <>
              <AdminUserPage selectedCg={selectedCg} setModalData={setModalData} />
            </>
          )
        } else if (page === 'adminboard') {
          return (
            <>
              <AdminBoardPage selectedCg={selectedCg} setModalData={setModalData} />
            </>
          )
        }
      })()}

    </div>
  )
})

export default AdminContentBox