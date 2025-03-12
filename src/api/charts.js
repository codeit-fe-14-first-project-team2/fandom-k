import { handler } from "./class-http-client";

const PATH = "charts";

export async function getChart({ selectedTab, cursor = 0, pageSize = 10 }) {
  const params = { gender: selectedTab, cursor, pageSize };
  return await handler.get(`${PATH}/${selectedTab}`, params);
}
