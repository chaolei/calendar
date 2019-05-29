import {observable, action} from 'mobx';

let now = new Date();
const MonthMobx = observable({year: now.getFullYear(), month: now.getMonth(), today: now });

MonthMobx.changeMonth = function(year, month) {
    this.year = year;
    this.month = month;
};

export default MonthMobx;