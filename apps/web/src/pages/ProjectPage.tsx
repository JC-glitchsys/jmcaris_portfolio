import { useEffect } from "react";
import { ArrowLeft, Layers3 } from "lucide-react";

import BentoGallery from "@/components/gallery/BentoGallery";
import SectionHeader, { Accent } from "@/components/sections/SectionHeader";
import type { ProjectPage as ProjectPageData } from "@/data/project-pages";

export default function ProjectPage({ page }: { page: ProjectPageData }) {
  useEffect(() => {
    document.title = `${page.title} | jmcaris.dev`;
  }, [page.title]);

  return (
    <section aria-labelledby="page-heading" className="py-10 sm:py-14">
      <a
        href="/#projects"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-700"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to portfolio
      </a>

      <SectionHeader
        id="page-heading"
        icon={Layers3}
        eyebrow="Creative Space"
        title={
          <>
            {page.titleLead}
            <Accent>{page.titleAccent}</Accent>
          </>
        }
        subtitle={page.description}
        className="mb-10 mt-8"
      />

      <BentoGallery items={page.items} />

      <p className="mt-14 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </section>
  );
}