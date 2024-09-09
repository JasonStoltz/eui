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
const EuiIconStarEmpty = ({
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
    <path
      fillRule="evenodd"
      d="M8 2a.86.86 0 0 0-.792.511l-1.33 2.924-3.128.446c-.71.102-1.001.976-.496 1.487l2.313 2.336-.563 3.268A.877.877 0 0 0 4.864 14c.142 0 .289-.036.429-.116L8 12.342l2.707 1.542c.14.08.287.116.43.116a.877.877 0 0 0 .859-1.027l-.563-3.269 2.313-2.336c.505-.511.214-1.385-.496-1.487l-3.128-.446-1.33-2.923A.86.86 0 0 0 8 2m0 1c.073 0 .095.049.104.07l1.267 2.783.162.356.387.055 2.978.425c.017.002.071.01.095.08a.116.116 0 0 1-.029.126l-2.202 2.226-.259.261.063.362.535 3.112c.007.04 0 .07-.023.098a.127.127 0 0 1-.091.046.106.106 0 0 1-.055-.016l-2.578-1.469L8 11.314l-.354.201-2.579 1.469a.103.103 0 0 1-.054.016.127.127 0 0 1-.091-.046c-.023-.028-.03-.058-.024-.098l.536-3.112.063-.362-.259-.261-2.202-2.226a.116.116 0 0 1-.029-.126.108.108 0 0 1 .094-.08l2.98-.425.386-.055.162-.356 1.267-2.786C7.905 3.05 7.927 3 8 3"
    />
  </svg>
);
export const icon = EuiIconStarEmpty;
