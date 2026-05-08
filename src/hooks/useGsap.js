/**
 * Custom React hooks for GSAP + ScrollTrigger integration.
 *
 * Strategy:
 *   Framer Motion  → interactive (hover, tap, page transitions, AnimatePresence)
 *   GSAP           → scroll-driven (parallax, text reveals, stagger, pin, scrub)
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-in + slide up when element scrolls into view.
 * @param {Object} options
 * @param {number} options.y - Starting Y offset (default 60)
 * @param {number} options.duration - Animation duration (default 0.8)
 * @param {number} options.delay - Delay before start (default 0)
 * @param {string} options.start - ScrollTrigger start position (default "top 85%")
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
    } = options;

    gsap.set(el, { opacity: 0, y });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Stagger-reveal children when parent scrolls into view.
 * @param {string} childSelector - CSS selector for children to stagger
 * @param {Object} options
 */
export function useStaggerReveal(childSelector, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const {
      y = 40,
      duration = 0.6,
      stagger = 0.1,
      start = 'top 85%',
    } = options;

    gsap.set(children, { opacity: 0, y });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Parallax effect — element moves at a different rate than scroll.
 * @param {number} speed - Parallax speed multiplier (negative = opposite direction)
 */
export function useParallax(speed = -50) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed]);

  return ref;
}

/**
 * Text split + reveal animation — each word/char animates in.
 * @param {Object} options
 * @param {'words'|'chars'} options.type - Split by words or characters
 */
export function useTextReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { type = 'words', duration = 0.6, stagger = 0.04, start = 'top 85%' } = options;

    const text = el.textContent;
    const units = type === 'chars' ? text.split('') : text.split(' ');

    el.innerHTML = units
      .map(
        (unit) =>
          `<span class="gsap-text-unit" style="display:inline-block;overflow:hidden"><span class="gsap-text-inner" style="display:inline-block">${unit === ' ' ? '&nbsp;' : unit}</span></span>`
      )
      .join(type === 'chars' ? '' : ' ');

    const inners = el.querySelectorAll('.gsap-text-inner');

    gsap.set(inners, { y: '110%', opacity: 0 });

    const tween = gsap.to(inners, {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      el.textContent = text; // Restore original text
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Horizontal scale-in line animation on scroll.
 */
export function useLineReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    const tween = gsap.to(el, {
      scaleX: 1,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Counter animation on scroll (counts from 0 to target).
 * @param {number} end - Target number
 * @param {number} duration - Duration in seconds
 */
export function useScrollCounter(end, duration = 2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString();
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [end, duration]);

  return ref;
}

/**
 * Magnetic hover effect using GSAP (for buttons/icons).
 * @param {number} strength - Magnetic pull strength (default 0.3)
 */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
