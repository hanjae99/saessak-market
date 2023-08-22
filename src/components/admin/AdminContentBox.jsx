import React from 'react'
import AdminEdit from './AdminEdit'
import AdminViewer from './AdminViewer'

const AdminContentBox = React.memo(({selectedCg, setModalData, page, rsl, setRsl}) => {
  return (
    <div className='contentBox'>
      AdminContenntBox
      <AdminEdit setModalData={setModalData} page={page} />
      <AdminViewer selectedCg={selectedCg} setModalData={setModalData} page={page} rsl={rsl} setRsl={setRsl} />
    </div>
  )
}) 

export default AdminContentBox