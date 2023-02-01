const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};
let observer;
let observedElement;

export function intersectionObserver ({onIntersectionCallback, options=defaultOptions}) {
    observer = new IntersectionObserver(onIntersectionCallback, options);

    return observer;
}

export function observe (elementToObserve) {
    observer.observe(elementToObserve);
    observedElement = elementToObserve;
}

export function unobserve () {
    if (observedElement) {
        observer.unobserve(observedElement);
    }
}

export function disconnect () {
    observer.disconnect();
}