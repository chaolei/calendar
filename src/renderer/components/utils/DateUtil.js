let DateUtil = {
    getMonthDayNum: (year, month) => {
        return new Date(year, month+1, 0).getDate();
    },
    getDateStr: function(date){
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        return `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`;
    },
    getCurrentWeek: function(date){
        let year = date.getFullYear();
        let startDay = new Date(year, 0, 1);
        let stepTimes = date.getTime() - startDay.getTime();
        let stepDay = Math.floor(stepTimes/(1000 * 3600 * 24));
        let curWeek = Math.floor(stepDay / 7);
        return curWeek;
    },
    getWeekInWhichMonth: function(startDay) {
        let day = new Date(startDay.getTime());
        day.setDate(day.getDate() + 2);
        return {
            month: day.getMonth(),
            year: day.getFullYear()
        };
    },
    checkSameDay: function(aday, bday) {
        return aday.getFullYear() == bday.getFullYear() && aday.getMonth() == bday.getMonth() && aday.getDate() == bday.getDate() ;
    }
}

export default DateUtil;