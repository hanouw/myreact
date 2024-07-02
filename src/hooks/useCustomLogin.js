import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const dispatch = useDispatch(); // 리덕스 state 값 변경해라~
  const navigate = useNavigate(); // 페이지 이동 시

  // 로그인 상태 값
  const loginState = useSelector((state) => state.loginSlice);

  // 로그인 여부
  const isLogin = loginState.email ? true : false;

  // 로그인 함수
  const execLogin = async (LoginParam) => {
    const action = await dispatch(loginPostAsync(LoginParam)); // Promise 리턴
    return action.payload;
  };

  // 로그아웃 함수
  const execLogout = async () => {
    dispatch(logout());
  };

  // 페이지 이동 함수
  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  // 로그인 페이지 이동 (뒤로가기 지우면서 이동)
  const moveToLogin = () => {
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  // 예외 처리 함수 (토큰 문제 등)
  const exceptionHandle = (ex) => {
    console.log("exeption *****************************");
    console.log(ex);

    const errorMsg = ex.response.data.error;
    // 쿼리스트링 구조로 만들어주는 함수
    const errorStr = createSearchParams({ error: errorMsg }).toString();
    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인이 필요한 서비스입니다");
      // 에러 메세지 포함해서 로그인 폼으로 이동
      navigate({ pathname: "/member/login", search: errorStr });
    }
    if (ex.response.data.error === "ERROR_ACCESS_DENIED") {
      alert("해당 서비스에 대한 권한이 없습니다.");
      navigate({ pathname: "/", search: errorStr });
      return;
    }
    if (ex.response.data.error !== null) {
      alert("예기치 못한 오류가 발생했습니다. 홈페이지로 돌아갑니다.");
      navigate({ pathname: "/", search: errorStr });
      return;
    }
  };

  return { loginState, isLogin, execLogin, execLogout, moveToPath, moveToLogin, exceptionHandle };
};

export default useCustomLogin;
