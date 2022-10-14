// material-ui
import { alpha, createTheme } from '@mui/material/styles';

// third-party
import { presetDarkPalettes, presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode, presetColor) => {
  const colors = mode === 'dark' ? presetDarkPalettes : presetPalettes;

  let greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  let greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  let greyConstant = ['#fafafb', '#e6ebf1'];

  if (mode === 'dark') {
    greyPrimary = ['#000000', '#141414', '#1e1e1e', '#595959', '#8c8c8c', '#bfbfbf', '#d9d9d9', '#f0f0f0', '#f5f5f5', '#fafafa', '#ffffff'];
    // greyPrimary.reverse();
    greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    greyConstant = ['#121212', '#d3d8db'];
  }
  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      red: {
        light: colors.red[3],
        main: colors.red[5],
        dark: colors.red[7],
        contrastText: colors.red[0]
      },
      volcano: {
        light: colors.volcano[3],
        main: colors.volcano[5],
        dark: colors.volcano[7],
        contrastText: colors.volcano[0]
      },
      orange: {
        light: colors.orange[3],
        main: colors.orange[5],
        dark: colors.orange[7],
        contrastText: colors.orange[0]
      },
      gold: {
        light: colors.gold[3],
        main: colors.gold[5],
        dark: colors.gold[7],
        contrastText: colors.gold[0]
      },
      yellow: {
        light: colors.yellow[3],
        main: colors.yellow[5],
        dark: colors.yellow[7],
        contrastText: colors.yellow[0]
      },
      lime: {
        light: colors.lime[3],
        main: colors.lime[5],
        dark: colors.lime[7],
        contrastText: colors.lime[0]
      },
      green: {
        light: colors.green[3],
        main: colors.green[5],
        dark: colors.green[7],
        contrastText: colors.green[0]
      },
      cyan: {
        light: colors.cyan[3],
        main: colors.cyan[5],
        dark: colors.cyan[7],
        contrastText: colors.cyan[0]
      },
      blue: {
        light: colors.blue[3],
        main: colors.blue[5],
        dark: colors.blue[7],
        contrastText: colors.blue[0]
      },
      geekblue: {
        light: colors.geekblue[3],
        main: colors.geekblue[5],
        dark: colors.geekblue[7],
        contrastText: colors.geekblue[0]
      },
      purple: {
        light: colors.purple[3],
        main: colors.purple[5],
        dark: colors.purple[7],
        contrastText: colors.purple[0]
      },
      magenta: {
        light: colors.magenta[3],
        main: colors.magenta[5],
        dark: colors.magenta[7],
        contrastText: colors.magenta[0]
      },
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? alpha(paletteColor.grey[900], 0.87) : paletteColor.grey[700],
        secondary: mode === 'dark' ? alpha(paletteColor.grey[900], 0.45) : paletteColor.grey[500],
        disabled: mode === 'dark' ? alpha(paletteColor.grey[900], 0.1) : paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: mode === 'dark' ? alpha(paletteColor.grey[900], 0.05) : paletteColor.grey[200],
      background: {
        paper: mode === 'dark' ? paletteColor.grey[100] : paletteColor.grey[0],
        default: paletteColor.grey.A50
      }
    }
  });
};

export default Palette;
