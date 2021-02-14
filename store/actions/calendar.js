import { AsyncStorage } from "react-native";

export const SET_CURRENTDATE = "SET_CURRENTDATE";
export const DOT_DATES = "DOT_DATES";
export const INITIATE_CALENDAR = "INITIATE_CALENDAR";
export const UPDATE_CALENDAR = "UPDATE_CALENDAR";
export const SET_EDITMODEICON = "SET_EDITMODEICON";
export const SETEDITMODE= "SETEDITMODE";
export const ADD_ICON = "ADD_ICON";
export const MARKDATES = "MARKDATES";
export const CURRENTCALENDARMONTH ="CURRENTCALENDARMONTH";


export const setdate = (day) => {
  // const dateString = day.dateString
  // console.log(day)
  return { type: SET_CURRENTDATE, dateString: day.dateString , timestamp: day.timestamp};
};

export const dotdate = (day) => {
  // const dateString = day.dateString
  return { type: DOT_DATES, date: day.dateString };
};

export const markdates = (timearray, modeliststrname) => {
  // console.log(modeliststrname,'modeliststrname')
  return { type: MARKDATES, timearray: timearray, modeliststrname:modeliststrname};
};



export const initiatecalendar = () => {
    // console.log("value");
  return async (dispatch, getState) => {
    try {
        // console.log("value");
      const value = await AsyncStorage.getItem("CalendarNotes");
      if (value !== null) {
        const calendarnotes = JSON.parse(value);
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

export const setEditMode = (editmode) => {
  return { type: SETEDITMODE, editmode: editmode};
};

export const currentcalendarmonth = (monthkey) => {
  // console.log('got to here', monthkey)
  return {type:CURRENTCALENDARMONTH, monthkey:monthkey}
}