import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: [
    {
      id: "admin",
      nickname: "관리자",
      pwd: "1111",
      name: "관리자",
      email: "saessak@gmail.com",
      phone: "01011112222",
      address: "관악구",
      gender: "admin",
      userproduct: [],
    },
    {
      id: "koo",
      nickname: "구상모",
      pwd: "1111",
      name: "구상모",
      email: "koosangmo@gmail.com",
      phone: "01011112222",
      address: "관악구",
      gender: "male",
      userproduct: [
        {
          id: "123997504",
          name: "스마텍 2pt 충전기 C타입케이블2(분리형)",
          price: "15,000원",
          text: "2pt 충전기와 부드러운 C타입 케이블을 세트로 판매합니다. 고속 충전에 분리형이라 케이블 번갈아 교환하며 사용할 수 있어서 낭비없이 좋아요. 행사 때 구입하고 남아서 내놓아요",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/08/19/1692430976390KdL_yCEXj.jpg?ftext=커먼하이&impolicy=resizeWatermark3",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/08/19/16924309763916Hs_TfVqh.jpg?impolicy=resizeWatermark3&ftext=커먼하이",
          categories: "144,6",
        },
        {
          id: "124029742",
          name: "이기적 사무자동화산업기사 필기(2024)",
          price: "16,000원",
          text: "새새제품입니다 2권있습니다 01033777713 연락주세요",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/07/27/1690428350513xwo_IbH6f.jpg?impolicy=resizeWatermark3&ftext=서퍼홀릭",
          imgsrc2: "null",
          categories: "1236,14,215",
        },
        {
          id: "124070057",
          name: "(M) 버버리 반팔셔츠 노바체크 남방 포켓 베이지",
          price: "58,000원",
          text: "버버리 반팔셔츠 남성용 - 노바체크 표기사이즈 M 실측(Cm) 어깨단면46, 가슴단면52 팔기장22, 총기장84 교신X 교환X 환불X 택배비 포함 (도서산간제외) ■빈티지 제품 특성상 자잘한 오염이나 기스가 있을수 있습니다. 민감하신 분들은 구매자제 부탁드려요!!",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/07/25/1690242898819Nrk_M5FTN.jpg?ftext=빈티지YOON&impolicy=resizeWatermark3",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/07/25/1690242898819H12_SkchT.jpg?impolicy=resizeWatermark3&ftext=빈티지YOON",
          categories: "1,1034,106",
        },
        {
          id: "124169549",
          name: "투버튼 숏팬츠 하이웨스트 연청 데님 청반바지ㅡ무배",
          price: "35,000원",
          text: "♡색상:연청 ♡사이즈:S,M,L S:허리31,엉덩이45,허벅지30, 밑위32,총장36 M:허리32.5,엉덩이47,허벅지32, 밑위33,총장37 L:허리34,엉덩이49,허벅지34, 밑위34,총장38 ♡더블 버튼이 포인트인 데님 숏팬츠 ♡하이웨스트라인으로 다리가 길어보이는 연청 데님 팬츠 ♡어떤상의와도 코디하기 좋은 팬츠",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/07/07/1688694776705v8u_DIKAF.jpg?impolicy=resizeWatermark3&ftext=로즈마리상점",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/07/07/16886947767067HR_qUDtH.jpg?impolicy=resizeWatermark3&ftext=로즈마리상점",
          categories: "1055,111,2",
        },
      ],
    },
    {
      id: "jin",
      nickname: "김진",
      pwd: "1111",
      name: "김진",
      email: "kimjin@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
      userproduct: [
        {
          id: "126230110",
          name: "플랫퍼 밴딩 점프슈트 하늘색(새제품,새상품)",
          price: "36,000원",
          text: "플랫퍼에서 파는 점프슈트 새상품 입니다. 플랫퍼 점프슈트 하늘색 44-77 사이즈 가능 [상세 참고] https://m.flatper.co.kr/product/%EB%AC%B4%EB%A3%8C%EB%B0%B0%EC%86%A1%EC%A0%A4%EB%A6%AC-%EB%B8%8C%EC%9D%B4%EB%84%A5-%EB%82%A0%EA%B0%9C-%EB%B0%B4%EB%94%A9-%EB%A7%A5%EC%8B%9C-%EB%A1%B1-%EC%A0%90%ED%94%84%EC%88%98%ED%8A%B8-5color/6149/category/108/display/1/",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/08/10/1691633997858OdO_h5CxL.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/08/10/1691633997858sSw_OY6df.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          categories: "1055,111,2",
        },
        {
          id: "126230291",
          name: "츄룸 쉬폰 오프숄더 블라우스(새상품, 새제품)",
          price: "27,000원",
          text: "새제품입니다 -> 연핑크, 그레이, 브라운, 아이보리 있어요 [상세 참고] https://m.smartstore.naver.com/_churoom_/products/8778246023",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/08/10/1691634090639SxP_nDfOG.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/08/10/1691634090640JB5_vBrbQ.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          categories: "1053,111,2",
        },
        {
          id: "126230514",
          name: "프릴 블라우스(새제품) - 화이트, 핑크",
          price: "24,000원",
          text: "프릴 디테일이 예쁜 블라에요~ 저렴이 아닙니당 원가에 팔아요 화이트, 핑크 두컬러 다있어요 [상세 참고] https://m.smartstore.naver.com/alldaymay/products/8528348127?NaPm=ct%3Dllk44wnk%7Cci%3D537d9db4cc25324d43f5fc130de38c3682d6154b%7Ctr%3Dslsl%7Csn%3D637627%7Chk%3D13465e1912b528b7c1a05806144cde0ffdbc57c1",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/08/10/1691634158885hED_upIIZ.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/08/10/1691634158886BqC_Bz3bu.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          categories: "1053,111,2",
        },
        {
          id: "126230679",
          name: "프릴 블라우스(새제품) - 화이트, 핑크",
          price: "24,000원",
          text: "프릴 디테일이 예쁜 블라에요~ 저렴이 아닙니당 원가에 팔아요 화이트, 핑크 두컬러 다있어요 [상세 참고] https://m.smartstore.naver.com/alldaymay/products/8528348127?NaPm=ct%3Dllk44wnk%7Cci%3D537d9db4cc25324d43f5fc130de38c3682d6154b%7Ctr%3Dslsl%7Csn%3D637627%7Chk%3D13465e1912b528b7c1a05806144cde0ffdbc57c1",
          imgsrc1:
            "https://img2.joongna.com/media/original/2023/08/10/1691634224771CWH_jf1DL.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          imgsrc2:
            "https://img2.joongna.com/media/original/2023/08/10/1691634224772mFb_UrTsI.jpg?impolicy=resizeWatermark3&ftext=밀키찡",
          categories: "1053,111,2",
        },
      ],
    },
    {
      id: "kgs",
      nickname: "김궁서",
      pwd: "1111",
      name: "김궁서",
      email: "kgs@gmail.com",
      phone: "01011112222",
      address: "관악구",
      gender: "male",
      userproduct: [],
    },
    {
      id: "lhj",
      nickname: "이한재",
      pwd: "1111",
      name: "이한재",
      email: "lhj@gmail.com",
      phone: "01011112222",
      address: "관악구",
      gender: "male",
      userproduct: [],
    },
    {
      id: "psh",
      nickname: "박상현",
      pwd: "1111",
      name: "박상현",
      email: "psh@gmail.com",
      phone: "01011112222",
      address: "관악구",
      gender: "male",
      userproduct: [],
    },
  ],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      //action.payload에는 모든 initialState의 모든정보가 있어야한다.
    },
    delete: (state, action) => {
      //payload: id
      state = state.filter((e) => action.payload !== e.id);
    },
    update: (state, action) => {
      console.log("hi", action.payload);
      state.forEach((p, i) =>
        p.id === action.payload.id ? (state[i] = action.payload) : ""
      );
    },
    deleteItem(state, action) {
      console.log(state);
      let num = state[1].userproduct.find((a) => {
        return a.id === action.payload;
      });
      num = state[1].userproduct.indexOf(num);
      state[1].userproduct.splice(num, 1);
    },
  },
});

export let { deleteItem } = user.actions;

export default user;
