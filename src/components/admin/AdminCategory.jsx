import React, { useState } from 'react'
import category from '../../category.json'
import { PiMinusSquareBold, PiPlusSquareBold } from 'react-icons/pi'
import { CgMenu } from 'react-icons/cg'


const AdminCategory = ({ page, setSelectedCg }) => {
  // {"categoryno":"10","categoryname":"가구/인테리어","categorypr":"null"}
  const [clickedCtg, setClickedCtg] = useState(0);
  let mainCtg = [];
  let middleCtg = [];
  let subCtg = [];
  // rsl.forEach(p => allCtg = [...allCtg, ...p.categories.split(',')])
  if (page === 'productboard' || page === ''){
    mainCtg = category.filter(p => p.categoryno / 1 < 21).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);
    middleCtg = category.filter(p => p.categoryno / 1 > 20 && p.categoryno / 1 < 1000).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);
    subCtg = category.filter(p => p.categoryno / 1 > 999).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);

  } else if (page === 'user') {
    mainCtg = [
      {categoryno:"1",categoryname:"일반 회원관리",categorypr:"null"},
      {categoryno:"2",categoryname:"차단된 회원관리",categorypr:"null"}
    ]
  } else if (page === 'adminboard') {
    mainCtg = [
      {categoryno:"1",categoryname:"공지사항",categorypr:"null"},
      {categoryno:"2",categoryname:"이의제기 게시판",categorypr:"null"},
    ]
  }



  const onContextMenu = (e) => {
    // console.log(e.target)
    let targetSiblings = [];
    let tp = e.target.nodeName === 'svg' ? e.target.parentElement.parentElement :  e.target.nodeName === 'path' ? e.target.parentElement.parentElement.parentElement :  e.target.parentElement;
    let path = e.target.nodeName === 'svg' ? e.target.parentElement :  e.target.nodeName === 'path' ? e.target.parentElement.parentElement :  e.target;
    const ps = p => p.previousSibling;
    const ns = p => p.nextSibling;
    function gps(a) {
      if (ps(a)) {
        targetSiblings.push(ps(a));
        gps(ps(a));
      }
    }
    function gns(a) {
      if (ns(a)) {
        targetSiblings.push(ns(a));
        gns(ns(a));
      }
    }
    gps(tp);
    gns(tp);
    e.preventDefault();
    // e.target.parentElement.style.background='#aaa'
    for (let i = 0; i < tp.children.length; i++) {
      if (tp.children[i].nodeName === 'UL') {
        if (tp.children[i].style.display === 'none') {
          path.children[0].style.display = 'none';
          path.children[1].style.display = 'inline';
          tp.children[i].style.display = 'block';
          for (let j = 0; j < targetSiblings.length; j++) {
            targetSiblings[j].children[2].style.display = 'none';
            targetSiblings[j].children[1].children[0].style.display = 'inline';
            targetSiblings[j].children[1].children[1].style.display = 'none';
            targetSiblings[j].style.background = '';
          }
        }
        else {
          path.children[0].style.display = 'inline';
          path.children[1].style.display = 'none';
          tp.children[i].style.display = 'none';
        }
      }
    }
  }

  const onClick = (e, p) => {
    // console.log(e.target.parentElement)
    // console.log(e.currentTarget)
    // console.log(e.target)
    // console.log(e.target.innerText)
    if (e.target.parentElement !== e.currentTarget || e.target.nodeName === 'svg') return;
    // console.log(p)
    setClickedCtg(p);
    setSelectedCg(p);
  }

  return (
    <div className='adminCategory'>
      <div className='adminCategoryMenu' onClick={e=>{
        let tp = e.target.nodeName === 'svg' ? e.target.parentElement.parentElement :  e.target.nodeName === 'path' ? e.target.parentElement.parentElement.parentElement :  e.target.parentElement;
        if (tp.children[1].style.display === 'none') {
          tp.children[1].style.display = 'block'
          if (tp.children[2]) tp.children[2].style.display = 'block'
        }
        else {
          tp.children[1].style.display = 'none'
          if (tp.children[2]) tp.children[2].style.display = 'none'
        }
          
      }}>
        <CgMenu />
      </div>
      {page!=='adminboard' ? <div style={clickedCtg===0?{background:'rgb(238, 255, 213)'}:{}} onClick={(e) => { setClickedCtg(0); setSelectedCg('');}}>전부보기</div> : ''}
      <ul>
        {mainCtg.map(mainCt =>
          <li key={mainCt.categoryno} onClick={(e) => onClick(e, mainCt.categoryno)} style={clickedCtg===mainCt.categoryno?{background:'rgb(238, 255, 213)'}:{}}>
            <div style={{ width: '80%'}}>{mainCt.categoryname}</div>
            <div style={{ width: '20%', textAlign: 'center', position: 'absolute', right: '0px', top: '0px', display: middleCtg.filter(p => p.categorypr === mainCt.categoryname).length > 0 ? 'block' : 'none'  }} onClick={onContextMenu} ><PiPlusSquareBold /><PiMinusSquareBold style={{display:'none'}} /></div>
            <ul style={{ display: 'none' }}>
              {middleCtg.filter(p => p.categorypr === mainCt.categoryname).map(middleCt =>
                <li key={middleCt.categoryno} onClick={(e) => onClick(e, middleCt.categoryno)} style={clickedCtg===middleCt.categoryno?{background:'rgb(238, 255, 213)'}:{}} >
                  <div style={{ width: '80%' }}>{middleCt.categoryname}</div>
                  <div style={{ width: '20%', textAlign: 'center', position: 'absolute', right: '0px', top: '0px', display: subCtg.filter(p => p.categorypr === middleCt.categoryname).length > 0 ? 'block' : 'none' }} onClick={onContextMenu} ><PiPlusSquareBold /><PiMinusSquareBold style={{display:'none'}} /></div>
                  <ul style={{ display: 'none' }}>
                    {subCtg.filter(p => p.categorypr === middleCt.categoryname).map(subCt =>
                      <li key={subCt.categoryno} onClick={(e) => onClick(e, subCt.categoryno)} style={clickedCtg===subCt.categoryno?{background:'rgb(238, 255, 213)'}:{}} >
                        <div style={{ width: '80%' }}>{subCt.categoryname}</div>
                      </li>
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AdminCategory