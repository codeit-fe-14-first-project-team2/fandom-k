import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

export async function getIdolList(keyword, cursor = 1, pageSize = 10) {
	const params = { keyword, cursor, pageSize };
	try {
		const response = await commonInstance.get(`/${teamName}/idols`, { params });
		if (response.status === HTTP_STATUS.STATUS_OK) return response.data;
	} catch (err) {
		console.log(err);
		throw new Error("아이돌 목록 조회 중 오류가 발생했습니다.");
	}
}
/**
 *
 * @param {{
 *  "profilePicture": string,
 *  "group": string,
 *  "gender": "female" | "male",
 *  "name": string
 * }} value
 * @returns {{
 *  "totalVotes": number,
 *  "profilePicture": string,
 *  "group": string,
 *  "gender": "female" | "male",
 *  "name": string,
 *  "id": number
 * }}
 */
export async function createIdol(value) {
	try {
		const response = await commonInstance.post(`/${teamName}/idols`, value);
		if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
	} catch (err) {
		console.log(err);
		throw new Error("아이돌 생성 중 오류가 발생했습니다.");
	}
}
