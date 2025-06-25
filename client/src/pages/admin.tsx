import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { PortfolioContent, Project, InsertPortfolioContent, InsertProject } from "@shared/schema";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'projects'>('hero');

  // Hero content
  const { data: heroContent } = useQuery<PortfolioContent>({
    queryKey: ['/api/portfolio/hero'],
  });

  // About content
  const { data: aboutContent } = useQuery<PortfolioContent>({
    queryKey: ['/api/portfolio/about'],
  });

  // Projects
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Update portfolio content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ section, data }: { section: string; data: InsertPortfolioContent }) => {
      const response = await apiRequest("PUT", `/api/portfolio/${section}`, data);
      return response.json();
    },
    onSuccess: (_, { section }) => {
      queryClient.invalidateQueries({ queryKey: [`/api/portfolio/${section}`] });
      toast({
        title: "Content updated",
        description: "Changes saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Could not save changes",
        variant: "destructive",
      });
    },
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      const response = await apiRequest("POST", "/api/projects", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project created",
        description: "New project added successfully",
      });
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProject> }) => {
      const response = await apiRequest("PUT", `/api/projects/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project updated",
        description: "Changes saved successfully",
      });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/projects/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project deleted",
        description: "Project removed successfully",
      });
    },
  });

  const handleContentUpdate = (section: string, formData: FormData) => {
    const data: InsertPortfolioContent = {
      section,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string,
      metadata: formData.get('metadata') as string,
    };

    updateContentMutation.mutate({ section, data });
  };

  const handleProjectCreate = (formData: FormData) => {
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean);

    const data: InsertProject = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string || null,
      tags,
      githubUrl: formData.get('githubUrl') as string || null,
      demoUrl: formData.get('demoUrl') as string || null,
      featured: formData.get('featured') === 'on',
    };

    createProjectMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Admin</h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {[
            { key: 'hero', label: 'Hero Section' },
            { key: 'about', label: 'About Section' },
            { key: 'projects', label: 'Projects' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-terracotta text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hero Section Editor */}
        {activeTab === 'hero' && (
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleContentUpdate('hero', new FormData(e.currentTarget));
              }} className="space-y-6">
                <div>
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    name="title"
                    defaultValue={heroContent?.title || ''}
                    placeholder="A curious builder-learner"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    name="description"
                    defaultValue={heroContent?.description || ''}
                    placeholder="19 | DS undergrad | Diving into AI/ML..."
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="hero-imageUrl">Image URL (optional)</Label>
                  <Input
                    id="hero-imageUrl"
                    name="imageUrl"
                    defaultValue={heroContent?.imageUrl || ''}
                    placeholder="https://example.com/image.jpg"
                    className="mt-2"
                  />
                </div>

                <Button type="submit" disabled={updateContentMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {updateContentMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* About Section Editor */}
        {activeTab === 'about' && (
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleContentUpdate('about', new FormData(e.currentTarget));
              }} className="space-y-6">
                <div>
                  <Label htmlFor="about-title">Title</Label>
                  <Input
                    id="about-title"
                    name="title"
                    defaultValue={aboutContent?.title || ''}
                    placeholder="My approach"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="about-content">Content</Label>
                  <Textarea
                    id="about-content"
                    name="content"
                    defaultValue={aboutContent?.content || ''}
                    placeholder="I believe the best way to master technology..."
                    className="mt-2"
                    rows={8}
                  />
                </div>

                <div>
                  <Label htmlFor="about-imageUrl">Image URL (optional)</Label>
                  <Input
                    id="about-imageUrl"
                    name="imageUrl"
                    defaultValue={aboutContent?.imageUrl || ''}
                    placeholder="https://example.com/image.jpg"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="about-metadata">Statistics (JSON format)</Label>
                  <Textarea
                    id="about-metadata"
                    name="metadata"
                    defaultValue={aboutContent?.metadata || '{"yearsLearning": "2+", "projectsBuilt": "15+"}'}
                    placeholder='{"yearsLearning": "2+", "projectsBuilt": "15+"}'
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={updateContentMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {updateContentMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Add New Project */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleProjectCreate(new FormData(e.currentTarget));
                  e.currentTarget.reset();
                }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        name="title"
                        required
                        placeholder="Project title"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-imageUrl">Image URL</Label>
                      <Input
                        id="project-imageUrl"
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      name="description"
                      required
                      placeholder="Project description"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-githubUrl">GitHub URL</Label>
                      <Input
                        id="project-githubUrl"
                        name="githubUrl"
                        placeholder="https://github.com/username/repo"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-demoUrl">Demo URL</Label>
                      <Input
                        id="project-demoUrl"
                        name="demoUrl"
                        placeholder="https://demo.example.com"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-tags">Tags (comma-separated)</Label>
                      <Input
                        id="project-tags"
                        name="tags"
                        placeholder="React, TypeScript, Node.js"
                        className="mt-2"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-8">
                      <input
                        type="checkbox"
                        id="project-featured"
                        name="featured"
                        className="rounded"
                      />
                      <Label htmlFor="project-featured">Featured Project</Label>
                    </div>
                  </div>

                  <Button type="submit" disabled={createProjectMutation.isPending}>
                    <Plus className="w-4 h-4 mr-2" />
                    {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Projects */}
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{project.title}</span>
                        {project.featured && (
                          <span className="bg-warm-yellow text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProjectMutation.mutate(project.id)}
                        disabled={deleteProjectMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Description:</strong> {project.description}
                      </div>
                      <div>
                        <strong>Tags:</strong> {project.tags?.join(', ') || 'None'}
                      </div>
                      <div>
                        <strong>GitHub:</strong> {project.githubUrl || 'None'}
                      </div>
                      <div>
                        <strong>Demo:</strong> {project.demoUrl || 'None'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
