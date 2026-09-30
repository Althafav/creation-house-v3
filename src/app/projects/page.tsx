import CTASection from "@/components/homepage/CTASection";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import PageBanner from "@/components/ui/PageBanner";
import { getPageElements, getPageMetadata } from "@/modules/seo";


export function generateMetadata() {
  return getPageMetadata("previous_projects_page", "/projects", {
    title: "Our Projects", description:
      "Selected exhibition stands and events delivered by Creation House across Dubai and the UAE.",
  });
}

export default async function ProjectsPage() {
  const pageData = await getPageElements("previous_projects_page");

  const projects: any[] = [
    ...(pageData.previousprojectsitems?.linkedItems ?? []),
  ].reverse();

  return (
    <div className="page-bg relative overflow-x-clip">
      <PageBanner
        title={pageData.bannerheading?.value || "Our Projects"}
        breadcrumbs={[{ label: "Projects" }]}
      />
      <ProjectsGrid projects={projects} />

      {/* <Process /> */}
      <div className="container mx-auto">
        <CTASection />
      </div>
    </div>
  );
}

export const revalidate = 30;
