import { trigger, transition, stagger, animate, style, query } from '@angular/animations';


export const listItemsAnimation = trigger('listStaggerTransition', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
                '50ms',
                animate(
                    '60ms ease-out',
                    style({ opacity: 1, transform: 'translateY(0px)' })
                )
            )
        ],
            { optional: true }
        ),
    ])
]);
