import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

import style from '../Style';
import CourseRow from './CourseRow';
import { isArraysEquals, upperCaseFirstLetter } from '../utils';
import ErrorAlert from './alerts/ErrorAlert';
import Translator from '../utils/translator';
import DeviceUtils from '../utils/DeviceUtils';
import FetchManager from '../utils/FetchManager';
import CourseManager from '../utils/CourseManager';

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cancelToken: null,
			groupName: this.props.groupName,
			day: moment(this.props.day),
			schedule: null,
			cacheDate: null,
		};
	}

	componentDidMount() {
		this.fetchSchedule();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.fetchSchedule();
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.groupName !== prevState.groupName) {
			if (this.props.filtersList.length > 0) {
				this.fetchSchedule();
			}
		} else if (this.state.day !== prevState.day) {
			this.fetchSchedule();
		} else if (!isArraysEquals(this.props.filtersList, prevProps.filtersList)) {
			this.fetchSchedule();
		}
	}

	componentWillUnmount() {
		if (this.state.cancelToken) {
			this.state.cancelToken.cancel('Operation canceled due component being unmounted.');
		}
		this._unsubscribe();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const nextState = {};

		if (nextProps.day !== prevState.day) {
			nextState.day = nextProps.day;
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
		const date = this.state.day.format('YYYY/MM/DD');
		const id = `${this.state.groupName}@${date}`;
		let dayData = null;
		let cacheDate = null;

		this.setState({ schedule: null, loading: true, cancelToken }, async () => {
			if (await DeviceUtils.isConnected()) {
				try {
					dayData = await FetchManager.fetchCalendarDay(
						groupName,
						date.replace(/\//g, '-'),
					);
					if (dayData === null) throw 'network error';
					AsyncStorage.setItem(id, JSON.stringify({ dayData, date: moment() }));
				} catch (error) {
					let cache = await this.getCache(id);
					if (cache) {
						dayData = cache.dayData;
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
					dayData = cache.dayData;
					cacheDate = cache.date;
				}
			}

			if (dayData != null) {
				let schedule = this.computeSchedule(
					dayData,
					this.state.groupName === this.state.groupName,
				);
				this.setState({ schedule, loading: false, cancelToken: null, cacheDate });
			}
		});
	};

	computeSchedule(schedule, isFavorite) {
		schedule = schedule
			.map((course) => CourseManager.computeCourseUE(course))
			.filter((course) =>
				CourseManager.filterCourse(isFavorite, course, this.props.filtersList),
			);
		return schedule;
	}

	displayDate() {
		return upperCaseFirstLetter(this.state.day.format('dddd L'));
	}

	render() {
		const { theme } = this.props;

		let content = null,
			cacheMessage = null;
		if (this.state.schedule === null) {
			content = (
				<ActivityIndicator style={style.containerView} size="large" animating={true} />
			);
		} else if (this.state.schedule instanceof Array) {
			if (this.state.day.day() === 0 || this.state.schedule.length === 0) {
				this.state.schedule = [{ schedule: 0, category: 'nocourse' }];
			}
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
			content = (
				<FlatList
					data={this.state.schedule}
					extraData={this.state}
					renderItem={(item) => (
						<CourseRow
							data={item.item}
							theme={theme}
							navigation={this.props.navigation}
						/>
					)}
					keyExtractor={(item, index) => item.schedule + String(index)}
					style={{ backgroundColor: theme.courseBackground }}
				/>
			);
		}

		return (
			<View
				style={[style.schedule.containerView, { backgroundColor: theme.courseBackground }]}>
				<View style={style.schedule.titleView}>
					<Text style={[style.schedule.titleText, { color: theme.font }]}>
						{this.displayDate()}
					</Text>
				</View>
				{cacheMessage}
				<View style={style.schedule.contentView}>{content}</View>
			</View>
		);
	}
}

export default Day;
