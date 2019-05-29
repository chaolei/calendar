import React , {Component} from 'react';

import './dataSwitcher.less';

class DateSwitcher extends Component{

    constructor() {
        super();
    }

    render() {
        return (
            <div className='date-switcher'>
                <div onClick={this.props.prev}>&lt;</div>
                <div onClick={this.props.now}>今天</div>
                <div onClick={this.props.next}>&gt;</div>
            </div>
        );
    }
}

export default DateSwitcher;

