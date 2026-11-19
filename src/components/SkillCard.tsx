import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Building2,
  Code2,
  Layout,
  Server,
  Wrench,
} from 'lucide-react';
import type { SkillCategory, SkillIconName } from '../types/portfolio';
import {
  ArcReactorIcon,
  BatmanBatIcon,
  CaptainShieldIcon,
  SpiderIcon,
} from './SuperheroIcons';

function renderSkillHeroLogo(logo?: string) {
  switch (logo) {
    case 'arc-reactor':
      return <ArcReactorIcon className="h-3.5 w-3.5" size={15} />;
    case 'batman':
      return <BatmanBatIcon className="h-3 w-4" size={17} />;
    case 'captain-shield':
      return <CaptainShieldIcon className="h-3.5 w-3.5" size={15} />;
    case 'spider':
      return <SpiderIcon className="h-3.5 w-3.5" size={15} />;
    default:
      return null;
  }
}

const ICON_MAP: Record<SkillIconName, typeof Code2> = {
  code: Code2,
  server: Server,
  brain: BrainCircuit,
  layout: Layout,
  building: Building2,
  wrench: Wrench,
};

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const pillContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export function SkillCard({ category, index }: SkillCardProps) {
  const Icon = ICON_MAP[category.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: '0 20px 40px -12px rgba(61,20,39,0.18)',
      }}
      className="editorial-card flex h-full flex-col p-6"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Animated icon container */}
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-burgundy text-gold"
          whileHover={{ rotate: 10, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            0{index + 1}
          </span>
          {category.heroTag && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-charcoal shadow-xs">
              {renderSkillHeroLogo(category.heroLogo)}
              <span>{category.heroTag}</span>
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-5 font-heading text-lg font-semibold text-burgundy-deep">
        {category.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted text-justify">
        {category.subtitle}
      </p>

      {/* Staggered skill pills */}
      <motion.ul
        className="mt-5 flex flex-wrap gap-2 border-t border-blush/80 pt-4"
        variants={pillContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {category.skills.map((skill, pillIndex) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: pillIndex * 0.04, ease: 'easeOut' }}
            whileHover={{ scale: 1.06, backgroundColor: '#EAD9DE' }}
            className="rounded-lg border border-blush bg-ivory px-3 py-1.5 font-mono text-xs font-medium text-charcoal transition-colors hover:border-gold"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}
