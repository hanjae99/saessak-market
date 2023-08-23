import React from 'react'
import AdminEdit from './AdminEdit'
import AdminViewer from './AdminViewer'
import AdminUserPage from './AdminUserPage'

const AdminContentBox = React.memo(({ selectedCg, setModalData, page, rsl, setRsl }) => {
  return (
    <div className='contentBox'>
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
        }
      })()}

    </div>
  )
})

export default AdminContentBox