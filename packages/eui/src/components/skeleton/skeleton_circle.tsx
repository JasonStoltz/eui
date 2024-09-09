/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { EuiSkeletonLoading, _EuiSkeletonAriaProps } from './skeleton_loading';
import { euiSkeletonCircleStyles } from './skeleton_circle.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type SkeletonCircleSize = (typeof SIZES)[number];

export type EuiSkeletonCircleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps &
  _EuiSkeletonAriaProps & {
    size?: SkeletonCircleSize;
  };

export const EuiSkeletonCircle: FunctionComponent<EuiSkeletonCircleProps> = ({
  isLoading = true,
  size = 'm',
  className,
  contentAriaLabel,
  announceLoadingStatus,
  announceLoadedStatus,
  ariaLiveProps,
  ariaWrapperProps,
  children,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiSkeletonCircleStyles);
  const cssStyles = [styles.euiSkeletonCircle, styles[size]];

  return (
    <EuiSkeletonLoading
      isLoading={isLoading}
      loadingContent={
        <div
          className={classNames('euiSkeletonCircle', className)}
          css={cssStyles}
          {...rest}
        />
      }
      loadedContent={children || ''}
      contentAriaLabel={contentAriaLabel}
      announceLoadingStatus={announceLoadingStatus}
      announceLoadedStatus={announceLoadedStatus}
      ariaLiveProps={ariaLiveProps}
      {...ariaWrapperProps}
    />
  );
};
