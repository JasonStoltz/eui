/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, {
  HTMLAttributes,
  ReactNode,
  FunctionComponent,
  ElementType,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiMemoizedStyles } from '../../services';
import { euiFlexGridStyles } from './flex_grid.styles';

export const DIRECTIONS = ['row', 'column'] as const;
export type FlexGridDirection = (typeof DIRECTIONS)[number];

export const ALIGN_ITEMS = [
  'stretch',
  'start',
  'end',
  'center',
  'baseline',
] as const;
export type FlexGridAlignItems = (typeof ALIGN_ITEMS)[number];

export const GUTTER_SIZES = ['none', 's', 'm', 'l', 'xl'] as const;
export type FlexGridGutterSize = (typeof GUTTER_SIZES)[number];

export interface EuiFlexGridProps {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Number of columns. Accepts `1-4`
   */
  columns?: 1 | 2 | 3 | 4; // Leave this as inline so the props table correctly parses it
  /**
   * Flex layouts default to left-right then top-down (`row`).
   * Change this prop to `column` to create a top-down then left-right display.
   */
  direction?: FlexGridDirection;
  /**
   * Aligns grid items vertically
   */
  alignItems?: FlexGridAlignItems;
  /**
   * Space between flex items
   */
  gutterSize?: FlexGridGutterSize;
  /**
   * Will display each item at full-width on smaller screens
   */
  responsive?: boolean;

  /**
   * The tag to render
   * @default div
   */
  component?: ElementType;
}

export const EuiFlexGrid: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiFlexGridProps
> = ({
  children,
  className,
  style,
  gutterSize = 'l',
  direction = 'row',
  alignItems = 'stretch',
  responsive = true,
  columns = 1,
  component: Component = 'div',
  ...rest
}) => {
  const classes = classNames('euiFlexGrid', className);

  const styles = useEuiMemoizedStyles(euiFlexGridStyles);
  const cssStyles = [
    styles.euiFlexGrid,
    styles.gutterSizes[gutterSize],
    styles.direction[direction],
    styles.alignItems[alignItems],
    styles.columnCount[columns],
    responsive && styles.responsive,
  ];

  const columnDirectionStyles = useMemo(() => {
    if (direction === 'column') {
      const rowsToRender = Math.ceil(React.Children.count(children) / columns);
      return { gridTemplateRows: `repeat(${rowsToRender}, 1fr)` };
    }
  }, [direction, columns, children]);

  return (
    <Component
      css={cssStyles}
      className={classes}
      style={
        columnDirectionStyles ? { ...style, ...columnDirectionStyles } : style
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
