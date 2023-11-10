import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import AdminModal from './AdminModal'
import './AdminPage.css';
import AdminContentBox2 from './AdminContentBox2'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminPage = () => {
  let {page} = useParams();
  page = page || '';
  const [selectedCg, setSelectedCg] = useState();
  const [modalData, setModalData] = useState({
    att: { style: {}, onClick:()=>{} },
    children: (
      <div>
      </div>
    )
  });
  const [rsl, setRsl] = useState([]);
  const dispatch = useDispatch()
  useEffect(()=>{
    setSelectedCg()
    dispatch({type:'login/login',payload:'admin'})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])
  return (
    <div className='adminPage'>
      <AdminNav page={page} setModalData={setModalData} />
      {/* <AdminCategory page={page} setSelectedCg={setSelectedCg} /> */}
      {/* <AdminContentBox page={page} selectedCg={selectedCg} setModalData={setModalData} rsl={rsl} setRsl={setRsl} /> */}
      <AdminContentBox2 page={page} selectedCg={selectedCg} setModalData={setModalData} rsl={rsl} setRsl={setRsl} />




      <AdminModal modalData={modalData} />
    </div>
  )
}

export default AdminPage