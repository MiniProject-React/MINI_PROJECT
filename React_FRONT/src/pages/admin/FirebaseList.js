import { ref, listAll, getDownloadURL } from "firebase/storage";

// 특정 파일 이름을 검색하는 함수
async function getFileByName(storage, folderPath, fileNameWithoutExtension) {
  try {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef); // 폴더 안의 모든 파일 목록 가져오기

    // 파일 이름에서 확장자를 제거한 후 비교
    const matchingFile = fileList.items.find((item) => {
      const nameWithoutExtension = item.name.split(".")[0]; // 확장자 제거
      return nameWithoutExtension === fileNameWithoutExtension;
    });

    if (matchingFile) {
      // 매칭된 파일의 URL 가져오기
      const fileURL = await getDownloadURL(matchingFile);
      console.log("File URL:", fileURL);
      return fileURL;
    } else {
      console.log("No matching file found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
}

// 예제 호출
const storage = getFirebaseStorage(); // Firebase Storage 초기화
const folderPath = "images/categoryName";
const fileNameWithoutExtension = "productName"; // 검색하려는 파일 이름

getFileByName(storage, folderPath, fileNameWithoutExtension).then((fileURL) => {
  if (fileURL) {
    console.log("File successfully fetched:", fileURL);
  }
});
