import React , {Component} from 'react';
import { observer } from "mobx-react";

import TitleBar from '../titlebar';
import YearScroll from "../year/YearScroll";
import MonthScroll from "../month/monthScroll";
import WeekScroll from "../week/weekScroll";

import MainMobx from '../../mobx/store/mainPage';

import './index.less';

const TABS = {
    year: 3,
    month: 2,
    week: 1
};

class CalendarMain extends Component{

    constructor() {
        super();
    }

    changeTab(tab) {
        if(tab == MainMobx.tab) return ;
        MainMobx.changeTab(tab);
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <TitleBar current={MainMobx.tab} tabs = {TABS} onChange={this.changeTab}/>
                {MainMobx.tab == TABS.year ? <YearScroll/> : ''}
                {MainMobx.tab == TABS.month ? <MonthScroll/> : ''}
                {MainMobx.tab == TABS.week ? <WeekScroll/> : ''}
            </div>
        );
    }
}

export default observer(CalendarMain);

