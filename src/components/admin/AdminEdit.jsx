import React from 'react'

const EditBody = () => {
  return (
    <div>
      EditBody
    </div>
  )
}



const AdminEdit = () => {
  return (
    <div className='adminEdit'>
      <EditBody />
      <button>숨김처리</button>
      <button>숨김+차단</button>
      <button>비우기</button>
    </div>
  )
}

export default AdminEdit