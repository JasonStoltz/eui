/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiYScrollWithShadows,
} from '../../global_styling';

export const euiFlyoutBodyStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiFlyoutBody: css`
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
    `,
    overflow: {
      euiFlyoutBody__overflow: css``,
      noBanner: css`
        ${euiYScrollWithShadows(euiThemeContext)}
      `,
      hasBanner: css`
        ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })}
      `,
    },
    euiFlyoutBody__banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
    `,
  };
};
