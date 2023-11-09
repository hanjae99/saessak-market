import { createSlice } from '@reduxjs/toolkit'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { call } from "../../ApiService";
import { API_BASE_URL } from '../../ApiConfig';

const ImageViewer = () => {

  const viewerTop = 30;
  const imageBaseSize = 130;

  const adminImageViewer = useRef();
  const [pageSize, setPageSize] = useState(0);

  const data = useSelector(state => state.adminImageSL);
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const bottom = useRef(null);
  const LOADED = 'targetLoad';
  let page=1;

  const callback = async (entries) => {
    
    if (entries[0].isIntersecting && !entries[0].target.classList.contains(LOADED) && parseInt(entries[0].target.style.top)>1000) {
      // console.log('entrys : ', page);
      entries[0].target.className = LOADED;
      entries[0].target.style.top = parseInt(entries[0].target.style.top) + 1000 + 'px';
      page++;
      const url = "/admin/images/" + page;
      await call(url, "GET").then((response) => {
        // console.log("response", response);
        dispatch({ type: 'adminImageSL/getMoreData', payload: response.list });
      });
      // await new Promise((resolve) => setTimeout(resolve, 100));
      entries[0].target.className = "";
    }
  }

  const refHook = (refElement) => {
    if (refElement && observerRef.current) {
      observerRef.current.observe(refElement);
      bottom.current = refElement;
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback);
    dispatch({ type: 'adminImageSL/setImageScale', payload: 1 });
    dispatch({ type: 'adminImageSL/setPage', payload: 1 });
    const url = "/admin/images/" + page;
    call(url, "GET").then((response) => {
      dispatch({ type: 'adminImageSL/setData', payload: response.list });
      setPageSize(response.pageSize);
    });
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    }
  }, [])
  window.onresize = () => {
    dispatch({ type: 'adminImageSL/setImageScale', payload: 0 });
  }

  let viewerWidth = 0;
  let imagesMargin = 0;
  let imagesLineCount = 1;
  let bottomtop = 5555;
  if (adminImageViewer.current) {

    viewerWidth = adminImageViewer.current.clientWidth;
    imagesMargin = 20 + 2 * data.imageScale;
    imagesLineCount = Math.floor((viewerWidth - 100) / ((imageBaseSize + 2) * data.imageScale + imagesMargin));

    bottomtop = viewerTop + Math.ceil(data.data.slice(0, data.page * pageSize).length / imagesLineCount) * (imageBaseSize + 2) * data.imageScale + (Math.floor(data.data.slice(0, data.page * pageSize).length / imagesLineCount) + 1) * imagesMargin + 'px';
  }
  const imgStyle = {
    width: imageBaseSize * data.imageScale + 'px',
    height: imageBaseSize * data.imageScale + 'px'
  };
  const divStyle = {
    width: (imageBaseSize * data.imageScale + 2) + 'px',
    height: (imageBaseSize * data.imageScale + 2) + 'px',
    position: 'absolute',
    border: '1px solid gray'
  }



  return (
    <>
      <div className='adminImageViewer' ref={adminImageViewer}>
        {data.data && data.data.slice(0, data.page * 50).map((p, i) => {
          const position = {
            left: i % imagesLineCount * (imageBaseSize + 2) * data.imageScale + (i % imagesLineCount + 1) * imagesMargin - 14 + 'px',
            top: viewerTop + Math.floor(i / imagesLineCount) * (imageBaseSize + 2) * data.imageScale + (Math.floor(i / imagesLineCount) + 1) * imagesMargin + 'px',
          }
          return (
            <div key={i} style={{ ...divStyle, ...position }}>
              <img src={API_BASE_URL + p.imgUrl} alt='images' style={imgStyle}></img>
              {/* {p.url} */}
            </div>
          )
        })}
        {data.moreScroll && <div ref={refHook} style={{
          backgroundColor: 'red',
          width: '100px', height: '100px', position: 'absolute',
          top: bottomtop
        }}></div>}
      </div>
    </>
  )
}
const ImageController = () => {
  const style = {
    position: 'fixed',
    top: '200px',
    right: '50px',
  }



  const dispatch = useDispatch();

  const ms = useSelector(state=>state.adminImageSL.moreScroll);

  return (
    <div className='adminImageController' style={style}>
      <button className="login-button1" onClick={(e)=>{
        dispatch({ type: 'adminImageSL/switchMoreScroll' });
      }}>추가로딩{ms?"중지":"계속"}하기</button>
    </div>
  )
}



export const adminImageSL = createSlice({
  name: "adminImageSL",
  initialState: {
    data: [],
    moreScroll: true,
    imageScale: 1,
    page: 1,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data = state.data.concat(action.payload);
    },
    switchMoreScroll: (state, action) => {
      state.moreScroll = !state.moreScroll;
    },
    setImageScale: (state, action) => {
      if (action.payload === 0) {
        let tmp = state.imageScale;
        state.imageScale = 0;
        state.imageScale = tmp;
      } else {
        state.imageScale = 0;
        state.imageScale = action.payload;
      }
    },
    setPagePlus: (state, action) => {
      state.page = state.page + 1;
    },
    getMoreData: (state, action) => {
      
      state.data = state.data.concat(action.payload);
      state.page = state.page + 1;
    }
  },
});


// 한페이지에 60개
// 어드민 체크한 이미지는 보이기/제외 버튼 넣기
// 최신이미지 기준으로 로딩시작 / 
// 무한스크롤로 페이징처리하기
// 저장버튼은 fixed 로 따라다니기


const AdminImage = ({ setModalData, page }) => {
  return (
    <>
      <ImageViewer />
      <ImageController />
    </>
  )
}

export default AdminImage