import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, { duration = 1200, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return undefined;
    const steps = 40;
    const stepValue = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let count = 0;

    const interval = setInterval(() => {
      count += 1;
      current += stepValue;
      setValue(count === steps ? target : current);
      if (count >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { ref, value: decimals > 0 ? value.toFixed(decimals) : Math.floor(value) };
}
