import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

// email 에 해당 값이 있으면 -> 로그인 상태, 없으면 -> 비로그인 상태로 간주
const initState = {
  email: "",
};

// 쿠키 확인 함수 추가
const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.nickname) {
    // 한글 개짐 대비
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: getMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login......");
      const data = action.payload;
      console.log(data);
      setCookie("member", JSON.stringify(data), 1);
      return data;

      // 새로운 리덕스 스토어에 저장할 상태 값 리턴
      // return { email: data.email };
    },
    logout: (state, action) => {
      console.log("logout......");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 성공
        console.log("fulfilled");
        const payload = action.payload;
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1); // 하루만
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // 진행중
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // 실패
        console.log("rejected");
      });
  },
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 내보내기 -> configuration 에 등록
export default loginSlice.reducer;
