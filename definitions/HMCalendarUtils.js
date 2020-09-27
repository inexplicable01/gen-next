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
  Jan: "January",
  Feb: "Feburary",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

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

// export const examwkair = [
//   [
//     {
//       dateString: "2020-07-05",
//       day: 5,
//       month: 6,
//       timestamp: 1593964800000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-06",
//       day: 6,
//       month: 6,
//       timestamp: 1594051200000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-07",
//       day: 7,
//       month: 6,
//       timestamp: 1594137600000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-08",
//       day: 8,
//       month: 6,
//       timestamp: 1594224000000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-09",
//       day: 9,
//       month: 6,
//       timestamp: 1594310400000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-10",
//       day: 10,
//       month: 6,
//       timestamp: 1594396800000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-11",
//       day: 11,
//       month: 6,
//       timestamp: 1594483200000,
//       year: 2020,
//     },
//   ],
//   [
//     {
//       dateString: "2020-07-12",
//       day: 12,
//       month: 6,
//       timestamp: 1594569600000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-13",
//       day: 13,
//       month: 6,
//       timestamp: 1594656000000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-14",
//       day: 14,
//       month: 6,
//       timestamp: 1594742400000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-15",
//       day: 15,
//       month: 6,
//       timestamp: 1594828800000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-16",
//       day: 16,
//       month: 6,
//       timestamp: 1594915200000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-17",
//       day: 17,
//       month: 6,
//       timestamp: 1595001600000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-18",
//       day: 18,
//       month: 6,
//       timestamp: 1595088000000,
//       year: 2020,
//     },
//   ],
//   [
//     {
//       dateString: "2020-07-19",
//       day: 19,
//       month: 6,
//       timestamp: 1595174400000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-20",
//       day: 20,
//       month: 6,
//       timestamp: 1595260800000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-21",
//       day: 21,
//       month: 6,
//       timestamp: 1595347200000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-22",
//       day: 22,
//       month: 6,
//       timestamp: 1595433600000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-23",
//       day: 23,
//       month: 6,
//       timestamp: 1595520000000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-24",
//       day: 24,
//       month: 6,
//       timestamp: 1595606400000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-25",
//       day: 25,
//       month: 6,
//       timestamp: 1595692800000,
//       year: 2020,
//     },
//   ],
//   [
//     {
//       dateString: "2020-07-26",
//       day: 26,
//       month: 6,
//       timestamp: 1595779200000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-27",
//       day: 27,
//       month: 6,
//       timestamp: 1595865600000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-28",
//       day: 28,
//       month: 6,
//       timestamp: 1595952000000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-29",
//       day: 29,
//       month: 6,
//       timestamp: 1596038400000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-30",
//       day: 30,
//       month: 6,
//       timestamp: 1596124800000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-07-31",
//       day: 31,
//       month: 6,
//       timestamp: 1596211200000,
//       year: 2020,
//     },
//     {
//       dateString: "2020-08-01",
//       day: 1,
//       month: 7,
//       timestamp: 1596297600000,
//       year: 2020,
//     },
//   ],
// ];
