import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { FaRegComment } from 'react-icons/fa'
import { RxEraser } from 'react-icons/rx'
import { call } from '../../ApiService'

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

const CmtInputBox = ({ viewer, parent, parentId, isAnonymous, parentCommentId = '' }) => {
  const dispatch = useDispatch();
  const btns = (<div onClick={e => {
    e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none'
  }}><FaXmark />닫기</div>);
  return (
    viewer.nickname !== '' && <div className={parentCommentId === '' ? 'cmtInput' : 'cmtInput2'}>
      {parentCommentId === '' ? '' : <CmtBtnBox cs={{ right: '20px' }}>{btns}</CmtBtnBox>}
      <div className={parentCommentId === '' ? 'cmt_info' : 'cmt_info2'}>
        {parentCommentId === '' ? <div></div> : <span style={{ color: '#aaa', fontSize: '1.3rem' }}><BsArrowReturnRight /></span>}<strong>댓글쓰기</strong>
      </div>
      <div className={parentCommentId === '' ? 'cmtInput_textbox' : 'cmtInput_textbox2'}>
        <ProfileImg imgsrc={viewer.profileImg} />
        <div>
          <textarea />
        </div>
        <button onClick={e => {
          if (e.target.previousSibling.children[0].value === '') return;

          let tmp = {
            content: e.target.previousSibling.children[0].value
          }
          tmp = parentCommentId === '' ? tmp : { ...tmp, pid: parentCommentId };

          const url = "/board/comment/create/" + parentId;
          // console.log("가즈아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ", tmp, "1", parentCommentId, "2");
          call(url, "POST", tmp).then(response => {
            // console.log("response", response);
            if (response && response.msg === "good") {
              let lists = [...response.list].sort((a,b) => (new Date(b.upTime)).getTime()-(new Date(a.upTime)).getTime());
              // console.log(lists[0].id);
              dispatch({ type: 'comments/setData', payload: {...response, updateNow:lists[0].id } })
            }
          });

          e.target.previousSibling.children[0].value = '';
          parentCommentId === '' ? console.log() : e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none'
        }}>등록</button>
      </div>
      {isAnonymous ? <div></div> : ''}
    </div>
  )
}

const Comments = ({ lastComment, commentData, parent, parentId, isAnonymous, parentCommentId = 0 }) => {
  if (!commentData) {
    return null;
  }
  // console.log(parentId);
  parentId += '';
  // const comments = null; // useSelector(state => state.comments);
  // const users = null; // useSelector(state => state.user);
  const level = parentCommentId === 0 ? 0 : ck(parentCommentId, 0);
  function ck(pci, lv) {
    let a = commentData.list.find(p => p.id === pci);
    if (a !== undefined) {
      return ck(a.pid, ++lv);
    } else {
      return lv;
    }
  }
  const btns = (
    <>
      <div style={{ display: 'none' }}><BsPencil /><span>수정</span></div>
      <div style={{ display: 'none' }}><RxEraser /><span>삭제</span></div>
      <div onClick={e => {
        let tmp = e.currentTarget.parentElement.nextSibling;
        tmp = tmp.children[tmp.children.length - 1];
        tmp.children[tmp.children.length - 1].style.display = 'block';
      }}><FaRegComment /><span>댓글</span></div>
    </>
  );

  

  return (
    <>
      {commentData.list.filter(p => p.pid + '' === parentCommentId + '').map(p =>
        <div key={p.id} style={{ position: 'relative' }}
          onMouseOver={e => {
            e.stopPropagation();
            e.currentTarget.children[0].style.display = 'block';
          }}
          onMouseOut={e => {
            e.stopPropagation();
            e.currentTarget.children[0].style.display = 'none';
          }}
          id={commentData.updateNow+""===p.id+""?"updateNowComment":""}
        >
          <CmtBtnBox cs={{ right: '40px', display: 'none' }} >{btns}</CmtBtnBox>
          <div className='commentBox_cmtInfo' style={{ paddingLeft: level * 25 + 'px' }}>
            {parentCommentId === 0 ? '' : <span style={{ color: '#aaa', fontSize: '2rem', margin: '0 15px' }}><BsArrowReturnRight /></span>}
            <ProfileImg imgsrc={p.writerProfileImgUrl} />
            <div>
              <div className='cmt_writeData'>
                <strong>{p.writerNickName}</strong>
                <span>{new Date(p.upTime).toLocaleString()}</span>
              </div>
              {p.content.split('\n').map((p, i) => <p key={'text' + i}>{p === '' ? '　' : p}</p>)}
              <div className='cmt_hover_button'>

              </div>
              <div className='re_cmt_inputbox' style={{ display: 'none' }} >
                <CmtInputBox viewer={{ profileImg: p.writerProfileImgUrl, nickname: p.writerNickName }} isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.id} />
              </div>
            </div>
          </div>
          <hr />
          <Comments commentData={commentData} isAnonymous={isAnonymous} parent={parent} parentId={parentId} parentCommentId={p.id} />
        </div>)}
    </>
  )
}


const CommentViewer = ({ parent, parentId, isAnonymous = false }) => {
  const commentData = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const lastComment = useRef();

  // const [commentData, setCommentData] = useState({viewerRole:'any', userProfileImgUrl:'', userNickName:''});

  useEffect(() => {
    const url = "/board/comments/" + parentId;
    // console.log("url :", url);
    call(url, "GET").then(response => {
      // console.log("response", response);
      if (response && response.msg === "good") {
        dispatch({ type: 'comments/setData', payload: {...response, updateNow:0 } })
        
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if (commentData.updateNow>0) {
      document.getElementById("updateNowComment")&&document.getElementById("updateNowComment").scrollIntoView({ behavior: "smooth",block: "center"});
      dispatch({ type: 'comments/setData', payload: {...commentData, updateNow:0 } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commentData.updateNow])


  const viewer = { profileImg: commentData.userProfileImgUrl, nickname: commentData.userNickName };

  return (
    <div className='commentBox'>
      {commentData.viewerRole !== 'any' && <CmtInputBox viewer={viewer} isAnonymous={isAnonymous} parent={parent} parentId={parentId} />}
      <div className='commentCount'>comments '
        <strong>
          {commentData && commentData.list.length > 0 ? commentData.list.length : 0}
        </strong>'
      </div>
      {commentData && <Comments lastComment={lastComment} commentData={commentData} isAnonymous={isAnonymous} parent={parent} parentId={parentId} />}
    </div>
  )
}

export default CommentViewer