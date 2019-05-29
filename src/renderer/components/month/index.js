import React , {Component} from 'react';

import DateUtil from '../utils/DateUtil';
import './month.less';
import './index.less';

class CalendarMonth extends Component{

    constructor() {
        super();
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
        let daysView = [], day, mcls, dcls, date, comonth, weekcls, week;

        for(let i=0; i<42; i++){
            date = startday.getDate();
            comonth = startday.getMonth();
            week = startday.getDay();
            mcls = (i >= predays && i < monthEnd) ? 'current-month' : '';
            dcls = curDay && curDay == date && comonth == month ? 'current-day' : '';
            weekcls = (week == 6 || week == 0) ? 'week' : '';

            day = <div className={`day-item-con ${mcls}  ${weekcls}`} key={`day${i}`}><div className={`day-item`}><span className={dcls}>{date}</span>日</div></div>;

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

    render() {
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

export default CalendarMonth;
