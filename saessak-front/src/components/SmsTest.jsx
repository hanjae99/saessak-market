import React, { useState } from "react";
import { call } from "../ApiService";

const SmsTest = () => {
  const [phoneNum, setPhoneNum] = useState();

  const handleChange = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleSubmit = () => {
    call(`/signup/smsSend/${phoneNum}`, "POST").then((response) => {
      if (response && response.token) {
        alert("인증번호가 전송되었습니다");
        localStorage.setItem("SMSTOKEN", response.token);
        localStorage.setItem("SMSTOKENEXPIRE", response.expireDate);
      } else {
        console.log(response);
      }
    });
  };
  return (
    <div>
      <input
        type="tel"
        name="phone"
        placeholder="전화번호 숫자만 입력해주세요"
        pattern="[0-9]{11}"
        value={phoneNum}
        onChange={handleChange}
        required
      />
      <button onClick={handleSubmit}>인증</button>
    </div>
  );
};

export default SmsTest;
