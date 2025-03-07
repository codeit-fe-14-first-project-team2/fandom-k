import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

const PATH = "idols";

/**
 * 아이돌 목록 조회
 * @param {string | undefined} keyword
 * @param {number | undefined} cursor
 * @param {number | undefined} pageSize
 * @returns
 */
export async function getIdolList(keyword, cursor = 0, pageSize = 10) {
  const params = { keyword, cursor, pageSize };
  try {
    const response = await commonInstance.get(`/${teamName}/${PATH}`, { params });
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("아이돌 목록 조회 중 오류가 발생했습니다.");
  }
}

// #region : Optional API
/**
 * 아이돌 생성
 * @param {{ profilePicture: string, group: string, gender: "female" | "male", name: string }} value
 * @returns {{ totalVotes: number, profilePicture: string, group: string, gender: "female" | "male", name: string, id: number }}
 */
export async function createIdol(value) {
  try {
    const response = await commonInstance.post(`/${teamName}/${PATH}`, value);
    if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("아이돌 생성 중 오류가 발생했습니다.");
  }
}
/**
 * 아이돌 수정
 * @param {number} id
 * @param {{ profilePicture: string, group: string, gender: "female" | "male", name: string }} value
 * @returns {{ totalVotes: number, profilePicture: string, group: string, gender: "female" | "male", name: string, id: number }}
 */
export async function updateIdol(id, value) {
  try {
    const response = await commonInstance.put(`/${teamName}/${PATH}/${id}`, value);
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("아이돌 정보 수정 중 오류가 발생했습니다.");
  }
}
/**
 * 아이돌 삭제
 * @param {number} id - 삭제할 아이돌 ID
 * @returns
 */
export async function deleteIdol(id) {
  try {
    const response = await commonInstance.delete(`/${teamName}/${PATH}/${id}`);
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("아이돌 삭제 중 오류가 발생했습니다.");
  }
}
// #endregion : Optional API
