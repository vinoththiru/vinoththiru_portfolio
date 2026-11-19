import { motion } from 'framer-motion';
import { ArrowDown, Database, Layout, Server } from 'lucide-react';

interface ArchitectureLayer {
  layer: string;
  technology: string;
  responsibility: string;
}

interface ArchitectureDiagramProps {
  layers: ArchitectureLayer[];
  title?: string;
}

const LAYER_ICONS = [Layout, Server, Database];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const layerVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as number[] },
  },
};

const connectorVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

export function ArchitectureDiagram({
  layers,
  title = 'System Architecture Flow',
}: ArchitectureDiagramProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/40 bg-burgundy-deep p-6 text-ivory shadow-editorial sm:p-8">
      {/* Title section — slides in from top */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory/15 pb-4"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Technical Blueprint
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ivory">
            {title}
          </h3>
        </div>
        <span className="rounded-full border border-gold/40 bg-burgundy px-3 py-1 font-mono text-[11px] text-gold">
          3-Tier Architecture
        </span>
      </motion.div>

      <motion.div
        className="mt-6 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {layers.map((item, idx) => {
          const Icon = LAYER_ICONS[idx % LAYER_ICONS.length];
          const isLast = idx === layers.length - 1;

          return (
            <div key={item.layer} className="flex w-full max-w-2xl flex-col items-center">
              {/* Layer box */}
              <motion.div
                className="w-full rounded-xl border border-ivory/20 bg-white/[0.06] p-5"
                variants={layerVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/50 bg-burgundy text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                        {item.layer}
                      </span>
                      <h4 className="mt-0.5 font-heading text-lg font-semibold text-ivory">
                        {item.technology}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-ivory/80">
                        {item.responsibility}
                      </p>
                    </div>
                  </div>

                  {/* Gold layer badge — hover color flip */}
                  <motion.span
                    className="self-start rounded-md border border-ivory/15 bg-charcoal/60 px-2.5 py-1 font-mono text-[11px] text-gold"
                    whileHover={{ backgroundColor: '#C9A66B', color: '#3D1427' }}
                    transition={{ duration: 0.2 }}
                  >
                    Layer 0{idx + 1}
                  </motion.span>
                </div>
              </motion.div>

              {/* Animated connector arrow — draws in with scaleY */}
              {!isLast && (
                <motion.div
                  className="my-2 flex flex-col items-center text-gold"
                  aria-hidden="true"
                  variants={connectorVariants}
                  style={{ transformOrigin: 'top' }}
                >
                  <span className="h-3 w-px bg-gold/60" />
                  <ArrowDown className="h-4 w-4" />
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
