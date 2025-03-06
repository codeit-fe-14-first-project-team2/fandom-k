import { HTTP_STATUS, multipartInstance } from "./common-http";

export async function uploadImage(file) {
  try {
    const response = await multipartInstance.post("/images/upload", file);
    if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }
}
