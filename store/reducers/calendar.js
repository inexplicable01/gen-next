import { SET_CURRENTDATE, DOT_DATES,INITIATE_CALENDAR ,UPDATE_CALENDAR} from "../actions/calendar";

const curDate = new Date();

// const activity = { key: "activity", color: "red", selectedDotColor: "red" };
// const drugs = { key: "drugs", color: "blue", selectedDotColor: "blue" };
// const appointment = {
//   key: "appointment",
//   color: "green",
//   selectedDotColor: "green",
// };

const initialState = {
  currentdate: curDate.toDateString(),
  curdateobj: curDate,
  selected: curDate.toISOString().split("T")[0],
  calendarnotes: {}
};

export default (state = initialState, action) => {
  // const newmarkeddates = { ...state.markeddates };
  switch (action.type) {
    case INITIATE_CALENDAR:
      return {
        ...state,
        calendarnotes:action.calendarnotes
      }
      case UPDATE_CALENDAR:
        return{
          ...state,
          calendarnotes:action.calendarnotes
        }
    case SET_CURRENTDATE:
      return {
        ...state,
        selected: action.date,
      };
    case DOT_DATES:

      if (action.date in state.markeddates) {
        delete newmarkeddates[action.date];
      } else {
        newmarkeddates[action.date] = { marked: true, dotColor: "red" };
      }

      return {
        ...state,
        markeddates: newmarkeddates,
      };
  }
  return state;
};
