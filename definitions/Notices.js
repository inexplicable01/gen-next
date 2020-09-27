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
      { name: "Sex", icon: "heart", iconfamily: "AntDesign" },
      { name: "Preg Test", icon: "test-bottle", iconfamily: "Fontisto" },
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
    dotdef: { key: "Notes", color: "#F8D354", selectedDotColor: "indigo" },
    liststr: [
      { name: "Menses", icon: "emoji-sad", iconfamily: "Entypo" },
      { name: "Pain", icon: "emoji-sad", iconfamily: "Entypo" },
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
