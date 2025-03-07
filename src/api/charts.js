import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

const PATH = "votes";

/**
 * @param {"female" | "male"} gender
 * @param {number | undefined} cursor
 * @param {number | undefined} pageSize
 */
export async function getRankedChart(gender, cursor = 0, pageSize = 10) {
  const params = { gender, cursor, pageSize };
  try {
    const response = await commonInstance.get(`/${teamName}/${PATH}/gender`, { params });
    if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("이달의 차트 조회 중 오류가 발생했습니다.");
  }
}
