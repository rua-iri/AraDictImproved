package com.rua_iri;

import java.util.ArrayList;

public class WordCombination {

    private String prefix;
    private String stem;
    private String suffix;
    private ArrayList<WordSolution> combinationSolutions;


    public WordCombination(String prefix, String stem, String suffix) {
        this.prefix = prefix;
        this.stem = stem;
        this.suffix = suffix;
        this.combinationSolutions = new ArrayList<WordSolution>();
    }

    // setters and getters
    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getStem() {
        return stem;
    }

    public void setStem(String stem) {
        this.stem = stem;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public ArrayList<WordSolution> getCombinationSolutions() {
        return combinationSolutions;
    }

    public void setCombinationSolutions(WordSolution wS) {
        this.combinationSolutions.add(wS);
    }

    // toString method
    @Override
    public String toString() {
        return "Prefix: " + this.prefix + "\nStem: " + this.stem + "\nSuffix: " + this.suffix;
    }
}
