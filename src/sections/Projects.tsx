import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';

export function Projects() {
  const featuredProject = projectsData.find((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="scroll-mt-20 sm:scroll-mt-24 border-y border-blush/80 bg-ivory-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="editorial-container">
        <SectionHeading
          eyebrow="Selected Engineering Work"
          title="Enterprise Platforms, AI Systems & Independent Full-Stack ERP."
          subtitle="Production software spanning custom procurement digitalization, automated executive reporting, scaffolding ERP/CRM modules, and AI & IoT computer vision systems."
        />

        {/* Flagship Featured Project */}
        {featuredProject && (
          <div className="mt-12">
            <ProjectCard project={featuredProject} index={0} />
          </div>
        )}

        {/* Enterprise Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
