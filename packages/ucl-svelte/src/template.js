
import {
    SvelteComponent,
    assign,
    bubble,
    detach,
    element,
    empty,
    exclude_internal_props,
    get_spread_update,
    init,
    insert,
    listen,
    noop,
    safe_not_equal,
    set_attributes,
    set_style
} from "svelte/internal";
import { onMount } from 'svelte';


export function generateComponent(__loadDefinition, TAG_NAME, events) {
    /* generated by Svelte v3.43.1 */

    function create_else_block(ctx) {
        let span;

        return {
            c() {
                span = element("span");
                span.textContent = "...";
                set_style(span, "background-color", "#88888880");
                set_style(span, "width", "100px");
                set_style(span, "text-align", "center");
                set_style(span, "display", "inline-block");
            },
            m(target, anchor) {
                insert(target, span, anchor);
            },
            p: noop,
            d(detaching) {
                if (detaching) detach(span);
            }
        };
    }

    // (11:8) {#if loaded}
    function create_if_block(ctx) {
        let my_svelte_component;
        let mounted;
        let dispose;
        let my_svelte_component_levels = [/*$$props*/ ctx[1]];
        let my_svelte_component_data = {};

        for (let i = 0; i < my_svelte_component_levels.length; i += 1) {
            my_svelte_component_data = assign(my_svelte_component_data, my_svelte_component_levels[i]);
        }

        return {
            c() {
                my_svelte_component = element(TAG_NAME);
                set_attributes(my_svelte_component, my_svelte_component_data);
            },
            m(target, anchor) {
                insert(target, my_svelte_component, anchor);

                if (!mounted) {
                    dispose = events.map(evtName => listen(my_svelte_component, evtName, /*events_handler*/ ctx[2]));
                    mounted = true;
                }
            },
            p(ctx, dirty) {
                set_attributes(my_svelte_component, my_svelte_component_data = get_spread_update(my_svelte_component_levels, [dirty & /*$$props*/ 2 && /*$$props*/ ctx[1]]));
            },
            d(detaching) {
                if (detaching) detach(my_svelte_component);
                mounted = false;
                dispose();
            }
        };
    }

    function create_fragment(ctx) {
        let if_block_anchor;

        function select_block_type(ctx, dirty) {
            if (/*loaded*/ ctx[0]) return create_if_block;
            return create_else_block;
        }

        let current_block_type = select_block_type(ctx, -1);
        let if_block = current_block_type(ctx);

        return {
            c() {
                if_block.c();
                if_block_anchor = empty();
            },
            m(target, anchor) {
                if_block.m(target, anchor);
                insert(target, if_block_anchor, anchor);
            },
            p(ctx, [dirty]) {
                if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
                    if_block.p(ctx, dirty);
                } else {
                    if_block.d(1);
                    if_block = current_block_type(ctx);

                    if (if_block) {
                        if_block.c();
                        if_block.m(if_block_anchor.parentNode, if_block_anchor);
                    }
                }
            },
            i: noop,
            o: noop,
            d(detaching) {
                if_block.d(detaching);
                if (detaching) detach(if_block_anchor);
            }
        };
    }

    function instance($$self, $$props, $$invalidate) {
        let loaded = false;

        onMount(() => {
            __loadDefinition().then(() => {
                $$invalidate(0, loaded = true);
            });
        });

        function events_handler(event) {
            bubble.call(this, $$self, event);
        }

        $$self.$$set = $$new_props => {
            $$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
        };

        $$props = exclude_internal_props($$props);
        return [loaded, $$props, events_handler];
    }

    class Component extends SvelteComponent {
        constructor(options) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal, {});
        }
    }

    return Component;
}