package com.ruairi;

import java.util.HashSet;
import com.google.common.collect.BiMap;


public class WordAnalyser {

	public static BiMap<Character, Character> letterMap;


	// TODO main method not necessary, just for testing, should be removed
	public static void main(String[] args) {

		// fill map with arabic->english letters
		letterMap = createLetterMap(letterMap);

		String aWord = "يتكلم";
		System.out.println(transliterateWordAr(aWord));


        // HashSet<SegmentedWord> segments = segmentWord("ktab");

        // for(SegmentedWord s: segments) {
        //     System.out.println("prefix - " + s.getPrefix());
        //     System.out.println("stem - " + s.getStem());
        //     System.out.println("suffix - " + s.getSuffix());
        //     System.out.println("\n");
        // }

		// TODO parse the original file and store the arabic letters -> english letters in a bidirectional map


    }


	/**
	 * method to create map used in transliteration
	 * 
	 * @param chrMap
	 * @return chrMap bimap of arabic letter -> english letter
	 */
	private static BiMap<Character, Character> createLetterMap(BiMap<Character, Character> chrMap) {
		chrMap.put('ء', '\''); //\u0621 : ARABIC LETTER HAMZA
		chrMap.put('آ', '|'); //\u0622 : ARABIC LETTER ALEF WITH MADDA ABOVE
		chrMap.put('أ', '>'); //\u0623 : ARABIC LETTER ALEF WITH HAMZA ABOVE
		chrMap.put('ؤ', '&'); //\u0624 : ARABIC LETTER WAW WITH HAMZA ABOVE
		chrMap.put('إ', '<'); //\u0625 : ARABIC LETTER ALEF WITH HAMZA BELOW
		chrMap.put('ئ', '}'); //\u0626 : ARABIC LETTER YEH WITH HAMZA ABOVE
		chrMap.put('ا', 'A'); //\u0627 : ARABIC LETTER ALEF
		chrMap.put('ب', 'b'); //\u0628 : ARABIC LETTER BEH
		chrMap.put('ة', 'p'); //\u0629 : ARABIC LETTER TEH MARBUTA
		chrMap.put('ت', 't'); //\u062A : ARABIC LETTER TEH
		chrMap.put('ث', 'v'); //\u062B : ARABIC LETTER THEH
		chrMap.put('ج', 'j'); //\u062C : ARABIC LETTER JEEM
		chrMap.put('ح', 'H'); //\u062D : ARABIC LETTER HAH
		chrMap.put('خ', 'x'); //\u062E : ARABIC LETTER KHAH
		chrMap.put('د', 'd'); //\u062F : ARABIC LETTER DAL
		chrMap.put('ذ', '*'); //\u0630 : ARABIC LETTER THAL
		chrMap.put('ر', 'r'); //\u0631 : ARABIC LETTER REH
		chrMap.put('ز', 'z'); //\u0632 : ARABIC LETTER ZAIN
		chrMap.put('س', 's'); //\u0633 : ARABIC LETTER SEEN
		chrMap.put('ش', '$'); //\u0634 : ARABIC LETTER SHEEN
		chrMap.put('ص', 'S'); //\u0635 : ARABIC LETTER SAD
		chrMap.put('ض', 'D'); //\u0636 : ARABIC LETTER DAD
		chrMap.put('ط', 'T'); //\u0637 : ARABIC LETTER TAH
		chrMap.put('ظ', 'Z'); //\u0638 : ARABIC LETTER ZAH
		chrMap.put('ع', 'E'); //\u0639 : ARABIC LETTER AIN
		chrMap.put('غ', 'g'); //\u063A : ARABIC LETTER GHAIN		
		chrMap.put('ـ', '_'); //\u0640 : ARABIC TATWEEL
		chrMap.put('ف', 'f'); //\u0641 : ARABIC LETTER FEH
		chrMap.put('ق', 'q'); //\u0642 : ARABIC LETTER QAF
		chrMap.put('ك', 'k'); //\u0643 : ARABIC LETTER KAF
		chrMap.put('ل', 'l'); //\u0644 : ARABIC LETTER LAM
		chrMap.put('م', 'm'); //\u0645 : ARABIC LETTER MEEM
		chrMap.put('ن', 'n'); //\u0646 : ARABIC LETTER NOON
		chrMap.put('ه', 'h'); //\u0647 : ARABIC LETTER HEH
		chrMap.put('و', 'w'); //\u0648 : ARABIC LETTER WAW
		chrMap.put('ى', 'Y'); //\u0649 : ARABIC LETTER ALEF MAKSURA
		chrMap.put('ي', 'y'); //\u064A : ARABIC LETTER YEH
		chrMap.put('ً', 'F'); //\u064B : ARABIC FATHATAN
		chrMap.put('ٌ', 'N'); //\u064C : ARABIC DAMMATAN
		chrMap.put('ٍ', 'K'); //\u064D : ARABIC KASRATAN
		chrMap.put('َ', 'a'); //\u064E : ARABIC FATHA
		chrMap.put('ُ', 'u'); //\u064F : ARABIC DAMMA
		chrMap.put('ِ', 'i'); //\u0650 : ARABIC KASRA
		chrMap.put('ّ', '~'); //\u0651 : ARABIC SHADDA
		chrMap.put('ْ', 'o'); //\u0652 : ARABIC SUKUN		
		chrMap.put('ٰ', '`'); //\u0670 : ARABIC LETTER SUPERSCRIPT ALEF
		chrMap.put('ٱ', '{'); //\u0671 : ARABIC LETTER ALEF WASLA
		chrMap.put('پ', 'P'); //\u067E : ARABIC LETTER PEH
		chrMap.put('چ', 'J'); //\u0686 : ARABIC LETTER TCHEH
		chrMap.put('ڤ', 'V'); //\u06A4 : ARABIC LETTER VEH
		chrMap.put('گ', 'G'); //\u06AF : ARABIC LETTER GAF
		chrMap.put('ژ', 'R'); //\u0698 : ARABIC LETTER JEH (no more in Buckwalter system)
		chrMap.put('،', ','); //\u060C : ARABIC COMMA
		chrMap.put('؛', ';'); //\u061B : ARABIC SEMICOLON
		chrMap.put('؟', '?'); //\u061F : ARABIC QUESTION MARK

		//Not significant for morphological analysis
		chrMap.put('ـ', null); //\u0640 : ARABIC TATWEEL
		chrMap.put('ٹ', null); //\u0679 : ARABIC LETTER TTEH
		chrMap.put('ڈ', null); //\u0688 : ARABIC LETTER DDAL
		chrMap.put('ک', null); //\u06A9 : ARABIC LETTER KEHEH
		chrMap.put('ڑ', null); //\u0691 : ARABIC LETTER RREH
		chrMap.put('ں', null); //\u06BA : ARABIC LETTER NOON GHUNNA
		chrMap.put('ھ', null); //\u06BE : ARABIC LETTER HEH DOACHASHMEE
		chrMap.put('ہ', null); //\u06C1 : ARABIC LETTER HEH GOAL
		chrMap.put('ے', null); //\u06D2 : ARABIC LETTER YEH BARREE
		//Not suitable for morphological analysis : remove all vowels/diacritics, i.e. undo the job !
		
		// TODO replace these characters ("[FNKaui~o]", "");
		// TODO IDK remove these too("[`\\{]", "");

		return chrMap;
	}


	private static String transliterateWordAr(String enWord) {
		String araWord = "";

		for(int i=0; i<enWord.length(); i++) {
			araWord += letterMap.get(enWord.charAt(i));
		}

		return araWord;
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