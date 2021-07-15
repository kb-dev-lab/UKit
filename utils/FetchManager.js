import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import 'moment/locale/fr';
import { decode } from 'html-entities';
moment.locale('fr');

import WebApiURL from './WebApiURL';

const formatDescription = (string) => {
	const str = decode(
		string
			.replace(/\r/g, '')
			.replace(/<br \/>/g, '')
			.replace(/\n\n/g, '\n'),
	);
	return str;
};

class FetchManager {
	fetchGroupList = async () => {
		const options = {
			method: 'GET',
			url: WebApiURL.DOMAIN + WebApiURL.GROUPS,
			params: { searchTerm: '_', pageSize: '10000', resType: '103' },
		};

		try {
			const results = await axios.request(options);
			if (!results.data) return [];
			const groupList = results.data.results;
			const groupListFormated = groupList
				.map((e) => e.id)
				.filter((e) => e.length > 2)
				.sort();

			return groupListFormated;
		} catch (error) {
			console.log(error);
		}
	};

	fetchSideBarInformation = async (id) => {
		const data = {
			eventId: id,
		};
		const options = {
			method: 'POST',
			url: WebApiURL.DOMAIN + WebApiURL.SIDEBAR,
			headers: {
				Connection: 'keep-alive',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			data: qs.stringify(data),
		};

		try {
			let response = await axios.request(options);
			if (response.data.elements) {
				const annotation = response.data.elements?.find((e) => e.label === 'Remarques')
					.content;
				const staff = response.data.elements
					.filter((e) => e.entityType === 101)
					.map((e) => e.content)
					.join(' | ');
				const room = response.data.elements
					.filter((e) => e.entityType === 102)
					.map((e) => e.content)
					.join(' | ');

				return {
					annotation: annotation ?? 'N/C',
					staff: staff ?? 'N/C',
					room: room ?? 'N/C',
				};
			}
			return { annotation: 'N/C', staff: 'N/C', room: 'N/C' };
		} catch (error) {
			console.log(error);
		}
		return { annotation: 'N/C', staff: 'N/C', room: 'N/C' };
	};

	fetchCalendarDay = async (group, date) => {
		const data = {
			start: date,
			end: date,
			resType: '103',
			calView: 'agendaDay',
			'federationIds[]': group,
			colourScheme: '3',
		};
		const options = {
			method: 'POST',
			url: WebApiURL.DOMAIN + WebApiURL.CALENDARDATA,
			headers: {
				Connection: 'keep-alive',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			data: qs.stringify(data),
		};
		let response;
		try {
			response = await axios.request(options);

			const eventList = [];

			for (const event of response.data) {
				if (event.eventCategory === 'Vacances') continue;
				const startDate = moment(event.start);
				const endDate = moment(event.end);
				const starttime =
					String(startDate.hours()).padStart(2, '0') +
					':' +
					String(startDate.minutes()).padStart(2, '0');
				const endtime =
					String(endDate.hours()).padStart(2, '0') +
					':' +
					String(endDate.minutes()).padStart(2, '0');

				let subject = event.eventCategory;
				if (event.modules !== null) {
					subject = event.modules.shift();
				}

				const unfilteredDescription = formatDescription(event.description).split('\n');
				const description = [];
				for (const field of unfilteredDescription) {
					if (!field.includes(event.eventCategory) && !field.includes(subject)) {
						description.push(field.trim());
					}
				}

				const newEvent = {
					id: event.id,
					style: 'style="background-color:' + event.backgroundColor + '"',
					color: event.backgroundColor,
					schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
					starttime,
					endtime,
					subject,
					description: description.filter((e) => e != '').join('\n'),
					category: event.eventCategory,
					group: group,
				};
				eventList.push(newEvent);
			}

			return eventList.sort((a, b) => {
				if (a.starttime > b.starttime) return 1;
				if (a.starttime < b.starttime) return -1;
				return 0;
			});
		} catch (error) {
			console.log('ERROR FETCHING CALENDAR');
			console.log(error);
			return [];
		}
	};

	fetchCalendarWeek = async (group, week) => {
		console.log('getting week', group, week);
		const currentDate = moment();
		let year = currentDate.year();

		if (currentDate.month() > 7) {
			year = currentDate.year();
		} else {
			year = currentDate.year() + 1;
		}

		const searchDate = moment(String(year)).isoWeek(week);

		const begin = searchDate.startOf('week').format('YYYY-MM-DD');
		const end = searchDate.endOf('week').format('YYYY-MM-DD');
		const data = {
			start: begin,
			end: end,
			resType: '103',
			calView: 'agendaWeek',
			'federationIds[]': group,
			colourScheme: '3',
		};
		console.log({
			currentDate,
			year,
			searchDate,
			begin,
			end,
		});
		const options = {
			method: 'POST',
			url: WebApiURL.DOMAIN + WebApiURL.CALENDARDATA,
			headers: {
				Connection: 'keep-alive',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			data: qs.stringify(data),
		};
		let response;
		try {
			response = await axios.request(options);
		} catch (error) {
			console.log(error);
		}
		if (response?.status !== 200) return;

		const eventList = [[], [], [], [], [], [], []];

		for (const event of response.data) {
			if (event.eventCategory === 'Vacances') continue;
			const startDate = moment(event.start);
			const endDate = moment(event.end);
			const day = moment(startDate).format('dddd DD/MM/YYYY');
			const dayNumberInt = moment(startDate).isoWeekday();
			const dayNumber = String(dayNumberInt);

			const starttime =
				String(startDate.hours()).padStart(2, '0') +
				':' +
				String(startDate.minutes()).padStart(2, '0');
			const endtime =
				String(endDate.hours()).padStart(2, '0') +
				':' +
				String(endDate.minutes()).padStart(2, '0');

			const newEvent = {
				id: event.id,
				style: 'style="background-color:' + event.backgroundColor + '"',
				color: event.backgroundColor,
				schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
				starttime,
				endtime,
				subject: event.modules.join(' | '),
				category: event.category,
				group: group,
				day,
				dayNumber,
			};
			eventList[dayNumberInt].push(newEvent);
		}

		return eventList;
	};
}

export default new FetchManager();
