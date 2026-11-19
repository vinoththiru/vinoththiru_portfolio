import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

const wordVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  const words = title.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`flex max-w-2xl flex-col ${alignment}`}
    >
      {/* Eyebrow */}
      <span
        className={`inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] ${
          light ? 'text-gold' : 'text-burgundy'
        }`}
      >
        {/* Animated gold dash */}
        <motion.span
          className={`h-px w-7 ${light ? 'bg-gold' : 'bg-gold'}`}
          aria-hidden="true"
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Eyebrow text slides in from left */}
        <motion.span
          initial={shouldReduceMotion ? { opacity: 1 } : { x: -16, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.span>
      </span>

      {/* Heading with word-by-word reveal */}
      <h2
        className={`mt-3.5 font-display text-3xl font-semibold leading-[1.2] sm:text-4xl ${
          light ? 'text-ivory' : 'text-burgundy-deep'
        }`}
      >
        {shouldReduceMotion ? (
          <span>{title}</span>
        ) : (
          <motion.span
            className="inline-flex flex-wrap gap-x-[0.32em] gap-y-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.04, delayChildren: 0.08 }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        )}
      </h2>

      {/* Subtitle fades up */}
      {subtitle && (
        <motion.p
          className={`mt-4 text-base leading-relaxed sm:text-[17px] text-justify ${
            light ? 'text-ivory/85' : 'text-muted'
          }`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
