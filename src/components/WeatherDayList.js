import React, { useEffect } from "react";
import WeatherDayItem from "./WeatherDayItem";
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
export default function WeatherDayList(props) {
	const [query, setQuery] = React.useState("");
	const [data, setData] = React.useState([]);

	useEffect(() => {
		setQuery(props.filter_key);
		setData(props.days.list);
	});

	const filteredDays = data.filter((item) => {
		return days[new Date(parseInt(item.dt) * 1000).getDay()]
			.toLowerCase()
			.includes(query.toLowerCase());
	});
	return (
		<div>
			<div>
				{filteredDays.map((day, index) => {
					return <WeatherDayItem key={index} today={day} />;
				})}
			</div>
		</div>
	);
}
