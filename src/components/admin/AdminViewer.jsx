import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ViewerHeader = ({ viewMode, setViewMode }) => {
  const  [text, setText]  = useState('');
  const dispatch = useDispatch();
  const startDate = useSelector(state=>state.adminData.startDate);
  const endDate = useSelector(state=>state.adminData.endDate);
  const startTime = useSelector(state=>state.adminData.startTime);
  const endTime = useSelector(state=>state.adminData.endTime);

  return (
    <div>
      <div>
        검색시간 :
        <input type='Date' onChange={e=>dispatch({type:'adminData/setSD',payload:e.target.value})} defaultValue={startDate} max={endDate} />
        <input type='Time' onChange={e=>dispatch({type:'adminData/setST',payload:e.target.value})} defaultValue={startTime}/>
        ~
        <input type='Date' onChange={e=>dispatch({type:'adminData/setED',payload:e.target.value})} defaultValue={endDate} min={startDate} />
        <input type='Time' onChange={e=>dispatch({type:'adminData/setET',payload:e.target.value})} defaultValue={endTime}/>
        검색필터 :
        <input type="text" placeholder='입력후 엔터입력. 콤마로 구분.' onBlur={e=>e.target.value = text} onKeyUp={(e) => {
          if (e.key !== "Enter") return;
          setViewMode({ ...viewMode, filter: e.target.value });
          setText(e.target.value);
        }} />
        <select name="보기모드" onChange={(e) => { setViewMode({ ...viewMode, mode: e.target.value }) }} defaultValue='ImageOnly'>
          <option value="ImageOnly">ImageOnly</option>
          <option value="Line">Line</option>
          <option value="Grid">Grid</option>
        </select>
        <input type='range' min='1' max='5' defaultValue={1} onChange={(e) => { setViewMode({ ...viewMode, viewSize: e.target.value }) }} />
      </div>
    </div>
  )
}
const ViewerBody = ({ viewMode }) => {
  const { mode, viewSize, filter } = viewMode;
  const startDate = useSelector(state=>state.adminData.startDate);
  const endDate = useSelector(state=>state.adminData.endDate);
  const startTime = useSelector(state=>state.adminData.startTime);
  const endTime = useSelector(state=>state.adminData.endTime);
  return (
    <div>
      AdminViewerBody
      <br />
      mode:{mode}
      <br />
      viewSize:{viewSize}
      <br />
      filter:{filter}
      <br />
      startDate:{startDate}
      <br />
      startTime:{startTime}
      <br />
      endDate:{endDate}
      <br />
      endTime:{endTime}
    </div>
  )
}

const AdminViewer = () => {
  const [viewMode, setViewMode] = useState({ mode: 'ImageOnly', viewSize: 1, filter: '' });
  
  return (
    <div className='adminViewer'>
      <ViewerHeader viewMode={viewMode} setViewMode={setViewMode} />
      <ViewerBody viewMode={viewMode} />
    </div>
  )
}


export default AdminViewer