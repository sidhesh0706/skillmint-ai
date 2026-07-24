import type { ToolFormValues } from "@/data/tool-config";

export type BulletScoreBreakdown = {
  clarity: number;
  impact: number;
  specificity: number;
  metrics: number;
  atsKeywordFit: number;
  actionVerbStrength: number;
};

export type BulletScore = {
  score: number;
  reason: string;
  suggestion: string;
  breakdown: BulletScoreBreakdown;
};

export type BulletComparison = {
  original: string;
  improved: string;
  changes: string[];
};

export type ResumeStrengthSummary = {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  nextAction: string;
};

export type ResumeOutput = {
  bullets: string[];
  keywords: string[];
  tips: string[];
  scores: BulletScore[];
  summary: ResumeStrengthSummary;
  missingKeywords: string[];
  actionVerbs: string[];
  whatToAdd: string[];
  comparisons: Record<number, BulletComparison>;
};

export type GenerationHistoryItem = {
  id: string;
  role: string;
  createdAt: string;
  form: ToolFormValues;
  output: ResumeOutput;
};

export type RewriteResult = {
  original: string;
  bullet: string;
  score: BulletScore;
  changes: string[];
};
