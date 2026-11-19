import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import type { ExperienceItem } from '../types/portfolio';
import { ThanosDustedItem } from './ThanosDustedItem';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

const contributionContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const contributionItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const techContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Animated vertical spine */}
      <motion.div
        className="absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-burgundy via-gold to-blush sm:left-6"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <ol className="space-y-8 sm:space-y-10">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 120,
              damping: 20,
            }}
            className="relative pl-12 sm:pl-16"
          >
            {/* Timeline Node Dot */}
            <span
              className={`absolute left-1.5 top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:left-3.5 ${
                item.isCurrent
                  ? 'border-gold bg-burgundy shadow-sm'
                  : 'border-burgundy/40 bg-ivory'
              }`}
              aria-hidden="true"
            >
              {item.isCurrent ? (
                /* Pulsing dot for current role */
                <motion.span
                  className="h-2 w-2 rounded-full bg-gold"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />
              ) : (
                <span className="h-2 w-2 rounded-full bg-burgundy" />
              )}
            </span>

            <ThanosDustedItem id={`exp-${item.id}`}>
              <article className="editorial-card editorial-card-hover overflow-hidden">
                {/* Top accent bar */}
                <div
                  className={`h-1 w-full ${
                    item.isCurrent
                      ? 'bg-gradient-to-r from-burgundy via-gold to-burgundy'
                      : 'bg-blush'
                  }`}
                />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-4 border-b border-blush/80 pb-5 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] ${
                            item.isCurrent
                              ? 'bg-burgundy text-ivory'
                              : 'bg-blush/70 text-burgundy-deep'
                          }`}
                        >
                          <Briefcase className="h-3 w-3 text-gold" aria-hidden="true" />
                          {item.focusTag}
                        </span>
                      </div>

                    <h3 className="mt-3 font-display text-2xl font-semibold text-burgundy-deep">
                      {item.position}
                    </h3>
                    <p className="mt-1 font-heading text-base font-medium text-burgundy">
                      {item.company}
                    </p>
                  </div>

                  <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-blush bg-ivory px-3.5 py-2 font-mono text-xs font-medium text-charcoal">
                    <Calendar className="h-3.5 w-3.5 text-burgundy" aria-hidden="true" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-muted text-justify">
                  {item.description}
                </p>

                <div className="mt-5">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
                    Key Contributions
                  </h4>
                  {/* Staggered contribution checkmarks */}
                  <motion.ul
                    className="mt-3 grid gap-2.5 sm:grid-cols-2"
                    variants={contributionContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {item.contributions.map((contribution) => (
                      <motion.li
                        key={contribution}
                        variants={contributionItemVariants}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal/90 text-justify"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark"
                          aria-hidden="true"
                        />
                        <span>{contribution}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Staggered tech pills */}
                <motion.div
                  className="mt-6 flex flex-wrap gap-2 border-t border-blush/70 pt-5"
                  variants={techContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {item.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="tech-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: techIndex * 0.04,
                        ease: 'easeOut',
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </article>
          </ThanosDustedItem>
        </motion.li>
        ))}
      </ol>
    </div>
  );
}
