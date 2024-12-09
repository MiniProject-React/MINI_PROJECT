import React, { useState } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase"; // firebase.js에서 가져오기

const FileDeleteComponent = () => {
  const [fileName, setFileName] = useState(""); // 입력받은 파일 이름
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!fileName) {
      setMessage("파일 이름을 입력해주세요.");
      return;
    }

    const fileRef = ref(storage, fileName);

    try {
      await deleteObject(fileRef);
      setMessage(`${fileName} 삭제 완료!`);
      setFileName("");
    } catch (error) {
      console.error("파일 삭제 실패:", error);
      setMessage("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>Firebase 파일 삭제</h2>
      <input
        type="text"
        placeholder="삭제할 파일 이름 입력"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleDelete}>삭제</button>
      <p>{message}</p>
    </div>
  );
};

export default FileDeleteComponent;
