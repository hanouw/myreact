import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  // 쿼리스트링 code 라는 이름으로 넘어오는 인가코드 꺼내기
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const dispatch = useDispatch();

  const { moveToPath } = useCustomLogin();

  // 꺼낸 인가코드를 주면서 Access Token 달라고 카카오에 다시 요청 (auth code가 바뀔 때 만)
  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log("getAccessToken - accessToken : ", accessToken);
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("getMemberWithAccessToken 실행중********************");
        console.log(memberInfo);
        // 로그인 처리
        dispatch(login(memberInfo));

        console.log(memberInfo && !memberInfo.social);

        // 화면 이동
        // 소셜 회원 아닌 경우
        if (memberInfo && !memberInfo.social) {
          moveToPath("/");
        } else {
          // 소셜 회원의 경우
          moveToPath("/member/modify"); // 회원정보 수정 페이지로 이동
        }
      });
    });
  }, [authCode]); // authCode 값이 변경 될때만 요청되도록 useEffect 사용

  return (
    <div>
      <div>Kakao Redirect Page</div>
      <div>authCode : {authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
