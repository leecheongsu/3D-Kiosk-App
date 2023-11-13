import { useTheme } from '@mui/material/styles';
import { createMakeAndWithStyles } from 'tss-react';
import { theme } from './theme';

export const { makeStyles, withStyles } = createMakeAndWithStyles({ useTheme: useTheme as () => typeof theme });
