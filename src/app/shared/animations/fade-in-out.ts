import { trigger, animate, style, query, transition } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutTransition', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('5s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('5s', style({ opacity: 0 }))
    ])
]);
