import { MonthName } from "../definitions/HMCalendarUtils";

class Month {
    // 0 monthno is Jan 
    // 11 monthno is Dec
    constructor(monthno, year, wkarr){
        this.monthno = monthno
        this.year = year
        this.wkarr = wkarr
    }

    monthname() {
        return MonthName[this.monthno]
    }

    addweek(weekarr){
        this.wkarr.push(weekarr)
    }

    monthyear() {
        return MonthName[this.monthno] + '_' + this.year
    }
}

export default Month;
