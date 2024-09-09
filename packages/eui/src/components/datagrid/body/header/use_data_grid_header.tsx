/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useState, useMemo } from 'react';

import { useResizeObserver } from '../../../observer/resize_observer';

import { EuiDataGridHeaderRowProps } from '../../data_grid_types';
import { EuiDataGridHeaderRow } from './data_grid_header_row';

/**
 * DRY out setting up the grid header and its refs & observers
 */
export const useDataGridHeader = (props: EuiDataGridHeaderRowProps) => {
  const [headerRowRef, setHeaderRowRef] = useState<HTMLDivElement | null>(null);
  const { height: headerRowHeight } = useResizeObserver(headerRowRef, 'height');

  const headerRow = useMemo(() => {
    return <EuiDataGridHeaderRow ref={setHeaderRowRef} {...props} />;
  }, [props]);

  return useMemo(() => {
    return { headerRow, headerRowHeight };
  }, [headerRow, headerRowHeight]);
};
