import {observable, action} from 'mobx';
import ScheduleAction from '../../actions/scheduleAction';

const ScheduleStore = observable({scheduleList: 0 });

ScheduleStore.addSchedule = function(args, call) {
    ScheduleAction.addSchedule(args, call);
};
ScheduleStore.querySchedule = function(startday, endday, callback) {
    ScheduleAction.querySchedule({sdate: {$gt: startday}, sdate: {$lt: endday}}, callback);
    //this.scheduleList = 12;
};

ScheduleStore.updateSchedule = function(data) {
    this.scheduleList = data.length;

};


export default ScheduleStore;