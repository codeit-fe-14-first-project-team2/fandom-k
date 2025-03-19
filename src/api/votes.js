import { handler } from "./class-http-client";

const PATH = "votes";

/**
 * @param {{ idolId: number }} value
 * @returns {{ idol: { id: number, name: string, gender: "female" | "male", group: string, profilePicture: string, totalVotes: number, teamId: number }, voteId: number }}
 */
export async function createVote(value) {
  return await handler.post(PATH, value);
}
