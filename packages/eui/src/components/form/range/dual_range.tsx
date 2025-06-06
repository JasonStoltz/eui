/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import classNames from 'classnames';

import {
  keys,
  htmlIdGenerator,
  withEuiTheme,
  WithEuiThemeProps,
} from '../../../services';
import { isWithinRange } from '../../../services/number';
import { logicalStyles } from '../../../global_styling';
import { EuiInputPopover } from '../../popover';
import { EuiFormControlLayoutDelimited } from '../form_control_layout';
import { FormContext, FormContextValue } from '../eui_form_context';

import { EuiRangeDraggable } from './range_draggable';
import { EuiRangeHighlight } from './range_highlight';
import { EuiRangeInput } from './range_input';
import { EuiRangeLabel } from './range_label';
import { getLevelColor, euiRangeLevelColor } from './range_levels_colors';
import { EuiRangeSlider } from './range_slider';
import { EuiRangeThumb } from './range_thumb';
import { EuiRangeTrack } from './range_track';
import { EuiRangeWrapper } from './range_wrapper';
import { calculateThumbPosition } from './utils';
import type { EuiDualRangeProps, _SingleRangeValue } from './types';

import { euiRangeStyles } from './range.styles';
import { euiDualRangeStyles } from './dual_range.styles';
import { EuiI18n } from '../../i18n';

type ValueMember = _SingleRangeValue['value'];

export class EuiDualRangeClass extends Component<
  EuiDualRangeProps & WithEuiThemeProps
