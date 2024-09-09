/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiMark, EuiMarkProps } from './mark';

const meta: Meta<EuiMarkProps> = {
  title: 'Utilities/EuiMark',
  component: EuiMark,
  // Component defaults
  args: {
    hasScreenReaderHelpText: true,
  },
};

export default meta;
type Story = StoryObj<EuiMarkProps>;

export const Playground: Story = {
  args: {
    children: 'Marked text',
  },
};
