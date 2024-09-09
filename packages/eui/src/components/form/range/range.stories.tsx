/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';
import { _SingleRangeChangeEvent, EuiRangeProps } from './types';
import { EuiRange } from './range';

const meta: Meta<EuiRangeProps> = {
  title: 'Forms/EuiRange',
  component: EuiRange,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
    valueAppend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: (
          <>
            {' '}
            <EuiIcon type="faceHappy" style={{ verticalAlign: 'text-top' }} />
          </>
        ),
        text: ' Appended',
        undefined: undefined,
      },
    },
    valuePrepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: (
          <>
            <EuiIcon type="faceHappy" style={{ verticalAlign: 'text-top' }} />{' '}
          </>
        ),
        text: 'Prepended ',
        undefined: undefined,
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    compressed: false,
    isLoading: false,
    showLabels: false,
    showInput: false,
    showRange: false,
    showTicks: false,
    showValue: false,
    levels: [],
    // set up for easier testing/QA
    id: '',
    name: '',
    isInvalid: false,
    fullWidth: false,
    inputPopoverProps: {},
    // adding tickInterval value to prevent error about
    // too many ticks when enabling showTicks
    tickInterval: 10,
    ticks: [],
  },
};

export default meta;
type Story = StoryObj<EuiRangeProps>;

export const Playground: Story = {
  args: {
    value: 50,
  },
  render: (args) => <StatefulPlayground {...args} />,
};
enableFunctionToggleControls(Playground, ['onChange', 'onFocus', 'onBlur']);
moveStorybookControlsToCategory(
  Playground,
  [
    'showInput',
    'append',
    'prepend',
    'inputPopoverProps',
    'isInvalid',
    'isLoading',
  ],
  'Input'
);
moveStorybookControlsToCategory(
  Playground,
  ['showTicks', 'compressed', 'tickInterval', 'ticks'],
  'Ticks'
);
moveStorybookControlsToCategory(
  Playground,
  ['showValue', 'valueAppend', 'valuePrepend'],
  'Value tooltip'
);

export const ValueTooltip: Story = {
  parameters: {
    controls: {
      include: [
        'showValue',
        'valueAppend',
        'valuePrepend',
        'max',
        'min',
        'value',
        'showRange',
      ],
    },
  },
  args: {
    value: 50,
    showValue: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const Ticks: Story = {
  parameters: {
    controls: {
      include: ['ticks', 'showTicks', 'showRange', 'max', 'min', 'value'],
    },
  },
  args: {
    value: 50,
    showTicks: true,
    ticks: [
      { label: '0 kilobytes', value: 0 },
      { label: '50 kilobytes', value: 50 },
      { label: '100 kilobytes', value: 100 },
    ],
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const Input: Story = {
  parameters: {
    controls: {
      include: [
        'showInput',
        'append',
        'prepend',
        'inputPopoverProps',
        'isInvalid',
        'isLoading',
        'max',
        'min',
        'value',
      ],
    },
  },
  args: {
    value: 50,
    showInput: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const Levels: Story = {
  parameters: {
    controls: {
      include: ['levels', 'max', 'min', 'value', 'showLabels'],
    },
  },
  args: {
    value: 50,
    levels: [
      { min: 0, max: 20, color: 'danger' },
      { min: 20, max: 100, color: 'success' },
    ],
    showLabels: true,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

const StatefulPlayground = ({ value, onChange, ...rest }: EuiRangeProps) => {
  const [_value, setValue] = useState(value);

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

  const handelOnChange = (e: _SingleRangeChangeEvent, isValid: boolean) => {
    setValue(e.currentTarget.value);
    onChange?.(e, isValid);
  };

  return <EuiRange value={_value} onChange={handelOnChange} {...rest} />;
};
