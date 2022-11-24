import React from "react";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function WeatherHrItem(props) {
	const dat = props.thisHr;
	return (
		<div className="d-flex flex-column me-2">
			<div className="container text-center">
				{new Date(parseInt(dat.dt) * 1000).getHours() > 12
					? new Date(parseInt(dat.dt) * 1000).getHours() - 12
					: new Date(parseInt(dat.dt) * 1000).getHours()}
				:00
			</div>
			<div className="container">
				<img
					style={{ height: "5rem", width: "5rem" }}
					src={`http://openweathermap.org/img/wn/${dat.weather[0].icon}@2x.png`}
					alt={"weather-icon"}
				/>
			</div>
			<div className="container text-center">
				{dat.main.temp.toFixed(0)}&deg;
			</div>
		</div>
	);
}
