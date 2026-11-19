import { skillCategories } from '../data/skills';
import { SectionHeading } from '../components/SectionHeading';
import { SkillCard } from '../components/SkillCard';

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="editorial-container">
        <SectionHeading
          eyebrow="Technical Capabilities"
          title="Tools, Languages & Enterprise Stack."
          subtitle="A focused engineering toolkit spanning Python backend systems, applied machine learning, React interfaces, and enterprise business automation."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
