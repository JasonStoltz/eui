/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiShowFor, EuiShowForProps } from './show_for';

const meta: Meta<EuiShowForProps> = {
  title: 'Utilities/EuiShowFor',
  component: EuiShowFor,
  parameters: {
    loki: {
      // EuiShowFor may render null resulting in Loki failing
      // to find an element to snapshot
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiShowForProps>;

export const Playground: Story = {
  args: {
    sizes: ['m', 'l', 'xl'],
    children:
      'Try changing the Storybook viewport, or add or remove additional sizes, to see how it affects the visibility of this text.',
  },
};
