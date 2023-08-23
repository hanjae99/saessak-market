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
      gender: "male",
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
      address: "관악구",
      gender: "male",
      userproduct: [],
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
      let newstate = {
        //payload: {name, nickname, pwd,email,phone,address}
        name: action.payload.name,
        nickname: action.payload.nickname,
        pwd: action.payload.pwd,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
      };
      state = state.map((p) =>
        p.id === newstate.id ? { ...p, ...newstate } : p
      );
    },
  },
});

export default user;
