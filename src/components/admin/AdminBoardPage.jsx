import React, { useState } from 'react'
import AdminNoticeBoard from './AdminNoticeBoard';
import ObjecttionBoard from './ObjecttionBoard';





const AdminBoardPage = ({ selectedCg, setModalData }) => {
  return (
    <div className='adminBoardBody'>
      {(() => {
        switch (selectedCg) {
          case '1':
            return <AdminNoticeBoard />
          case '2':
            return <ObjecttionBoard />
          default:
            return <AdminNoticeBoard />;
        }
      })()}
    </div>
  )
}

export default AdminBoardPage