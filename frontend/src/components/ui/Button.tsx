import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  PolymorphicComponentProps,
} from '@mantine/core';
import { forwardRef, ReactNode } from 'react';

interface ButtonProps
  extends PolymorphicComponentProps<'button', MantineButtonProps> {
  negative?: boolean;
  basic?: boolean;
  positive?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ negative, basic, positive, color, variant, ...props }, ref) => {
    const getColor = () => {
      if (negative) {
        return 'red';
      }

      if (positive) {
        return 'green';
      }

      return color;
    };

    return (
      <MantineButton
        ref={ref}
        radius="md"
        size="sm"
        {...props}
        variant={basic ? 'default' : variant}
        color={getColor()}
      />
    );
  }
);

export default Button;
