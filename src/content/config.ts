import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    aboutText: z.string().optional(),
    historyText: z.string().optional(),
    visitInfo: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    location: z.string(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['In Progress', 'Completed', 'Planned']),
    startDate: z.date().optional(),
    completedDate: z.date().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Locomotives', 'Rolling Stock', 'Scenery', 'Events', 'Historical']),
    date: z.date().optional(),
    description: z.string().optional(),
    image: z.string(),
  }),
});

export const collections = { pages, events, blog, projects, gallery };
