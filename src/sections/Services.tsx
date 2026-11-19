import { servicesData } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { ThanosDustedItem } from '../components/ThanosDustedItem';

interface ServicesProps {
  onSelectService: (subject: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-20 sm:scroll-mt-24 bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="editorial-container">
        <SectionHeading
          eyebrow="Freelance & Consulting"
          title="Practical Software Services Built Around Business Workflows."
          subtitle="Available for freelance projects and technical collaborations focused on Python automation, FastAPI backend systems, custom Mini ERP tools, and reporting dashboards."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ThanosDustedItem key={service.id} id={`service-${service.id}`}>
              <ServiceCard
                service={service}
                index={index}
                onSelectService={onSelectService}
              />
            </ThanosDustedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
