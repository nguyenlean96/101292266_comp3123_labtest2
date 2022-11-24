import React, { useEffect } from "react";
import WeatherHrItem from "./WeatherHrItem";
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const WeatherDayList = (props) => {
	const dat = props.today;
	const [thisDay, setThisDay] = React.useState({});
	const [data, setData] = React.useState({});

	useEffect(() => {
		setData({ dat });
		setThisDay({
			weekDay: days[new Date(parseInt(dat.dt) * 1000).getDay()],
			icon: `http://openweathermap.org/img/wn/${dat.weather[0].icon}@2x.png`,
			temp: dat.main.temp.toFixed(0),
			temp_min: parseInt(dat.main.temp_min),
			temp_max: parseInt(dat.main.temp_max),
			humidity: parseInt(dat.main.humidity),
			inner: dat.inner,
		});
	}, []);

	return (
		<div className="px-1 mb-1 border-bottom">
			<div className="row d-flex align-items-center">
				<div className="col-2 border rounded-4 py-2 my-2">
					<div className="d-flex flex-column justify-content-center">
						<div className="col-auto">
							<div className="text-center">{thisDay.weekDay}</div>
						</div>
						<div className="container text-center">{thisDay.humidity}%</div>
						<div className="text-center">
							<img
								style={{ height: "8rem", width: "8rem" }}
								src={thisDay.icon}
								alt="weather-icon"
							/>
						</div>
						<div className="d-flex justify-content-center row">
							<div className="col-auto text-center me-1">
								H: {thisDay.temp_max}&deg;
							</div>
							<div className="col-auto text-center">
								L: {thisDay.temp_min}&deg;
							</div>
						</div>
					</div>
				</div>
				<div className="col-10">
					<div className="py-5">
						<div className="d-flex">
							{dat.inner.map((hr, index) => (
								<WeatherHrItem key={index} thisHr={hr} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default WeatherDayList;
