import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

class DayStore {
    constructor() {
        this.state = {
            data: []
        };
        this.generateDays();
    }

    generateDays(){
        let currentDay = moment();
        if (currentDay.isoWeekday() === 7) {
            currentDay = currentDay.add(1, 'days');
        }
        let currentMonth = currentDay.month();
        let currentYear = currentDay.year();
        let startYear = (currentMonth > 7) ? currentYear : currentYear - 1;
        let endYear = (currentMonth > 7) ? currentYear + 1 : currentYear;


        let days = [];
        let day = moment().set({year: startYear, month: 7, date: 20});
        let lastDay = moment().set({year: endYear, month: 6, date: 31});
        let index = 0;
        while (day.isBefore(lastDay, 'day')) {
            let isSunday = (day.isoWeekday() === 7);
            if (!isSunday) {
                days.push(day.clone());
                index++;
            }
            day = day.add(1, 'days');
        }
        this.state.data = days;
    }

    check(){
        return true;
    }

    getDays(){
        return this.state.data;
    }
}

export default new DayStore();