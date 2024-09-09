/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { Timer } from './timer';

describe('Timer', () => {
  describe('constructor', () => {
    test('counts down until time elapses and calls callback', (done) => {
      const callbackSpy = jest.fn();
      new Timer(callbackSpy, 5);
      setTimeout(() => {
        expect(callbackSpy).toBeCalled();
        done();
      }, 8);
    });
    test('creates no timeout for Infinity value', (done) => {
      const callbackSpy = jest.fn();
      new Timer(callbackSpy, Infinity);
      expect(callbackSpy).not.toBeCalled();
      done();
    });
  });

  describe('pause', () => {
    test('stops timer', (done) => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.pause();

      setTimeout(() => {
        expect(callbackSpy).not.toBeCalled();
        done();
      }, 8);
    });
  });

  describe('resume', () => {
    test('starts timer again', (done) => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.pause();
      timer.resume();

      setTimeout(() => {
        expect(callbackSpy).toBeCalled();
        done();
      }, 8);
    });
  });

  describe('clear', () => {
    test('prevents timer from being called', (done) => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.clear();

      setTimeout(() => {
        expect(callbackSpy).not.toBeCalled();
        done();
      }, 8);
    });
  });

  describe('finish', () => {
    test('calls callback immediately', () => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.finish();
      expect(callbackSpy).toBeCalled();
    });
  });
});
