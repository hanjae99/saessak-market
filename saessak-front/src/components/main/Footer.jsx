import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footerBox">
        <div className="footerImg leaf1">
          <img src="../../img/leaf1.png" alt="leaf1" />
        </div>
        <div className="footerImg leaf2">
          <img src="../../img/leaf2.png" alt="leaf1" />
        </div>
        <div className="footerImg flower1">
          <img src="../../img/flower1.png" alt="leaf1" />
        </div>
        <div className="footerImg tree1">
          <img src="../../img/tree1.png" alt="leaf1" />
        </div>
        <div className="footerName">
          <h4>
            <Link to="/">새싹 마켓</Link>
          </h4>
          <div className="footerDesc">
            <p>
              <Link to="/">(주)새싹마켓</Link>
              <br />
              대표자: 궁서체
              <br />
              사업자 등록번호: 1234-123-323
              <br />
            </p>
          </div>
        </div>
        <div className="footerSocial">
          <ul>
            <h4>소셜</h4>
            <li>
              <Link to="/">
                <img src="../../img/facebook.png" alt="facebook" />
                페이스북
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="../../img/youtube.png" alt="youtube" />
                유튜브
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="../../img/naver.png" alt="naver" />
                카페
              </Link>
            </li>
          </ul>
        </div>
        <div className="footerInfo">
          <ul>
            <h4>소개</h4>
            <li>
              <Link to="/">개인정보처리방침</Link>
            </li>
            <li>
              <Link to="/">이용약관</Link>
            </li>
            <li>
              <Link to="/">분쟁처리절차</Link>
            </li>
            <li>
              <Link to="/">청소년보호정책</Link>
            </li>
            <li>
              <Link to="/">사업자정보확인</Link>
            </li>
            <li>
              <Link to="/">게시글 개인정보 수집 및 이용 안내</Link>
            </li>
            <li>
              <Link to="/">새싹마켓 고객센터</Link>
            </li>
          </ul>
        </div>
        <div className="footerContact">
          <h4>연락</h4>
          <ul>
            <li>
              <Link
                to="https://github.com/hanjae99/saessak-market"
                target="blank"
              >
                메일: <br />
                https://github.com/hanjae99/saessak-market
              </Link>
            </li>
            <li>
              <Link to="/">전화: 010-1234-1234</Link>
            </li>
            <li>
              <Link to="/">
                주소: 서울특별시 한국구 한국대로 <br /> 궁서빌딩 1층
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
