import { experienceData } from '../data/experience';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { SectionHeading } from '../components/SectionHeading';

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 sm:scroll-mt-24 border-y border-blush/80 bg-ivory-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="editorial-container">
        <SectionHeading
          eyebrow="Career Timeline"
          title="Experience Across AI Engineering & Business Systems."
          subtitle="From building enterprise AI platforms and FastAPI backends to independently developing a full-stack procurement Mini ERP inside daily business operations."
        />

        <div className="mt-12">
          <ExperienceTimeline items={experienceData} />
        </div>
      </div>
    </section>
  );
}
