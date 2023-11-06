import {
  Button,
  ButtonGroup,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  FormGroup,
  Grow,
  MenuItem,
  MenuList,
  Pagination,
  PaginationItem,
  Paper,
  Popper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import qs from "qs";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import priceComma from "../../pricecomma";
import { changeDateFormat } from "../../dateFormat";

const ProductList2 = () => {
  const { searchItem } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryDTO, setCategoryDTO] = useState([]);
  const [searchDTO, setSearchDTO] = useState({});
  const [sellChecked, setSellChecked] = useState(true);
  const [soldOutChecked, setSoldOutChecked] = useState(false);
  const [sortBy, setSortBy] = useState("Date");

  const options = ["최신순", "찜순", "조회순"];

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
  console.log("카테고리: ", category);
  console.log("페이지: ", page);

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
      sellStatus: null,
      sortBy: sortBy,
    };

    if (sellChecked && soldOutChecked) {
      request.sellStatus = "SELL_AND_SOLD_OUT";
    } else if (soldOutChecked) {
      request.sellStatus = "SOLD_OUT";
    } else if (sellChecked) {
      request.sellStatus = "SELL";
    }

    // 상품명으로 검색 시
    if (searchItem && searchItem != null) {
      request.searchBy = "product_title";
      request.searchQuery = searchItem;
    } else if (category && category != null) {
      // 카테고리로 검색 시
      request.searchBy = "category_num";
      request.searchQuery = category;
    }
    console.log(request);
    call(`/product/search/${page}`, "POST", request).then((response) => {
      console.log(response);
      setSearchDTO(response);
      // setSelectedIndex(0);
    });

    window.scrollTo(0, 0);
  }, [searchItem, category, page, sellChecked, soldOutChecked, sortBy]);

  const removeSearch = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  const handleSellChecked = (e) => {
    if (!soldOutChecked) {
      setSoldOutChecked(!soldOutChecked);
    }
    setSellChecked(!sellChecked);
  };

  const handleSoldOutChecked = (e) => {
    if (!sellChecked) {
      setSellChecked(!sellChecked);
    }
    setSoldOutChecked(!soldOutChecked);
  };

  // const sortByDate = () => {
  //   const newSearchDTO = searchDTO;
  //   searchDTO.content.sort((a, b) => (a.updateTime < b.updateTime ? 1 : -1));

  //   setSearchDTO(newSearchDTO);
  // };

  // const sortByWish = () => {
  //   const newSearchDTO = searchDTO;
  //   searchDTO.content.sort((a, b) => (a.wishedCount < b.wishedCount ? 1 : -1));

  //   setSearchDTO(newSearchDTO);
  // };

  // const sortByClick = () => {
  //   const newSearchDTO = searchDTO;
  //   searchDTO.content.sort((a, b) =>
  //     a.clickedCount < b.clickedCount ? 1 : -1
  //   );

  //   setSearchDTO(newSearchDTO);
  // };

  const handleMenuItemClick = (e, index) => {
    setOpen(false);
    setSelectedIndex(index);
    if (index === 0) {
      console.log("최신순");
      // sortByDate();
      setSortBy("Date");
    } else if (index === 1) {
      console.log("찜순");
      // sortByWish();
      setSortBy("Wish");
    } else if (index === 2) {
      console.log("조회순");
      // sortByClick();
      setSortBy("Click");
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

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
            <div className="chooseSellStatus">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sellChecked}
                      onChange={handleSellChecked}
                      color="success"
                    />
                  }
                  label="판매중"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={soldOutChecked}
                      onChange={handleSoldOutChecked}
                      color="success"
                    />
                  }
                  label="판매완료"
                />
              </FormGroup>
            </div>
          </div>
          <div className="result">
            <div>
              <h1>검색 결과</h1>
            </div>
            <div>
              <span>{searchDTO && searchDTO.totalElements}개의 상품</span>
            </div>
          </div>
          {/* 최신순 추천순 정렬 버튼 */}
          <div className="sortBtns">
            <ButtonGroup
              // variant="contained"
              color="success"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button>{options[selectedIndex]}</Button>
              <Button
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              sx={{ zIndex: 1 }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(e) => handleMenuItemClick(e, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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
                  <p>{priceComma(dto.price)}원</p>
                  <div
                    className="item-info"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{changeDateFormat(dto.updateTime)}전</div>
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
                      to={`/search?category=${category}&page=${item.page}`}
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
