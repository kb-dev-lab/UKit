import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

import style from '../Style';
import DayWeek from './ui/DayWeek';
import { isArraysEquals } from '../utils';
import ErrorAlert from './alerts/ErrorAlert';
import DeviceUtils from '../utils/DeviceUtils';
import Translator from '../utils/translator';
import FetchManager from '../utils/FetchManager';
import CourseManager from '../utils/CourseManager';

class Week extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cancelToken: null,
			groupName: this.props.groupName,
			week: this.props.week,
			cacheDate: null,
			schedule: null,
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: true,
			friday: true,
			saturday: true,
		};
	}

	componentDidMount() {
		this.fetchSchedule();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.groupName !== prevProps.groupName) {
			if (this.props.filtersList.length > 0) {
				this.fetchSchedule();
			}
		} else if (this.state.week.week !== prevState.week.week) {
			this.fetchSchedule();
		} else if (!isArraysEquals(this.props.filtersList, prevProps.filtersList)) {
			this.fetchSchedule();
		}
	}

	componentWillUnmount() {
		if (this.state.cancelToken) {
			this.state.cancelToken.cancel('Operation canceled due component being unmounted.');
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const nextState = {};

		if (nextProps.week.week !== prevState.week.week) {
			nextState.week = nextProps.week;
		}

		return nextState;
	}

	getCache = async (id) => {
		let cache = await AsyncStorage.getItem(id);
		if (cache !== null) {
			cache = JSON.parse(cache);
			return cache;
		}
		return null;
	};

	fetchSchedule = () => {
		if (this.state.loading) {
			this.state.cancelToken.cancel('Another request called');
		}

		const cancelToken = axios.CancelToken.source();
		const groupName = this.state.groupName;
		const id = `${this.state.groupName}@Week${this.state.week.week}`;
		let weekData = null;
		let cacheDate = null;

		this.setState({ schedule: null, loading: true, cancelToken }, async () => {
			if (await DeviceUtils.isConnected()) {
				try {
					weekData = await FetchManager.fetchCalendarWeek(groupName, this.state.week);
					AsyncStorage.setItem(id, JSON.stringify({ weekData, date: moment() }));
				} catch (error) {
					let cache = await this.getCache(id);
					if (cache) {
						weekData = cache.weekData;
						cacheDate = cache.date;
					}
				}
			} else {
				const offlineAlert = new ErrorAlert(
					Translator.get('NO_CONNECTION'),
					ErrorAlert.durations.SHORT,
				);
				offlineAlert.show();

				let cache = await this.getCache(id);
				if (cache) {
					weekData = cache.weekData;
					cacheDate = cache.date;
				}
			}

			if (weekData != null) {
				this.setState({ schedule: weekData, loading: false, cancelToken: null, cacheDate });
			}
		});
	};

	displayWeek() {
		return Translator.get('WEEK') + ' ' + this.state.week.week;
	}

	computeSchedule(schedule, isFavorite) {
		schedule.courses = schedule.courses
			.map((course) => CourseManager.computeCourseUE(course))
			.filter((course) =>
				CourseManager.filterCourse(isFavorite, course, this.props.filtersList),
			);
		return schedule;
	}

	render() {
		const { theme } = this.props;
		let content,
			cacheMessage = null;

		if (this.state.schedule === null) {
			content = (
				<ActivityIndicator style={style.containerView} size="large" animating={true} />
			);
		} else if (this.state.schedule instanceof Array) {
			let isFavorite = this.state.groupName === this.state.groupName;

			if (this.state.cacheDate !== null) {
				cacheMessage = (
					<View>
						<Text style={style.offline.groups.text}>
							{Translator.get(
								'OFFLINE_DISPLAY_FROM_DATE',
								moment(this.state.cacheDate).format('lll'),
							)}
						</Text>
					</View>
				);
			}

			console.log(this.state.schedule);

			content = (
				<ScrollView>
					{this.state.schedule.map((schedule, index) => {
						return (
							<DayWeek
								key={index}
								schedule={this.computeSchedule(schedule, isFavorite)}
								navigation={this.props.navigation}
								theme={theme}
							/>
						);
					})}
				</ScrollView>
			);
		}

		return (
			<View
				style={[style.schedule.containerView, { backgroundColor: theme.courseBackground }]}>
				<View style={style.schedule.titleView}>
					<View style={style.schedule.titleTextView}>
						<Text style={[style.schedule.titleText, { color: theme.font }]}>
							{this.displayWeek()}
						</Text>
					</View>
				</View>
				{cacheMessage}
				<View style={style.schedule.contentView}>{content}</View>
			</View>
		);
	}
}

export default Week;
