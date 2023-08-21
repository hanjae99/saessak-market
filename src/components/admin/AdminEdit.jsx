import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditBody = ({ page }) => {
  const pitem = useSelector(state => state.adminData.select_pitem);
  const pboard = useSelector(state => state.product)
  const fboard = useSelector(state => state.board)
  const data = page === 'productboard' ? pboard : fboard;
  const dispatch = useDispatch();
  let interval = [];
  let kd = false;
  return (
    <div style={{ position: 'relative', display: 'flex', height:'100px' }}>
      <button style={{ position: 'relative', padding: '11px', fontSize: '1.2rem' }}
        onMouseDown={(e) => {
          kd = true;
          if (parseInt(e.target.nextElementSibling.children[0].style.marginLeft) < 15 - 100)
            e.target.nextElementSibling.children[0].style.marginLeft = parseInt(e.target.nextElementSibling.children[0].style.marginLeft) + 100 + 'px';
          setTimeout(() => {
            if (kd) {
              interval.push(setInterval(() => {
                if (parseInt(e.target.nextElementSibling.children[0].style.marginLeft) < 15)
                  e.target.nextElementSibling.children[0].style.marginLeft = parseInt(e.target.nextElementSibling.children[0].style.marginLeft) + 6 + 'px';
              }, 10))
            }
          }, 500)
        }}
        onMouseUp={() => {
          kd = false;
          for (let i=0; i<interval.length; i++) {
            clearInterval(interval.pop());
          }
        }} >{'<'}</button>
      <div style={{ display: 'flex', width: '700px', position: 'relative', overflow: 'hidden', alignItems:'center' }}>
        {pitem && pitem.map(p => <div key={p} style={{ marginLeft: '15px', height:'80px' }} onContextMenu={e=>{
          e.preventDefault();
          dispatch({type:'adminData/delSP',payload:p});
        }} >{data.map(q => q.id === p ? <img key={q.id} style={{ width: '80px', height: '80px' }} src={q.imgsrc1} alt=''></img> : '')}</div>)}
      </div>
      <button style={{ position: 'relative', right: '0px', padding: '11px', fontSize: '1.2rem' }}
        onMouseDown={(e) => {
          kd = true;
          if (parseInt(e.target.previousElementSibling.children[0].style.marginLeft) > 840 - e.target.previousElementSibling.children.length * 100)
            e.target.previousElementSibling.children[0].style.marginLeft = parseInt(e.target.previousElementSibling.children[0].style.marginLeft) - 100 + 'px';
          setTimeout(() => {
            if (kd) {
              interval.push(setInterval(() => {
                if (parseInt(e.target.previousElementSibling.children[0].style.marginLeft) > 740 - e.target.previousElementSibling.children.length * 100)
                  e.target.previousElementSibling.children[0].style.marginLeft = parseInt(e.target.previousElementSibling.children[0].style.marginLeft) - 6 + 'px';
              }, 10))
            }
          }, 500)
        }}
        onMouseUp={() => {
          kd = false;
          for (let i=0; i<interval.length; i++) {
            clearInterval(interval.pop());
          }
        }}>{'>'}</button>
    </div>
  )
}



const AdminEdit = ({ page }) => {
  return (
    <div className='adminEdit'>
      <EditBody page={page} />
      <button style={{ position: 'absolute', right: '5px', top: '15px' }}>숨김처리</button>
      <button style={{ position: 'absolute', right: '5px', top: '40px' }}>숨김+차단</button>
      <button style={{ position: 'absolute', right: '5px', top: '65px' }}>비우기</button>
    </div>
  )
}

export default AdminEdit