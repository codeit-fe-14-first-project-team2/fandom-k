import axios from "axios";

export const HTTP_STATUS = {
	STATUS_OK: 200,
	STATUS_CREATED: 201,
	STATUS_UNAUTHORIZED: 401,
	STATUS_NOT_FOUND: 404,
};

const URL = "https://fandom-k-api.vercel.app";
export const teamName = "14-2";

export const commonInstance = axios.create({
	baseURL: URL,
	headers: { "Content-Type": "application/json; charset=UTF-8" },
});
export const multipartInstance = axios.create({
	baseURL: URL,
	headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
});
