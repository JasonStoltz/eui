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
const EuiIconLogoCloudEce = ({
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
    <path
      d="M18 0v10a6 6 0 0 0-5.53 8.33c-.034.009-.068.012-.1.023A18.947 18.947 0 0 0 3.975 23.7 15.934 15.934 0 0 1 2 16C2 7.164 9.163 0 18 0Zm0 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
      className="euiIcon__fillNegative"
    />
    <path
      fill="#00AEFA"
      d="M22.742 21.218c-.71-.22-1.478-.135-2.146.188A5.947 5.947 0 0 1 18 22a5.94 5.94 0 0 1-2.596-.594c-.669-.323-1.436-.408-2.146-.188a16.006 16.006 0 0 0-7.54 5.032A15.959 15.959 0 0 0 18 32c4.936 0 9.348-2.236 12.283-5.75a16.016 16.016 0 0 0-7.54-5.032"
    />
    <path
      fill="#0080D5"
      d="M18 0A15.959 15.959 0 0 0 5.717 5.75a16.006 16.006 0 0 0 7.541 5.032c.71.22 1.477.135 2.146-.188A5.94 5.94 0 0 1 18 10a5.94 5.94 0 0 1 2.596.594c.669.323 1.436.408 2.146.188a16.01 16.01 0 0 0 7.541-5.032A15.959 15.959 0 0 0 18 0"
    />
  </svg>
);
export const icon = EuiIconLogoCloudEce;
