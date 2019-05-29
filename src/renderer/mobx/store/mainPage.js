import {observable, action} from 'mobx';

const MainMobx = observable({tab: 2 });

MainMobx.changeTab = function(tab) {
    this.tab = tab;
};

export default MainMobx;