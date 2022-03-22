import { CircularProgress, ThemeProvider } from '@mui/material';
import { theme } from '../../../theme';
import { Button } from '../button/ButtonBasic';

interface IButtonLoadingIndicator {
  backColor?: string;
  textColor?: string;
}

function ButtonLoadingIndicator({
  backColor,
  textColor,
}: IButtonLoadingIndicator) {
  return (
    <Button backColor={backColor!} textColor={textColor!}>
      <CircularProgress size="2rem" thickness={4.5} color="secondary" />
    </Button>
  );
}

export default ButtonLoadingIndicator;
