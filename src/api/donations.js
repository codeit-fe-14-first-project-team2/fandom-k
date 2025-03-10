import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

const PATH = "donations";

/**
 * 후원 목록 조회
 * @param {number | undefined} cursor
 * @param {number | undefined} pageSize
 * @param {number[] | undefined} priorityIdolIds
 * @returns {{
 *  list: {
 *    id: number,
 *    idolId: number,
 *    title: string,
 *    subtitle: string,
 *    targetDonation: number,
 *    receivedDonations: number,
 *    createdAt: string,
 *    deadline: string,
 *    status: boolean,
 *    idol: { id: number, name: string, gender: "female" | "male", group: "string", profilePicture: string, totalVotes: number }
 *  }[],
 *  nextCursor: number | null
 * }}
 */
export async function getDonations(cursor = 0, pageSize = 10, priorityIdolIds = []) {
  const params = new URLSearchParams();
  params.append("pageSize", pageSize);
  if (cursor) params.append("cursor", cursor);
  if (priorityIdolIds.length > 0)
    for (const id of priorityIdolIds) {
      params.append("priorityIdolIds", id);
    }
  try {
    const response = await commonInstance.get(`/${teamName}/${PATH}`, { params });
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("후원 목록 조회 중 오류가 발생했습니다.");
  }
}
/**
 * 후원하기
 * @param {number} id - 후원 ID
 * @param {number} amount - 후원 금액
 * @returns {{ id: number, title: string, subtitle: string, idolId: number, targetDonation: number, receivedDonations: number, createdAt: string, deadline: string, status: boolean }}
 */
export async function contributeDonation(id, amount) {
  try {
    const response = await commonInstance.put(`/${teamName}/${PATH}/${id}`, { amount });
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("후원 생성 중 오류가 발생했습니다.");
  }
}
// #region : Optional API
/**
 * 후원 생성
 * @param {{ deadline: string, targetDonation: number, subtitle: string, title: string, idolId: number }} value
 * @returns {{ id: number, title: string, subtitle: string, idolId: number, targetDonation: number, receivedDonations: number, createdAt: string, deadline: string, status: boolean, teamId: number }}
 */
export async function createDonation(value) {
  try {
    const response = await commonInstance.post(`/${teamName}/${PATH}`, value);
    if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("후원 생성 중 오류가 발생했습니다.");
  }
}
/**
 * 후원 수정
 * @param {number} id
 * @param {{ deadline: string, targetDonation: number }} value
 * @returns {{ id: number, title: string, subtitle: string, idolId: number, targetDonation: number, receivedDonations: number, createdAt: string, deadline: string, status: boolean }}
 */
export async function updateDonation(id, value) {
  try {
    const response = await commonInstance.put(`/${teamName}/${PATH}/${id}`, value);
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("후원 생성 중 오류가 발생했습니다.");
  }
}
/**
 * 후원 삭제
 * @param {number} id - 삭제할 후원 ID
 * @returns {{ id: number, title: string, subtitle: string, idolId: number, targetDonation: number, receivedDonations: number, createdAt: string, deadline: string, status: boolean }}
 */
export async function deleteIdol(id) {
  try {
    const response = await commonInstance.delete(`/${teamName}/${PATH}/${id}`);
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("후원 삭제 중 오류가 발생했습니다.");
  }
}
// #endregion : Optional API
