import React from 'react';
import { useTheme } from '../../../themes/ThemeContext';
import { getSelectStyles } from './getSelectStyles';
import { cx } from 'emotion';
import { SelectableValue } from '@grafana/data';
import { Icon } from '../../Icon/Icon';
import { CustomScrollbar } from '../../CustomScrollbar/CustomScrollbar';
// @ts-ignore
import { components } from '@torkelo/react-select';

interface SelectMenuProps {
  maxHeight: number;
}

export const SelectMenu = React.forwardRef<HTMLDivElement, React.PropsWithChildren<SelectMenuProps>>((props, ref) => {
  const theme = useTheme();
  const styles = getSelectStyles(theme);
  const { children, maxHeight } = props;
  return (
    <components.MenuList {...props}>
      <div className={styles.menu} ref={ref} style={{ maxHeight }}>
        <CustomScrollbar autoHide={false} autoHeightMax="inherit">
          {children}
        </CustomScrollbar>
      </div>
    </components.MenuList>
  );
});

interface SelectMenuOptionProps<T> {
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  innerProps: any;
  renderOptionLabel?: (value: SelectableValue<T>) => JSX.Element;
  data: SelectableValue<T>;
}

export const SelectMenuOptions = React.forwardRef<HTMLDivElement, React.PropsWithChildren<SelectMenuOptionProps<any>>>(
  (props, ref) => {
    const theme = useTheme();
    const styles = getSelectStyles(theme);
    const { children, innerProps, data, renderOptionLabel, isSelected, isFocused } = props;
    return (
      <div ref={ref} className={cx(styles.option, isFocused && styles.optionFocused)} {...innerProps}>
        <span>{renderOptionLabel ? renderOptionLabel(data) : children}</span>
        {isSelected && (
          <span>
            <Icon name="check" />
          </span>
        )}
      </div>
    );
  }
);
