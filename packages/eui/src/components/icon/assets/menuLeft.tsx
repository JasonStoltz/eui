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
const EuiIconMenuLeft = ({
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
    <path d="M1.014 7.382a.501.501 0 0 0-.013.152c-.014.4.133.806.439 1.112l2.12 2.122a.5.5 0 1 0 .708-.708L2.208 8H14.5a.5.5 0 0 0 0-1H2.379l1.889-1.89a.5.5 0 0 0-.707-.706L1.44 6.524c-.241.242-.383.544-.426.858ZM14.5 3h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1Zm0 8h-7a.5.5 0 1 0 0 1h7a.5.5 0 1 0 0-1Z" />
  </svg>
);
export const icon = EuiIconMenuLeft;
