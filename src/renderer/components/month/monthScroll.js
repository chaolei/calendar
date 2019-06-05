import React , {Component} from 'react';
import { observer } from "mobx-react";

import CalendarMonth from './index';
import MonthMobx from '../../mobx/store/monthPage';
import DateSwitcher from '../common/DateSwitcher';

import './index.less';

class MonthScroll extends Component{

    constructor() {
        super();
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.nowDay = date.getDate();
    }

    nextMonth() {
        let month = MonthMobx.month + 1,
            year = MonthMobx.year ;
        year = month == 12 ? year+1 : year;
        month = month == 12 ? 1 : month;
         
        MonthMobx.changeMonth(year, month);
    }

    prevMonth() {
        let month = MonthMobx.month - 1,
            year = MonthMobx.year ;
        year = month == -1 ? year-1 : year;
        month = month == -1 ? 12 : month;
         
        MonthMobx.changeMonth(year, month);
    }

    backNow() {
        if(this.year == MonthMobx.year && this.month == MonthMobx.month) return ;
        MonthMobx.changeMonth(this.year, this.month);
    }

    render() {
        return (
            <div className='month-scroll'>
                <div className='month-change'>
                    <DateSwitcher next={this.nextMonth.bind(this)} prev={this.prevMonth.bind(this)} now={this.backNow.bind(this)}/>
                </div>
                <div className='scroll-panel'>
                    <CalendarMonth year={MonthMobx.year} curDay={this.year==MonthMobx.year && this.month == MonthMobx.month ? this.nowDay : ''}  month={MonthMobx.month}/>
                </div>
                
            </div>
        );
    }
}

export default observer(MonthScroll);