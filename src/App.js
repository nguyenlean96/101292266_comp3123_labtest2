import React, { Component, createRef } from "react";
import axios from "axios";
import WeatherDayList from "./components/WeatherDayList";
import CurrWeather from "./components/CurrWeather";
import cities from "./city-list/city.list.min.json";

const log = (whatever) => console.log(whatever);

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const getUniqueDays = (oridat) => {
	let cwday = -1;
	let uniqueDays = [];
	oridat.list.forEach((day) => {
		let wday = new Date(parseInt(day.dt) * 1000).getDay();
		if (wday !== cwday) {
			cwday = wday;
			uniqueDays.push(day);
			uniqueDays[uniqueDays.length - 1].inner = [];
			uniqueDays[uniqueDays.length - 1].inner.push(day);
		} else {
			uniqueDays[uniqueDays.length - 1].inner.push(day);
		}
	});
	oridat.list = uniqueDays;
	let filteredDays = oridat;
	return filteredDays;
};
const DEFAULT_CITY = "Toronto";
const CITY_LIST = cities.map((city) => city.name);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: DEFAULT_CITY,
			query: "",
			searchDay: [],
		};
	}
	componentDidMount = () => {
		this.getCurrentWeather(this.state.city);
		this.getForecast(this.state.city);
	};

	getCurrentWeather = async (city) => {
		await axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=35820355a8495cca10768914cbd18a97`
			)
			.then((res) => {
				this.setState({ ...this.state, curr: res.data });
			})
			.catch((err) => {
				log("Error occurred at getCurrentWeather()");
				log(err);
			});
	};
	getForecast = async (city) => {
		await axios
			.get(
				`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=35820355a8495cca10768914cbd18a97`
			)
			.then((res) => {
				this.setState({ ...this.state, forecast: getUniqueDays(res.data) });
			})
			.catch((err) => {
				log("Error occurred at getForecast()");
				console.log(err);
			});
	};
	render() {
		return (
			<div className="row">
				<div className="col-md-4">
					<div className="px-5 d-flex flex-column justify-content-center">
						<div className="p-2 my-2 mx-5">
							<form className="d-flex" role="search">
								<input
									className="form-control me-2"
									type="search"
									value={this.state.query}
									onChange={(e) => {
										this.setState({ query: e.target.value });
									}}
									placeholder="Search for Day"
									aria-label="Search"
								/>
							</form>
							<hr />
							<div className="container">
								{this.state.curr ? (
									<CurrWeather data={this.state.curr} />
								) : (
									<div
										className="spinner-border"
										style={{ width: "3rem", height: "3rem" }}
										role="status"
									>
										<div className="d-flex align-items-center justify-content-center">
											<span className="container visually-hidden">
												Loading...
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-8">
					<div className="container">
						{this.state.forecast ? (
							<WeatherDayList
								filter_key={this.state.query}
								days={this.state.forecast}
							/>
						) : (
							<div
								className="spinner-border"
								style={{ width: "3rem", height: "3rem" }}
								role="status"
							>
								<div className="d-flex align-items-center justify-content-center">
									<span className="container visually-hidden">Loading...</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
