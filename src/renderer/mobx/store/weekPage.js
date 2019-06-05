import {observable, action} from 'mobx';
import DateUtil from '../../components/utils/DateUtil';

let now = new Date();
let weekday = now.getDay();
let reduceDay = weekday == 0 ? 6 : (weekday - 1);
now.setDate(now.getDate() - reduceDay);
let info = DateUtil.getWeekInWhichMonth(now);

const WeekStore = observable({year: info.year, month: info.month, startDay: now });

WeekStore.changeWeek = function(startDay) {
    let info = DateUtil.getWeekInWhichMonth(startDay);
    this.year = info.year;
    this.month = info.month;
    this.startDay = startDay;
};

export default WeekStore;