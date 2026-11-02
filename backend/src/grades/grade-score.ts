export function isGradeWithinMaximum(score: number, maxScore: number): boolean {
  return Number.isFinite(score) &&
    Number.isFinite(maxScore) &&
    maxScore > 0 &&
    score >= 0 &&
    score <= maxScore;
}
