package com.ruairi;

import java.util.HashSet;


public class WordAnalyser {


	// TODO main method not necessary, just for testing, should be removed
	public static void main(String[] args) {

        HashSet<SegmentedWord> segments = segmentWord("ktab");

        for(SegmentedWord s: segments) {
            System.out.println("prefix - " + s.getPrefix());
            System.out.println("stem - " + s.getStem());
            System.out.println("suffix - " + s.getSuffix());
            System.out.println("\n");
        }

    }



    /** Splits a word in prefix + stem + suffix combinations. find all possible combinations to make up word
	 * @return The list of combinations
	 * @param translitered The word. It is assumed that {@link #romanizeWord(String word) romanizeWord} has been called before
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
		
		protected String getPrefix() { return this.prefix; }
		protected String getStem() { return this.stem; }
		protected String getSuffix() { return this.suffix; }
	}



}