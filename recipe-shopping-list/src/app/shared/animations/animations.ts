import { animate, animateChild, group, keyframes, query, style, transition, trigger } from "@angular/animations";

export const listAnimation = 
    trigger('listModifications', [
        transition('void => *', [
            animate(1000, keyframes([
                style({
                    transform: 'translateX(-100px, 0px)',
                    opacity: 0,
                    offset: 0
                }),
                style({
                    transform: 'translateX(-50px, 0px)',
                    opacity: 0.5,
                    offset: 0.3
                }),
                style({
                    transform: 'translateX(-20px, 0px)',
                    opacity: 0.7,
                    offset: 0.6
                }),
                style({
                    transform: 'translateX(0px, 0px)',
                    opacity: 1,
                    offset: 1
                })
            ]))
        ]),
        transition('* => void', [
            animate(600, style({
                transform: 'translateX(100px)',
                opacity: 0
            }))
        ])
    ]);

export const slideInAnimation =
    trigger('routeAnimations', [
      transition('HomePage <=> ShoppingListPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ])
    ]);