import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

export async function getChart({ selectedTab, cursor = 0, pageSize = 10 }) {
  const params = { gender: selectedTab, cursor, pageSize };
  try {
    const response = await commonInstance.get(
      `https://fandom-k-api.vercel.app/${teamName}/charts/${selectedTab}`,
      { params }
    );
    if (response.status === HTTP_STATUS.STATUS_CREATED) console.log(response.status);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("차트 조회 중 오류가 발생했습니다.");
  }
}
