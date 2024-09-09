/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../../.storybook/utils';
import { EuiCollapsedNavItem } from './collapsed_nav_item';

const meta: Meta<typeof EuiCollapsedNavItem> = {
  title:
    'Navigation/EuiCollapsibleNav (beta)/EuiCollapsibleNavItem/EuiCollapsedNavItem',
  component: EuiCollapsedNavItem,
  argTypes: {
    icon: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof EuiCollapsedNavItem>;

export const Link: Story = {
  render: ({ ...args }) => (
    <div className="eui-displayInlineBlock">
      <EuiCollapsedNavItem {...args} />
    </div>
  ),
  args: {
    title: 'Collapsed nav item',
    icon: 'home',
    href: '#',
    linkProps: { target: '_blank' },
  },
};
hideStorybookControls(Link, ['accordionProps', 'isCollapsible', 'items']);

export const Accordion: Story = {
  render: ({ ...args }) => (
    <div className="eui-displayInlineBlock">
      <EuiCollapsedNavItem {...args} />
    </div>
  ),
  args: {
    title: 'Collapsed nav item',
    icon: 'home',
    items: [
      { title: 'Popover link A', href: '#', linkProps: { target: '_blank' } },
      { title: 'Popover link B', href: '#' },
      { title: 'Popover link C', href: '#' },
    ],
  },
};
hideStorybookControls(Accordion, ['href', 'linkProps']);
