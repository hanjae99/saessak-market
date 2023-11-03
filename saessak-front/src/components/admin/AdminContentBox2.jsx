import React from 'react'
import AdminUserPage from './AdminUserPage'
import AdminBoardPage from './AdminBoardPage'
import AdminImage from './AdminImage'

const AdminContentBox2 = React.memo(({ selectedCg, setModalData, page, rsl, setRsl }) => {
  return (
    <div className='admincontentBox'>
      {(() => {
        if (page === 'image' || page === '') {
          return (
            <>
              <AdminImage setModalData={setModalData} />
            </>
          )
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

export default AdminContentBox2