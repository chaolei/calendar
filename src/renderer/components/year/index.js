import React , {Component} from 'react';
import { observer } from "mobx-react";

import Month from '../month/month';
import './index.less';

class CalendarYear extends Component{

    constructor(props) {
        super();
    }

    getMonthViews() {
        let arr = [1,5,9];
        let {year, today} = this.props.yearMobx;
        let nowYear = today.getFullYear();
        let nowMonth = today.getMonth() + 1;
        let nowDay = today.getDate();

        let views = arr.map(item => {
            return (
                <div className='month-row' key={item}>
                    <Month year={year} curDay={year==nowYear && nowMonth == item ? nowDay : ''} month={item} showMonth={true}/>
                    <Month year={year} curDay={year==nowYear && nowMonth == item+1 ? nowDay : ''} month={item+1} showMonth={true}/>
                    <Month year={year} curDay={year==nowYear && nowMonth == item+2 ? nowDay : ''} month={item+2} showMonth={true}/>
                    <Month year={year} curDay={year==nowYear && nowMonth == item+3 ? nowDay : ''} month={item+3} showMonth={true}/>
                </div>
            );
        });

        return views
    }

    render() {
        let monthviews = this.getMonthViews();
        return (
            <div className='year-container'>
                <div className='year-title'>
                    <span>{this.props.yearMobx.year}年</span>
                </div>
                <div className='month-list'>
                    {monthviews}
                </div>
            </div>
        );
    }
}

export default observer(CalendarYear);