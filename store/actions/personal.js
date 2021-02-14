export const SET_SUMCYCLE = "SET_SUMCYCLE";

import { MonthName, monthdate } from "../../definitions/HMCalendarUtils";

export const setSumCycle = (perioddates) => {
  // reorder
  // console.log('what')
  const sumcycle = {};
  const dates = [...Object.keys(perioddates)].sort();

  // const [yr, mn, day] = dates[0].split("-");
  // periodstartdate
  let periodstartdate = new Date(1900, 1, 1, 12, 0, 0);
  let monthyear;
  for (const date of dates) {
    const [yr, mn, day] = date.split("-");
    const curdate = new Date(yr, parseInt(mn) - 1, day, 12, 0, 0);

    const dayssinceperiodstartday =
      (curdate.getTime() - periodstartdate.getTime()) / 1000 / 3600 / 24;
    if (dayssinceperiodstartday < 14) {
      sumcycle[monthyear]["count"] = sumcycle[monthyear]["count"] + 1;
      sumcycle[monthyear] = { ...sumcycle[monthyear], periodenddate: curdate };
    } else {
      monthyear = MonthName[curdate.getMonth()] + " " + curdate.getFullYear();
      if (monthyear in sumcycle) {
        monthyear = monthyear + "_2";
      }
      periodstartdate = new Date(yr, parseInt(mn) - 1, day, 12, 0, 0);
      sumcycle[monthyear] = {
        count: 1,
        periodstartdate: periodstartdate,
        periodenddate: periodstartdate,
      };
    }
  }
  const cyclearray = [];
  // const cyclearray = [];
  let previousperiod = 0;
  // let lastperiod = new Date(previousperiod);
  for (const [monthyear, data] of Object.entries(sumcycle)) {
    //  console.log(data.periodenddate.getTime())
    nextperiod = data.periodenddate.getTime();
    deltaday = (nextperiod - previousperiod) / 1000 / 3600 / 24;
    if (14 < deltaday && deltaday < 40) {
      cyclearray.push(deltaday);
    }
    previousperiod = data.periodenddate.getTime();
  }
  
  const ave_cycle = (cyclearray.length<2)? null:Math.round( cyclearray.reduce(function(a,b) {
return a+b;
  },0)/cyclearray.length)
  // console.log(cyclearray,'cyclearray')
  return { type: SET_SUMCYCLE, sumcycle: sumcycle, ave_cycle: ave_cycle };
};
