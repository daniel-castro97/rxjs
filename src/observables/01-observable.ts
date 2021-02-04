import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {

    next: value => console.log('siguiente [next]:', value),
    error: error => console.warn('error [obs]:', error),
    complete: () => console.info('completado [obs]:')
}

//const obs$ = Observable.create();

const obs$ = new Observable<string>( subscriber => {
    subscriber.next('Hola');
    subscriber.next('Mundo');

    //Forzar error
   // const a = undefined;
    //a.nombre = 'ASD';

    subscriber.complete();

    subscriber.next('Hola');
    subscriber.next('Mundo');
});

obs$.subscribe(observer);

obs$.subscribe()

/** 
obs$.subscribe(
    valor => console.log('next', valor),
    error => console.warn('error', error),
    () => console.info('complete')
);
*/