package com.ruairi;

public class WordSolution {

    private String phoneticSpell;
    private String meaning;
    private String tense;
    private String root;
    private String verbForm;

    // constructor method
    public WordSolution(String phoneticSpell, String meaning, String tense, String root, String verbForm) {
        this.setPhoneticSpell(phoneticSpell);
        this.setMeaning(meaning);
        this.setTense(tense);
        this.setRoot(root);
        this.setVerbForm(verbForm);
    }

    // getters and setters
    public String getPhoneticSpell() {
        return phoneticSpell;
    }

    public void setPhoneticSpell(String phoneticSpell) {
        this.phoneticSpell = phoneticSpell;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getTense() {
        return tense;
    }

    public void setTense(String tense) {

        // remove preceding and trailing commas
        String trueTense = tense;
        if(trueTense.charAt(0)==',') {
            trueTense = trueTense.substring(2);
        }
        if(trueTense.charAt(trueTense.length()-2)==',') {
            trueTense = trueTense.substring(0, (trueTense.length()-2));
        }

        this.tense = trueTense;
    }

    public String getRoot() {
        return root;
    }

    public void setRoot(String root) {
        this.root = root;
    }

    public String getVerbForm() {
        return verbForm;
    }

    public void setVerbForm(String verbForm) {
        this.verbForm = verbForm;
    }

    @Override
    public String toString() {
        return "WordSolution [phoneticSpell=" + phoneticSpell + ", meaning=" + meaning + ", tense=" + tense + ", root="
                + root + ", verbForm=" + verbForm + "]";
    }

}
