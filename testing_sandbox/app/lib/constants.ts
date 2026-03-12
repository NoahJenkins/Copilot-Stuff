export const NAV_LINKS = [
  { name: 'Who We Are', href: '#about' },
  { name: 'Community', href: '#community' },
  { name: 'Connect', href: '#connect' },
];

export const STATS = [
  { label: 'Members', value: '1+' },
  { label: 'Events Held', value: '0' },
  { label: 'Technologies', value: 'Cloud & AI' },
];

export const TECH_STACK = [
  { category: 'Languages', items: ['JavaScript/TypeScript', 'Python', 'Go'] },
  { category: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'Vercel'] },
  { category: 'DevOps', items: ['Docker', 'Terraform', 'Bicep', 'CI/CD'] },
  { category: 'Mobile & AI', items: ['React Native', 'iOS/Android', 'Machine Learning', 'LLMs', 'OpenAI'] },
];

export const SOCIAL_LINKS = {
  discord: process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/MgSqBDeewC',
  luma: process.env.NEXT_PUBLIC_LUMA_CALENDAR_ID ? `https://lu.ma/${process.env.NEXT_PUBLIC_LUMA_CALENDAR_ID}` : 'https://lu.ma/dfw-cloud-devs', // Fallback or env var
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/dfw-cloud-devs',
  twitter: process.env.NEXT_PUBLIC_X_URL || 'https://x.com/DFWCloudDevs',
};

export const SITE_CONFIG = {
  name: 'DFW Cloud Devs',
  description: 'A networking group for developers and cloud engineers of all backgrounds in DFW Texas to connect, learn best practices, and build awesome software solutions for the Cloud.',
  year: new Date().getFullYear(),
};
