import React from 'react'

function todom(div) {
  let dp1 = document.createElement(div.type);
  Object.keys(div.props).filter(p => p !== 'children').map(p => {
    if (p === 'class') {
      dp1.className = div.props[p];
    }
    else {
      dp1[p] = div.props[p];
    }
  });
  div.props.children && Array.isArray(div.props.children) ? div.props.children.map(p => dp1.appendChild(todom(p))) : typeof div.props.children === 'string' ? dp1.innerText = div.props.children : dp1.appendChild(todom(div.props.children));
  return dp1;
};
// let div = <div class="adminNav"><h1><a aria-current="page" class="active" href="/admin">관리자모드</a></h1><ul><li><a class="" href="/admin/productboard">상품게시판</a></li><li><a class="" href="/admin/freeboard">자유게시판</a></li><li><a class="" href="/admin/user">회원관리</a></li><li><a class="" href="/admin/adminboard">관리게시판</a></li></ul></div>;
// console.log('div : ', div)
// let todoms = todom(div);
// todoms.querySelector('.adminNav h1 a').innerText = '관리관리관리'
// console.log(todoms.outerHTML);

const AdminModal = ({modalData}) => {
  let {att, children} = modalData;
  att = att||{};
  children = children||'';
  return (
    <div className='adminModal' {...att}>{children}</div>
  )
}

export default AdminModal