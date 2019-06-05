import React , {Component} from 'react';
import { observer } from "mobx-react";

import CalendarWeek from './week';
import WeekStore from '../../mobx/store/weekPage';
import DateSwitcher from '../common/DateSwitcher';

import './index.less';
import DateUtil from '../utils/DateUtil';

class WeekScroll extends Component{

    constructor() {
        super();
        this.year = WeekStore.year;
        this.month = WeekStore.month;
        this.startDay = WeekStore.startDay;
    }

    nextWeek() {
        let curStart = new Date(WeekStore.startDay.valueOf());
        curStart.setDate(curStart.getDate() + 7);
         
        WeekStore.changeWeek(curStart);
    }

    prevWeek() {
        let curStart = new Date(WeekStore.startDay.valueOf());
        curStart.setDate(curStart.getDate() - 7);
         
        WeekStore.changeWeek(curStart);
    }

    backNow() {
        if(DateUtil.checkSameDay(this.startDay, WeekStore.startDay)) return ;

        WeekStore.changeWeek(this.startDay);
    }

    render() {
        return (
            <div className='month-scroll week-scroll'>
                <div className='year-title'>
                    <span>{WeekStore.year}年{WeekStore.month+1}月</span>
                </div>
                <div className='month-change'>
                    <DateSwitcher next={this.nextWeek.bind(this)} prev={this.prevWeek.bind(this)} now={this.backNow.bind(this)}/>
                </div>
                <div className='scroll-panel'>
                    <CalendarWeek startDay={WeekStore.startDay}/>
                </div>
                
            </div>
        );
    }
}

export default observer(WeekScroll);