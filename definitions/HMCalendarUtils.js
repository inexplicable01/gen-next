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
