import("@hmil/test-react")
import("@hmil/test-svelte")

window.addEventListener('counterChange', () => {
    console.log('change');
});
