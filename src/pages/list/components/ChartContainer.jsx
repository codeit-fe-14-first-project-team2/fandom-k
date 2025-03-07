import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Chart from "../../../assets/icon/ic_chart.svg";
import IdolListItem from "./IdolListItem";
import { getChart } from "../../../api/chart";
import "./ChartContainer.scss";

export default function ChartContainer() {
	const [selectedTab, setSelectedTab] = useState("female");
	const [idolData, setIdolData] = useState([]);

	async function getIdolChart({ selectedTab }) {
		try {
			const data = await getChart({ selectedTab });
			setIdolData(data.idols);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getIdolChart({ selectedTab });
	}, [selectedTab]);

	function handleChartButtonClick() {}

	return (
		<div className="display-grid justify-stretch gap-24">
			<div className="display-flex justify-sides">
				<div className="text-bold text-24">이달의 차트</div>
				<Button size="extra-small" onClick={handleChartButtonClick}>
					<img src={Chart} alt="차트 이미지"></img>
					<span>차트 투표</span>
				</Button>
			</div>
			<div id="chart-tab" className="display-flex">
				<button
					className={`${
						selectedTab === "female" ? "active" : ""
					} text-regular line-height-18 letter-spacing-small`}
					onClick={() => setSelectedTab("female")}>
					이달의 여자 아이돌
				</button>
				<button
					className={`${
						selectedTab === "male" ? "active" : ""
					} text-regular line-height-18 letter-spacing-small`}
					onClick={() => {
						setSelectedTab("male");
					}}>
					이달의 남자 아이돌
				</button>
			</div>
			<ul className="display-flex">
				{idolData.map((idol) => (
					<IdolListItem
						key={idol.id}
						id={idol.id}
						rank={idol.rank}
						group={idol.group}
						name={idol.name}
						totalVotes={idol.totalVotes}
						profilePicture={idol.profilePicture}
					/>
				))}
			</ul>
		</div>
	);
}
