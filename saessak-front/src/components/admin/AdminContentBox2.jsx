import React from 'react'
import AdminUserPage from './AdminUserPage'
import AdminImage from './AdminImage'

const AdminContentBox2 = React.memo(({ selectedCg, setModalData, page, rsl, setRsl }) => {
  return (
    <div className='admincontentBox2'>
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