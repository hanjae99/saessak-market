import React from 'react'
import AdminNoticeBoard from './AdminNoticeBoard';
import ObjecttionViewer from './ObjecttionViewer';





const AdminBoardPage = ({ selectedCg, setModalData }) => {
  return (
    <div className='adminBoardBody'>
      {(() => {
        switch (selectedCg) {
          case '1':
            return <AdminNoticeBoard />
          case '2':
            return <ObjecttionViewer />
          default:
            return <AdminNoticeBoard />;
        }
      })()}
    </div>
  )
}

export default AdminBoardPage