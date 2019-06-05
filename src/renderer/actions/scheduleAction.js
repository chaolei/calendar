import Schedule from '../service/schedule';

const ScheduleAction = {
    addSchedule: function(args, callback){
        Schedule.add(args, callback);
    },
    delSchedule: function(args, callback){
        Schedule.delete(args, callback);
    },
    querySchedule: function(args, callback){
        Schedule.find(args, callback);
    },
    updateSchedule: function(args, callback){
        Schedule.update(args, callback);
    }
};

export default ScheduleAction;