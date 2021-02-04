import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {

    next: value => console.log('next:', value),
    error: error => console.warn('error:', error),
    complete: () => console.info('completado:')
};

const intervalo$ = new Observable<number>( subs => {

    const intervalo = setInterval( 
        () => subs.next( Math.random() ), 1000
    );

    return () => {
        clearInterval(intervalo);
        console.log('intervalo destruido')
    }
});

/**
 * 1- Casteo multiple
 * 2- Tambien es un observer
 * 3- Tambien se maneja nest, erro y complete
 */
const sunject$ = new Subject();

const intervalSubject = intervalo$.subscribe( sunject$);

// const subs1 = intervalo$.subscribe(rdn => console.log('Subs1', rdn));
// const subs2 = intervalo$.subscribe(rdn => console.log('Subs2', rdn));

const subs1 = sunject$.subscribe(observer);
const subs2 = sunject$.subscribe(observer);

setTimeout( ()=> {

    sunject$.next(10);

    sunject$.complete();

    intervalSubject.unsubscribe();

},3500);