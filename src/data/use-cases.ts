import { Question, Recommendation } from '@/types'

export const questions: Question[] = [
  {
    id: 'primary_use',
    text: 'What will you mainly use AI for?',
    options: [
      { value: 'coding', label: 'Coding & development', description: 'Writing code, debugging, code review' },
      { value: 'writing', label: 'Writing & content', description: 'Emails, essays, creative writing' },
      { value: 'research', label: 'Research & analysis', description: 'Summarising documents, fact-finding' },
      { value: 'agents', label: 'Autonomous agents', description: 'Multi-step tasks, agentic workflows' },
    ],
  },
  {
    id: 'budget',
    text: 'What is your monthly budget?',
    options: [
      { value: 'free', label: 'Free only', description: 'No spend at all' },
      { value: 'low', label: 'Under $25/month' },
      { value: 'mid', label: '$25–$100/month' },
      { value: 'high', label: 'Over $100/month' },
    ],
  },
  {
    id: 'technical',
    text: 'How technical are you?',
    options: [
      { value: 'beginner', label: 'Beginner', description: 'I just want a simple chat interface' },
      { value: 'intermediate', label: 'Intermediate', description: 'I use AI tools regularly' },
      { value: 'advanced', label: 'Advanced', description: 'I use APIs and build with AI' },
    ],
  },
]

export const recommendations: Recommendation[] = [
  {
    conditions: { primary_use: 'coding', budget: 'low' },
    recommendedPlan: 'Claude Pro',
    reasoning: 'Claude 3.5 Sonnet leads coding benchmarks with a 93.7% HumanEval score and a 200K context window that handles large codebases. At $20/month it is the best value for developers.',
    alternatives: ['ChatGPT Plus', 'GitHub Copilot Individual'],
  },
  {
    conditions: { primary_use: 'coding', budget: 'free', technical: 'advanced' },
    recommendedPlan: 'Llama 3.3 70B (self-hosted)',
    reasoning: 'If you have the hardware, Llama 3.3 70B is free, private, and competitive with paid models for coding tasks.',
    alternatives: ['Claude.ai free tier', 'ChatGPT free tier'],
  },
  {
    conditions: { primary_use: 'coding', budget: 'mid' },
    recommendedPlan: 'Claude Team',
    reasoning: 'Claude Team gives you extra usage and collaboration features without the huge jump to $200/month. Still the best coding model at $25/user.',
    alternatives: ['ChatGPT Plus + GitHub Copilot', 'ChatGPT Pro'],
  },
  {
    conditions: { primary_use: 'agents', budget: 'low' },
    recommendedPlan: 'Claude Pro',
    reasoning: "Claude's 200K context window and strong instruction-following make it the top pick for agentic workflows that need to reason over long chains of steps.",
    alternatives: ['ChatGPT Plus'],
  },
  {
    conditions: { primary_use: 'agents', budget: 'mid' },
    recommendedPlan: 'Claude Team',
    reasoning: 'For agent-heavy workloads, Claude Team provides the extra capacity you need without the $200/month ChatGPT Pro price. Claude agents excel at multi-step reasoning.',
    alternatives: ['ChatGPT Pro'],
  },
  {
    conditions: { primary_use: 'writing', budget: 'low' },
    recommendedPlan: 'ChatGPT Plus',
    reasoning: 'GPT-4o excels at writing tasks and ChatGPT Plus bundles image generation (DALL·E 3), making it excellent value for content creators.',
    alternatives: ['Claude Pro'],
  },
  {
    conditions: { primary_use: 'research', budget: 'low' },
    recommendedPlan: 'Gemini Advanced',
    reasoning: "Gemini 1.5 Pro's 2M token context window is unmatched for long-document research. The Google Workspace integration is a bonus for existing Google users.",
    alternatives: ['Claude Pro', 'ChatGPT Plus'],
  },
  {
    conditions: { primary_use: 'research', budget: 'mid' },
    recommendedPlan: 'ChatGPT Pro',
    reasoning: 'For serious research, ChatGPT Pro unlocks o1 with deep reasoning (92.3% MMLU, 75.7% GPQA) — far ahead on scientific and mathematical benchmarks.',
    alternatives: ['Gemini Advanced + API credits', 'Claude Team'],
  },
  {
    conditions: { budget: 'free' },
    recommendedPlan: 'Claude.ai free tier',
    reasoning: "Claude's free tier provides access to Claude 3.5 Haiku with generous daily limits — the best free AI assistant for most users.",
    alternatives: ['ChatGPT free tier', 'Gemini free tier'],
  },
]
