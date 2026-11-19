export type NavSectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'services'
  | 'contact';

export interface ProfileData {
  name: string;
  initials: string;
  introLabel: string;
  heroTitle: string;
  identityLine: string;
  supportingStatement: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  existingPortfolio: string;
  resumePath: string;
  profileImagePath: string;
  summary: string[];
  aboutHeading: string;
  aboutHighlights: {
    label: string;
    value: string;
    detail: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    cgpa: string;
  };
  certifications: {
    title: string;
    issuer: string;
    duration: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  duration: string;
  isCurrent: boolean;
  focusTag: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

export type SkillIconName =
  | 'code'
  | 'server'
  | 'brain'
  | 'layout'
  | 'building'
  | 'wrench';

export type SuperheroLogoType =
  | 'arc-reactor'
  | 'batman'
  | 'captain-shield'
  | 'spider'
  | 'wakanda';

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: SkillIconName;
  heroTag?: string;
  heroLogo?: SuperheroLogoType;
  skills: string[];
}

export type ProjectVisualType =
  | 'procurement-erp'
  | 'ai-report-automation'
  | 'scaffolding-erp'
  | 'smart-parking';

export interface CaseStudyChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectModule {
  name: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  organization?: string;
  role: string;
  featured?: boolean;
  heroLogo?: SuperheroLogoType;
  heroCodename?: string;
  heroTagline?: string;
  visualType: ProjectVisualType;
  shortDescription: string;
  problem: string;
  contribution: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  liveUrlNote?: string;
  caseStudy: {
    overview: string;
    businessContext: string;
    problemStatement: string[];
    objectives: string[];
    independentContribution: string[];
    modules?: ProjectModule[];
    architectureLayers: {
      layer: string;
      technology: string;
      responsibility: string;
    }[];
    challengesAndSolutions: CaseStudyChallenge[];
    keyLearnings: string[];
  };
}

export type ServiceIconName =
  | 'workflow'
  | 'server'
  | 'layers'
  | 'sparkles'
  | 'bar-chart';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  icon: ServiceIconName;
  inquirySubject: string;
}
