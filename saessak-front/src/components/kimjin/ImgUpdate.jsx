import React from "react";
import { useRef, useState } from "react";
import { Avatar } from "antd";

const ImgUpdate = () => {
  // 이미지 URL을 관리하는 상태 변수
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  // 파일 업로드 인풋을 위한 ref
  const fileInput = useRef(null);

  // 파일 선택 시 호출되는 함수
  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // 이미지 상태 업데이트
    } else {
      // 파일 선택이 취소되었거나 없을 때 기본 이미지로 복원
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result); // 선택한 이미지의 데이터 URL로 업데이트
      }
    };

    reader.readAsDataURL(e.target.files[0]); // 선택한 파일을 데이터 URL로 읽음
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
