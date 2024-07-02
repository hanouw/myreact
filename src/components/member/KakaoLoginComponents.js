import React from "react";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Link } from "react-router-dom";
import kakaologin from "../../assets/imgs/kakao_login.png";

const KakaoLoginComponents = () => {
  const link = getKakaoLoginLink();

  return (
    <>
      <div>
        <div className="relative mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid place-items-center">
          <div className="p-4">
            <Link to={link}>
              <img src={kakaologin} alt="kakao" />
            </Link>
          </div>
          <div className="p-2">
            <span className="bg-white px-6 text-gray-500">
              로그인 시, 자동 가입 처리 됩니다.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default KakaoLoginComponents;
