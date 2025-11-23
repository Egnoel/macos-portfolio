import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};
  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];
  const animateLetter = (letter, weight, duration = 0.22) => {
    return gsap.to(letter, {
      fontVariationSettings: `'wght' ${weight}`,
      duration,
      ease: 'power2.out',
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};

const Welcome = () => {
  const tittleRef = useRef(null);
  const subtittleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(tittleRef.current, 'title');
    const subtitleCleanup = setupTextHover(subtittleRef.current, 'subtitle');

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtittleRef}>
        {renderText(
          "Hey, I'm Egnoel!. Welcome to my",
          'font-georama text-3xl',
          100
        )}
      </p>
      <h1 ref={tittleRef} className="mt-7">
        {renderText('Portfolio', 'font-georama italic text-9xl')}
      </h1>
      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
