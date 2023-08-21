import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ViewerHeader = ({ viewMode, setViewMode }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const startDate = useSelector(state => state.adminData.startDate);
  const endDate = useSelector(state => state.adminData.endDate);
  const startTime = useSelector(state => state.adminData.startTime);
  const endTime = useSelector(state => state.adminData.endTime);

  return (
    <div>
      <div>
        검색시간 :
        <input type='Date' onChange={e => dispatch({ type: 'adminData/setSD', payload: e.target.value })} defaultValue={startDate} max={endDate} />
        <input type='Time' onChange={e => dispatch({ type: 'adminData/setST', payload: e.target.value })} defaultValue={startTime} />
        ~
        <input type='Date' onChange={e => dispatch({ type: 'adminData/setED', payload: e.target.value })} defaultValue={endDate} min={startDate} />
        <input type='Time' onChange={e => dispatch({ type: 'adminData/setET', payload: e.target.value })} defaultValue={endTime} />
        검색필터 :
        <input type="text" placeholder='입력후 엔터입력. 콤마로 구분.' onBlur={e => e.target.value = text} onKeyUp={(e) => {
          if (e.key === 'Escape') {
            console.log(e.key)
            setText('');
            e.target.value = '';
            setViewMode({ ...viewMode, filter: '' });
            return;
          }
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



const ViewerBody = ({ viewMode, setViewMode, setModalData, page }) => {
  const { mode, viewSize, filter } = viewMode;
  const dispatch = useDispatch();
  const startDate = useSelector(state => state.adminData.startDate);
  const endDate = useSelector(state => state.adminData.endDate);
  const startTime = useSelector(state => state.adminData.startTime);
  const endTime = useSelector(state => state.adminData.endTime);
  const products = useSelector(state => state.product);
  const board = useSelector(state => state.board);
  const divRef = useRef();
  const [rsl, setRsl] = useState(0);
  let rs=[];

  useEffect(() => { setViewMode({ ...viewMode, viewSize: 1 }) }, [])
  useEffect(()=>{setRsl(rs.length)},[rs])
  return (
    <div ref={divRef} style={{ position: 'relative', overflow: 'auto' }}>
      {/* AdminViewerBody
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
      <br />
      width:{ divRef.current && divRef.current.clientWidth } */}
      <span style={{position:'fixed', transform:'translateY(-25px)'}}>검색결과 : {rsl}건</span> <br />
      {(() => {
        if (mode === 'ImageOnly') {
          if (!divRef.current) return;
          let wd = divRef.current.clientWidth;
          let mg = 20 + viewSize * 2;
          let ct = Math.floor(wd / (82 * viewSize + mg));
          if (page === 'productboard' || page === '') {
            let rs2 = products;
            rs2 = rs2.filter(p => new Date(p.uptime) >= new Date(startDate + ' ' + startTime) && new Date(p.uptime) <= new Date(endDate + ' ' + endTime));
            if (filter !== '') {
              if (filter.indexOf(',') > 0) {
                let fi = filter.split(',');
                for (let i = 0; i < fi.length; i++) {
                  rs2 = rs2.filter(p => p.name.indexOf(fi[i]) >= 0 || p.text.indexOf(fi[i]) >= 0)
                }
              }
              else {
                rs2 = rs2.filter(p => p.name.indexOf(filter) >= 0 || p.text.indexOf(filter) >= 0);
              }
            }
            rs = rs2;
            return rs2.map((p, i) => <div onClick={
              (e) => {
                let modalData = {
                  att: {
                    style: { display: 'block', top: '200px', left: '200px', background: 'black', color: '#fff', width: '70%', height: '600px' }, onClick: (e) => setModalData(
                      { ...modalData, att: { ...modalData.att, style: {} } })
                  },
                  children: (
                    <div>
                      {p.id}<br />
                      {p.name}<br />
                      {p.price}<br />
                      {p.text}<br />
                      {p.imgsrc1}<br />
                      {p.imgsrc2}<br />
                      {p.categories}<br />
                    </div>
                  )
                }
                setModalData(modalData);
              }
            } onContextMenu={e=> {
              e.preventDefault();
              dispatch({type:'adminData/addSP', payload:p.id})
            }} key={p.id} style={{ width: 80 * viewSize + 'px', height: 160 * viewSize + 'px', position: 'absolute', left: i % ct * 82 * viewSize + (i % ct + 1) * mg + 'px', top: Math.floor(i / ct) * 164 * viewSize + (Math.floor(i / ct) + 1) * mg + 'px' }}>{p.imgsrc1 && <img src={p.imgsrc1} alt='img1' style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}{p.imgsrc2 && <img src={p.imgsrc2} alt={""} style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}</div>)
          }
          if (page === 'freeboard') {
            let rs2 = board;
            rs2 = rs2.filter(p => new Date(p.date) >= new Date(startDate + ' ' + startTime) && new Date(p.date) <= new Date(endDate + ' ' + endTime));
            if (filter !== '') {
              if (filter.indexOf(',') > 0) {
                let fi = filter.split(',');
                for (let i = 0; i < fi.length; i++) {
                  rs2 = rs2.filter(p => p.title.indexOf(fi[i]) >= 0 || p.content.indexOf(fi[i]) >= 0)
                }
              }
              else {
                rs2 = rs2.filter(p => p.title.indexOf(filter) >= 0 || p.content.indexOf(filter) >= 0);
              }
            }
            rs = rs2;
            return rs2.map((p, i) => <div onClick={
              (e) => {
                let modalData = {
                  att: {
                    style: { display: 'block', top: '200px', left: '200px', background: 'black', color: '#fff', width: '70%', height: '600px' }, onClick: (e) => setModalData(
                      { ...modalData, att: { ...modalData.att, style: {} } })
                  },
                  children: (
                    <div>
                      {p.id}<br />
                      {p.title}<br />
                      {p.content}<br />
                      {p.clicked}<br />
                      {p.date}<br />
                    </div>
                  )
                }
                setModalData(modalData);
              }
            } onContextMenu={(e) => {
              e.preventDefault();

            }} key={p.id} style={{ width: 80 * viewSize + 'px', height: 160 * viewSize + 'px', position: 'absolute', left: i % ct * 82 * viewSize + (i % ct + 1) * mg + 'px', top: Math.floor(i / ct) * 164 * viewSize + (Math.floor(i / ct) + 1) * mg + 'px' }}>{p.imgsrc1 && <img src={p.imgsrc1} alt='img1' style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}{p.imgsrc2 && <img src={p.imgsrc2} alt={""} style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}</div>)
          }

        }
      })()
      }
    </div>
  )
}

const AdminViewer = ({ setModalData, page }) => {
  const [viewMode, setViewMode] = useState({ mode: 'ImageOnly', viewSize: 1, filter: '' });

  return (
    <div className='adminViewer'>
      <ViewerHeader viewMode={viewMode} setViewMode={setViewMode} />
      <ViewerBody viewMode={viewMode} setViewMode={setViewMode} setModalData={setModalData} page={page} />
    </div>
  )
}


export default AdminViewer