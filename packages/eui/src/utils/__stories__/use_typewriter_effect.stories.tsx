/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { useTypewriterEffect } from '../use_typewriter_effect';
import { EuiButton, EuiButtonGroup, EuiCard, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiTitle } from '../components';

// Demo component that uses the hook
const TypewriterDemo: React.FC<{
  text: string;
  typingSpeed: number;
  enabled: boolean;
  showControls: boolean;
  showStatus: boolean;
}> = ({ text, typingSpeed, enabled, showControls, showStatus }) => {
  const { displayText, isTyping, isComplete, start, stop, reset } = useTypewriterEffect({
    text,
    typingSpeed,
    enabled,
    onStart: action('onStart'),
    onComplete: action('onComplete'),
  });

  return (
    <EuiPanel paddingSize="l">
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Typewriter Effect Demo</h3>
          </EuiTitle>
        </EuiFlexItem>
        
        <EuiFlexItem>
          <EuiText>
            <div style={{ 
              fontSize: '18px', 
              fontFamily: 'monospace',
              minHeight: '24px',
              border: '1px solid #d3dae6',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: '#f8f9fa'
            }}>
              {displayText}
              {isTyping && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
            </div>
          </EuiText>
        </EuiFlexItem>

        {showStatus && (
          <EuiFlexItem>
            <EuiText size="s" color="subdued">
              Status: {isTyping ? 'Typing...' : isComplete ? 'Complete' : 'Ready'}
            </EuiText>
          </EuiFlexItem>
        )}

        {showControls && (
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiButton size="s" onClick={start} disabled={isTyping}>
                  Start
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton size="s" onClick={stop} disabled={!isTyping}>
                  Stop
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton size="s" onClick={reset}>
                  Reset
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </EuiPanel>
  );
};

// Multiple demos component
const MultipleTypewriters: React.FC = () => {
  const [texts] = useState([
    "Welcome to EUI!",
    "Building amazing user interfaces",
    "Typewriter effects are fun!",
    "Elastic UI Framework"
  ]);

  return (
    <EuiFlexGroup direction="column" gutterSize="l">
      {texts.map((text, index) => (
        <EuiFlexItem key={index}>
          <EuiCard
            title={`Demo ${index + 1}`}
            description={`Typing: "${text}"`}
          >
            <TypewriterDemo
              text={text}
              typingSpeed={50 + index * 25}
              enabled={true}
              showControls={false}
              showStatus={true}
            />
          </EuiCard>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  );
};

// Real-world example component
const ConversationTitle: React.FC = () => {
  const [conversationTitle, setConversationTitle] = useState("New conversation");
  const [isLoading, setIsLoading] = useState(false);

  const { displayText, isTyping } = useTypewriterEffect({
    text: conversationTitle,
    typingSpeed: 50,
    enabled: !isLoading && conversationTitle !== "New conversation",
  });

  const simulateTitleChange = () => {
    setIsLoading(true);
    setTimeout(() => {
      setConversationTitle("Customer Support Chat - Issue #12345");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <EuiPanel paddingSize="l">
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Real-world Example: Conversation Title</h3>
          </EuiTitle>
        </EuiFlexItem>
        
        <EuiFlexItem>
          <EuiText>
            <div style={{ 
              fontSize: '16px',
              fontWeight: 'bold',
              minHeight: '20px'
            }}>
              {isLoading ? 'Loading...' : displayText}
              {isTyping && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
            </div>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiButton onClick={simulateTitleChange} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Simulate Title Change'}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};

const meta: Meta<typeof TypewriterDemo> = {
  title: 'Utilities/useTypewriterEffect',
  component: TypewriterDemo,
  parameters: {
    docs: {
      description: {
        component: `
The \`useTypewriterEffect\` hook provides a typewriter animation effect for text display. 
It's useful for creating engaging user interfaces, loading states, or conversational interfaces.

## Features

- **Configurable typing speed** - Control how fast text appears
- **Enable/disable functionality** - Turn the effect on or off
- **Manual controls** - Start, stop, or reset the animation
- **Callback support** - React to typing start and completion
- **State tracking** - Know when typing is in progress or complete
- **Automatic cleanup** - Proper timer management

## Use Cases

- Loading states with dynamic text
- Chat interfaces with typing indicators
- Onboarding flows with animated text
- Interactive demos and presentations
- Accessibility-friendly text animations
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to type out',
    },
    typingSpeed: {
      control: { type: 'range', min: 10, max: 500, step: 10 },
      description: 'Speed of typing in milliseconds between each character',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the typewriter effect is enabled',
    },
    showControls: {
      control: 'boolean',
      description: 'Show manual control buttons',
    },
    showStatus: {
      control: 'boolean',
      description: 'Show typing status indicator',
    },
  },
  args: {
    text: 'Hello, world! This is a typewriter effect.',
    typingSpeed: 50,
    enabled: true,
    showControls: true,
    showStatus: true,
  },
};

export default meta;
type Story = StoryObj<typeof TypewriterDemo>;

export const Default: Story = {};

export const FastTyping: Story = {
  args: {
    text: 'Fast typing speed!',
    typingSpeed: 20,
  },
};

export const SlowTyping: Story = {
  args: {
    text: 'Slow and steady wins the race...',
    typingSpeed: 200,
  },
};

export const Disabled: Story = {
  args: {
    text: 'This text appears immediately when disabled',
    enabled: false,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a much longer text that demonstrates how the typewriter effect works with extended content. It will type out character by character, creating an engaging reading experience for users.',
    typingSpeed: 30,
  },
};

export const MultipleTypewriters: Story = {
  render: () => <MultipleTypewriters />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple typewriter effects running simultaneously with different speeds.',
      },
    },
  },
};

export const RealWorldExample: Story = {
  render: () => <ConversationTitle />,
  parameters: {
    docs: {
      description: {
        story: 'A real-world example showing how the hook might be used in a conversation title component.',
      },
    },
  },
};

// Add CSS for blinking cursor animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);
