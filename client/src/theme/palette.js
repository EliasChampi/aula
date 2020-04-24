import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[100],
  },
  secondary: {
    contrastText: black,
    dark: colors.orange[900],
    main: colors.orange["A400"],
    light: colors.orange["A100"],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
