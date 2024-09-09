/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { FunctionComponent, ThHTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { resolveWidthAsStyle } from './utils';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';

export type EuiTableHeaderCellCheckboxScope =
  (typeof HEADER_CELL_SCOPE)[number];

export interface EuiTableHeaderCellCheckboxProps {
  width?: string | number;
  scope?: EuiTableHeaderCellCheckboxScope;
}

export const EuiTableHeaderCellCheckbox: FunctionComponent<
  CommonProps &
    ThHTMLAttributes<HTMLTableHeaderCellElement> &
    EuiTableHeaderCellCheckboxProps
> = ({ children, className, scope = 'col', style, width, ...rest }) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);
  const styles = useEuiMemoizedStyles(euiTableCellCheckboxStyles);
  const inlineStyles = resolveWidthAsStyle(style, width);

  return (
    <th
      css={styles.euiTableHeaderCellCheckbox}
      className={classes}
      scope={scope}
      style={inlineStyles}
      {...rest}
    >
      <div className="euiTableCellContent">{children}</div>
    </th>
  );
};
