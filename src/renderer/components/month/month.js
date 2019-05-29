import React , {Component} from 'react';

import DateUtil from '../utils/DateUtil';
import './month.less';

class Month extends Component{

    constructor() {
        super();
    }

    getDaysView() {
        let {year, month, curDay} = this.props;
        month--;
        let firstday = new Date(year, month, 1);
        let weekday = firstday.getDay();
        let predays = weekday - 1; //前面需要补的天数
        let daysnum = DateUtil.getMonthDayNum(year, month);
        //let afterdays = 42 - predays - daysnum;//6排，一排7天，共42个
        let monthEnd = predays + daysnum;
        let startday = new Date(year, month, 1 - predays);
        let daysView = [], day, mcls, dcls, date, comonth;

        for(let i=0; i<42; i++){
            date = startday.getDate();
            comonth = startday.getMonth();
            mcls = (i >= predays && i < monthEnd) ? 'current-month' : '';
            dcls = curDay && curDay == date && comonth == month ? 'current-day' : '';

            day = <div className={`day-item-con ${mcls}`} key={`day${i}`}><div className={`day-item ${dcls}`}>{date}</div></div>;

            startday.setDate(date + 1);
            daysView.push(day);
        }

        return daysView;
    }

    getWeekView() {
        let weekArr = '一,二,三,四,五,六,日';
        let week = weekArr.split(',').map((item, index) => {
            return <div className='day-item-con' key={index}><div className='day-item'>{item}</div></div>;
        });
        return week;
    }

    getTitle() {
        let {month, showMonth} = this.props;
        let arrStr = '一,二,三,四,五,六,七,八,九,十,十一,十二';

        return showMonth ?  <div className='month-title'>{arrStr.split(',')[--month]}月</div> : '';
    }

    render() {
        let daysView = this.getDaysView();
        let weekView = this.getWeekView();
        let monthTitle = this.getTitle();

        return (
            <div className='month-container'>
                {monthTitle}
                {weekView}
                {daysView}
            </div>
        );
    }
}

export default Month;
