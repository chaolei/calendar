import React , {Component} from 'react';
import { observer } from "mobx-react";

import ScheduleStore from '../../mobx/store/scheduleStore';

import DateUtil from '../utils/DateUtil';
import './index.less';

class CalendarWeek extends Component{

    constructor() {
        super();
        this.curDay = new Date();
        this.scheduleList = {};
    }

    componentDidMount() {
        let dayArea = this.getStartEndDay();
        console.log(dayArea);
        ScheduleStore.querySchedule( dayArea.startday, dayArea.endday, this.showSchedule.bind(this));
    }

    showSchedule(err, ret) {
        if(err) return ;
        ScheduleStore.updateSchedule(ret);
    }

    getStartEndDay() {
        let dayArea = {};
        let startDay = new Date(this.props.startDay.valueOf());
        dayArea.startday = DateUtil.getDateStr(startDay);

        startDay.setDate(startDay.getDate() + 6);
        dayArea.endday = DateUtil.getDateStr(startDay);

        return dayArea;
    }

    getWeekView() {
        let weekArr = '一,二,三,四,五,六,日';
        let startDay = new Date(this.props.startDay.valueOf()), dayDate, curFlag;
        let week = weekArr.split(',').map((item, index) => {
            dayDate = startDay.getDate();
            curFlag = DateUtil.checkSameDay(startDay, this.curDay);
            startDay.setDate(dayDate + 1);

            return <div className={`day-item-con week-title`} key={index}><div className={curFlag?'day-item cur-day':'day-item'}><span>{dayDate}</span>{` 周${item}`}</div></div>;
        });
        let time = <div className='day-item-con day-time'></div>;
        week.unshift(time);

        return week;
    }

    getDaysView() {
        let weekArr = '一,二,三,四,五,六,日';
        let startDay = new Date(this.props.startDay.valueOf()), dayDate, weekFlag, hoursView;
        let week = weekArr.split(',').map((item, index) => {
            dayDate = startDay.getDate();
            weekFlag = item == '六' || item == '日';
            startDay.setDate(dayDate + 1);
            hoursView = this.getDayHourView();

            return <div className={`day-item-con ${weekFlag?'spe':''}`} key={index}>{hoursView}</div>;
        });
        let times = this.getDayTimesView();
        let time = <div className='day-item-con day-time'>{times}</div>;
        week.unshift(time);

        return week;
    }

    getDayHourView() {
        let hoursView = [],hourView;
        for(let hour=0; hour<24; hour++){
            hourView = <div key={hour} className='hour-area'></div>;
            hoursView.push(hourView);
        }
        return hoursView;
    }

    getDayTimesView() {
        let timesView = [],hourView;
        for(let hour=0; hour<24; hour++){
            hourView = <div key={hour} className='hour-area'>{hour}时</div>;
            timesView.push(hourView);
        }
        return timesView;
    }

    addSchedule(daystr) {
        //let daystr = DateUtil.getDateStr(startday);
        let schedule = {
            _id: new Date().getTime(),
            title: '新建日程',
            address: '成都',
            time: '9-10',
            desc: ''
        };
        ScheduleStore.addSchedule({sdate: daystr, content: schedule}, this.addStatus.bind(this));
    }

    addStatus(err, ret){
        console.log(err, ret);
    }

    render() {
        let weekView = this.getWeekView();
        let daysView = this.getDaysView();

        return (
            <div className='scroll-container'>
                <div className='week-list'>{weekView}</div>
                <div className='week-container'>
                    {daysView}
                </div>
            </div>
        );
    }
}

export default observer(CalendarWeek);
