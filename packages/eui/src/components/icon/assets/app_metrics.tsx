/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconAppMetrics = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M30 19.092v12.88H2v-5.386l6.747-6.747.708.708c.236.236.48.463.733.68L4 27.414v2.558h24v-8.91c.186-.166.369-.339.546-.516L30 19.092zm-20.85-3.19A10.955 10.955 0 0 1 8 11C8 4.925 12.925 0 19 0s11 4.925 11 11c0 1.76-.414 3.425-1.15 4.9l-1.51-1.51A8.973 8.973 0 0 0 28 11a9 9 0 1 0-17.34 3.391l-1.51 1.51z" />
    <path
      d="M19 20a8.96 8.96 0 0 0 5.618-1.968l-4.202-4.204a2 2 0 0 0-2.828 0l-4.205 4.205A8.96 8.96 0 0 0 19 20zm-2.826-7.586a4 4 0 0 1 5.656 0l5.656 5.657-.707.707A10.967 10.967 0 0 1 19 22a10.967 10.967 0 0 1-7.778-3.221l-.707-.707 5.659-5.658z"
      className="euiIcon__fillSecondary"
    />
  </svg>
);
export const icon = EuiIconAppMetrics;
