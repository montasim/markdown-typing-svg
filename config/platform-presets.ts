import { TypingSVGOptions } from '@/types/options';

export interface PlatformPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  generateCode: (options: TypingSVGOptions) => {
    markdown: string;
    html?: string;
    description: string;
  };
}

export const platformPresets: PlatformPreset[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Standard markdown for GitHub README files',
    icon: '🐙',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `[![Typing SVG](${svgUrl})](https://git.io/typing-svg)`,
        description: 'Copy this markdown code and paste it into your GitHub README.md file.',
      };
    },
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Markdown optimized for GitLab repositories',
    icon: '🦊',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `[![Typing SVG](${svgUrl})](https://git.io/typing-svg)`,
        description: 'Copy this markdown code and paste it into your GitLab README.md file.',
      };
    },
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Direct image link for Discord messages',
    icon: '💬',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: svgUrl,
        description: 'Copy this URL and paste it into Discord. The image will display automatically.',
      };
    },
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'HTML code for Slack messages',
    icon: '📱',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `<${svgUrl}|Typing SVG>`,
        description: 'Copy this code and paste it into Slack. The image will display automatically.',
      };
    },
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Markdown for Notion pages',
    icon: '📝',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `![Typing SVG](${svgUrl})`,
        description: 'Copy this markdown code and paste it into your Notion page.',
      };
    },
  },
  {
    id: 'html',
    name: 'HTML Website',
    description: 'HTML code for websites and blogs',
    icon: '🌐',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `<a href="https://git.io/typing-svg"><img src="${svgUrl}" alt="Typing SVG" /></a>`,
        html: `<a href="https://git.io/typing-svg"><img src="${svgUrl}" alt="Typing SVG" /></a>`,
        description: 'Copy this HTML code and paste it into your website or blog.',
      };
    },
  },
  {
    id: 'markdown',
    name: 'Plain Markdown',
    description: 'Simple markdown image reference',
    icon: '📄',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: `![Typing SVG](${svgUrl})`,
        description: 'Copy this markdown code for use in any markdown-supported platform.',
      };
    },
  },
  {
    id: 'direct-url',
    name: 'Direct URL',
    description: 'Raw image URL for any platform',
    icon: '🔗',
    generateCode: (options) => {
      const svgUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/svg?${new URLSearchParams(options as any).toString()}`
        : '';
      return {
        markdown: svgUrl,
        description: 'Copy this direct URL and use it anywhere that supports image URLs.',
      };
    },
  },
];
