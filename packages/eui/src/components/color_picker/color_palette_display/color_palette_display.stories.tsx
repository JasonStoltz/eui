/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { Meta, StoryObj } from '@storybook/react';

import { euiPaletteColorBlind } from '../../../services';

import {
  EuiColorPaletteDisplay,
  EuiColorPaletteDisplayProps,
} from './color_palette_display';

const meta: Meta<EuiColorPaletteDisplayProps> = {
  title: 'Forms/EuiColorPalettePicker/EuiColorPaletteDisplay',
  component: EuiColorPaletteDisplay,
  args: {
    // Component defaults
    type: 'fixed',
    size: 's',
  },
};

export default meta;
type Story = StoryObj<EuiColorPaletteDisplayProps>;

export const Playground: Story = {
  args: {
    palette: euiPaletteColorBlind(),
  },
};