> {
  static contextType = FormContext;

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    compressed: false,
    isLoading: false,
    showLabels: false,
    showInput: false,
    showRange: true,
    showTicks: false,
    levels: [],
  };

  state = {
    id: this.props.id || htmlIdGenerator()(),
    isPopoverOpen: false,
    rangeWidth: 0,
  };

  get isInPopover() {
    return this.props.showInput === 'inputWithPopover';
  }
  preventPopoverClose = false;

  private leftPosition = 0;
  private dragAcc = 0;

  get lowerValue() {
    return this.props.value ? this.props.value[0] : this.props.min;
  }
  get upperValue() {
    return this.props.value ? this.props.value[1] : this.props.max;
  }
  get lowerValueIsValid() {
    return isWithinRange(this.props.min, this.upperValue, this.lowerValue);
  }
  get upperValueIsValid() {
    return isWithinRange(this.lowerValue, this.props.max, this.upperValue);
  }
  get isValid() {
    return this.lowerValueIsValid && this.upperValueIsValid;
  }

  _determineInvalidThumbMovement = (
    newVal: ValueMember,
    lower: ValueMember,
    upper: ValueMember,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    // If the values are invalid, find whether the new value is in the upper
    // or lower half and move the appropriate handle to the new value,
    // while the other handle gets moved to the opposite bound (if invalid)
    const min = this.props.min;
    const max = this.props.max;
    const lowerHalf = Math.abs(max - min) / 2 + min;
    const newValIsLow = isWithinRange(min, lowerHalf, newVal);
    if (newValIsLow) {
      lower = newVal;
      upper = !this.upperValueIsValid ? max : upper;
    } else {
      lower = !this.lowerValueIsValid ? min : lower;
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  };

  _determineValidThumbMovement = (
    newVal: ValueMember,
    lower: ValueMember,
    upper: ValueMember,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // Lower thumb targeted or right-moving swap has occurred
    if (
      Math.abs((lower as number) - (newVal as number)) <
      Math.abs((upper as number) - (newVal as number))
    ) {
      lower = newVal;
    }
    // Upper thumb targeted or left-moving swap has occurred
    else {
      upper = newVal;
    }
    this._handleOnChange(lower, upper, e);
  };

  _determineThumbMovement = (
    newVal: number,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // Determine thumb movement based on slider interaction
    if (!this.isValid) {
      // Non-standard positioning follows
      this._determineInvalidThumbMovement(
        newVal,
        this.lowerValue,
        this.upperValue,
        e
      );
    } else {
      // Standard positioning based on click event proximity to thumb locations
      this._determineValidThumbMovement(
        newVal,
        this.lowerValue,
        this.upperValue,
        e
      );
    }
  };

  _handleOnChange = (
    lower: ValueMember,
    upper: ValueMember,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const isValid =
      isWithinRange(this.props.min, upper, lower) &&
      isWithinRange(lower, this.props.max, upper);
    this.props.onChange([lower, upper], isValid, e);
  };

  handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    this._determineThumbMovement(Number(e.currentTarget.value), e);
  };

  _resetToRangeEnds = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arbitrary decision to pass `min` instead of `max`. Result is the same.
    this._determineInvalidThumbMovement(
      this.props.min,
      this.lowerValue,
      this.upperValue,
      e
    );
  };

  _isDirectionalKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    return (
      [
        keys.ARROW_UP,
        keys.ARROW_RIGHT,
        keys.ARROW_DOWN,
        keys.ARROW_LEFT,
      ].indexOf(event.key) > -1
    );
  };

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Relevant only when initial values are both `''` and `showInput` is set
    if (this._isDirectionalKeyPress(e) && !this.isValid) {
      e.preventDefault();
      this._resetToRangeEnds(e);
    }
  };

  handleLowerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._handleOnChange(e.target.value, this.upperValue, e);
  };

  handleUpperInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._handleOnChange(this.lowerValue, e.target.value, e);
  };

  _handleKeyDown = (
    value: ValueMember,
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    let newVal = Number(value);
    let stepRemainder = 0;
    const step = this.props.step || 1;
    const min = this.props.min;
    switch (event.key) {
      case keys.ARROW_UP:
      case keys.ARROW_RIGHT:
        event.preventDefault();
        newVal += step;
        stepRemainder = (newVal - min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal - stepRemainder;
        }
        break;
      case keys.ARROW_DOWN:
      case keys.ARROW_LEFT:
        event.preventDefault();
        newVal -= step;
        stepRemainder = (newVal - min) % step;
        if (step !== 1 && stepRemainder > 0) {
          newVal = newVal + (step - stepRemainder);
        }
        break;
    }
    return newVal;
  };

  handleLowerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let lower = this.lowerValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        if (!this.lowerValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          event.preventDefault();
          this._resetToRangeEnds(event);
          return;
        }
        lower = this._handleKeyDown(lower, event);
    }
    if (lower >= Number(this.upperValue) || lower < this.props.min) return;
    this._handleOnChange(lower, this.upperValue, event);
  };

  handleUpperKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let upper = this.upperValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        if (!this.upperValueIsValid) {
          // Relevant only when initial value is `''` and `showInput` is not set
          event.preventDefault();
          this._resetToRangeEnds(event);
          return;
        }
        upper = this._handleKeyDown(upper, event);
    }
    if (upper <= Number(this.lowerValue) || upper > this.props.max) return;
    this._handleOnChange(this.lowerValue, upper, event);
  };

  handleDraggableKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let lower = this.lowerValue;
    let upper = this.upperValue;
    switch (event.key) {
      case keys.TAB:
        return;
      default:
        lower = this._handleKeyDown(lower, event);
        upper = this._handleKeyDown(upper, event);
    }
    if (lower >= Number(this.upperValue) || lower < this.props.min) return;
    if (upper <= Number(this.lowerValue) || upper > this.props.max) return;
    this._handleOnChange(lower, upper, event);
  };

  calculateThumbPositionStyle = (value: number, width?: number) => {
    const trackWidth =
      this.isInPopover && !!width ? width : this.state.rangeWidth;

    const position = calculateThumbPosition(
      value,
      this.props.min,
      this.props.max,
      trackWidth
    );
    return { left: `${position}%` };
  };

  onThumbFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  onThumbBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.preventPopoverClose = true;
    this.setState({
      isPopoverOpen: true,
    });
  };

  onInputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setTimeout(() => {
      // Safari does not recognize any focus-related eventing for input[type=range]
      // making it impossible to capture its state using active/focus/relatedTarget
      // Instead, a prevention flag is set on mousedown, with a waiting period here.
      // Mousedown is viable because in the popover case, it is inaccessible via keyboard (intentionally)
      if (this.preventPopoverClose) {
        this.preventPopoverClose = false;
        return;
      }
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
      this.closePopover();
    }, 200);

  closePopover = () => {
    this.preventPopoverClose = false;
    this.setState({
      isPopoverOpen: false,
    });
  };

  setRangeWidth = ({ width }: { width: number }) => {
    this.setState({ rangeWidth: width });
  };

  getNearestStep = (value: number) => {
    const min = this.props.min;
    const max = this.props.max;
    const steps = (this.props.max - this.props.min) / this.props.step!;
    const approx = Math.round(((value - min) * steps) / (max - min)) / steps;
    const bound = Math.min(Math.max(approx, 0), 1);
    const nearest = bound * (max - min) + min;
    return (Number(nearest.toPrecision(10)) * 100) / 100;
  };

  handleDrag = (x: number, isFirstInteraction?: boolean) => {
    if (isFirstInteraction) {
      this.leftPosition = x;
      this.dragAcc = 0;
    }
    const min = this.props.min;
    const max = this.props.max;
    const lowerValue = Number(this.lowerValue);
    const upperValue = Number(this.upperValue);
    const delta = this.leftPosition - x;
    this.leftPosition = x;
    this.dragAcc = this.dragAcc + delta;
    const percentageOfArea = this.dragAcc / this.state.rangeWidth;
    const percentageOfRange = percentageOfArea * (max - min);
    const newLower = this.getNearestStep(lowerValue - percentageOfRange);
    const newUpper = this.getNearestStep(upperValue - percentageOfRange);

    const noMovement = newLower === lowerValue;
    const isMin = min === lowerValue && min === newLower;
    const isMax = max === upperValue && max === newUpper;
    const isOutOfRange = newLower < min || newUpper > max;

    if (noMovement || isMin || isMax || isOutOfRange) return;
    this._handleOnChange(newLower, newUpper);
    this.dragAcc = 0;
  };

  render() {
    const { defaultFullWidth } = this.context as FormContextValue;
    const {
      className,
      css: customCss,
      compressed,
      disabled,
      fullWidth = defaultFullWidth,
      isLoading,
      readOnly,
      id: propsId,
      max: maxProps,
      min: minProps,
      name,
      step,
      showLabels,
      showInput,
      showTicks,
      tickInterval,
      ticks,
      levels,
      onBlur,
      onChange,
      onFocus,
      showRange,
      value,
      isInvalid,
      append,
      prepend,
      minInputProps,
      maxInputProps,
      inputPopoverProps,
      isDraggable,
      theme,
      ...rest
    } = this.props;
    const min = minProps!;
    const max = maxProps!;

    const { id } = this.state;

    const showInputOnly = this.isInPopover;
    const canShowDropdown = showInputOnly && !readOnly && !disabled;

    const rangeStyles = euiRangeStyles(theme);

    const minInput = !!showInput ? (
      <EuiRangeInput
        // Overridable props
        aria-describedby={this.props['aria-describedby']}
        aria-label={this.props['aria-label']}
        disabled={disabled}
        isInvalid={isInvalid}
        name={`${name}-minValue`}
        value={this.lowerValue}
        readOnly={readOnly}
        {...minInputProps}
        // Non-overridable props
        side="min"
        min={min}
        max={this.upperValue === '' ? max : Number(this.upperValue)}
        step={step}
        compressed={compressed}
        autoSize={!showInputOnly}
        fullWidth={!!showInputOnly && fullWidth}
        controlOnly={showInputOnly}
        onChange={(event) => {
          this.handleLowerInputChange(event);
          minInputProps?.onChange?.(event);
        }}
        onKeyDown={(event) => {
          this.handleInputKeyDown(event);
          minInputProps?.onKeyDown?.(event);
        }}
        onFocus={(event) => {
          if (canShowDropdown) {
            this.onInputFocus(event);
          } else {
            onFocus?.(event);
          }

          minInputProps?.onFocus?.(event);
        }}
        onBlur={(event) => {
          if (canShowDropdown) {
            this.onInputBlur(event);
          } else {
            onBlur?.(event);
          }

          minInputProps?.onBlur?.(event);
        }}
        onMouseDown={(event) => {
          if (showInputOnly) {
            this.preventPopoverClose = true;
          }

          minInputProps?.onMouseDown?.(event);
        }}
      />
    ) : undefined;

    const maxInput = !!showInput ? (
      <EuiRangeInput
        // Overridable props
        aria-describedby={this.props['aria-describedby']}
        aria-label={this.props['aria-label']}
        disabled={disabled}
        isInvalid={isInvalid}
        name={`${name}-maxValue`}
        value={this.upperValue}
        readOnly={readOnly}
        {...maxInputProps}
        // Non-overridable props
        side="max"
        min={this.lowerValue === '' ? min : Number(this.lowerValue)}
        max={max}
        step={step}
        compressed={compressed}
        autoSize={!showInputOnly}
        fullWidth={!!showInputOnly && fullWidth}
        controlOnly={showInputOnly}
        onChange={(event) => {
          this.handleUpperInputChange(event);
          maxInputProps?.onChange?.(event);
        }}
        onKeyDown={(event) => {
          this.handleInputKeyDown(event);
          maxInputProps?.onKeyDown?.(event);
        }}
        onFocus={(event) => {
          if (canShowDropdown) {
            this.onInputFocus(event);
          } else {
            onFocus?.(event);
          }

          maxInputProps?.onFocus?.(event);
        }}
        onBlur={(event) => {
          if (canShowDropdown) {
            this.onInputBlur(event);
          } else {
            onBlur?.(event);
          }

          maxInputProps?.onBlur?.(event);
        }}
        onMouseDown={(event) => {
          if (showInputOnly) {
            this.preventPopoverClose = true;
          }

          maxInputProps?.onMouseDown?.(event);
        }}
      />
    ) : undefined;

    const classes = classNames('euiDualRange', className);
    const dualRangeStyles = euiDualRangeStyles();
    const cssStyles = [dualRangeStyles.euiDualRange, customCss];

    const leftThumbPosition = this.state.rangeWidth
      ? this.calculateThumbPositionStyle(
          Number(this.lowerValue) || min,
          this.state.rangeWidth
        )
      : { left: '0' };
    const rightThumbPosition = this.state.rangeWidth
      ? this.calculateThumbPositionStyle(
          Number(this.upperValue) || max,
          this.state.rangeWidth
        )
      : { left: '0' };
    const leftThumbColor =
      levels && getLevelColor(levels, Number(this.lowerValue));
    const rightThumbColor =
      levels && getLevelColor(levels, Number(this.upperValue));
    const leftThumbStyles = leftThumbColor
      ? {
          ...leftThumbPosition,
          '--euiRangeThumbColor': euiRangeLevelColor(leftThumbColor, theme),
        }
      : leftThumbPosition;
    const rightThumbStyles = rightThumbColor
      ? {
          ...rightThumbPosition,
          '--euiRangeThumbColor': euiRangeLevelColor(rightThumbColor, theme),
        }
      : rightThumbPosition;

    const dualSliderScreenReaderInstructions = (
      <EuiI18n
        token="euiDualRange.sliderScreenReaderInstructions"
        default="You are in a custom range slider. Use the Up and Down arrow keys to change the minimum value. Press Tab to interact with the maximum value."
      />
    );

    const theRange = (
      <EuiRangeWrapper
        css={cssStyles}
        className={classes}
        fullWidth={fullWidth}
        compressed={compressed}
      >
        {showInput && !showInputOnly && (
          <>
            {minInput}
            <div
              className={
                showTicks || ticks
                  ? 'euiRange__slimHorizontalSpacer'
                  : 'euiRange__horizontalSpacer'
              }
              css={
                showTicks || ticks
                  ? rangeStyles.euiRange__slimHorizontalSpacer
                  : rangeStyles.euiRange__horizontalSpacer
              }
            />
          </>
        )}
        {showLabels && (
          <EuiRangeLabel side="min" disabled={disabled}>
            {min}
          </EuiRangeLabel>
        )}
        <EuiRangeTrack
          trackWidth={this.state.rangeWidth}
          compressed={compressed}
          disabled={disabled}
          max={max}
          min={min}
          step={step}
          showTicks={showTicks}
          tickInterval={tickInterval}
          ticks={ticks}
          levels={levels}
          onChange={this.handleSliderChange}
          value={value}
          aria-hidden={showInput === true}
          showRange={showRange}
        >
          <EuiRangeSlider
            className="euiDualRange__slider"
            css={dualRangeStyles.euiDualRange__slider}
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={this.handleSliderChange}
            showTicks={showTicks}
            aria-hidden={true}
            tabIndex={-1}
            showRange={showRange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
            onResize={this.setRangeWidth}
          />

          {isDraggable && this.isValid && (
            <EuiRangeDraggable
              min={min}
              max={max}
              value={[this.lowerValue, this.upperValue]}
              disabled={disabled}
              lowerPosition={leftThumbPosition.left}
              upperPosition={rightThumbPosition.left}
              showTicks={showTicks}
              onChange={this.handleDrag}
              onFocus={this.onThumbFocus}
              onBlur={this.onThumbBlur}
              onKeyDown={this.handleDraggableKeyDown}
              aria-describedby={
                showInputOnly ? undefined : this.props['aria-describedby']
              }
              aria-label={showInputOnly ? undefined : this.props['aria-label']}
            />
          )}

          <EuiRangeThumb
            min={min}
            max={Number(this.upperValue)}
            value={this.lowerValue}
            disabled={disabled}
            showTicks={showTicks}
            showInput={!!showInput}
            onKeyDown={this.handleLowerKeyDown}
            onFocus={this.onThumbFocus}
            onBlur={this.onThumbBlur}
            style={logicalStyles(leftThumbStyles)}
            aria-describedby={
              showInputOnly ? undefined : this.props['aria-describedby']
            }
            aria-label={showInputOnly ? undefined : this.props['aria-label']}
          />

          <EuiRangeThumb
            min={Number(this.lowerValue)}
            max={max}
            value={this.upperValue}
            disabled={disabled}
            showTicks={showTicks}
            showInput={!!showInput}
            onKeyDown={this.handleUpperKeyDown}
            onFocus={this.onThumbFocus}
            onBlur={this.onThumbBlur}
            style={logicalStyles(rightThumbStyles)}
            aria-describedby={
              showInputOnly ? undefined : this.props['aria-describedby']
            }
            aria-label={showInputOnly ? undefined : this.props['aria-label']}
          />

          {showRange && this.isValid && (
            <EuiRangeHighlight
              showTicks={showTicks}
              min={Number(min)}
              max={Number(max)}
              lowerValue={Number(this.lowerValue)}
              upperValue={Number(this.upperValue)}
              levels={levels}
              trackWidth={this.state.rangeWidth}
            />
          )}
        </EuiRangeTrack>
        {showLabels && <EuiRangeLabel disabled={disabled}>{max}</EuiRangeLabel>}
        {showInput && !showInputOnly && (
          <>
            <div
              className={
                showTicks || ticks
                  ? 'euiRange__slimHorizontalSpacer'
                  : 'euiRange__horizontalSpacer'
              }
              css={
                showTicks || ticks
                  ? rangeStyles.euiRange__slimHorizontalSpacer
                  : rangeStyles.euiRange__horizontalSpacer
              }
            />
            {maxInput}
          </>
        )}
      </EuiRangeWrapper>
    );

    const thePopover = showInputOnly ? (
      <EuiInputPopover
        {...inputPopoverProps}
        className={classNames(
          'euiDualRange__popover',
          inputPopoverProps?.className
        )}
        input={
          <EuiFormControlLayoutDelimited
            startControl={minInput!}
            endControl={maxInput!}
            isDisabled={disabled}
            fullWidth={fullWidth}
            compressed={compressed}
            readOnly={readOnly}
            append={append}
            prepend={prepend}
            isLoading={isLoading}
            isInvalid={isInvalid}
          />
        }
        fullWidth={fullWidth}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        disableFocusTrap={true}
        popoverScreenReaderText={dualSliderScreenReaderInstructions}
      >
        {theRange}
      </EuiInputPopover>
    ) : undefined;

    return thePopover || theRange;
  }
}

export const EuiDualRange = withEuiTheme<EuiDualRangeProps>(EuiDualRangeClass);
