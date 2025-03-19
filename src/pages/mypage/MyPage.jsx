import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { getChart } from "../../api/charts";
import { getIdolList } from "../../api/idols";
import ErrorPage from "../../components/ErrorPage";
import Header from "../../components/header/Header";
import useDataNum from "../../hooks/useDataNum";
import AddInterestedIdols from "./components/AddInterestedIdols";
import InterestedIdols from "./components/InterestedIdols";

export const MyStateContext = createContext();
export const MyDispatchContext = createContext();

const MyPage = () => {
	const [datas, setDatas] = useState([]); // 아이돌 데이터 리스트
	const [checkedIdols, setCheckedIdols] = useState([]); // 체크된 아이돌 리스트
	const [selectedDatas, setSelectedDatas] = useState([]); // 관심있는 아이돌 리스트
	const [cursor, setCursor] = useState(null); // 다음 데이터를 불러올 커서
	const [isLoading, setIsLoading] = useState(false); // 로딩 상태
	const [error, setError] = useState(false); // 에러
	const dataNum = useDataNum(); // 한 번에 불러올 데이터 수
	const [option, setOption] = useState("total"); // 아이돌 목록

	// 공통 함수 : 데이터 로드 및 에러 처리
	const fetchData = async (dataNum) => {
		try {
			setIsLoading(true); // 로딩 시작
			let result;

			// 옵션에 따라 데이터 로드 (전체, 여자, 남자)
			if (option === "total") {
				result = await getIdolList(undefined, cursor, dataNum);
				handleDataUpdate(result?.list, "result.list"); // 데이터 검사 및 업데이트
			} else if (option === "female" || option === "male") {
				result = await getChart({ gender: option, cursor, pageSize: dataNum });
				handleDataUpdate(result?.idols, "result.idols"); // 데이터 검사 및 업데이트
			}
			setCursor(result?.nextCursor); // 다음 커서 업데이트
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// 에러가 Axios 요청에서 발생한 경우
				console.error("AxiosError 로딩 오류:", error);
			} else {
				// 그 외의 에러인 경우
				console.error("데이터 로딩 오류:", error);
			}
			setError(true); // 에러 상태 업데이트
		} finally {
			setIsLoading(false); // 로딩 종료
		}
	};

	// 데이터 업데이트 및 오류 처리 함수
	const handleDataUpdate = (data, errorMessage) => {
		if (Array.isArray(data)) {
			// data가 배열이 맞으면 datas에 추가
			setDatas((prevDatas) => [...prevDatas, ...data]);
		} else {
			console.error(`오류: ${errorMessage}가 배열이 아님`);
		}
	};

	// 초기 데이터 로딩
	useEffect(() => {
		fetchData(dataNum);
	}, [option]);

	// 추가 데이터를 로드하는 함수
	const handleLoadMoreClick = async (itemsToLoad) => {
		if (!cursor) return; // cursor가 없으면 더 이상 요청하지 않음
		await fetchData(itemsToLoad);
	};

	return (
		<>
		<Header />
			<ErrorBoundary FallbackComponent={ErrorPage}>
				<StyledMyPage>
					<MyStateContext.Provider value={{ datas, selectedDatas, checkedIdols }}>
						<MyDispatchContext.Provider value={{ setDatas, setSelectedDatas, setCheckedIdols }}>
							<InterestedIdols />
							<AddInterestedIdols
								cursor={cursor}
								setCursor={setCursor}
								isLoading={isLoading}
								loadMore={handleLoadMoreClick}
								option={option}
								setOption={setOption}
								error={error}
							/>
						</MyDispatchContext.Provider>
					</MyStateContext.Provider>
				</StyledMyPage>
			</ErrorBoundary>
		</>
	);
};

export default MyPage;

const StyledMyPage = styled.div`
	h2 {
		color: #f6f6f8;
		font-weight: 700;
		font-size: 24px;
		line-height: 26px;
	}
`;