import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

import WebApiURL from './WebApiURL';

class FetchManager {
	fetchGroupList = async () => {
		const options = {
			method: 'GET',
			url: 'https://celcat.u-bordeaux.fr/Home/ReadResourceListItems',
			params: { searchTerm: '_', pageSize: '10000', resType: '103' },
			headers: {
				Connection: 'keep-alive',
				'Content-Type': 'application/x-www-form-urlencoded',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache',
				'X-Requested-With': 'XMLHttpRequest',
				'Sec-Fetch-Mode': 'cors',
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
			},
		};
		// console.log(options);
		try {
			const results = await axios.request(options);
			// console.log(results);
			const groupList = results.data.results;
			const groupListFormated = Array.from(new Set(groupList.map((e) => e.id)));

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

		let response;
		try {
			response = await axios.request(options);
		} catch (error) {
			console.log(error);
		}
		if (response?.status !== 200) return null;

		const annotation = response.data.elements?.find((e) => e.label === 'Remarques').content;
		const staff = response.data.elements
			.filters((e) => e.entityType === 101)
			.map((e) => e.content)
			.join(' | ');
		const room = response.data.elements
			.filters((e) => e.entityType === 102)
			.map((e) => e.content)
			.join(' | ');

		return { annotation, staff, room };
	};

	fetchCalendarDay = async (group, date) => {
		const data = {
			start: date,
			end: date,
			resType: '103',
			calView: 'agendaDay',
			'federationIds[]': group,
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
			console.log(error);
		}
		if (response?.status !== 200) return;

		const eventList = [];

		for (const event of response.data) {
			const startDate = new Date(event.start);
			const endDate = new Date(event.end);
			const starttime =
				String(startDate.getHours()).padStart(2, '0') +
				':' +
				String(startDate.getMinutes()).padStart(2, '0');
			const endtime =
				String(endDate.getHours()).padStart(2, '0') +
				':' +
				String(endDate.getMinutes()).padStart(2, '0');

			const { annotation, staff, room } = await fetchSideBarInformation(event.id);

			const newEvent = {
				style: 'style="background-color:' + event.backgroundColor + '"',
				color: event.backgroundColor,
				schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
				starttime,
				endtime,
				subject: event.modules.join(' | '),
				staff,
				category: event.category,
				room,
				annotation,
				group: group,
			};
			eventList.push(newEvent);
		}

		return eventList;
	};

	fetchCalendarWeek = async (group, week) => {
		const currentDate = moment();
		let year;

		if (currentDate.month() > 6) {
			year = currentDate.year();
		} else {
			year = currentDate.year() - 1;
		}

		const searchDate = moment(String(year)).isoWeek(week);

		const begin = searchDate.startOf('week');
		const end = searchDate.endOf('week');
		const data = {
			start: begin,
			end: end,
			resType: '103',
			calView: 'agendaWeek',
			'federationIds[]': group,
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
			console.log(error);
		}
		if (response?.status !== 200) return;

		const eventList = [];

		for (const event of response.data) {
			const startDate = new Date(event.start);
			const endDate = new Date(event.end);
			const day = moment(startDate).format('dddd DD/MM/YYYY');
			const dayNumber = String(moment(startDate).isoWeekday());

			const starttime =
				String(startDate.getHours()).padStart(2, '0') +
				':' +
				String(startDate.getMinutes()).padStart(2, '0');
			const endtime =
				String(endDate.getHours()).padStart(2, '0') +
				':' +
				String(endDate.getMinutes()).padStart(2, '0');

			const { annotation, staff, room } = await fetchSideBarInformation(event.id);

			const newEvent = {
				style: 'style="background-color:' + event.backgroundColor + '"',
				color: event.backgroundColor,
				schedule: starttime + '-' + endtime + ' ' + event.eventCategory,
				starttime,
				endtime,
				subject: event.modules.join(' | '),
				staff,
				category: event.category,
				room,
				annotation,
				group: group,
				day,
				dayNumber,
			};
			eventList.push(newEvent);
		}

		return eventList;
	};
}

export default new FetchManager();
