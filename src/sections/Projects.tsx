import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { ThanosDustedItem } from '../components/ThanosDustedItem';

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
            <ThanosDustedItem id={`project-${featuredProject.id}`}>
              <ProjectCard project={featuredProject} index={0} />
            </ThanosDustedItem>
          </div>
        )}

        {/* Enterprise Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <ThanosDustedItem key={project.id} id={`project-${project.id}`}>
              <ProjectCard project={project} index={index + 1} />
            </ThanosDustedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
