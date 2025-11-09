const theme = {
  name: "iot-platform",
  primaryColor: "neutral",
  secondaryColor: "neutral",
  tokens: {
    colors: {
      // Use neutral grays instead of green
      neutral: {
        10: { value: "#f9fafb" },
        20: { value: "#f3f4f6" },
        40: { value: "#9ca3af" },
        60: { value: "#6b7280" },
        80: { value: "#374151" },
        90: { value: "#1f2937" },
        100: { value: "#111827" },
      },
      border: {
        primary: { value: "#d1d5db" }, // gray-300 for light mode
        secondary: { value: "#6b7280" }, // gray-500 for dark mode
      },
      background: {
        primary: { value: "#ffffff" },
        secondary: { value: "#f8fafc" },
      },
      font: {
        primary: { value: "#171717" },
        secondary: { value: "#6b7280" },
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
      authenticator: {
        backgroundColor: { value: "transparent" },
        borderRadius: { value: "0.75rem" }, // rounded-xl like your cards
      },
      card: {
        backgroundColor: { value: "{colors.background.primary.value}" },
        borderColor: { value: "{colors.border.primary.value}" },
        borderWidth: { value: "2px" },
        borderRadius: { value: "0.75rem" },
        padding: { value: "1rem" },
        boxShadow: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
      },
      fieldcontrol: {
        borderColor: { value: "{colors.border.primary.value}" },
        borderWidth: { value: "2px" },
        borderRadius: { value: "0.75rem" },
        padding: { value: "0.5rem" },
        _focus: {
          borderColor: { value: "{colors.neutral.60.value}" },
          boxShadow: { value: "0 0 0 1px {colors.neutral.60.value}" },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: "{colors.neutral.80.value}" },
          color: { value: "white" },
          borderColor: { value: "{colors.neutral.80.value}" },
          borderRadius: { value: "0.75rem" },
          padding: { value: "0.75rem 1rem" },
          fontWeight: { value: "500" },
          _hover: {
            backgroundColor: { value: "{colors.neutral.90.value}" },
          },
        },
        link: {
          color: { value: "{colors.neutral.80.value}" },
          _hover: {
            color: { value: "{colors.neutral.90.value}" },
          },
        },
      },
      heading: {
        1: {
          fontWeight: { value: "700" },
          color: { value: "{colors.font.primary.value}" },
        },
        2: {
          fontWeight: { value: "600" },
          color: { value: "{colors.font.primary.value}" },
        },
        3: {
          fontWeight: { value: "600" },
          color: { value: "{colors.font.primary.value}" },
        },
        4: {
          fontWeight: { value: "600" },
          color: { value: "{colors.font.primary.value}" },
        },
        5: {
          fontWeight: { value: "500" },
          color: { value: "{colors.font.primary.value}" },
        },
        6: {
          fontWeight: { value: "500" },
          color: { value: "{colors.font.primary.value}" },
        },
      },
      text: {
        color: { value: "{colors.font.secondary.value}" },
      },
    },
    radii: {
      xs: { value: "0.25rem" },
      small: { value: "0.5rem" },
      medium: { value: "0.75rem" },
      large: { value: "0.75rem" },
      xl: { value: "1rem" },
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
