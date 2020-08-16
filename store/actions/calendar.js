import { AsyncStorage } from "react-native";

export const SET_CURRENTDATE = "SET_CURRENTDATE";
export const DOT_DATES = "DOT_DATES";
export const INITIATE_CALENDAR = "INITIATE_CALENDAR";
export const UPDATE_CALENDAR = "UPDATE_CALENDAR";



export const setdate = (day) => {
  // const dateString = day.dateString
  return { type: SET_CURRENTDATE, date: day.dateString };
};

export const dotdate = (day) => {
  // const dateString = day.dateString
  return { type: DOT_DATES, date: day.dateString };
};

export const savecalendar = (date, notedetails) => {
  return async (dispatch, getState) => {
    const calendarnotes = {
      ...getState().calendar.calendarnotes,
      [date]: notedetails,
    };

    const notes = JSON.stringify(calendarnotes);

    // console.log('saving', notes)
    try {
      await AsyncStorage.setItem("CalendarNotes", notes);

    } catch (err) {
      console.log(err);
    }
    // console.log('saved', calendarnotes)
    dispatch({
        type: UPDATE_CALENDAR,
        calendarnotes: calendarnotes,
      });
  };
};

export const loadcalendar = () => {};

export const initiatecalendar = () => {
    // console.log("value");
  return async (dispatch, getState) => {
    try {
        // console.log("value");
      const value = await AsyncStorage.getItem("CalendarNotes");
    //   console.log("value", value);
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

//  const textcalendarnotes = {
//   "2020-08-16": ["sex"],
//   "2020-08-17": ["hug", "handholding"],
//   "2020-08-18": [
//     "sex",
//     "hug",
//     "handholding",
//     "teno",
//     "pilly",
//     "tenoli",
//     "injection",
//     "extraction",
//     "checkup",
//     "payment",
//   ],
//   "2020-08-19": ["sex", "handholding", "pilly", "extraction", "payment"],
//   "2020-08-01": ["sex", "handholding", "extraction", "payment"],
//   "2020-08-02": ["handholding", "payment"],
// };


