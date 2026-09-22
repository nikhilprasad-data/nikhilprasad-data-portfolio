// src/app/page.tsx
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/hero/Hero';
import AboutSection from '@/components/about/AboutSection';
import ProjectShowcase from '@/components/projects/ProjectShowcase';
import SkillsSection from '@/components/skills/SkillsSection';
import EducationSection from '@/components/education/EducationSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';
import GitHubSection from '@/components/github/GitHubSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectShowcase />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
