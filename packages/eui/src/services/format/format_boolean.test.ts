/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { formatBoolean } from './format_boolean';

describe('formatBoolean', () => {
  test('no config', () => {
    expect(formatBoolean(true)).toBe('Yes');
    expect(formatBoolean(false)).toBe('No');
  });

  test('with config', () => {
    const config = { yes: 'Aye', no: 'Nay' };
    expect(formatBoolean(true, config)).toBe('Aye');
    expect(formatBoolean(false, config)).toBe('Nay');
  });
});
