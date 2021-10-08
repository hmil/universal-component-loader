import { ComponentBundle } from "@hmil/ucl-spec";
import * as React from 'react';
import * as ReactDOM from "react-dom";

const DEFAULT_PLACEHOLDER = '<div>placeholder</div>';

type MapEvents<E> = { [k in ToReactEventName<keyof E>]?: (evt: E[ToEventName<k>]) => void; }

export function loadComponent<P extends {}, E extends {}>(def: ComponentBundle<P, E>) {

    return function ComponentLoader(props: P & MapEvents<E>) {
        const TagName = def.TAG_NAME;
        const [loaded, setLoaded] = React.useState(false);

        const ref = React.useRef<HTMLElement>(null);

        React.useEffect(() => {
            let mounted = true;
            Promise.resolve(def.load()).then(() => {
                if (mounted) {
                    setLoaded(true);
                }
            });

            return () => {
                mounted = false;
            };
        }, []);

        const events = Object.keys(props).filter(k => /^on[A-Z]/.test(k)).map(k => {
            return {
                name: nativeEventName(k),
                handler: props[k as keyof typeof props]
            };
        });

        React.useEffect(() => {
            const currentRef = ref.current;
            events.forEach(evt => {
                const handler = evt.handler;
                if (handler != null && ref.current != null) {
                    ref.current.addEventListener(evt.name, evt.handler as any);
                }
            });

            return () => {
                events.forEach(evt => {
                    const handler = evt.handler;
                    if (handler != null && currentRef != null) {
                        currentRef.removeEventListener(evt.name, evt.handler as any);
                    }
                });
            };
        });

        def.$$props.forEach((p) => {
            React.useEffect(() => {
                if (ref.current) {
                    (ref.current as any)[p] = props[p];
                }
            });
        });

        return <>
            { 
                loaded
                // @ts-ignore
                ? <def.TAG_NAME ref={ref} />
                : <div dangerouslySetInnerHTML={{__html: def.placeholder ?? DEFAULT_PLACEHOLDER }}></div>
            }
        </>;
    }


    // return class ComponentLoader extends React.Component<P & MapEvents<E>> {

    //     state: { TagName: string | null } = {
    //         TagName: null
    //     };

    //     elementRef = React.createRef<HTMLElement>();

    //     componentDidMount() {
    //         Promise.resolve(def.load()).then(() => {
    //             this.setState({
    //                 TagName: def.TAG_NAME
    //             });
    //         });
    //         this.elementRef.current?.addEventListener('setUser', ev =>
    //             (this.props as any).onSetUser(ev)
    //         );
    //     }

    //     render() {
    //         const { TagName } = this.state;
    //         return <>
    //             { 
    //                 TagName != null
    //                 // @ts-ignore
    //                 ? <TagName ref={this.elementRef} />
    //                 : <div dangerouslySetInnerHTML={{__html: def.placeholder ?? DEFAULT_PLACEHOLDER }}></div>
    //             }
    //         </>;
    //     }
    // }
}

export function defineReactElement<P>(
    tag: string, 
    Component: React.FunctionComponent<P> | React.ComponentClass<P>,
    props: ReactPropsRequired<P>,
    events: Array<keyof ReactEvents<P>>
): void {

    class ExportedElement extends HTMLElement {
        private _propCache: Record<PropertyKey, any> = {};
        private _listeners: Record<PropertyKey, any> = {};
        private _mountPoint: HTMLElement;

        static get observedAttributes() {
            return Object.keys(props);
        }

        attributeChangedCallback(name: PropertyKey, oldValue: any, newValue: any) {
            this._propCache[name] = newValue;
            this._refresh();
        }

        constructor() {
            super();
            Object.keys(props).forEach(key => {
                this._propCache[key] = props[key as keyof typeof props];
            });
            events.forEach(evt => {
                this._listeners[reactEventName(evt)] = (detail: any) => {
                    this.dispatchEvent(new CustomEvent(evt, { detail }));
                }
            });
            const root = this.attachShadow({ mode: 'open' });
            this._mountPoint = document.createElement('span');
            root.appendChild(this._mountPoint);
            this._refresh();
        }

        connectedCallback() {
            this._refresh();
        }

        private _refresh() {
            const props: Record<PropertyKey, any> = {};
            Object.assign(props, this._propCache);
            Object.assign(props, this._listeners);
            // ReactDOM.unmountComponentAtNode(this._mountPoint);
            ReactDOM.render(React.createElement(Component, props, null), this._mountPoint);
        }
    }

    Object.keys(props).forEach(key => {
        Object.defineProperty(ExportedElement.prototype, key, {
            enumerable: true,
            configurable: false,
            get() {
                this._propCache[key];
            },
            set(value: any) {
                this._propCache[key] = value;
                this._refresh();
            }
        });
    });

    customElements.define(tag, ExportedElement);
}


function reactEventName(name: string) {
    return `on${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
}

function nativeEventName(name: string) {
    return `${name.slice(2, 3).toLowerCase()}${name.slice(3)}`;
}


type caps = keyof CapsMap;

type CapsMap = {
    'A': 'a';
    'B': 'b';
    'C': 'c';
    'D': 'd';
    'E': 'e';
    'F': 'f';
    'G': 'g';
    'H': 'h';
    'I': 'i';
    'J': 'j';
    'K': 'k';
    'L': 'l';
    'M': 'm';
    'N': 'n';
    'O': 'o';
    'P': 'p';
    'Q': 'q';
    'R': 'r';
    'S': 's';
    'T': 't';
    'U': 'u';
    'V': 'v';
    'W': 'w';
    'X': 'x';
    'Y': 'y';
    'Z': 'z';
}

type LowMap = {
    'a': 'A';
    'b': 'B';
    'c': 'C';
    'd': 'D';
    'e': 'E';
    'f': 'F';
    'g': 'G';
    'h': 'H';
    'i': 'I';
    'j': 'J';
    'k': 'K';
    'l': 'L';
    'm': 'M';
    'n': 'N';
    'o': 'O';
    'p': 'P';
    'q': 'Q';
    'r': 'R';
    's': 'S';
    't': 'T';
    'u': 'U';
    'v': 'V';
    'w': 'W';
    'x': 'X';
    'y': 'Y';
    'z': 'Z';
}

type FilterKeys<Keys> = Keys extends `on${caps}${infer R}` ? never : Keys;
type ReactPropsRequired<Props extends Record<string, any>> = { [key in FilterKeys<keyof Props>]: Props[key] };
export type ReactProps<Props extends Record<string, any>> = OptionalWhenUndefineable<ReactPropsRequired<Props>>;

type FilterEventKeys<Keys> = Keys extends `on${caps}${infer R}` ? Keys : never;
type ToEventName<Key> = Key extends `on${infer Cap}${infer R}` ? Cap extends caps ? `${CapsMap[Cap]}${R}` : never : never;
type ToReactEventName<Key> = Key extends `${infer Low}${infer R}` ? Low extends keyof LowMap ? `on${LowMap[Low]}${R}` : never : never;
export type ReactEvents<Props extends Record<string, any>> = { [key in ToEventName<FilterEventKeys<keyof Props>>]: CustomEvent<Parameters<Props[ToReactEventName<key>]>[0]> };


type FilterOptional<T, K> = K extends keyof T ? undefined extends T[K] ? never : K : K;

type OptionalWhenUndefineable<T> = Pick<T, FilterOptional<T, keyof T>> & Partial<Pick<T, Exclude<keyof T, FilterOptional<T, keyof T>>>>;
