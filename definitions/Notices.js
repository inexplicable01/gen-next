//Notices component is used for creating the icons and words in the Notes component

export const IUISex="IUI/Sex";
export const D3="D3 Embryo Transfer";
export const D5="D5 Embryo Transfer";
export const PERIOD="Period";

export const notescaldefinition = {
  // a list of different types of notices
  Medication: {
    dotdef: {
      key: "Medication",
      color: "fuchsia",
      selectedDotColor: "fuchsia",
    },
    liststr: [
      {
        name: "Birth Control",
        icon: "pill",
        iconfamily: "MaterialCommunityIcons",
      },
      {
        name: "Ovulation Induct",
        icon: "pill",
        iconfamily: "MaterialCommunityIcons",
      },
    ],
    vieworder: 1,
    icon: "pills",
  },
  Activity: {
    dotdef: {
      key: "Activity",
      color: "darkorange",
      selectedDotColor: "darkorange",
    },
    liststr: [
      { name: IUISex, icon: "heart", iconfamily: "AntDesign" },
      { name: D3, icon: "dice-three", iconfamily: "FontAwesome5" },
      { name: D5, icon: "dice-five", iconfamily: "FontAwesome5" },
    ],
    vieworder: 2,
    icon: "pills",
  },
  Appointment: {
    dotdef: {
      key: "Appointment",
      color: "forestgreen",
      selectedDotColor: "forestgreen",
    },
    liststr: [
      {
        name: "Uterine Testing",
        icon: "test-tube",
        iconfamily: "MaterialCommunityIcons",
      },
      { name: "Embryo Transfer", icon: "egg", iconfamily: "FontAwesome5" },
      { name: "Egg retrival", icon: "egg", iconfamily: "FontAwesome5" },
      { name: "Injection", icon: "injection-syringe", iconfamily: "Fontisto" },
      { name: "IUI", icon: "heart", iconfamily: "AntDesign" },
    ],
    vieworder: 3,
    icon: "calendar-check",
  },
  Notes: {
    dotdef: { key: "Notes", color: "crimson", selectedDotColor: "pink" },
    liststr: [
      { name: PERIOD, icon: "blood-drop", iconfamily: "Fontisto" },
      { name: "Pain", icon: "emoji-sad", iconfamily: "Entypo" },
      // { name: "", icon: "emoji-sad", iconfamily: "Entypo" },
    ],
    vieworder: 4,
    icon: "calendar-check",
  },
};

export const findcolor = (word) => {
  for (const notice of Object.keys(notescaldefinition)) {
    for ( const list of notescaldefinition[notice].liststr){
      if (list.name===word) {
        return notescaldefinition[notice].dotdef.color;
      }
    }

  }
  return "gainsboro";
};

export const iconsFromNotes = (wordArray) => {
  const iconsToChart = [];
  // console.log(wordArray)
  for (const notice of Object.keys(notescaldefinition)) {
    for (const liststr of notescaldefinition[notice].liststr) {
      if (wordArray.includes(liststr.name)) {
        // console.log(liststr.name);
        iconsToChart.push({
          iconname: liststr.icon,
          iconcolor: notescaldefinition[notice].dotdef.color,
          iconfamily: liststr.iconfamily,
        });
        // break;
      }
    }
  }

  return iconsToChart;
};

export const findicon = (word) => {
  for (const notice of Object.keys(notescaldefinition)) {
    if (notescaldefinition[notice].liststr.includes(word)) {
      return notescaldefinition[notice].icon;
    }
  }
  return "bug";
};
