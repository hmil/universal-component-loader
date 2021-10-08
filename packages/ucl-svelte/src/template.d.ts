
import { SvelteComponentTyped } from "svelte";
export function generateComponent(__loadDefinition: () => Promise<void> | void, TAG_NAME: string, events: PropertyKey[]): {
    new (): SvelteComponentTyped };
