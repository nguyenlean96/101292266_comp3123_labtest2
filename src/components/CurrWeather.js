import React, { useEffect } from "react";
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const CurrWeather = (props) => {
	const [data, setData] = React.useState({});
	useEffect(() => {
		const dat = props.data;

		setData({
			city: dat.name,
			temp: dat.main.temp,
			temp_min: dat.main.temp_min,
			temp_max: dat.main.temp_max,
			brief_desc: dat.weather[0].main,
			description: dat.weather[0].description,
			sun_rise: dat.sys.sunrise,
			sun_set: dat.sys.sunset,
			icon: `http://openweathermap.org/img/wn/${dat.weather[0].icon}@2x.png`,
		});
	}, []);
	return (
		<div className="d-flex justify-content-center">
			<div className="d-flex flex-column bg-light py-5 w-75 border rounded-4 shadow">
				<div className="d-flex justify-content-center">
					<div className="me-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							className="bi bi-sunrise"
							viewBox="0 0 16 16"
						>
							<path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
						</svg>
						<span className="ms-2">
							{parseDateTime(data.sun_rise).getHours() +
								":" +
								parseDateTime(data.sun_rise).getMinutes()}
						</span>
					</div>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							className="bi bi-sunset-fill"
							viewBox="0 0 16 16"
						>
							<path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
						</svg>
						<span className="ms-2">
							{parseDateTime(data.sun_set).getHours() -
								12 +
								":" +
								parseDateTime(data.sun_set).getMinutes()}
						</span>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<h4>{data.city}</h4>
				</div>
				<div className="d-flex justify-content-center">
					<img
						style={{ height: "10rem", width: "10rem" }}
						src={data.icon}
						alt={"weather-icon"}
					/>
				</div>
				<div className="d-flex justify-content-center">
					<h1>{parseTemp(data.temp)}&deg;</h1>
				</div>
				<div className="d-flex justify-content-center">
					<h5>{data.description}</h5>
				</div>
				<div className="d-flex justify-content-center">
					<div className="me-3">H:{parseTemp(data.temp_max)}</div>
					<div>L:{parseTemp(data.temp_min)}</div>
				</div>
			</div>
		</div>
	);
};

const parseTemp = (temp) => {
	return parseFloat(temp).toFixed(0);
};
const parseDateTime = (num) => {
	return new Date(parseInt(num) * 1000);
};

export default CurrWeather;
