import { createEventDispatcher, get_current_component } from "svelte/internal"

/** 
 * Fixed implementation of createEventDispatcher for compatibility with custom elements.
 * 
 * https://github.com/sveltejs/svelte/issues/3119#issuecomment-566590846
 */
export function createElementDispatcher<EventMap extends {} = any>(): <EventKey extends Extract<keyof EventMap, string>>(type: EventKey, detail?: EventMap[EventKey]) => void {
    const component = get_current_component()
    const svelteDispatch = createEventDispatcher()
    return (name: string, detail: any) => {
        svelteDispatch(name, detail)
        component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }))
    }
}