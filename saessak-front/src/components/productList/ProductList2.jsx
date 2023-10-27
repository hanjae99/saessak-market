import {
  Pagination,
  PaginationItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
import {
  MdClose,
  MdFavorite,
  MdFavoriteBorder,
  MdVisibility,
} from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { call } from "../../ApiService";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "./ProductList.scss";
import { API_BASE_URL } from "../../ApiConfig";

const ProductList2 = () => {
  const { searchItem } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryDTO, setCategoryDTO] = useState([]);
  const [searchDTO, setSearchDTO] = useState({});

  // 쿼리스트링 category 번호값, page 번호값 가져옴
  // 여러개의 쿼리스트링이 있을 땐 & 로 구분
  let { category, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // page 초기 값 세팅
  if (!page) {
    page = 1;
  }
  console.log(searchItem);
  console.log(category, page);

  useEffect(() => {
    // 카테고리 정보 가져오기
    call("/product/searchcate", "GET").then((response) => {
      console.log(response.data);
      if (response.data && response.data != null) {
        setCategoryDTO(response.data);
      }
    });
  }, []);

  useEffect(() => {
    let request = {
      searchBy: "",
      searchQuery: "",
    };

    // 상품명으로 검색 시
    if (searchItem && searchItem != null) {
      request.searchBy = "product_title";
      request.searchQuery = searchItem;
    } else if (category && category != null) {
      // 카테고리로 검색 시
      request.searchBy = "category_num";
      request.searchQuery = category;
    }
    console.log("useEffect!!!!!");
    console.log(request);
    call(`/product/search/${page}`, "POST", request).then((response) => {
      console.log(response);
      setSearchDTO(response);
    });
  }, [searchItem, category, page]);

  const removeSearch = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#90DA6D",
      },
    },
  });

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
              ) : category && categoryDTO && categoryDTO.length > 0 ? (
                <button className="filter" onClick={removeSearch}>
                  {
                    categoryDTO.find((dto) => dto.id === parseFloat(category))
                      .name
                  }{" "}
                  <MdClose />
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
              {categoryDTO.map((dto) => (
                <li className="categoryItem2" key={dto.id}>
                  <Link to={"/search?category=" + dto.id}>{dto.name}</Link>
                </li>
              ))}
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
                    &gt;{" "}
                    {categoryDTO && categoryDTO.length > 0
                      ? categoryDTO.find(
                          (dto) => dto.id === parseFloat(category)
                        ).name
                      : ""}
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
              <span>{searchDTO && searchDTO.totalElements}개의 상품</span>
            </div>
          </div>
          <div className="contents">
            {searchDTO.content &&
              searchDTO.content.map((dto) => (
                <div
                  className="item-product"
                  key={dto.id}
                  onClick={() => {
                    navigate("/detail/" + dto.id);
                  }}
                >
                  <img src={API_BASE_URL + dto.imgUrl} alt={dto.title} />
                  <div className="item-title">
                    <p>{dto.title}</p>
                  </div>
                  <p>{dto.price}원</p>
                  <div
                    className="item-info"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {Math.floor(
                      (new Date().getTime() - Date.parse(dto.updateTime)) /
                        1000 /
                        60
                    ) < 60 ? (
                      <div>
                        {Math.floor(
                          (new Date().getTime() - Date.parse(dto.updateTime)) /
                            1000 /
                            60
                        )}
                        분전
                      </div>
                    ) : Math.floor(
                        (new Date().getTime() - Date.parse(dto.updateTime)) /
                          1000 /
                          60 /
                          60
                      ) < 24 ? (
                      <div>
                        {Math.floor(
                          (new Date().getTime() - Date.parse(dto.updateTime)) /
                            1000 /
                            60 /
                            60
                        )}
                        시간전
                      </div>
                    ) : (
                      <div>
                        {Math.floor(
                          (new Date().getTime() - Date.parse(dto.updateTime)) /
                            1000 /
                            60 /
                            60 /
                            24
                        )}
                        일전
                      </div>
                    )}
                    <div>
                      <MdVisibility style={{ fontSize: "14px" }} />{" "}
                      {dto.clickedCount}{" "}
                      <MdFavorite style={{ fontSize: "14px" }} />{" "}
                      {dto.wishedCount}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="moveBtn">
            {category ? (
              <ThemeProvider theme={theme}>
                <Pagination
                  // variant="outlined"
                  count={searchDTO.totalPages}
                  color="primary"
                  page={parseInt(page)}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/search?category=${category}?page=${item.page}`}
                      {...item}
                    />
                  )}
                />
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={theme}>
                <Pagination
                  count={searchDTO.totalPages}
                  color="primary"
                  page={parseInt(page)}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={
                        searchItem
                          ? `/search/${searchItem}?page=${item.page}`
                          : `/search?page=${item.page}`
                      }
                      {...item}
                    />
                  )}
                />
              </ThemeProvider>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList2;
