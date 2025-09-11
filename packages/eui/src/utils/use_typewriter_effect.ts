/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect, useRef } from 'react';

export interface UseTypewriterEffectOptions {
  /**
   * The text to type out
   */
  text: string;
  /**
   * Speed of typing in milliseconds between each character
   * @default 50
   */
  typingSpeed?: number;
  /**
   * Whether the typewriter effect is enabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Callback fired when typing is complete
   */
  onComplete?: () => void;
  /**
   * Callback fired when typing starts
   */
  onStart?: () => void;
}

export interface UseTypewriterEffectReturn {
  /**
   * The current displayed text
   */
  displayText: string;
  /**
   * Whether the typewriter effect is currently typing
   */
  isTyping: boolean;
  /**
   * Whether the typing is complete
   */
  isComplete: boolean;
  /**
   * Manually start the typewriter effect
   */
  start: () => void;
  /**
   * Manually stop the typewriter effect
   */
  stop: () => void;
  /**
   * Reset the typewriter effect
   */
  reset: () => void;
}

/**
 * A hook that provides a typewriter effect for text display
 * 
 * @example
 * ```tsx
 * const { displayText, isTyping } = useTypewriterEffect({
 *   text: "Hello, world!",
 *   typingSpeed: 100,
 *   onComplete: () => console.log("Typing complete!")
 * });
 * 
 * return <div>{displayText}</div>;
 * ```
 */
export const useTypewriterEffect = ({
  text,
  typingSpeed = 50,
  enabled = true,
  onComplete,
  onStart,
}: UseTypewriterEffectOptions): UseTypewriterEffectReturn => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const currentIndexRef = useRef(0);
  const previousTextRef = useRef('');

  const start = () => {
    if (!enabled || !text) return;
    
    setIsTyping(true);
    setIsComplete(false);
    currentIndexRef.current = 0;
    setDisplayText('');
    onStart?.();
  };

  const stop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTyping(false);
  };

  const reset = () => {
    stop();
    setDisplayText('');
    setIsComplete(false);
    currentIndexRef.current = 0;
  };

  useEffect(() => {
    // If text changes, reset and start typing if enabled
    if (text !== previousTextRef.current) {
      previousTextRef.current = text;
      
      if (enabled && text) {
        start();
      } else {
        // If disabled, just set the text immediately
        setDisplayText(text);
        setIsComplete(true);
        setIsTyping(false);
      }
    }
  }, [text, enabled]);

  useEffect(() => {
    if (!isTyping || !text) return;

    const currentIndex = currentIndexRef.current;
    
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        currentIndexRef.current = nextIndex;
        setDisplayText(text.substring(0, nextIndex));
      }, typingSpeed);
    } else {
      // Typing complete
      setIsTyping(false);
      setIsComplete(true);
      onComplete?.();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTyping, text, typingSpeed, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    displayText,
    isTyping,
    isComplete,
    start,
    stop,
    reset,
  };
};
