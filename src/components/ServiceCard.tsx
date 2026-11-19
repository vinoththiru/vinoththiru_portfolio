import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Layers,
  Server,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { ServiceIconName, ServiceItem } from '../types/portfolio';

const SERVICE_ICONS: Record<ServiceIconName, typeof Workflow> = {
  workflow: Workflow,
  server: Server,
  layers: Layers,
  sparkles: Sparkles,
  'bar-chart': BarChart3,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelectService: (subject: string) => void;
}

const deliverableContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const deliverableItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
};

export function ServiceCard({
  service,
  index,
  onSelectService,
}: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="editorial-card flex h-full flex-col p-6"
    >
      {/* Icon with rotateY flip on hover */}
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/45 bg-ivory text-burgundy"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5 }}
        style={{ perspective: 800 }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </motion.div>

      <h3 className="mt-5 font-display text-xl font-semibold text-burgundy-deep">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
        {service.description}
      </p>

      {/* Staggered deliverable items */}
      <motion.ul
        className="mt-4 space-y-1.5 text-xs text-charcoal/85"
        variants={deliverableContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {service.deliverables.map((item) => (
          <motion.li key={item} variants={deliverableItemVariants} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-blush/80 pt-4">
        {service.technologies.map((tech) => (
          <span key={tech} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => onSelectService(service.inquirySubject)}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-deep"
        >
          Discuss this service
          {/* Animated arrow icon using framer-motion */}
          <motion.span
            className="inline-flex"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </motion.span>
        </button>
      </div>
    </motion.article>
  );
}
