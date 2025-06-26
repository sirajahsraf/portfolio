import {
  users,
  contacts,
  portfolioContent,
  projects,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type PortfolioContent,
  type InsertPortfolioContent,
  type Project,
  type InsertProject
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  updatePortfolioContent(content: InsertPortfolioContent): Promise<PortfolioContent>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private portfolioContent: Map<string, PortfolioContent>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentContactId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.portfolioContent = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentProjectId = 1;

    // Initialize with default content
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    // Hero section content
    this.portfolioContent.set('hero', {
      id: 1,
      section: 'hero',
      title: 'A curious Builder-learner',
      description: '19 | DS undergrad | Diving into AI/ML, Code & startups |\n learning-failing-building software.',
      content: null,
      imageUrl: null,
      metadata: null,
      updatedAt: new Date()
    });

    // About section content
    this.portfolioContent.set('about', {
      id: 2,
      section: 'about',
      title: 'My approach',
      description: 'I believe the best way to master technology is by building real solutions to real problems.',
      content: `I believe the best way to master technology is by building real solutions to real problems.
      Every project teaches me something new, every bug teaches me patience, and every success
      fuels my curiosity for the next challenge.

      Currently exploring the intersection of AI/ML and web development, creating tools that make
      complex data accessible and meaningful. I'm particularly drawn to projects that have social
      impact and push the boundaries of what's possible.`,
      imageUrl: null,
      metadata: JSON.stringify({ yearsLearning: '2+', projectsBuilt: '15+' }),
      updatedAt: new Date()
    });

    // Initialize sample projects
    this.projects.set(1, {
      id: 1,
      title: 'Smart Study Planner',
      description: 'AI-powered study scheduler that adapts to learning patterns and optimizes study sessions for maximum retention.',
      imageUrl: null,
      tags: ['React', 'OpenAI', 'Python'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      createdAt: new Date()
    });

    this.projects.set(2, {
      id: 2,
      title: 'Campus Connect',
      description: 'Social platform connecting students based on shared interests, study groups, and collaborative projects.',
      imageUrl: null,
      tags: ['Next.js', 'Socket.io', 'PostgreSQL'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      createdAt: new Date()
    });

    this.projects.set(3, {
      id: 3,
      title: 'Data Story Visualizer',
      description: 'Interactive tool that transforms complex datasets into compelling visual narratives for better understanding.',
      imageUrl: null,
      tags: ['D3.js', 'Python', 'FastAPI'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      createdAt: new Date()
    });

    this.currentProjectId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password
    };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      id,
      name: insertContact.name,
      email: insertContact.email,
      projectType: insertContact.projectType,
      message: insertContact.message,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    return this.portfolioContent.get(section);
  }

  async updatePortfolioContent(content: InsertPortfolioContent): Promise<PortfolioContent> {
    const existing = this.portfolioContent.get(content.section);
    const updated: PortfolioContent = {
      id: existing?.id || Date.now(),
      section: content.section,
      title: content.title || null,
      description: content.description || null,
      content: content.content || null,
      imageUrl: content.imageUrl || null,
      metadata: content.metadata || null,
      updatedAt: new Date()
    };
    this.portfolioContent.set(content.section, updated);
    return updated;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = {
      id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || null,
      tags: Array.isArray(project.tags) ? project.tags : project.tags ? [project.tags] : null,
      githubUrl: project.githubUrl || null,
      demoUrl: project.demoUrl || null,
      featured: project.featured ?? false,
      createdAt: new Date()
    };
// ... continuing from line 200
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing) {
      throw new Error(`Project with id ${id} not found`);
    }

    const updated: Project = {
      ...existing,
      ...project,
      tags: Array.isArray(project.tags)
        ? project.tags
        : project.tags
        ? [project.tags]
        : existing.tags,
      id, // Ensure id doesn't change
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    if (!this.projects.has(id)) {
      throw new Error(`Project with id ${id} not found`);
    }
    this.projects.delete(id);
  }
}

export const storage = new MemStorage();
