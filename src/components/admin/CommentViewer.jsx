import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { FaRegComment } from 'react-icons/fa'
import { RxEraser } from 'react-icons/rx'

const ProfileImg = ({ imgsrc }) => {
  return (
    <span className='cmt_ProfileImg'>
      {imgsrc === undefined || imgsrc === '' ? '?' : <img src={imgsrc} alt=''></img>}
    </span>
  )
}

const CmtBtnBox = ({ cs, children }) => {
  const style = { ...cs, position: 'absolute', top: '10px' };
  return (
    <div className='cmtBtnBox' style={style}>
      {children}
    </div>
  )
}

const CmtInputBox = ({ parent, parentId, isAnonymous, parentCommentId = '' }) => {
  const login = useSelector(state => state.login);
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();
  const btns = (<div onClick={e=>{
    e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none'
  }}><FaXmark />닫기</div>);
  console.log(login)
  return (
    login.id!=='' && <div className={parentCommentId === '' ? 'cmtInput' : 'cmtInput2'}>
      {parentCommentId === '' ? '' : <CmtBtnBox cs={{ right: '20px' }}>{btns}</CmtBtnBox>}
      <div className={parentCommentId === '' ? 'cmt_info' : 'cmt_info2'}>
        {parentCommentId === '' ? <div></div> : <span style={{ color: '#aaa', fontSize: '1.3rem' }}><BsArrowReturnRight /></span>}<strong>댓글쓰기</strong>
      </div>
      <div className={parentCommentId === '' ? 'cmtInput_textbox' : 'cmtInput_textbox2'}>
        <ProfileImg imgsrc={users.find(p => p.id === login.id).profileImg} />
        <div>
          <textarea />
        </div>
        <button onClick={e => {
          if (e.target.previousSibling.children[0].value === '') return;
          let tmp = {
            parent: parent,
            parentId: parentId+'',
            writer: login.id,
            content: e.target.previousSibling.children[0].value
          }
          tmp = parentCommentId === '' ? tmp : { ...tmp, parentCommentId };
          dispatch({ type: 'comments/add', payload: tmp })
          e.target.previousSibling.children[0].value = '';
        }}>등록</button>
      </div>
      {isAnonymous ? <div></div> : ''}
    </div>
  )
}

const Comments = ({ parent, parentId, isAnonymous = false, parentCommentId = '' }) => {
  parentId += '';
  const comments = useSelector(state => state.comments);
  const users = useSelector(state => state.user);
  const level = parentCommentId === '' ? 0 : ck(parentCommentId, 0);
  function ck(pci, lv) {
    let a = comments.find(p => p.commentId === pci);
    if (a !== undefined) {
      return ck(a.parentCommentId, ++lv);
    } else {
      return lv;
    }
  }
  const btns = (
    <>
      <div><BsPencil /><span>수정</span></div>
      <div><RxEraser /><span>삭제</span></div>
      <div onClick={e=>{
        let tmp = e.currentTarget.parentElement.nextSibling;
        tmp = tmp.children[tmp.children.length-1];
        tmp.children[tmp.children.length-1].style.display='block';
      }}><FaRegComment /><span>댓글</span></div>
    </>
  );
  return (
    <>
      {comments.filter(p => p.parent === parent && p.parentId === parentId && p.parentCommentId+'' === parentCommentId+'').map(p =>
        <div key={p.commentId} style={{ position: 'relative' }}
          onMouseOver={e => {
            e.stopPropagation();
            e.currentTarget.children[0].style.display = 'block';
          }}
          onMouseOut={e => {
            e.stopPropagation();
            e.currentTarget.children[0].style.display = 'none';
          }}
        >
          <CmtBtnBox cs={{ right: '40px', display: 'none' }} >{btns}</CmtBtnBox>
          <div className='commentBox_cmtInfo' style={{ paddingLeft: level * 20 + 'px' }}>
            {parentCommentId === '' ? '' : <span style={{ color: '#aaa', fontSize: '2rem', margin: '0 15px' }}><BsArrowReturnRight /></span>}
            <ProfileImg imgsrc={users.find(q => q.id === p.writer).profileImg} />
            <div>
              <div className='cmt_writeData'>
                <strong>{users.find(q => q.id === p.writer).nickname}</strong>
                <span>{new Date(p.upTime).toLocaleString()}</span>
              </div>
              {p.content.split('\n').map((p, i) => <p key={'text' + i}>{p === '' ? '　' : p}</p>)}
              <div className='cmt_hover_button'>

              </div>
              <div className='re_cmt_inputbox' style={{display:'none'}} >
                <CmtInputBox isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.commentId} />
              </div>
            </div>
          </div>
          <hr />
          <Comments isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.commentId} />
        </div>)}
    </>
  )
}


const CommentViewer = ({ parent, parentId, isAnonymous = false }) => {
  const comments = useSelector(state => state.comments);
  return (
    <div className='commentBox'>
      <CmtInputBox isAnonymous={isAnonymous} parent={parent} parentId={parentId} />
      <div className='commentCount'>comments '
        <strong>
          {comments
            .filter(p => p.parent === parent && p.parentId === parentId).length > 0 ?
            comments.filter(p => p.parent === parent && p.parentId === parentId).length : 0}

        </strong>'
      </div>
      <Comments isAnonymous={isAnonymous} parent={parent} parentId={parentId} />
    </div>
  )
}

export default CommentViewer

// commentId: '10000',
// upTime: "2023.08.21 05:39",
// fixTime: "2023.08.21 05:39",
// parent: 'objection',
// parentId: '100000',
// parentCommentId:'1234',
// writer: 'psh',
// content : '풀어줘요!!'