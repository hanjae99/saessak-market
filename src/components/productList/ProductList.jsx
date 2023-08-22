import React, { useCallback } from "react";
import Header from "../main/Header";
import Footer from "../main/Footer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductList.css";
import categoryData from "../../category.json";
import { MdClose } from "react-icons/md";
import qs from "qs";

const ProductList = () => {
  const { searchItem } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 쿼리스트링 category 번호값만 가져옴
  const { category } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const products = useSelector((state) => state.product);
  const searchedItem = products.filter((p) => p.name.includes(searchItem));
  const searchedCate = products.filter(
    (p) => p.categories.split(",").find((ps) => ps === category) === category
  );

  // category 번호로 category 이름 가져옴
  let categoryName = "";
  if (category) {
    categoryName = categoryData.filter((p) => p.categoryno === category)[0]
      .categoryname;
  }

  const removeSearch = useCallback(() => {
    navigate("/search");
  }, [navigate]);

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
              ? searchedItem.map((si) => {
                  return (
                    <div className="item" key={si.id}>
                      <img src={si.imgsrc1} alt={si.name} />
                      <p>{si.name}</p>
                      <p>{si.price}</p>
                    </div>
                  );
                })
              : category
              ? searchedCate.map((sc) => {
                  return (
                    <div className="item" key={sc.id}>
                      <img src={sc.imgsrc1} alt={sc.name} />
                      <p>{sc.name}</p>
                      <p>{sc.price}</p>
                    </div>
                  );
                })
              : products.map((p) => {
                  return (
                    <div className="item" key={p.id}>
                      <img src={p.imgsrc1} alt={p.name} />
                      <p>{p.name}</p>
                      <p>{p.price}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
