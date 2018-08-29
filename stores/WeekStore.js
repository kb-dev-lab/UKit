import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class WeekStore {
    constructor() {
        this.state = {
            data: [],
        };
        this.generateWeeks();
    }

    generateWeeks() {
        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }
        let currentMonth = currentDay.month();
        let currentYear = currentDay.year();
        let startYear = currentMonth > 6 ? currentYear : currentYear - 1;
        let endYear = currentMonth > 6 ? currentYear + 1 : currentYear;

        let weeks = [];
        let day = moment().set({ year: startYear, month: 7, date: 20 });
        let lastDay = moment().set({ year: endYear, month: 6, date: 31 });
        let index = 0;
        while (day.isBefore(lastDay, 'day')) {
            weeks.push(parseInt(day.isoWeek()));
            index++;
            day = day.add(1, 'weeks');
        }
        this.state.data = weeks;
    }

    check() {
        return true;
    }

    getWeeks() {
        return this.state.data;
    }
}

export default new WeekStore();
