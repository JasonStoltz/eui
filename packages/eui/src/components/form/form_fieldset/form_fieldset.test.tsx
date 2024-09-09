/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiFormFieldset } from './form_fieldset';

describe('EuiFormFieldset', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiFormFieldset {...requiredProps}>
        <input />
      </EuiFormFieldset>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('legend is rendered', () => {
      const { container } = render(
        <EuiFormFieldset legend={{ children: 'Legend' }}>
          <input />
        </EuiFormFieldset>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
