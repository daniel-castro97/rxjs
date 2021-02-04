import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {

    next: value => console.log('next:', value),
    error: error => console.warn('error:', error),
    complete: () => console.info('completado:')
};

const intervalo$ = new Observable<number>( subscriber => {

    //Crear un contador, 1,2,3,4,5............

    let contador = 0;

    const interval = setInterval( ()=> {

        subscriber.next(contador++);

    }, 1000);



    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
        
    }
});

const subs1 = intervalo$.subscribe( num => console.log( 'Num:', num));
const subs2 = intervalo$.subscribe( num => console.log( 'Num:', num));
const subs3 = intervalo$.subscribe( num => console.log( 'Num:', num));

subs1.add( subs2)
    .add(subs3);


setTimeout( () => {
    subs1.unsubscribe();
    //subs2.unsubscribe();
    //subs3.unsubscribe();
    console.log('Completado');
}, 3000);