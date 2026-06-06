import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const pageTransition = trigger('pageTransition', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        stagger(100, [
          animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);

export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('350ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);
