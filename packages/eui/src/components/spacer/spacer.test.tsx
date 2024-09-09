/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiSpacer } from './spacer';

describe('EuiSpacer', () => {
  test('is rendered', () => {
    const { container } = render(<EuiSpacer {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiSpacer />);
});
