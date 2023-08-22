import React from 'react'
import category from '../../category.json'



const AdminCategory = ({ page, setSelectedCg }) => {
  let mainCtg = [];
  let middleCtg = [];
  let subCtg = [];
  // rsl.forEach(p => allCtg = [...allCtg, ...p.categories.split(',')])
  mainCtg = category.filter(p => p.categoryno / 1 < 21).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);
  middleCtg = category.filter(p => p.categoryno / 1 > 20 && p.categoryno / 1 < 1000).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);
  subCtg = category.filter(p => p.categoryno / 1 > 999).sort((a, b) => a.categoryno.length === b.categoryno.length ? a.categoryno > b.categoryno ? 1 : -1 : a.categoryno.length > b.categoryno.length ? 1 : -1);

  const onContextMenu = (e) => {
    let targetSiblings = [];
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
    gps(e.target);
    gns(e.target);
    e.preventDefault();
    for (let i = 0; i < e.target.children.length; i++) {
      if (e.target.children[i].nodeName === 'UL') {
        if (e.target.children[i].style.display === 'none') {
          e.target.children[i].style.display = 'block'
          for (let j = 0; j < targetSiblings.length; j++) {
            targetSiblings[j].children[0].style.display = 'none'
          }
        }
        else {
          e.target.children[i].style.display = 'none'
        }
      }
    }
  }

  const onClick = (e, p) => {
    if (e.target !== e.currentTarget) return;
    // console.log(p)
    setSelectedCg(p);
  }

  return (
    <div className='adminCategory'>
      <div onClick={(e) => setSelectedCg('')}>전부보기</div>
      <ul>
        {mainCtg.map(mainCt =>
          <li key={mainCt.categoryno} onContextMenu={onContextMenu} onClick={(e) => onClick(e, mainCt.categoryno)} >
            {mainCt.categoryname}
            <ul style={{ display: 'none' }}>
              {middleCtg.filter(p => p.categorypr === mainCt.categoryname).map(middleCt =>
                <li key={middleCt.categoryno} onClick={(e) => onClick(e, middleCt.categoryno)} >
                  {middleCt.categoryname}
                  <ul style={{ display: 'none' }}>
                    {subCtg.filter(p => p.categorypr === middleCt.categoryname).map(subCt =>
                      <li key={subCt.categoryno} onClick={(e) => onClick(e, subCt.categoryno)} >
                        {subCt.categoryname}
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