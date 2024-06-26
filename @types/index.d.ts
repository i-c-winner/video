declare module "@mui/material/styles" {
  interface TypographyVariants {
    myText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    myText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    myText: true;
    h3: false;
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypographyProps } from "@mui/material";

declare module "@material-ui/core/Typography" {
  interface TypographyProps {
    variant?: "myText" | TypographyProps["variant"];
  }
}
