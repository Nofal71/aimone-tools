
import { Tool } from '@/types/tool';

export const aiTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    purpose: 'Conversational AI Assistant',
    description: 'Advanced conversational AI for text generation, coding assistance, and creative writing. Powered by GPT-4 with multimodal capabilities.',
    url: 'https://chat.openai.com',
    category: 'Conversational AI',
    featured: true,
    isPremium: true,
    tags: ['text-generation', 'coding', 'writing', 'conversation']
  },
  {
    id: '2',
    name: 'Midjourney',
    purpose: 'AI Image Generation',
    description: 'Create stunning AI-generated artwork and images from text prompts. High-quality artistic output with various styles.',
    url: 'https://midjourney.com',
    category: 'Image Generation',
    featured: true,
    isPremium: true,
    tags: ['image-generation', 'art', 'creative', 'design']
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    purpose: 'AI Code Assistant',
    description: 'AI-powered code completion and generation. Helps developers write code faster with intelligent suggestions and explanations.',
    url: 'https://github.com/features/copilot',
    category: 'Development',
    featured: true,
    tags: ['coding', 'development', 'programming', 'autocomplete']
  },
  {
    id: '4',
    name: 'Grammarly',
    purpose: 'AI Writing Assistant',
    description: 'Advanced grammar checking, style suggestions, and writing enhancement. Improves clarity, tone, and correctness.',
    url: 'https://grammarly.com',
    category: 'Writing',
    tags: ['writing', 'grammar', 'editing', 'proofreading']
  },
  {
    id: '5',
    name: 'Notion AI',
    purpose: 'AI-Powered Workspace',
    description: 'Intelligent note-taking and workspace with AI writing assistance, content generation, and organization features.',
    url: 'https://notion.so',
    category: 'Productivity',
    tags: ['productivity', 'note-taking', 'writing', 'organization']
  },
  {
    id: '6',
    name: 'Stable Diffusion',
    purpose: 'Open Source Image AI',
    description: 'Open-source text-to-image AI model. Generate high-quality images with complete control over the generation process.',
    url: 'https://stability.ai',
    category: 'Image Generation',
    tags: ['image-generation', 'open-source', 'text-to-image']
  },
  {
    id: '7',
    name: 'Jasper AI',
    purpose: 'AI Content Creation',
    description: 'AI-powered content creation for marketing, blogs, and social media. Specialized in brand voice and marketing copy.',
    url: 'https://jasper.ai',
    category: 'Content Creation',
    isPremium: true,
    tags: ['content-creation', 'marketing', 'copywriting', 'blogging']
  },
  {
    id: '8',
    name: 'Runway ML',
    purpose: 'AI Video Generation',
    description: 'AI-powered video editing and generation tools. Create videos from text, edit with AI, and generate realistic motion.',
    url: 'https://runwayml.com',
    category: 'Video Generation',
    featured: true,
    tags: ['video-generation', 'video-editing', 'creative', 'motion']
  },
  {
    id: '9',
    name: 'Claude',
    purpose: 'AI Assistant',
    description: 'Anthropic\'s AI assistant focused on being helpful, harmless, and honest. Excellent for analysis and reasoning tasks.',
    url: 'https://claude.ai',
    category: 'Conversational AI',
    tags: ['conversation', 'analysis', 'reasoning', 'writing']
  },
  {
    id: '10',
    name: 'Copy.ai',
    purpose: 'AI Copywriting',
    description: 'AI-powered copywriting tool for marketing content, social media posts, emails, and sales copy generation.',
    url: 'https://copy.ai',
    category: 'Content Creation',
    tags: ['copywriting', 'marketing', 'content-creation', 'social-media']
  },
  {
    id: '11',
    name: 'Eleven Labs',
    purpose: 'AI Voice Generation',
    description: 'Advanced AI voice cloning and text-to-speech technology. Create realistic voices for content creation.',
    url: 'https://elevenlabs.io',
    category: 'Audio Generation',
    tags: ['voice-generation', 'text-to-speech', 'audio', 'cloning']
  },
  {
    id: '12',
    name: 'Perplexity AI',
    purpose: 'AI Search Engine',
    description: 'AI-powered search engine that provides accurate answers with sources. Combines search with conversational AI.',
    url: 'https://perplexity.ai',
    category: 'Search',
    tags: ['search', 'research', 'information', 'sources']
  },
  {
    id: '13',
    name: 'Zapier AI',
    purpose: 'AI Automation',
    description: 'Automate workflows with AI. Connect apps and automate repetitive tasks using natural language commands.',
    url: 'https://zapier.com',
    category: 'Automation',
    tags: ['automation', 'workflow', 'integration', 'productivity']
  },
  {
    id: '14',
    name: 'Canva AI',
    purpose: 'AI Design Assistant',
    description: 'AI-powered design tool with automatic design suggestions, background removal, and content generation.',
    url: 'https://canva.com',
    category: 'Design',
    tags: ['design', 'graphics', 'templates', 'creative']
  },
  {
    id: '15',
    name: 'Loom AI',
    purpose: 'AI Video Messaging',
    description: 'AI-enhanced video recording with automatic transcription, summaries, and insights for better communication.',
    url: 'https://loom.com',
    category: 'Video Tools',
    tags: ['video-recording', 'transcription', 'communication', 'summaries']
  }
];

export const categories = [
  'All',
  'Conversational AI',
  'Image Generation',
  'Development',
  'Writing',
  'Productivity',
  'Content Creation',
  'Video Generation',
  'Audio Generation',
  'Search',
  'Automation',
  'Design',
  'Video Tools'
];

export const pricingFilters = [
  'All',
  'Free',
  'Freemium',
  'Paid'
];

export const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'category', label: 'Category' }
];
