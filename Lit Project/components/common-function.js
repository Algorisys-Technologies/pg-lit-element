import { unsafeCSS } from '../../../node_modules/@lit/reactive-element/css-tag.js'

export function emit(el, name, options) {
    const event = new CustomEvent(
        name,
        Object.assign(
            {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: {}
            },
            options
        )
    );
    el.dispatchEvent(event);
    return event;
}

//
// Ensures a number stays within a minimum and maximum value
//
export function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}


//
// Determines if the browser supports focus({ preventScroll })
//
export function isPreventScrollSupported() {
    let supported = false;

    document.createElement('div').focus({
        get preventScroll() {
            supported = true;
            return false;
        }
    });

    return supported;
}

const locks = new Set();

//
// Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
// without premature unlocking.
//
export function lockBodyScrolling(lockingEl) {
    locks.add(lockingEl);
    document.body.classList.add('al-scroll-lock');
}

//
// Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
//
export function unlockBodyScrolling(lockingEl) {
    locks.delete(lockingEl);

    if (locks.size === 0) {
        document.body.classList.remove('al-scroll-lock');
    }
}


//
// Animates an element using keyframes. Returns a promise that resolves after the animation completes or gets canceled.
//
export function animateTo(el, keyframes, options) {
    return new Promise(async resolve => {
        if (options?.duration === Infinity) {
            throw new Error('Promise-based animations must be finite.');
        }

        const animation = el.animate(keyframes, {
            ...options,
            duration: prefersReducedMotion() ? 0 : options.duration
        });

        animation.addEventListener('cancel', resolve, { once: true });
        animation.addEventListener('finish', resolve, { once: true });
    });
}

//
// Tells if the user has enabled the "reduced motion" setting in their browser or OS.
//
export function prefersReducedMotion() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    return query?.matches;
}

//
// Stops all active animations on the target element. Returns a promise that resolves after all animations are canceled.
//
export function stopAnimations(el) {
    return Promise.all(
        el.getAnimations().map((animation) => {
            return new Promise(resolve => {
                const handleAnimationEvent = requestAnimationFrame(resolve);

                animation.addEventListener('cancel', () => handleAnimationEvent, { once: true });
                animation.addEventListener('finish', () => handleAnimationEvent, { once: true });
                animation.cancel();
            });
        })
    );
}

function ensureAnimation(animation) {
    return animation ?? { keyframes: [], options: { duration: 0 } };
}


const defaultAnimationRegistry = new Map();

//
// Sets a default animation. Components should use the `name.animation` for primary animations and `name.part.animation`
// for secondary animations, e.g. `dialog.show` and `dialog.overlay.show`. For modifiers, use `drawer.showTop`.
//
export function setDefaultAnimation(animationName, animation) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}

//
// Gets an element's animation. Falls back to the default if no animation is found.
//
export function getAnimation(el, animationName) {

    // Check for a default animation
    const defaultAnimation = defaultAnimationRegistry.get(animationName);
    if (defaultAnimation) {
        return defaultAnimation;
    }

    // Fall back to an empty animation
    return {
        keyframes: [],
        options: { duration: 0 }
    };
}






// Determines if the current browser supports :focus-visible
//
export const hasFocusVisible = (() => {
    const style = document.createElement('style');
    let isSupported;

    try {
        document.head.appendChild(style);
        style.sheet.insertRule(':focus-visible { color: inherit }');
        isSupported = true;
    } catch {
        isSupported = false;
    } finally {
        style.remove();
    }

    return isSupported;
})();

//
// A selector for Lit stylesheets that outputs `:focus-visible` if the browser supports it and `:focus` otherwise
//
export const focusVisibleSelector = unsafeCSS(hasFocusVisible ? ':focus-visible' : ':focus');
