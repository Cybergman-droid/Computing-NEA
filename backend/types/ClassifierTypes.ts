export type TrainingData = { description: string; category: string };
export type CategoryData = Record<string, number>;
export type WordFrequency = Record<string, number>;
export type CategoryScore = {category:string , totalProbability:number};
