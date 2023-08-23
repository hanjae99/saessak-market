import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footerBox">
        <p className="footerName">새싹 마켓</p>
        <p className="footerDesc">
          (주)새싹마켓
          <br />
          대표자: 궁서체
          <br />
          사업자 등록번호: 1234-123-323
          <br />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
