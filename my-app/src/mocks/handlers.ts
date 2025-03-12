import { googleCalendarHandlers } from './googleCalendarHandlers';
import { quickbooksHandlers } from './quickbooksHandlers';

export const handlers = [
  ...googleCalendarHandlers,
  ...quickbooksHandlers,
];

