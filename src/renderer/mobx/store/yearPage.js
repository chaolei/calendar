import {observable, action} from 'mobx';

let now = new Date();
const yearMobx = observable({year: now.getFullYear(), today: now });

yearMobx.changeYear = function(year) {
    this.year = year;
};

export default yearMobx;