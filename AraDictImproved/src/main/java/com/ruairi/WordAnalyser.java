package com.ruairi;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class WordAnalyser {

	// method to run the word analyser
	public static List<WordSolution> runAnalyser(String aWord) {

		// remove harakat from the word if they are written
		aWord = removeDiacritics(aWord);

		// declare list of solutions to be returned
		List<WordSolution> solutionList = new ArrayList<WordSolution>();

		// create a list of all possible segments
		HashSet<SegmentedWord> segments = segmentWord(aWord);

		// Iterate through each possible segment combination
		for (SegmentedWord s : segments) {

			String pFix = s.getPrefix();
			String sTem = s.getStem();
			String sFix = s.getSuffix();

			WordCombination wordCombination = new WordCombination(pFix, sTem, sFix);
			SqlQuery.selectQuery(wordCombination);

			// iterate through each solution found
			for (WordSolution ws : wordCombination.getCombinationSolutions()) {
				// add solutions to the list
				solutionList.add(ws);
			}

		}

		// return the complete list of solutions
		return solutionList;
	}

	// Remove all short vowels from the word so that the
	// database can be queried without issue
	private static String removeDiacritics(String araWord) {

		araWord = araWord.replaceAll("َ", "");
		araWord = araWord.replaceAll("ً", "");
		araWord = araWord.replaceAll("ُ", "");
		araWord = araWord.replaceAll("ٌ", "");
		araWord = araWord.replaceAll("ِ", "");
		araWord = araWord.replaceAll("ٍ", "");
		araWord = araWord.replaceAll("ْ", "");
		araWord = araWord.replaceAll("ّ", "");

		return araWord;
	}

	/**
	 * Splits a word in prefix + stem + suffix combinations. find all possible
	 * combinations to make up word
	 * 
	 * @return The list of combinations
	 * @param translitered The word. It is assumed that
	 *                     {@link #romanizeWord(String word) romanizeWord} has been
	 *                     called before
	 */
	private static HashSet<SegmentedWord> segmentWord(String translitered) {
		HashSet<SegmentedWord> segmented = new HashSet<SegmentedWord>();
		int prefix_len = 0;
		int suffix_len = 0;
		while ((prefix_len) <= 4 && (prefix_len <= translitered.length())) {
			String prefix = translitered.substring(0, prefix_len);
			int stem_len = (translitered.length() - prefix_len);
			suffix_len = 0;
			while ((stem_len >= 1) && (suffix_len <= 6)) {
				String stem = translitered.substring(prefix_len, prefix_len + stem_len);
				String suffix = translitered.substring(prefix_len + stem_len, prefix_len + stem_len + suffix_len);
				segmented.add(new SegmentedWord(prefix, stem, suffix));
				stem_len--;
				suffix_len++;
			}
			prefix_len++;
		}
		return segmented;
	}

	private static class SegmentedWord {

		private String prefix;
		private String stem;
		private String suffix;

		protected SegmentedWord(String prefix, String stem, String suffix) {
			this.prefix = prefix;
			this.stem = stem;
			this.suffix = suffix;
		}

		protected String getPrefix() {
			return this.prefix;
		}

		protected String getStem() {
			return this.stem;
		}

		protected String getSuffix() {
			return this.suffix;
		}
	}

}