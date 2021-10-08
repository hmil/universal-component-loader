let TEMPLATE = `const{SvelteComponent:t,assign:e,bubble:n,detach:l,element:o,empty:i,exclude_internal_props:r,get_spread_update:_,init:c,insert:u,listen:s,noop:a,safe_not_equal:p,set_attributes:d,set_style:f}=svelte_internal;function m(t){let e;return{c(){e=o("span"),e.textContent="...",f(e,"background-color","#88888880"),f(e,"width","100px"),f(e,"text-align","center"),f(e,"display","inline-block")},m(t,n){u(t,e,n)},p:a,d(t){t&&l(e)}}}function b(t){let n,i,r,c=[t[1]],s={};for(let t=0;t<c.length;t+=1)s=e(s,c[t]);return{c(){n=o("__TAG_NAME__"),d(n,s)},m(t,e){u(t,n,e),i||(r=[__LISTENERS__],i=!0)},p(t,e){d(n,s=_(c,[2&e&&t[1]]))},d(t){t&&l(n),i=!1,r()}}}function g(t){let e;function n(t,e){return t[0]?b:m}let o=n(t),r=o(t);return{c(){r.c(),e=i()},m(t,n){r.m(t,n),u(t,e,n)},p(t,[l]){o===(o=n(t))&&r?r.p(t,l):(r.d(1),r=o(t),r&&(r.c(),r.m(e.parentNode,e)))},i:a,o:a,d(t){r.d(t),t&&l(e)}}}function h(t,l,o){let i=!1;return onMount((()=>{__loadDefinition().then((()=>{o(0,i=!0)}))})),t.$$set=t=>{o(1,l=e(e({},l),r(t)))},l=r(l),[i,l,function(e){n.call(this,t,e)}]}`;

if (process.env.NODE_ENV === 'development') {
    TEMPLATE = `/* generated by Svelte v3.43.1 */
const {
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
} = svelte_internal;

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
            my_svelte_component = element("__TAG_NAME__");
            set_attributes(my_svelte_component, my_svelte_component_data);
        },
        m(target, anchor) {
            insert(target, my_svelte_component, anchor);

            if (!mounted) {
                dispose = [
                    __LISTENERS__
                ];
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
`;
}

export default TEMPLATE;