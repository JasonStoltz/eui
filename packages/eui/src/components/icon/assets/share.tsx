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
const EuiIconShare = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 6.81v6.38c0 .493.448.9.992.9h7.016c.543 0 .992-.406.992-.9V6.81c0-.493-.448-.9-.992-.9H3.992c-.543 0-.992.406-.992.9ZM6 5v.91h3V5h2.008C12.108 5 13 5.818 13 6.81v6.38c0 1-.9 1.81-1.992 1.81H3.992C2.892 15 2 14.182 2 13.19V6.81C2 5.81 2.9 5 3.992 5H6Zm1.997-3.552A.506.506 0 0 1 8 1.5v8a.5.5 0 0 1-1 0v-8a.51.51 0 0 1 0-.017L5.18 3.394a.52.52 0 0 1-.77 0 .617.617 0 0 1 0-.829L6.36.515a1.552 1.552 0 0 1 2.31 0l1.95 2.05c.214.229.214.601 0 .83a.52.52 0 0 1-.77 0L7.997 1.447Z" />
  </svg>
);
export const icon = EuiIconShare;
