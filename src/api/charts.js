import { handler } from "./class-http-client";

const PATH = "charts";
<<<<<<< Updated upstream
export async function getChart({ selectedTab, cursor = 0, pageSize = 10 }) {
  const params = { gender: selectedTab, cursor, pageSize };
  return await handler.get(`${PATH}/${selectedTab}`, params);
=======

export async function getChart(gender, cursor = 0, pageSize = 10) {
  const params = { gender, cursor, pageSize };
  return await handler.get(`${PATH}/${gender}`, params);
>>>>>>> Stashed changes
}
