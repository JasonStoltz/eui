/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiFacetButton, EuiFacetButtonProps } from './facet_button';

const meta: Meta<EuiFacetButtonProps> = {
  title: 'Navigation/EuiFacetButton',
  component: EuiFacetButton,
  argTypes: {
    // TODO: icon
    // TODO: minWidth has multiple types
  },
  args: {
    // Component defaults
    element: 'button',
    type: 'button',
    size: 's',
    iconSide: 'left',
    iconSize: 'm',
    fullWidth: false,
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};
moveStorybookControlsToCategory(
  meta,
  [
    'contentProps',
    'element',
    'fullWidth',
    'iconSide',
    'iconSize',
    'iconType',
    'minWidth',
    'size',
    'style',
    'textProps',
    'type',
  ],
  'EuiButtonEmpty props'
);
disableStorybookControls(meta, ['buttonRef']);

export default meta;
type Story = StoryObj<EuiFacetButtonProps>;

export const Playground: Story = {
  args: {
    children: 'Facet button',
    quantity: 0,
  },
};
