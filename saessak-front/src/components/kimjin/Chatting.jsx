import React from "react";
import "./Manu.css";
import { PiGearSixBold } from "react-icons/pi";

const Chatting = () => {
  return (
    <div>
      <div className="chatting-all">
        <div className="chatting-main">
          <div className="chatting-header">
            <img
              src="../../img/saessak.png"
              alt="logo"
              className="chatting-logo"
            />
            <img
              src="../../img/logo.png"
              alt="새싹마켓 logo"
              className="chatting-textlogo"
            />
            <div style={{ cursor: "pointer" }} className="chatting-icon">
              <PiGearSixBold />
            </div>
          </div>
          <div className="chatting-section">
            <div className="chatting-section1"></div>
            <div className="chatting-section2">
              <div className=" chatting-img1">
                <img src="../../img/flower1.png" alt="text1" />
                <div className="chatting-icon2">
                  <div className="chatting-text">안녕</div>
                </div>
              </div>
            </div>
            <div className="chatting-section3">
              <div className=" chatting-img2">
                <div className="chatting-icon3">
                  <div className="chatting-text2">ㅎㅇ</div>
                </div>
                <img src="../../img/saessak.png" alt="text2" />
              </div>
            </div>
          </div>
          <div className="chatting-footer">
            <div className="chatting-footer1">
              <div className="chatting-footer1-1">입력해주세요....</div>
            </div>
            <div className="chatting-footer2">
              <div className="chatting-footer2-0"></div>
              <div className="chatting-footer2-2">
                <div className="chatting-footer2-1">전송</div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Chatting;
