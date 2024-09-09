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
const EuiIconAppGis = ({
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
      d="m29.014 23.89 2.296 1.145L16 32.101.53 24.961l2.49-1.056 2.453 1.132-.003.002L16 29.899l10.69-4.934-.003-.001 2.327-1.074Zm-4.972-7.482 7.268 3.627L16 27.101.53 19.961l7.668-3.252c.392.486.838 1.02 1.34 1.604L5.47 20.039 16 24.899l10.69-4.934-3.954-1.973c.493-.58.928-1.107 1.306-1.584Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M18 9a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-3.268 12.681-.732.787-.732-.787c-3.557-3.824-5.817-6.462-6.81-7.96A8.746 8.746 0 0 1 7 8.875C7 3.97 11.033 0 16 0s9 3.97 9 8.875a8.746 8.746 0 0 1-1.459 4.846c-.992 1.498-3.252 4.136-6.809 7.96Zm5.142-9.064A6.747 6.747 0 0 0 23 8.875C23 5.081 19.87 2 16 2S9 5.081 9 8.875c0 1.349.394 2.636 1.126 3.742.846 1.277 2.812 3.593 5.874 6.912 3.062-3.32 5.028-5.635 5.874-6.912Z" />
  </svg>
);
export const icon = EuiIconAppGis;
