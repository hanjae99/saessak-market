import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { call } from '../../ApiService';
import { API_BASE_URL } from '../../ApiConfig';

const AdminUserPage = () => {

  const [users, setUsers] = useState();

  useEffect(() => {

    const url = "/admin/getusers";
    call(url, "GET").then((response) => {
      console.log(response)
      setUsers(response.list);
    })

  }, [])



  return (
    <div className='adminUserPage'>
      {users && users.map(p =>
        <div key={p.id} className='adminUserBox'
          onMouseOver={() => { }}
          onMouseOut={() => { }}
          onClick={() => { }}
        >
          <div>
            {p.profileImgUrl ? (<img src={API_BASE_URL + p.profileImgUrl} alt="" />) : "?"}
          </div>
          <div>
            <span>NickName : {p.nickName}</span><span>ID : {p.userId}</span><span>gender : {p.gender}</span><br />
            <span>phone : {p.phone}</span><span>email : {p.email}</span><br />
            <span>address : {p.address}</span>
          </div>
          <div style={{ position: 'relative' }}>
            {p.role}
            {(() => {
              const style = { position: 'absolute', bottom: 10, right: 10, padding: '5px' };
              const content = p.role === 'USER' ? '차단하기' : p.role === 'BLACKED' ? '차단해제' : p.role === 'DELETED' ? '복구하기' : '';
              const onClick = () => {
                const url = "/admin/setuser/" + p.role.toLowerCase() + "/" + p.id;
                console.log(url);
                call(url, "GET").then((response) => {
                  console.log(response)
                  const url = "/admin/getusers";
                  call(url, "GET").then((response) => {
                    console.log(response)
                    setUsers(response.list);
                  })
                })
              };

              return (<button style={style} onClick={onClick}>{content}</button>)

            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUserPage

// id: "admin",
// nickname: "관리자",
// pwd: "1111",
// name: "관리자",
// email: "saessak@gmail.com",
// phone: "01011112222",
// address: "관악구",
// gender: "male",