import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Avatar } from "antd";
import { uploadProduct } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";

const ImgUpdate = ({ privacys }) => {
  // 이미지 URL을 관리하는 상태 변수

  console.log("gd", privacys.userImgUrl);

  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  useEffect(() => {
    if (privacys && privacys.userImgUrl) {
      setImage(API_BASE_URL + privacys.userImgUrl);
    }
  }, [privacys]);

  // 파일 업로드 인풋을 위한 ref
  const fileInput = useRef(null);

  // 파일 선택 시 호출되는 함수
  const onChange = (e) => {
    const formData = new FormData();

    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      formData.append("memberImg", e.target.files[0]);
      uploadProduct("/user/mypage/imgupdate", "PUT", formData).then(
        (response) => {
          console.log(response);
          const userimg = API_BASE_URL + response.data[0].imgUrl;
          setImage(userimg);
        }
      );
    } else {
      // 파일 선택이 취소되었거나 없을 때 기본 이미지로 복원
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
  };

  return (
    <div>
      {/* 프로필 이미지를 나타내는 아바타 컴포넌트 */}
      <Avatar
        src={Image}
        style={{ margin: "20px" }}
        size={200}
        onClick={() => {
          fileInput.current.click(); // 아바타 클릭 시 파일 업로드 인풋 클릭
        }}
      />
      {/* 파일 업로드 인풋 */}
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange} // 파일 선택 시 onChange 함수 호출
        ref={fileInput}
      />
    </div>
  );
};

export default ImgUpdate;
