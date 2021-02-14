import {
  SET_CURRENTDATE,
  INITIATE_CALENDAR,
  SETEDITMODE,
  SET_EDITMODEICON,
  ADD_ICON,
  MARKDATES,
  CURRENTCALENDARMONTH,
} from "../actions/calendar";

import {IUISex, D3, D5,PERIOD} from "../../definitions/Notices";
import Toast from 'react-native-simple-toast';
import {dateToCustomObject} from "../../definitions/HMCalendarUtils";
import { AsyncStorage } from "react-native";

const curDate = new Date();
const yyyy_mm_dd = (dateobj) =>{
 let monthnum;
 let datenum;
  if (parseInt(dateobj.getMonth())+1 <10) {
    monthnum = '0' + (parseInt(dateobj.getMonth())+1)
  }else{
    monthnum = ''+(parseInt(dateobj.getMonth())+1)
  }
  if (parseInt(dateobj.getDate())<10) {
    datenum ='0' + dateobj.getDate()
  }else{
    datenum =dateobj.getDate()
  }

  return dateobj.getFullYear() + '-' + monthnum + '-' + datenum
}


const initialState = {
  curdateobj: curDate,
  todayobj: new Date(),
  // selected: curDate.getFullYear(),
  selected: yyyy_mm_dd(curDate),
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
    case CURRENTCALENDARMONTH:
      // console.log('got to here', action.monthkey)
      return {
        ...state,
        monthkey: action.monthkey,
      };
    case SET_CURRENTDATE:
      // 
      // console.log('editmode',state.editmode)
      if (state.editmode) {
        let newnotes;

        if (state.modeliststr.name===PERIOD){
          if (action.timestamp>state.curdateobj.getTime())
          {
            Toast.show('That is a future date. Can\'t fille in yet.')
            return {
              ...state,
              selected: action.dateString,
            };
          }
        }
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
      // console.log('editmode',action.editmode)
      return {
        ...state,
        editmode: action.editmode,
      };
    case MARKDATES:
      const newcalendarnotes = {...state.calendarnotes}
      for( const timestamp of action.timearray){
        // console.log(timestamp)
        const customdateobj = dateToCustomObject(new Date(timestamp))

        // console.log(customdateobj)
        if (newcalendarnotes[customdateobj.dateString]) {
          if ( newcalendarnotes[customdateobj.dateString].includes(action.modeliststrname)) {
            newnotes = [...state.calendarnotes[customdateobj.dateString]]
          } else {
            newnotes = [
              ...state.calendarnotes[customdateobj.dateString],
              action.modeliststrname,
            ];
          }
        } else {
          newnotes = [action.modeliststrname];
        }
        newcalendarnotes[customdateobj.dateString] =newnotes
        
      }
      const notes = JSON.stringify(newcalendarnotes);
      AsyncStorage.setItem("CalendarNotes", notes);

      return {
        ...state,
        calendarnotes:newcalendarnotes
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
