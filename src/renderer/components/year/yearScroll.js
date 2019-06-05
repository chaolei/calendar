import React , {Component} from 'react';
import { observer } from "mobx-react";

import CalendarYear from './year';
import yearMobx from '../../mobx/store/yearPage';
import DateSwitcher from '../common/DateSwitcher';

import './index.less';

class YearScroll extends Component{

    constructor() {
        super();
        this.year = yearMobx.year;
    }

    nextYear() {
        yearMobx.changeYear(yearMobx.year + 1);
    }

    prevYear() {
        yearMobx.changeYear(yearMobx.year - 1);
    }

    backNow() {
        if(this.year == yearMobx.year) return ;
        yearMobx.changeYear(this.year);
    }

    render() {
        return (
            <div className='year-scroll'>
                <div className='year-change'>
                    <DateSwitcher next={this.nextYear.bind(this)} prev={this.prevYear.bind(this)} now={this.backNow.bind(this)}/>
                </div>
                <div className='scroll-panel'>
                    <CalendarYear yearMobx={yearMobx}/>
                </div>
                
            </div>
        );
    }
}

export default observer(YearScroll);