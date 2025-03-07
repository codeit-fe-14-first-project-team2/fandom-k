import { commonInstance, HTTP_STATUS, teamName } from "./common-http";

const PATH = "votes";

/**
 * @param {{ idolId: number }} value
 * @returns {{ idol: { id: number, name: string, gender: "female" | "male", group: string, profilePicture: string, totalVotes: number, teamId: number }, voteId: number }}
 */
export async function createVote(value) {
  try {
    const response = await commonInstance.post(`/${teamName}/${PATH}`, value);
    if (response.status === HTTP_STATUS.STATUS_CREATED) return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("투표 생성 중 오류가 발생했습니다.");
  }
}
