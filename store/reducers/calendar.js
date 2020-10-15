import {
  SET_CURRENTDATE,
  DOT_DATES,
  INITIATE_CALENDAR,
  UPDATE_CALENDAR,
  SETEDITMODE,
  SET_EDITMODEICON,
  ADD_ICON,
  CURRENTCALENDARMONTH,
  setEditMode,
} from "../actions/calendar";

import {IUISex, D3, D5} from "../../definitions/Notices";

const curDate = new Date();


const initialState = {
  curdateobj: curDate,
  todayobj: new Date(),
  // selected: curDate.getFullYear(),
  selected: curDate.toISOString().split("T")[0],
  calendarnotes: {},
  modeliststr: null,
  monthkey: null,
  editmode: false,
};

export default (state = initialState, action) => {
  // const newmarkeddates = { ...state.markeddates };
  switch (action.type) {
    case INITIATE_CALENDAR:
      return {
        ...state,
        calendarnotes: action.calendarnotes,
      };
    // case UPDATE_CALENDAR:
    //   return {
    //     ...state
    //   }
    case CURRENTCALENDARMONTH:
      // console.log('got to here', action.monthkey)
      return {
        ...state,
        monthkey: action.monthkey,
      };
    case SET_CURRENTDATE:
      // console.log(state.calendarnotes)
      if (state.editmode) {
        let newnotes;
        // console.log('day.dateString', state.calendarnotes[action.dateString], state.modeliststr.name)
        if (state.calendarnotes[action.dateString]) {
          if ( state.calendarnotes[action.dateString].includes(state.modeliststr.name)) {
            newnotes = state.calendarnotes[action.dateString].filter(
              (note) => note !== state.modeliststr.name
            );
          } else {
            newnotes = [
              ...state.calendarnotes[action.dateString],
              state.modeliststr.name,
            ];
          }
        } else {
          newnotes = [state.modeliststr.name];
        }
        
        if (state.modeliststr.name===IUISex){
          console.log(action.dateString)
        }

        return {
          ...state,
          selected: action.dateString,
          calendarnotes: {
            ...state.calendarnotes,
            [action.dateString]: newnotes,
          },
        };
      } else {
        return {
          ...state,
          selected: action.dateString,
        };
      }

    case SETEDITMODE:
      return {
        ...state,
        editmode: action.editmode,
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
    case SET_EDITMODEICON:
      return {
        ...state,
        modeliststr: action.modeliststr,
      };

    case ADD_ICON:
      let newnotes;
      // console.log('day.dateString', state.calendarnotes[action.dateString], state.modeliststr.name)
      if (state.calendarnotes[action.dateString]) {
        if (
          state.calendarnotes[action.dateString].includes(
            state.modeliststr.name
          )
        ) {
          newnotes = state.calendarnotes[action.dateString].filter(
            (note) => note !== state.modeliststr.name
          );
        } else {
          newnotes = [
            ...state.calendarnotes[action.dateString],
            state.modeliststr.name,
          ];
        }
      } else {
        newnotes = [state.modeliststr.name];
      }

      return {
        ...state,
        selected: action.dateString,
        calendarnotes: {
          ...state.calendarnotes,
          [action.dateString]: newnotes,
        },
      };
  }
  return state;
};
