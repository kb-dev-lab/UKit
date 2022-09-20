import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import 'moment/locale/fr';
import { decode } from 'html-entities';
moment.locale('fr');

import WebApiURL from './WebApiURL';
import { upperCaseFirstLetter } from '.';

const formatDescription = (string) => {
	const str = decode(
		string
			.replace(/\r/g, '')
			.replace(/<br \/>/g, '')
			.replace(/\n\n\n\n/g, ';'),
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
			if (results?.status !== 200) return null;
			if (!results.data) return null;

			const groupList = results.data.results;
			const groupListFormated = groupList
				.map((e) => e.id)
				.filter((e) => e.length > 2)
				.sort();

			return groupListFormated;
		} catch (error) {
			// console.warn(error);
		}
	};

	sortFunctionGroup = (a, b) => {
		const regexUE = RegExp('([0-9][A-Z0-9]+) (.+)', 'im');
		let subectA = a.subject.toUpperCase();
		let subectB = b.subject.toUpperCase();
		const matchA = regexUE.exec(subectA);
		const matchB = regexUE.exec(subectB);

		if (matchA && matchA.length === 3) {
			subectA = `${matchA[2]}`;
		}
		if (matchB && matchB.length === 3) {
			subectB = `${matchB[2]}`;
		}

		if (a.starttime > b.starttime) return 1;
		if (a.starttime < b.starttime) return -1;
		else if (subectA > subectB) return 1;
		else if (subectA < subectB) return -1;
		return 0;
	};

	// fetchSideBarInformation = async (id) => {
	// 	const data = {
	// 		eventId: id,
	// 	};
	// 	const options = {
	// 		method: 'POST',
	// 		url: WebApiURL.DOMAIN + WebApiURL.SIDEBAR,
	// 		headers: {
	// 			Connection: 'keep-alive',
	// 			Pragma: 'no-cache',
	// 			'Cache-Control': 'no-cache',
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	// 		},
	// 		data: qs.stringify(data),
	// 	};

	// 	try {
	// 		let response = await axios.request(options);
	// 		if (response.data.elements) {
	// 			const annotation = response.data.elements?.find((e) => e.label === 'Remarques')
	// 				.content;
	// 			const staff = response.data.elements
	// 				.filter((e) => e.entityType === 101)
	// 				.map((e) => e.content)
	// 				.join(' | ');
	// 			const room = response.data.elements
	// 				.filter((e) => e.entityType === 102)
	// 				.map((e) => e.content)
	// 				.join(' | ');

	// 			return {
	// 				annotation: annotation ?? 'N/C',
	// 				staff: staff ?? 'N/C',
	// 				room: room ?? 'N/C',
	// 			};
	// 		}
	// 		return { annotation: 'N/C', staff: 'N/C', room: 'N/C' };
	// 	} catch (error) {
	// 		console.warn(error);
	// 	}
	// 	return { annotation: 'N/C', staff: 'N/C', room: 'N/C' };
	// };

	fetchCalendarDay = async (group, date) => {
		const endQueryDate = moment(date, 'YYYY-MM-DD')
			.add(1, 'day')
			.format('YYYY-MM-DD');
		const data = {
			start: date,
			end: endQueryDate,
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
			if (response?.status !== 200) return null;

			const eventList = [];

			for (const event of response.data) {
				if (event.eventCategory === 'Vacances') continue;
				if (moment(event.start).format('YYYY-MM-DD') !== date) continue;
				const startDate = moment(event.start);
				const endDate = moment(event.end);
				const starttime = startDate.format('HH:mm');
				const endtime = endDate.format('HH:mm');

				let subject = event.eventCategory;
				if (event.modules !== null) {
					subject = event.modules.shift();
				}

				const unfilteredDescription = formatDescription(event.description).split(';');
				const description = [];
				for (const field of unfilteredDescription) {
					if (!field.includes(event.eventCategory) && !field.includes(subject)) {
						description.push(field.trim());
					}
				}

				let toFilter = null;
				if (description[0].includes(group)) {
					let filter = description[0]
						.replace(group, '')
						.replace('-', '')
						.trim();
					toFilter = filter !== '' ? filter : null;
				}

				const newEvent = {
					id: event.id,
					style: 'style="background-color:' + event.backgroundColor + '"',
					color: event.backgroundColor,
					schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
					starttime,
					endtime,
					date: { start: startDate.toISOString(), end: endDate.toISOString() },
					subject,
					description: description.filter((e) => e != '').join('\n'),
					category: event.eventCategory,
					group,
					toFilter,
				};
				eventList.push(newEvent);
			}

			return eventList.sort(this.sortFunctionGroup);
		} catch (error) {
			console.warn(error);
			return null;
		}
	};

	fetchCalendarWeek = async (group, week) => {
		const searchDate = moment()
			.year(week.year)
			.isoWeek(week.week);

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
			console.warn(error);
			return null;
		}
		if (response?.status !== 200) return null;
		const eventList = [];

		for (let i = 1; i < 7; i++) {
			const obj = {
				dayNumber: String(i),
				dayTimestamp: searchDate
					.startOf('week')
					.add(i - 1, 'day')
					.unix(),
				courses: [],
			};
			eventList.push(obj);
		}

		for (const event of response.data) {
			if (event.eventCategory === 'Vacances') continue;
			const startDate = moment(event.start);
			const endDate = moment(event.end);
			const day = upperCaseFirstLetter(moment(startDate).format('dddd L'));
			const dayNumberInt = moment(startDate).isoWeekday();
			const dayNumber = String(dayNumberInt);

			const starttime = startDate.format('HH:mm');
			const endtime = endDate.format('HH:mm');

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

			let toFilter = null;
			if (description[0].includes(group)) {
				let filter = description[0]
					.replace(group, '')
					.replace('-', '')
					.trim();
				toFilter = filter !== '' ? filter : null;
			}

			const newEvent = {
				id: event.id,
				style: 'style="background-color:' + event.backgroundColor + '"',
				color: event.backgroundColor,
				schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
				starttime,
				endtime,
				date: { start: startDate.toISOString(), end: endDate.toISOString() },
				subject,
				description: description.filter((e) => e != '').join('\n'),
				category: event.eventCategory,
				group,
				day,
				dayNumber,
				toFilter,
			};
			eventList[dayNumberInt - 1].courses.push(newEvent);
		}

		for (const day of eventList) {
			const tmp = day.courses.sort(this.sortFunctionGroup);
			day.courses = tmp;
		}

		return eventList;
	};

	fetchCalendarForSynchronization = async (group) => {
		const currentDate = moment();
		const begin = moment()
			.set('month', 'August')
			.startOf('month');
		const end = moment()
			.set('month', 'August')
			.startOf('month')
			.add(1, 'year');

		// Returns false if we're between August and December
		// Example : if we're in Sept 21 -> begin is August 21 and end August 22
		//           if we're in Jan 22 -> begin is August 21 and end August 22
		if (currentDate.isBefore(begin)) {
			begin.subtract(1, 'year');
			end.subtract(1, 'year');
		}

		const data = {
			start: begin.format('YYYY-MM-DD'),
			end: end.format('YYYY-MM-DD'),
			resType: '103',
			calView: 'agendaWeek',
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
		} catch (error) {
			console.warn(error);
		}

		if (response?.status !== 200) return;

		const events = [];

		for (const event of response.data) {
			if (event.eventCategory === 'Vacances') continue;

			const startDate = moment(event.start);
			const endDate = moment(event.end);
			const day = upperCaseFirstLetter(moment(startDate).format('dddd L'));
			const dayNumberInt = moment(startDate).isoWeekday();
			const dayNumber = String(dayNumberInt);

			const starttime = startDate.format('HH:mm');
			const endtime = endDate.format('HH:mm');

			let subject = event.eventCategory;
			if (event.modules !== null) {
				subject = event.modules.shift();
			}

			const unfilteredDescription = formatDescription(event.description).split(';');
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
				date: { start: startDate.toISOString(), end: endDate.toISOString() },
				subject,
				description: description.filter((e) => e != '').join('\n'),
				category: event.eventCategory,
				group,
				day,
				dayNumber,
			};

			/*const details = {
				title: this.props.data.subject,
				startDate: new Date(this.props.data.date.start),
				endDate: new Date(this.props.data.date.end),
				timeZone: 'Europe/Paris',
				endTimeZone: 'Europe/Paris',
				notes: this.props.data.schedule + '\n' + this.props.data.description,
			};*/

			events.push(newEvent);
		}

		events.sort(this.sortFunctionGroup);

		return events;
	};
}

export default new FetchManager();
