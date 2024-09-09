/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { ReactElement, FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { cloneElementWithCss } from '../../../services';
import { euiScreenReaderOnlyStyles as styles } from './screen_reader_only.styles';

export interface EuiScreenReaderOnlyProps {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement;

  /**
   * For keyboard navigation, force content to display visually upon focus/focus-within.
   */
  showOnFocus?: boolean;
  className?: string;
}

export const EuiScreenReaderOnly: FunctionComponent<
  EuiScreenReaderOnlyProps
> = ({ children, className, showOnFocus }) => {
  const classes = classNames(className, children.props.className);

  const props = useMemo(
    () => ({
      className: classes.length ? classes : undefined,
      css: showOnFocus
        ? styles['euiScreenReaderOnly-showOnFocus']
        : styles.euiScreenReaderOnly,
    }),
    [classes, showOnFocus]
  );

  return cloneElementWithCss(children, props);
};
