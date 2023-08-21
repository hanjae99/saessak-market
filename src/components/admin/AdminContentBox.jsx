import React from 'react'
import AdminEdit from './AdminEdit'
import AdminViewer from './AdminViewer'

const AdminContentBox = React.memo(({setModalData, page}) => {
  return (
    <div className='contentBox'>
      AdminContenntBox
      <AdminEdit setModalData={setModalData} page={page} />
      <AdminViewer setModalData={setModalData} page={page} />
    </div>
  )
}) 

export default AdminContentBox