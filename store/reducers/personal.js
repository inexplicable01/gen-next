import { SET_SUMCYCLE } from "../actions/personal";
//React Store to calculate 
const initialState = {
  sumcycle: null,
  ave_cycle: null,
  startendovutime: null,
};

export default (state = initialState, action) => {
  // const newmarkeddates = { ...state.markeddates };
  const today = new Date();
  switch (action.type) {
    case SET_SUMCYCLE:
      let lastperiodday;

      for (const [monthyear, data] of Object.entries(action.sumcycle)) {
        if (data.periodenddate.getTime() < today.getTime()) {
          lastperiodday = data.periodenddate.getTime();
        } else {
          break;
        }
      }
      if (!action.ave_cycle){
        return {
          ...state,
          sumcycle: action.sumcycle,
          ave_cycle: null,
          startendovutime: null,
        }

      }

      let numcycles = 1;
      while (
        lastperiodday + numcycles * action.ave_cycle * 3600 * 24 * 1000 <
        today.getTime()
      ) {
        numcycles = numcycles + 1;
      }
      const timearr = [];
      const centerovudate =
        lastperiodday +
        numcycles * action.ave_cycle * 3600 * 24 * 1000 -
        (numcycles / 2) * action.ave_cycle * 3600 * 24 * 1000;
      const startovutime = centerovudate - 2 * 3600 * 24 * 1000;
      // const endovutime = centerovudate + 2*  3600 * 24 * 1000;

      for (let iday = 0; iday < 5; iday++) {
        timearr.push(startovutime + iday * 3600 * 24 * 1000);
      }
      return {
        ...state,
        sumcycle: action.sumcycle,
        ave_cycle: action.ave_cycle,
        startendovutime: timearr,
      };
  }

  return state;
};
