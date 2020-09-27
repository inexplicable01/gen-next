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

    generatelayout() {
        this.mixedfirstweek = (this.wkarr[0][0].day!='1')
        const lastidx = this.wkarr.length-1
        this.mixedlastweek = (this.wkarr[lastidx][0].month !=this.wkarr[lastidx][6].month)
    }
}

export default Month;
