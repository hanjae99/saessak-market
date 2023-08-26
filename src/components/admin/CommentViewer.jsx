import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CmtInputBox = ({parent, parentId, isAnonymous}) => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  return (
    <div className='cmtInput'>
      <div className='cmt_info'>
        <div></div><strong>댓글쓰기</strong>
      </div>
      <div className='cmtInput_textbox'>
        <span>
          {true ? '?' : <img src='' alt=''></img>}
        </span>
        <div>
          <textarea />
        </div>
        <button onClick={e => {
          const tmp = {
            parent: parent,
            parentId: parentId,
            writer: login.id,
            content: e.target.previousSibling.children[0].value
          }
          dispatch({type:'comments/add', payload:tmp})
        }}>등록</button>
      </div>
      {isAnonymous ? <div></div> : ''}
    </div>
  )
}


const CommentViewer = ({parent, parentId, isAnonymous = false}) => {
  const comments = useSelector(state=>state.comments);
  const users = useSelector(state=>state.user);
  const textareaStyle = {resize:'none', border:'none', outline:'none'};
  console.log(comments)
  return (
    <div className='commentBox'>
      <CmtInputBox isAnonymous={isAnonymous} parent={parent} parentId={parentId} />
      {comments.filter(p=>p.parent===parent && p.parentId===parentId && p.parentCommentId === '').map(p=> <div key={p.commentId}>
        {users.find(q=>q.id===p.writer).nickname} <br />
        <textarea value={p.content} style={textareaStyle} readonly='true' /> <br />
        {p.upTime} <br />
      </div>)}
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