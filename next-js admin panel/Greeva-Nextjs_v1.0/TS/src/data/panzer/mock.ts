export type PostStatus = 'draft' | 'published'

export type Post = {
  id: string
  title: string
  slug: string
  status: PostStatus
  publishedAt?: string
  createdAt: string
}

export type Solution = {
  id: string
  title: string
  category: string
  order: number
  status: 'active' | 'inactive'
}

export type Brand = {
  id: string
  name: string
  website?: string
  featured: boolean
}

export type Lead = {
  id: string
  name: string
  email: string
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'
  createdAt: string
}

export type Download = {
  id: string
  title: string
  slug: string
  downloadCount: number
  createdAt: string
}

export type MediaItem = {
  id: string
  filename: string
  type: string
  sizeKb: number
  createdAt: string
}

export type AdminUserRow = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
  active: boolean
}

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'Hardening Express APIs: Security Checklist',
    slug: 'hardening-express-apis-security-checklist',
    status: 'published',
    publishedAt: '2026-05-10T10:20:00Z',
    createdAt: '2026-05-08T12:00:00Z',
  },
  {
    id: 'p2',
    title: 'NoSQL Injection: How to Prevent $ne Attacks',
    slug: 'nosql-injection-prevent-ne-attacks',
    status: 'draft',
    createdAt: '2026-05-18T09:12:00Z',
  },
]

export const MOCK_SOLUTIONS: Solution[] = [
  { id: 's1', title: 'Vulnerability Assessment', category: 'Security', order: 1, status: 'active' },
  { id: 's2', title: 'Penetration Testing', category: 'Security', order: 2, status: 'active' },
  { id: 's3', title: 'SOC Monitoring', category: 'Operations', order: 3, status: 'inactive' },
]

export const MOCK_BRANDS: Brand[] = [
  { id: 'b1', name: 'CrowdStrike', website: 'https://www.crowdstrike.com', featured: true },
  { id: 'b2', name: 'Palo Alto Networks', website: 'https://www.paloaltonetworks.com', featured: false },
]

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'Amit Sharma', email: 'amit@example.com', status: 'new', createdAt: '2026-05-25T06:10:00Z' },
  { id: 'l2', name: 'Sara Khan', email: 'sara@example.com', status: 'contacted', createdAt: '2026-05-24T15:45:00Z' },
]

export const MOCK_DOWNLOADS: Download[] = [
  { id: 'd1', title: 'Zero Trust Whitepaper', slug: 'zero-trust-whitepaper', downloadCount: 128, createdAt: '2026-04-22T11:00:00Z' },
  { id: 'd2', title: 'Ransomware Defense Checklist', slug: 'ransomware-defense-checklist', downloadCount: 89, createdAt: '2026-05-02T11:00:00Z' },
]

export const MOCK_MEDIA: MediaItem[] = [
  { id: 'm1', filename: 'hero-banner.webp', type: 'image/webp', sizeKb: 240, createdAt: '2026-05-01T10:00:00Z' },
  { id: 'm2', filename: 'brochure.pdf', type: 'application/pdf', sizeKb: 1024, createdAt: '2026-05-03T10:00:00Z' },
]

export const MOCK_USERS: AdminUserRow[] = [
  { id: 'u1', name: 'Panzer Admin', email: 'admin@panzer.local', role: 'admin', active: true },
  { id: 'u2', name: 'Content Editor', email: 'editor@panzer.local', role: 'editor', active: true },
]
