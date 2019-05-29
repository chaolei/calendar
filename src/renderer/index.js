import React, {Component} from 'react';
import {render} from 'react-dom';

import CalendarMain from './components/main/index';

class Index extends Component{
    constructor(){
        super();
    }

    render() {
        return <CalendarMain/>;
    }
}

let root = document.querySelector('#app');
if (!root) {
    root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);
}

render(
    <Index/>,
    root
);