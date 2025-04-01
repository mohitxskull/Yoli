import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { Project } from "@/types";
import Loader from "@/components/common/loader";
import ProjectCard from "@/components/common/project_card";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const fetchSavedProjects = async (): Promise<Project[]> => {
  const { data } = await apiClient.get("/cart");
  return data;
};

export default function SavedPage() {
  const router = useRouter();

  const {
    data: savedProjects,
    isLoading,
    isError,
    error,
  } = useQuery<Project[], Error>({
    queryKey: ["savedProjects"],
    queryFn: fetchSavedProjects,
  });

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Saved Projects</h1>

      <div className="mb-5">
        <Button variant="ghost" onClick={() => router.push("/portfolio")}>
          Project
        </Button>
        <Button variant="ghost" onClick={() => router.push("/saved")}>
          Saved
        </Button>
      </div>

      {isLoading && <Loader text="Loading saved projects..." />}
      {isError && (
        <p className="text-red-500">
          Error loading saved projects: {error?.message}
        </p>
      )}
      {!isLoading && !isError && (
        <>
          {savedProjects && savedProjects.length === 0 && (
            <p>You haven&apos;t saved any projects yet.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {savedProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} isSaved={true} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
