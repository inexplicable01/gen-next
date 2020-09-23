import { AsyncStorage } from "react-native";

export const SET_CURRENTDATE = "SET_CURRENTDATE";
export const DOT_DATES = "DOT_DATES";
export const INITIATE_CALENDAR = "INITIATE_CALENDAR";
export const UPDATE_CALENDAR = "UPDATE_CALENDAR";
export const SET_EDITMODEICON = "SET_EDITMODEICON";
export const ADD_ICON = "ADD_ICON";
export const CURRENTCALENDARMONTH ="CURRENTCALENDARMONTH";


export const setdate = (day) => {
  // const dateString = day.dateString
  return { type: SET_CURRENTDATE, dateString: day.dateString };
};

export const dotdate = (day) => {
  // const dateString = day.dateString
  return { type: DOT_DATES, date: day.dateString };
};

// export const savecalendar = () => {
//   return async (dispatch, getState) => {
 

//     // console.log('saved', calendarnotes)
//     dispatch({
//         type: UPDATE_CALENDAR,
//         calendarnotes: calendarnotes,
//       });
//   };
// };

export const loadcalendar = () => {};

export const initiatecalendar = () => {
    // console.log("value");
  return async (dispatch, getState) => {
    try {
        // console.log("value");
      const value = await AsyncStorage.getItem("CalendarNotes");
      // console.log("value", value);
      if (value !== null) {
        // We have data!!
        const calendarnotes = JSON.parse(value);
        // console.log("calendarnotes", calendarnotes);
        dispatch({
          type: INITIATE_CALENDAR,
          calendarnotes: calendarnotes,
        });
      } else {
        // console.log("cleanslate");
        dispatch({
          type: INITIATE_CALENDAR,
          calendarnotes: {},
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
};


export const setIcon = (modeliststr) => {
  // const dateString = day.dateString
  return { type: SET_EDITMODEICON, modeliststr: modeliststr};
};

export const addIcon = (day) => {
  return { type: ADD_ICON, dateString: day.dateString};
};

export const currentcalendarmonth = (monthkey) => {
  // console.log('got to here', monthkey)
  return {type:CURRENTCALENDARMONTH, monthkey:monthkey}
}