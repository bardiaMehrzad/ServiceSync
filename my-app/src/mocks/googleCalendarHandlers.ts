import { http, HttpResponse } from 'msw';

export const googleCalendarHandlers = [
  // GET: List upcoming events
  http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', (req) => {
    
    const fakeEvents = [
      {
        id: 'event1',
        summary: 'Clogged Drain at 123 Example St',
        start: { dateTime: '2025-04-01T09:00:00-07:00' },
        end: { dateTime: '2025-04-01T10:00:00-07:00' },
      },
      {
        id: 'event2',
        summary: 'Toilet Repair at 456 Test Ln',
        start: { dateTime: '2025-04-02T11:00:00-07:00' },
        end: { dateTime: '2025-04-02T12:00:00-07:00' },
      },
    ];

    return new HttpResponse(JSON.stringify({
      kind: 'calendar#events',
      items: fakeEvents,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  // POST: Insert a new event
  http.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', (req) => {
    const eventDetails = req
    // Simulate event creation by adding an "id" field.
    const createdEvent = {
      id: 'new-event-id', 
      ...eventDetails,
    };

    return new HttpResponse(JSON.stringify(createdEvent), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
