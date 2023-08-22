import React, { useEffect, useMemo, useRef, useState } from 'react'
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


let rs = [];

const ViewerBody = ({ viewMode, setViewMode, setModalData, page, rsl, setRsl, selectedCg }) => {
  const { mode, viewSize, filter } = viewMode;
  const dispatch = useDispatch();
  const startDate = useSelector(state => state.adminData.startDate);
  const endDate = useSelector(state => state.adminData.endDate);
  const startTime = useSelector(state => state.adminData.startTime);
  const endTime = useSelector(state => state.adminData.endTime);
  const products = useSelector(state => state.product);
  const board = useSelector(state => state.board);
  const divRef = useRef();


  useEffect(() => { setViewMode({ ...viewMode, viewSize: 1 }) }, [])
  useEffect(() => {
    let d1, d2;
    if (page === 'productboard' || page === '') {
      d1 = products;
      d2 = 'uptime';
    }
    else {
      d1 = board;
      d2 = 'date';
    }
    rs = ((ary, dateName) => {
      ary = ary.filter(p => new Date(p[dateName]) >= new Date(startDate + ' ' + startTime) && new Date(p[dateName]) <= new Date(endDate + ' ' + endTime));
      if (filter !== '') {
        if (filter.indexOf(',') > 0) {
          let fi = filter.split(',');
          for (let i = 0; i < fi.length; i++) {
            ary = ary.filter(p => p.name.indexOf(fi[i]) >= 0 || p.text.indexOf(fi[i]) >= 0)
          }
        }
        else {
          ary = ary.filter(p => p.name.indexOf(filter) >= 0 || p.text.indexOf(filter) >= 0);
        }
      }
      if (selectedCg) {
        ary = ary.filter(p => {
          // console.log('selectedCg',selectedCg);
          // console.log('f',p.categories.split(',').find(p=>p===selectedCg));
          return p.categories.split(',').find(p=>p===selectedCg)!==undefined;
        });
      }
      return ary;
    })(d1, d2);
    setRsl(rs);
  }, [startDate, startTime, endDate, endTime, mode, viewSize, filter, page, products, board, setRsl, selectedCg])

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
      <span style={{ position: 'fixed', transform: 'translateY(-25px)' }}>검색결과 : {rsl.length}건</span> <br />
      {(() => {
        if (!divRef.current) return;
        let wd = divRef.current.clientWidth;
        let mg = 20 + viewSize * 2;
        let ct = Math.floor(wd / (82 * viewSize + mg));

        if (page === 'productboard' || page === '') {

          return rs.map((p, i) =>
            <div
              onClick={
                (e) => {
                  let modalData = {
                    att: {
                      style: {
                        display: 'block',
                        top: '200px',
                        left: '200px',
                        background: 'black',
                        color: '#fff',
                        width: '70%',
                        height: '600px'
                      },
                      onClick: (e) => setModalData({ ...modalData, att: { ...modalData.att, style: {} } })
                    },
                    children: (
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '360px', height: '600px', padding: '10px' }}>
                          <img src={p.imgsrc1} alt="" style={{ width: '280px', height: '270px' }} /> <br /><br />
                          <img src={p.imgsrc2} alt="" style={{ width: '280px', height: '270px' }} />
                        </div>
                        <div>
                          {p.categories}<br />
                          제목 : {p.name} <br />
                          가격 : {p.price}<br />
                          내용 <br />
                          {p.text}<br />
                        </div>
                      </div>
                    )
                  }
                  setModalData(modalData);
                }
              }
              onContextMenu={e => { e.preventDefault(); dispatch({ type: 'adminData/addSP', payload: p.id }) }}
              key={p.id}
              style={
                {
                  width: 80 * viewSize + 'px',
                  height: 160 * viewSize + 'px',
                  position: 'absolute',
                  left: i % ct * 82 * viewSize + (i % ct + 1) * mg + 'px',
                  top: Math.floor(i / ct) * 164 * viewSize + (Math.floor(i / ct) + 1) * mg + 'px'
                }
              }>
              {p.imgsrc1 && <img src={p.imgsrc1} alt='' style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}
              {p.imgsrc2 && <img src={p.imgsrc2} alt='' style={{ width: 80 * viewSize + 'px', height: 80 * viewSize + 'px' }}></img>}
            </div>)
        }
      })()}
      {(() => {
        if (mode !== 'ImageOnly2') return;
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
            // rs = rs2;
            return rs2.map((p, i) => <div onClick={
              (e) => {
                let modalData = {
                  att: {
                    style: { display: 'block', top: '200px', left: '200px', background: 'black', color: '#fff', width: '70%', height: '600px' }, onClick: (e) => setModalData(
                      { ...modalData, att: { ...modalData.att, style: {} } })
                  },
                  children: (
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '50%', height: '600px' }}>
                        <img src={p.imgsrc1} alt="" />
                        <img src={p.imgsrc2} alt="" />
                      </div>
                      <div>
                        {p.categories}<br />
                        제목 : {p.name}{'  '} 가격 : {p.price}<br />
                        내용 <br />
                        {p.text}<br />
                      </div>
                    </div>
                  )
                }
                setModalData(modalData);
              }
            } onContextMenu={e => {
              e.preventDefault();
              dispatch({ type: 'adminData/addSP', payload: p.id })
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
            // rs = rs2;
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

const AdminViewer = ({ setModalData, page, rsl, setRsl, selectedCg }) => {
  const [viewMode, setViewMode] = useState({ mode: 'ImageOnly', viewSize: 1, filter: '' });

  return (
    <div className='adminViewer'>
      <ViewerHeader viewMode={viewMode} setViewMode={setViewMode} />
      <ViewerBody viewMode={viewMode} setViewMode={setViewMode} setModalData={setModalData} page={page} rsl={rsl} setRsl={setRsl} selectedCg={selectedCg} />
    </div>
  )
}


export default AdminViewer