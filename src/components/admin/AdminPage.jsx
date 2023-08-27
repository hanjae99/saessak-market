import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import AdminCategory from './AdminCategory'
import AdminModal from './AdminModal'
import './AdminPage.css';
import AdminContentBox from './AdminContentBox'
import { useParams } from 'react-router-dom';

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
  useEffect(()=>{setSelectedCg()},[page])
  return (
    <div className='adminPage'>
      <AdminNav setModalData={setModalData} />
      <AdminCategory page={page} setSelectedCg={setSelectedCg} />
      <AdminContentBox page={page} selectedCg={selectedCg} setModalData={setModalData} rsl={rsl} setRsl={setRsl} />
      <AdminModal modalData={modalData} />
    </div>
  )
}

export default AdminPage