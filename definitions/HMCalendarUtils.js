export const returnIdxByWeekDay = (weekday) => {
  switch (weekday) {
    case "Sun":
      idx = 1;
      break;
    case "Mon":
      idx = 2;
      break;
    case "Tue":
      idx = 3;
      break;
    case "Wed":
      idx = 4;
      break;
    case "Thu":
      idx = 5;
      break;
    case "Fri":
      idx = 6;
      break;
    case "Sat":
      idx = 7;
      break;
  }
};

export const MonthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const fullmonth = {
  "Jan": "January",
  "Feb": "Feburary",
  "Mar": "Wednesday",
  "Apr":"April",
  "May":"May",
  "Jun":"June",
  "Jul":"July",
  "Aug":"August",
  "Sep":"September",
  "Oct":"October",
  "Nov":"November",
  "Dec":"December",
}



export const weekdaynames = ["S", "M", "T", "W", "T", "F", "S"];

export function monthdaysinyear(year) {
  if (year % 4 == 0) {
    // console.log('here3')
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    // console.log('here')
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
}

export function dateToCustomObject(dateobj) {
  // console.log(dateobj.getTime())

  const offset = dateobj.getTimezoneOffset();
  const localdate = new Date(dateobj.getTime() + offset * 60 * 1000);
  return {
    dateString: localdate.toISOString().split("T")[0],
    day: dateobj.getDate(),
    month: dateobj.getMonth(),
    timestamp: dateobj.getTime(),
    year: dateobj.getFullYear(),
  };
}
