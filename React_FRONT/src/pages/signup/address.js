import React from "react";
import { useEffect, useState } from "react";
import Input from "../../components/InputComponent";
import Button from "../../components/ButtonComponent";
import { Items } from "../../components/SignupComponent";
const Address = () => {
  const [postcode, setPostcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소

  const [isDaumLoaded, setIsDaumLoaded] = useState(false);
  const [addr, setAddr] = useState("");
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsDaumLoaded(true); // Daum API가 로드되었을 때 상태 업데이트
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setDetailAddress("");

    // setUserInfo(prevState => ({
    //     ...prevState,
    //     zipCode: Number(data.zonecode),
    //     addr: fullAddress,
    //     addrDetail: '' // 기본값으로 설정
    //   }));
  };

  const handleClick1 = () => {
    if (isDaumLoaded) {
      const { daum } = window;
      new daum.Postcode({
        oncomplete: handleComplete,
      }).open();
    } else {
      console.log("Daum Postcode API is not loaded yet.");
    }
  };

  const UnionAddress = () => {
    setAddr(postcode + ":" + address + ":" + detailAddress);
  };
  useEffect(() => {
    // addr이 변경될 때마다 콘솔 로그 출력
    console.log(addr);
  }, [addr]);
  return (
    <Items varient="addres">
      <Button onClick={handleClick1}>주소찾기</Button>
      <Input
        type="text"
        placeholder="우편번호"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />
      <Input
        type="text"
        placeholder="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* 상세 주소를 추가로 입력받을 Input 필드 */}
      <Input
        type="text"
        placeholder="상세 주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      <Button onClick={UnionAddress}>합체 주소</Button>
    </Items>
  );
};

export default Address;
