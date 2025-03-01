import {css, type Theme} from '@emotion/react';

import {t, tn} from 'sentry/locale';
import type {SelectValue} from 'sentry/types/core';
import type {Organization} from 'sentry/types/organization';
import type {ColorOrAlias} from 'sentry/utils/theme';
import {CheckInStatus} from 'sentry/views/monitors/types';

export function makeMonitorListQueryKey(
  organization: Organization,
  params: Record<string, any>
) {
  const {query, project, environment, owner, cursor, sort, asc} = params;

  return [
    `/organizations/${organization.slug}/monitors/`,
    {
      query: {
        cursor,
        query,
        project,
        environment,
        owner,
        includeNew: true,
        per_page: 20,
        sort,
        asc,
      },
    },
  ] as const;
}

export function makeMonitorDetailsQueryKey(
  organization: Organization,
  projectId: string,
  monitorSlug: string,
  query?: Record<string, any>
) {
  return [
    `/projects/${organization.slug}/${projectId}/monitors/${monitorSlug}/`,
    {query},
  ] as const;
}

export const statusToText: Record<CheckInStatus, string> = {
  [CheckInStatus.OK]: t('Okay'),
  [CheckInStatus.ERROR]: t('Failed'),
  [CheckInStatus.IN_PROGRESS]: t('In Progress'),
  [CheckInStatus.MISSED]: t('Missed'),
  [CheckInStatus.TIMEOUT]: t('Timed Out'),
  [CheckInStatus.UNKNOWN]: t('Unknown'),
};

interface TickStyle {
  /**
   * The color of the tooltip label
   */
  labelColor: ColorOrAlias;
  /**
   * The color of the tick
   */
  tickColor: ColorOrAlias;
  /**
   * Use a cross hatch fill for the tick instead of a solid color. The tick
   * color will be used as the border color
   */
  hatchTick?: ColorOrAlias;
}

export const tickStyle: Record<CheckInStatus, TickStyle> = {
  [CheckInStatus.ERROR]: {
    labelColor: 'red400',
    tickColor: 'red300',
  },
  [CheckInStatus.TIMEOUT]: {
    labelColor: 'red400',
    tickColor: 'red300',
    hatchTick: 'red200',
  },
  [CheckInStatus.OK]: {
    labelColor: 'green400',
    tickColor: 'green300',
  },
  [CheckInStatus.MISSED]: {
    labelColor: 'yellow400',
    tickColor: 'yellow300',
  },
  [CheckInStatus.IN_PROGRESS]: {
    labelColor: 'disabled',
    tickColor: 'disabled',
  },
  [CheckInStatus.UNKNOWN]: {
    labelColor: 'gray400',
    tickColor: 'gray300',
    hatchTick: 'gray200',
  },
};

export const getScheduleIntervals = (n: number): SelectValue<string>[] => [
  {value: 'minute', label: tn('minute', 'minutes', n)},
  {value: 'hour', label: tn('hour', 'hours', n)},
  {value: 'day', label: tn('day', 'days', n)},
  {value: 'week', label: tn('week', 'weeks', n)},
  {value: 'month', label: tn('month', 'months', n)},
  {value: 'year', label: tn('year', 'years', n)},
];

export function getTickStyle(status: CheckInStatus, theme: Theme) {
  const style = tickStyle[status];

  if (style.hatchTick === undefined) {
    return css`
      background: ${theme[style.tickColor]};
    `;
  }

  return css`
    border: 1px solid ${theme[style.tickColor]};
    background-size: 3px 3px;
    opacity: 0.5;
    background-image: linear-gradient(
        -45deg,
        ${theme[style.hatchTick]} 25%,
        transparent 25%,
        transparent 50%,
        ${theme[style.hatchTick]} 50%,
        ${theme[style.hatchTick]} 75%,
        transparent 75%,
        transparent
      ),
      linear-gradient(
        45deg,
        ${theme[style.hatchTick]} 25%,
        transparent 25%,
        transparent 50%,
        ${theme[style.hatchTick]} 50%,
        ${theme[style.hatchTick]} 75%,
        transparent 75%,
        transparent
      );
  `;
}
