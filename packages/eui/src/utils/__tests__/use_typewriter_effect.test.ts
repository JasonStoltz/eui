/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook, act } from '@testing-library/react';
import { useTypewriterEffect } from '../use_typewriter_effect';

// Mock timers
jest.useFakeTimers();

describe('useTypewriterEffect', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('should initialize with empty display text', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello, world!' })
    );

    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('should start typing when text is provided', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', typingSpeed: 100 })
    );

    expect(result.current.isTyping).toBe(true);
    expect(result.current.displayText).toBe('');
  });

  it('should type out text character by character', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hi', typingSpeed: 100 })
    );

    // First character
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.displayText).toBe('H');
    expect(result.current.isTyping).toBe(true);

    // Second character
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.displayText).toBe('Hi');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(true);
  });

  it('should call onStart when typing begins', () => {
    const onStart = jest.fn();
    renderHook(() =>
      useTypewriterEffect({ text: 'Hello', onStart })
    );

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('should call onComplete when typing finishes', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hi', typingSpeed: 100, onComplete })
    );

    // Complete the typing
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('should not start typing when disabled', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', enabled: false })
    );

    expect(result.current.isTyping).toBe(false);
    expect(result.current.displayText).toBe('Hello');
    expect(result.current.isComplete).toBe(true);
  });

  it('should handle empty text', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: '' })
    );

    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(true);
  });

  it('should reset when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypewriterEffect({ text, typingSpeed: 100 }),
      { initialProps: { text: 'Hello' } }
    );

    // Start typing first text
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.displayText).toBe('He');

    // Change text
    rerender({ text: 'World' });
    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(true);

    // Type new text
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.displayText).toBe('W');
  });

  it('should allow manual start', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', enabled: false })
    );

    expect(result.current.isTyping).toBe(false);

    act(() => {
      result.current.start();
    });

    expect(result.current.isTyping).toBe(true);
  });

  it('should allow manual stop', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', typingSpeed: 100 })
    );

    expect(result.current.isTyping).toBe(true);

    act(() => {
      result.current.stop();
    });

    expect(result.current.isTyping).toBe(false);
  });

  it('should allow manual reset', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', typingSpeed: 100 })
    );

    // Let it type a bit
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.displayText).toBe('He');

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('should use default typing speed', () => {
    const { result } = renderHook(() =>
      useTypewriterEffect({ text: 'Hi' })
    );

    // Should use default 50ms speed
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('H');

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('Hi');
  });

  it('should clean up timers on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() =>
      useTypewriterEffect({ text: 'Hello', typingSpeed: 100 })
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
