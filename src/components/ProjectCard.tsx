import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Lock, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { Button } from './Button';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import {
  ArcReactorIcon,
  BatmanBatIcon,
  CaptainShieldIcon,
  SpiderIcon,
  WakandaClawIcon,
} from './SuperheroIcons';

function renderHeroBadgeIcon(logo?: string) {
  switch (logo) {
    case 'arc-reactor':
      return <ArcReactorIcon className="h-4 w-4" size={17} />;
    case 'batman':
      return <BatmanBatIcon className="h-3.5 w-5" size={19} />;
    case 'captain-shield':
      return <CaptainShieldIcon className="h-4 w-4" size={17} />;
    case 'spider':
      return <SpiderIcon className="h-4 w-4" size={17} />;
    case 'wakanda':
      return <WakandaClawIcon className="h-4 w-4" size={17} />;
    default:
      return null;
  }
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const techPillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const techContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  if (project.featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1 }}
        className="editorial-card overflow-hidden border-gold/55 shadow-editorial relative"
      >
        {/* Animated gradient border pulse */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(201,166,107,0)',
              '0 0 0 3px rgba(201,166,107,0.3)',
              '0 0 0 0px rgba(201,166,107,0)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {/* Shimmer overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(201,166,107,0.08) 50%, transparent 60%)',
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="h-1.5 w-full bg-gradient-to-r from-burgundy-deep via-gold to-burgundy" />

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10">
          {/* Left Narrative */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ivory">
                <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" />
                Flagship Real-World Project
              </span>
              {project.organization && (
                <span className="rounded-full border border-gold/50 bg-ivory px-3 py-1 font-mono text-[11px] font-medium text-burgundy-deep">
                  {project.organization}
                </span>
              )}
              {project.heroCodename && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-charcoal shadow-xs">
                  {renderHeroBadgeIcon(project.heroLogo)}
                  <span>{project.heroCodename}</span>
                </span>
              )}
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-burgundy-deep sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              Role: {project.role}
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-charcoal/90 text-justify">
              {project.shortDescription}
            </p>

            <div className="mt-5 grid gap-4 rounded-xl border border-blush bg-ivory/80 p-4 sm:grid-cols-2">
              <div>
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy">
                  Business Problem
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted text-justify">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy">
                  Independent Contribution
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted text-justify">
                  {project.contribution}
                </p>
              </div>
            </div>

            {/* Modules */}
            <div className="mt-5">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
                Implemented Modules
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {project.keyFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md border border-blush bg-white px-2.5 py-1 text-xs font-medium text-charcoal"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack — staggered entrance */}
            <motion.div
              className="mt-5 flex flex-wrap gap-2"
              variants={techContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="tech-pill"
                  variants={techPillVariants}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                as="link"
                to={`/projects/${project.slug}`}
                variant="primary"
                size="md"
              >
                View Full Case Study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>

              {project.liveUrl && (
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.liveUrlLabel ?? 'Live Deployment'}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              )}
            </div>

            {project.liveUrlNote && (
              <p className="mt-2.5 font-mono text-[11px] text-muted">
                Note: {project.liveUrlNote}
              </p>
            )}
          </div>

          {/* Right Preview — scale on hover */}
          <motion.div
            className="lg:col-span-5"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ProjectVisualPreview type={project.visualType} />
          </motion.div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay: index * 0.08 }}
      whileHover={{ rotateY: 3, rotateX: -2 }}
      style={{ transformPerspective: 800 }}
      className="editorial-card editorial-card-hover flex h-full flex-col overflow-hidden relative group"
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[inherit]"
        aria-hidden="true"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(201,166,107,0.08) 50%, transparent 60%)',
        }}
      />

      <div className="p-5 pb-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <ProjectVisualPreview type={project.visualType} compact />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-burgundy">
            {project.category}
          </span>
          {project.heroCodename && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-charcoal shadow-xs">
              {renderHeroBadgeIcon(project.heroLogo)}
              <span>{project.heroCodename}</span>
            </span>
          )}
        </div>

        <h3 className="mt-2.5 font-display text-xl font-semibold leading-snug text-burgundy-deep">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted text-justify">
          {project.shortDescription}
        </p>

        <div className="mt-4 space-y-2.5 rounded-xl border border-blush/80 bg-ivory/75 p-3.5 text-xs">
          <div>
            <span className="font-mono font-semibold uppercase tracking-wider text-burgundy">
              Problem:{' '}
            </span>
            <span className="text-charcoal/85 text-justify">{project.problem}</span>
          </div>
          <div>
            <span className="font-mono font-semibold uppercase tracking-wider text-burgundy">
              Contribution:{' '}
            </span>
            <span className="text-charcoal/85 text-justify">{project.contribution}</span>
          </div>
        </div>

        {/* Key Features */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.keyFeatures.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className="rounded-md bg-blush/45 px-2.5 py-1 text-[11px] font-medium text-burgundy-deep"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Tech stack — staggered entrance */}
        <motion.div
          className="mt-4 flex flex-wrap gap-1.5"
          variants={techContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              className="tech-pill"
              variants={techPillVariants}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-blush/80 pt-4">
          <Button
            as="link"
            to={`/projects/${project.slug}`}
            variant="ghost"
            size="sm"
            className="-ml-2 font-semibold group/btn"
          >
            View Case Study
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          </Button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-blush px-2.5 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-blush px-2.5 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
