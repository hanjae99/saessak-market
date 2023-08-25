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
            return <div>고객의소리</div>
          case '3':
            return <div>신고 게시판</div>
          case '4':
            return <ObjecttionBoard />
          default:
            return selectedCg;
        }
      })()}
    </div>
  )
}

export default AdminBoardPage