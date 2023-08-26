import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfileImg = ({ imgsrc }) => {
  return (
    <span className='cmt_ProfileImg'>
      {imgsrc === undefined || imgsrc === '' ? '?' : <img src={imgsrc} alt=''></img>}
    </span>
  )
}

const CmtInputBox = ({ parent, parentId, isAnonymous, parentCommentId='' }) => {
  const login = useSelector(state => state.login);
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <div className='cmtInput'>
      <div className='cmt_info'>
        <div></div><strong>댓글쓰기</strong>
      </div>
      <div className='cmtInput_textbox'>
        <ProfileImg imgsrc={users.find(p => p.id === login.id).profileImg} />
        <div>
          <textarea />
        </div>
        <button onClick={e => {
          if (e.target.previousSibling.children[0].value==='') return;
          let tmp = {
            parent: parent,
            parentId: parentId,
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

const Comments = ({ parent, parentId, isAnonymous = false, parentCommentId='' }) => {
  const comments = useSelector(state => state.comments);
  const users = useSelector(state => state.user);
  const level = parentCommentId === '' ? 0 : ck(parentCommentId, 0);
  function ck(pci, lv) {
    let a = comments.find(p=>p.commentId===pci);
    if( a !== undefined) {
      return ck(a.parentCommentId, ++lv);
    } else {
      return lv;
    }
  }
  return (
    <>
    {comments.filter(p => p.parent === parent && p.parentId === parentId && p.parentCommentId === parentCommentId).map(p =>
        <div key={p.commentId}>
          <div className='commentBox_cmtInfo' style={{paddingLeft:level*50+'px'}}>
            <ProfileImg imgsrc={users.find(q => q.id === p.writer).profileImg} />
            <div>
              <div className='cmt_writeData'>
                <strong>{users.find(q => q.id === p.writer).nickname}</strong>
                <span>{new Date(p.upTime).toLocaleString()}</span>
              </div>
              {p.content.split('\n').map((p,i) => <p key={'text'+i}>{p === '' ? '　' : p}</p>)}
              <div className='cmt_hover_button'>

              </div>
              <div className='re_cmt_inputbox' > 
                <CmtInputBox isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.commentId} />
              </div>
            </div>
          </div>
          <hr />
          <Comments isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.commentId}  />
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