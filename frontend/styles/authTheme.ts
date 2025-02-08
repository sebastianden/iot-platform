const theme = {
  name: "terminal",
  primaryColor: "green",
  secondaryColor: "green",
  tokens: {
    // This sets the global font for some reason
    fonts: {
      default: {
        variable: {
          value: "Geist, sans-serif",
        },
      },
    },
    colors: {
      green: {
        10: { value: "#C7EFCA" },
        20: { value: "#9AE2A1" },
        40: { value: "#4CCB68" },
        60: { value: "#44AF5B" },
        80: { value: "#31703D" },
        90: { value: "#224226" },
        100: { value: "#013D09" },
      },
      border: {
        primary: { value: "black" },
      },
    },
    shadows: {
      small: {
        value: {
          offsetX: "0px",
          offsetY: "2px",
          blurRadius: "4px",
          color: "{colors.shadow.tertiary.value}",
        },
      },
      medium: {
        value: {
          offsetX: "10px",
          offsetY: "10px",
          spreadRadius: "0px",
          blurRadius: "0",
          color: "{colors.shadow.secondary.value}",
        },
      },
      large: {
        value: {
          offsetX: "8px",
          offsetY: "30px",
          spreadRadius: "10px",
          blurRadius: "0",
          color: "{colors.shadow.primary.value}",
        },
      },
    },
    components: {
      heading: {
        1: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        2: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        3: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        4: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        5: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        6: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
      },
      button: {
        primary: {
          backgroundColor: { value: "{colors.primary.40.value}" },
          color: { value: "{colors.font.primary.value}" },
          borderColor: { value: "{colors.border.primary.value}" },
        },
      },
    },
    radii: {
      xs: { value: "1rem" },
      small: { value: "2rem" },
      medium: { value: "2rem" },
      large: { value: "2rem" },
      xl: { value: "3rem" },
    },
    space: {
      small: { value: "1rem" },
      medium: { value: "1.5rem" },
      large: { value: "2rem" },
    },
    borderWidths: {
      small: { value: "2px" },
      medium: { value: "4px" },
      large: { value: "8px" },
    },
  },
};

export default theme;
