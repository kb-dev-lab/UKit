import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class DayStore {
    constructor() {
        this.state = {
            data: [],
        };
        this.generateDays();
    }

    generateDays() {
        console.log('Generate Days');
        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }
        const currentMonth = currentDay.month();
        const currentYear = currentDay.year();
        const startYear = currentMonth > 6 ? currentYear : currentYear - 1;
        const endYear = currentMonth > 6 ? currentYear + 1 : currentYear;

        const days = [];
        let day = moment().set({ year: startYear, month: 7, date: 20 });
        const lastDay = moment().set({ year: endYear, month: 6, date: 31 });
        let index = 0;

        while (day.isBefore(lastDay, 'day')) {
            let isSunday = day.isoWeekday() === 7;
            if (!isSunday) {
                days.push(day.clone());
                // days.push(day.format('YYYY-MM-DD'));
                index++;
            }
            day = day.add(1, 'days');
        }
        this.state.data = days;
        console.log({ daysLength: days.length });

    }

    check() {
        return true;
    }

    getDays() {
        return this.state.data;
    }
}

export default new DayStore();
