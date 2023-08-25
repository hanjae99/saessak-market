import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const CmtInputBox = (parent,parentId,isAnonymous) => {
  const login = useSelector(state => state.login)
  console.log(login.id)
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
        <button>등록</button>
      </div>
      {isAnonymous ? <div></div> : ''}
    </div>
  )
}


const CommentViewer = (parent,parentId,isAnonymous=false) => {
  return (
    <div className='commentBox'>
      <CmtInputBox isAnonymous={isAnonymous} parent={parent} parentId={parentId} />
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