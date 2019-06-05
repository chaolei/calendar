import React , {Component} from 'react';
import { observer } from "mobx-react";

import ScheduleStore from '../../mobx/store/scheduleStore';

import DateUtil from '../utils/DateUtil';
import './month.less';
import './index.less';

class CalendarMonth extends Component{

    constructor() {
        super();
        this.scheduleList = {};
    }

    componentDidMount() {
        let dayArea = this.getStartEndDay(this.props);
        ScheduleStore.querySchedule( dayArea.startday, dayArea.endday, this.showSchedule.bind(this));
    }

    componentWillReceiveProps(next) {
        if(next.year != this.props.year || next.month != this.props.month){
            let dayArea = this.getStartEndDay(next);
            ScheduleStore.querySchedule(dayArea.startday, dayArea.endday, this.showSchedule.bind(this));
        }
        console.log('11122@@@');
    }

    showSchedule(err, ret) {
        if(err) return ;
        console.log('---');
        ScheduleStore.updateSchedule(ret);

    }

    getStartEndDay(props) {
        let {year, month} = props;
        let dayArea = {};
        let firstday = new Date(year, month, 1);
        let weekday = firstday.getDay();
        let predays = weekday - 1; //前面需要补的天数

        let startday = new Date(year, month, 1 - predays);
        let date = startday.getDate();
        dayArea.startday = DateUtil.getDateStr(startday);

        startday.setDate(date + 41);
        dayArea.endday = DateUtil.getDateStr(startday);

        return dayArea;
    }

    getDaysView() {
        let {year, month, curDay} = this.props;
        let firstday = new Date(year, month, 1);
        let weekday = firstday.getDay();
        let predays = weekday - 1; //前面需要补的天数
        let daysnum = DateUtil.getMonthDayNum(year, month);
        //let afterdays = 42 - predays - daysnum;//6排，一排7天，共42个
        let monthEnd = predays + daysnum;
        let startday = new Date(year, month, 1 - predays);
        let daysView = [], day, mcls, dcls, date, comonth, weekcls, week, daystr;
        let _this = this;

        for(let i=0; i<42; i++){
            date = startday.getDate();
            comonth = startday.getMonth();
            week = startday.getDay();
            daystr = DateUtil.getDateStr(startday);
            mcls = (i >= predays && i < monthEnd) ? 'current-month' : '';
            dcls = curDay && curDay == date && comonth == month ? 'current-day' : '';
            weekcls = (week == 6 || week == 0) ? 'week' : '';

            day = (
                <div className={`day-item-con ${mcls}  ${weekcls}`} key={`day${i}`}>
                    <div className={`day-item`}>
                        <span className={dcls}>{date}</span>日
                    </div>
                    <div className='node-container' onDoubleClick={(function(daystr){ return function(){_this.addSchedule(daystr)}})(daystr)}></div>
                </div>
            );

            startday.setDate(date + 1);
            daysView.push(day);
        }

        return daysView;
    }

    getWeekView() {
        let weekArr = '一,二,三,四,五,六,日';
        let week = weekArr.split(',').map((item, index) => {
            return <div className='day-item-con week-title' key={index}><div className='day-item'>{`周${item}`}</div></div>;
        });
        return week;
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
        console.log(ScheduleStore.scheduleList);
        let daysView = this.getDaysView();
        let weekView = this.getWeekView();

        return (
            <div className='scroll-container'>
                <div className='year-title'>
                    <span>{this.props.year}年{this.props.month+1}月</span>
                </div>
                <div className='week-list'>{weekView}</div>
                <div className='month-container'>
                    {daysView}
                </div>
            </div>
        );
    }
}

export default observer(CalendarMonth);
