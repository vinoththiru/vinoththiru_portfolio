import { motion } from 'framer-motion';
import { Award, GraduationCap, Layers, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';

export function About() {
  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="editorial-container">
        <SectionHeading
          eyebrow="About Me"
          title={profileData.aboutHeading}
          subtitle="Combining Python backend engineering, applied AI/ML, and real-world procurement operations to build software that teams actually use."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="space-y-5 lg:col-span-7"
          >
            {profileData.summary.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-[1.8] text-charcoal/90 sm:text-[17px] text-justify"
              >
                {paragraph}
              </p>
            ))}

            {/* 3 Highlight Pillars */}
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {profileData.aboutHighlights.map((highlight) => (
                <div key={highlight.label} className="editorial-card p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-burgundy">
                    {highlight.label}
                  </p>
                  <p className="mt-1.5 font-heading text-sm font-semibold text-burgundy-deep">
                    {highlight.value}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted text-justify">
                    {highlight.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Credentials & Education Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="space-y-5 lg:col-span-5"
          >
            {/* Education Card */}
            <div className="editorial-card overflow-hidden">
              <div className="flex items-center justify-between bg-burgundy px-6 py-4 text-ivory">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Education
                </span>
                <span className="rounded-full border border-gold/50 px-2.5 py-0.5 font-mono text-[11px] text-ivory">
                  Class of {profileData.education.year}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-burgundy-deep">
                  {profileData.education.degree}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-charcoal">
                  {profileData.education.institution}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-blush pt-4">
                  <span className="inline-flex items-center rounded-lg bg-ivory px-3 py-1.5 font-mono text-xs font-semibold text-burgundy">
                    CGPA: {profileData.education.cgpa}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5 text-gold-dark" aria-hidden="true" />
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications & Training (from supplied resume) */}
            <div className="editorial-card p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                <Award className="h-4 w-4 text-gold-dark" aria-hidden="true" />
                Certifications &amp; Training
              </div>
              <ul className="mt-4 space-y-3.5">
                {profileData.certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="rounded-xl border border-blush/80 bg-ivory/75 p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-heading text-sm font-semibold text-burgundy-deep">
                        {cert.title}
                      </p>
                      <span className="shrink-0 rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-medium text-burgundy">
                        {cert.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operating Philosophy Callout */}
            <div className="rounded-2xl border border-gold/45 bg-blush/35 p-5">
              <div className="flex items-start gap-3">
                <Layers
                  className="mt-0.5 h-5 w-5 shrink-0 text-burgundy"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-heading text-sm font-semibold text-burgundy-deep">
                    Practical Engineering Mindset
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/85 text-justify">
                    Understanding how teams handle purchase orders, quotations,
                    spreadsheets, and inventory every day helps me design cleaner
                    APIs and software that immediately fits real workflows.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
