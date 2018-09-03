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
        console.log('Generate Weeks');


        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }
        const currentMonth = currentDay.month();
        const currentYear = currentDay.year();

        const isSemesterOne = currentMonth > 6;

        const startYear = isSemesterOne ? currentYear : currentYear - 1;
        const endYear = isSemesterOne ? currentYear + 1 : currentYear;
        const weeks = [];

        let day = moment().set({ year: startYear, month: 7, date: 20 });
        const lastDay = moment().set({ year: endYear, month: 6, date: 31 });

        let index = 0;
        while (day.isBefore(lastDay, 'day')) {
            weeks.push(parseInt(day.isoWeek()));
            index++;
            day = day.add(1, 'weeks');
        }
        this.state.data = weeks;
        console.log({ weeksLength: weeks.length });
    }

    check() {
        return true;
    }

    getWeeks() {
        return this.state.data;
    }
}

export default new WeekStore();
