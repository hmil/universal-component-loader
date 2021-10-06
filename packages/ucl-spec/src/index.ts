
/**
 * TODO
 */
export interface ComponentBundle<Props extends Record<string, any> = any, Events extends Record<string, any> = any> {

    $$props: Array<keyof Props>;
    $$events: Array<keyof Events>;

    /**
     * Registers the custom element and returns 
     */
    load: () => Promise<void> | void;

    /**
     * Content to display while the component is loading.
     */
    placeholder?: string;

    /**
     * html tag name of the component
     */
    TAG_NAME: string;
}

