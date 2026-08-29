export interface WordMeaning {
  phoneticSpelling: string;
  root: string;
  meaning: string;
  tense: string;
  verbForm: string;
}

export interface RootMeaning {
  meaning: string;
  word: string;
}

export interface HistoryWord {
  word: string;
  timestamp: number;
}
