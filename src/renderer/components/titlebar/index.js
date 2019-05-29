import React , {Component} from 'react';
import { observer } from "mobx-react";

import './index.less';

class TitleBar extends Component{

    constructor() {
        super();
    }

    render() {
        let {current, tabs, onChange} = this.props;
        return (
            <div className='title-bar'>
                <div className='calendar-type'>
                    <div>日</div>
                    <div>周</div>
                    <div className={current == tabs.month?'cur':''} onClick={()=>{onChange(tabs.month)}}>月</div>
                    <div className={current == tabs.year?'cur':''} onClick={()=>{onChange(tabs.year)}}>年</div>
                </div>
            </div>
        );
    }
}

export default observer(TitleBar);

