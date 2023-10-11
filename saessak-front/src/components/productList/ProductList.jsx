import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import categoryData from "../../category.json";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "./ProductList.scss";

const ProductList = () => {
  const { searchItem } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pageNumLength, setpageNumLength] = useState(0);

  // 쿼리스트링 category 번호값, page 번호값 가져옴
  // 여러개의 쿼리스트링이 있을 땐 & 로 구분
  let { category, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const products = useSelector((state) => state.product);
  const searchedItem = products.filter((p) => p.name.includes(searchItem));
  const searchedCate = products.filter(
    (p) =>
      p.categories &&
      p.categories.split(",").find((ps) => ps === category) === category
  );
  const pageNum = page === undefined ? 1 : page;

  // 페이징 처리(한 페이지당 30개의 상품 노출)
  const [pageBtns, setPageBtns] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (searchItem) {
      setTotalPage(Math.ceil(searchedItem.length / 30));
    } else if (category) {
      setTotalPage(Math.ceil(searchedCate.length / 30));
    } else {
      setTotalPage(Math.ceil(products.length / 30));
    }
    const makePageBtn = () => {
      const pageBtns = [];
      // page 버튼 6개씩 보여주기
      for (
        let i = 1 + 5 * pageNumLength;
        i < 1 + 5 * (pageNumLength + 1);
        i++
      ) {
        if (i > totalPage) {
          break;
        }
        const pageBtn = (
          <button onClick={() => movePage(i)} key={i}>
            {i}
          </button>
        );
        pageBtns.push(pageBtn);
      }
      setPageBtns(pageBtns);
    };
    makePageBtn();
  }, [searchItem, category, products, totalPage, pageNumLength]);

  // 카테고리, 검색 넘어갈 시 페이지 구분 초기화
  useEffect(() => {
    setpageNumLength(0);
  }, [searchItem, category, products]);

  const movePage = useCallback(
    (i) => {
      searchItem
        ? navigate("?page=" + i)
        : category
        ? navigate("?category=" + category + "&page=" + i)
        : navigate("?page=" + i);
      window.scrollTo(0, 0);
    },
    [searchItem, category]
  );

  // category 번호로 category 이름 가져옴
  let categoryName = "";
  if (category) {
    categoryName = categoryData.find(
      (p) => p.categoryno === category
    ).categoryname;
  }

  const removeSearch = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  // page 버튼 6개씩 보여주기
  const prevPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength - 1);
  }, [pageNumLength]);

  const nextPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength + 1);
  }, [pageNumLength]);

  return (
    <div>
      <Header />
      <main id="mainList">
        <div className="filterContainer">
          <div>
            <div className="filterBox">
              <h2>필터</h2>
              {searchItem ? (
                <button className="filter" onClick={removeSearch}>
                  {searchItem} <MdClose />
                </button>
              ) : category ? (
                <button className="filter" onClick={removeSearch}>
                  {categoryName} <MdClose />
                </button>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div>
              <h3>카테고리</h3>
            </div>
            <ul>
              {categoryData
                .filter((c) => c.categoryno <= 20)
                .sort((a, b) =>
                  a.categoryno.length === b.categoryno.length
                    ? a.categoryno > b.categoryno
                      ? 1
                      : -1
                    : a.categoryno.length > b.categoryno.length
                    ? 1
                    : -1
                )
                .map((c) => {
                  return (
                    <li className="categoryItem2" key={c.categoryno}>
                      <Link to={"/search?category=" + c.categoryno}>
                        {c.categoryname}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="contentContainer">
          <div className="path">
            <ul>
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/search">&gt; 검색</Link>
              </li>
              <li>
                {searchItem ? (
                  <Link to={"/search/" + searchItem}>&gt; {searchItem}</Link>
                ) : category ? (
                  <Link to={"/search?category=" + category}>
                    &gt; {categoryName}
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
          <div className="result">
            <div>
              <h1>검색 결과</h1>
            </div>
            <div>
              <span>
                {searchItem
                  ? searchedItem.length
                  : category
                  ? searchedCate.length
                  : products.length}{" "}
                개의 상품
              </span>
            </div>
          </div>
          <div className="contents">
            {searchItem
              ? searchedItem
                  .slice(30 * (pageNum - 1), 30 * pageNum)
                  .map((si) => {
                    return (
                      <div
                        className="item-product"
                        key={si.id}
                        onClick={() => {
                          navigate("/detail/" + si.id);
                        }}
                      >
                        <img src={si.imgsrc1} alt={si.name} />
                        <div className="item-title">
                          <p>{si.name}</p>
                        </div>
                        <p>{si.price}</p>
                        {Math.floor(
                          (new Date().getTime() - Date.parse(si.uptime)) /
                            1000 /
                            60
                        ) < 60 ? (
                          <p>
                            {Math.floor(
                              (new Date().getTime() - Date.parse(si.uptime)) /
                                1000 /
                                60
                            )}
                            분전
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
              : category
              ? searchedCate
                  .slice(30 * (pageNum - 1), 30 * pageNum)
                  .map((sc) => {
                    return (
                      <div
                        className="item-product"
                        key={sc.id}
                        onClick={() => {
                          navigate("/detail/" + sc.id);
                        }}
                      >
                        <img src={sc.imgsrc1} alt={sc.name} />
                        <div className="item-title">
                          <p>{sc.name}</p>
                        </div>
                        <p>{sc.price}</p>
                        {Math.floor(
                          (new Date().getTime() - Date.parse(sc.uptime)) /
                            1000 /
                            60
                        ) < 60 ? (
                          <p>
                            {Math.floor(
                              (new Date().getTime() - Date.parse(sc.uptime)) /
                                1000 /
                                60
                            )}
                            분전
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
              : products.slice(30 * (pageNum - 1), 30 * pageNum).map((p) => {
                  return (
                    <div
                      className="item-product"
                      key={p.id}
                      onClick={() => {
                        navigate("/detail/" + p.id);
                      }}
                    >
                      <img src={p.imgsrc1} alt={p.name} />
                      <div className="item-title">
                        <p>{p.name}</p>
                      </div>
                      <p>{p.price}</p>
                      {Math.floor(
                        (new Date().getTime() - Date.parse(p.uptime)) /
                          1000 /
                          60
                      ) < 60 ? (
                        <p>
                          {Math.floor(
                            (new Date().getTime() - Date.parse(p.uptime)) /
                              1000 /
                              60
                          )}
                          분전
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
          </div>
          <div className="moveBtn">
            <button onClick={prevPageNumLength} disabled={pageNumLength === 0}>
              prev
            </button>
            {pageBtns.map((btn) => btn)}
            <button
              onClick={nextPageNumLength}
              disabled={Math.ceil(totalPage / 5) === pageNumLength + 1}
            >
              next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
