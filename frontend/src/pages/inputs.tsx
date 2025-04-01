import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { Project } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/layout";

const projectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

const createProject = async (data: ProjectFormData): Promise<Project> => {
  const payload = {
    ...data,
    imageUrl: data.imageUrl === "" ? undefined : data.imageUrl,
  };
  const response = await apiClient.post("/projects", payload);
  return response.data;
};

export default function InputsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      author: "",
      imageUrl: "",
    },
  });

  const { mutate: submitProject, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      toast.success(`Project "${newProject.title}" created successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      form.reset();
      router.push("/portfolio");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.error("Create project error:", error);
      const message =
        error.response?.data?.message || "Failed to create project";
      toast.error(message);
    },
  });

  function onSubmit(values: ProjectFormData) {
    console.log(values);
    submitProject(values);
  }

  return (
    <Layout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>
            Fill in the details for the new travel project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Amazing Trip to Bali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project details..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Adventure, Relaxing, Cultural"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Link to a representative image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
}
