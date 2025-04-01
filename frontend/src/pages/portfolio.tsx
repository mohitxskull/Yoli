import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Project } from "@/types";
import Loader from "@/components/common/loader";
import ProjectCard from "@/components/common/project_card";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface ProjectsApiResponse {
  data: Project[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

const fetchProjects = async (
  page = 1,
  limit = 9,
  query = "",
): Promise<ProjectsApiResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (query) {
    params.set("query", query);
  }
  const { data } = await apiClient.get(`/projects?${params.toString()}`);
  return data;
};

const addToCart = async (projectId: number): Promise<{ message: string }> => {
  const { data } = await apiClient.post("/cart", { projectId });
  return data;
};

export default function PortfolioPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: projectsData,
    isLoading,
    isError,
    error,
  } = useQuery<ProjectsApiResponse, Error>({
    queryKey: ["projects", currentPage],
    queryFn: () => fetchProjects(currentPage, 9),
  });

  const { mutate: saveProject, isPending: isSaving } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success(`Project added to saved list!`);
      queryClient.invalidateQueries({
        queryKey: ["savedProjects"],
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error("Save error:", error);
      const message = error.response?.data?.message || "Failed to save project";
      toast.error(message);
    },
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (projectsData?.meta.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Portfolio</h1>

      <div className="mb-5">
        <Button variant="ghost" onClick={() => router.push("/portfolio")}>
          Project
        </Button>
        <Button variant="ghost" onClick={() => router.push("/saved")}>Saved</Button>
      </div>

      {isLoading && <Loader text="Loading projects..." />}
      {isError && (
        <p className="text-red-500">Error loading projects: {error?.message}</p>
      )}

      {!isLoading && !isError && (
        <>
          {projectsData && projectsData.data.length === 0 && (
            <p>No projects available yet.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projectsData?.data.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAddToCart={() => saveProject(project.id)}
                isAddingToCart={isSaving}
              />
            ))}
          </div>

          {projectsData && projectsData.meta.totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    aria-disabled={currentPage <= 1}
                    tabIndex={currentPage <= 1 ? -1 : undefined}
                    className={
                      currentPage <= 1
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>

                {[...Array(projectsData.meta.totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === projectsData.meta.totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (pageNum === currentPage - 2 && currentPage > 3) ||
                    (pageNum === currentPage + 2 &&
                      currentPage < projectsData.meta.totalPages - 2)
                  ) {
                    // Show ellipsis
                    return (
                      <PaginationItem key={`ellipsis-${pageNum}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    aria-disabled={currentPage >= projectsData.meta.totalPages}
                    tabIndex={
                      currentPage >= projectsData.meta.totalPages
                        ? -1
                        : undefined
                    }
                    className={
                      currentPage >= projectsData.meta.totalPages
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </Layout>
  );
}
