

class SegmentedWord {
    prefix
    stem
    suffix

    constructor(prefix, stem, suffix) {
        this.prefix = prefix;
        this.stem = stem;
        this.suffix = suffix;
    }
}

class WordSolution {
    phoneticSpelling
    meaning
    tense
    root
    verbForm


    constructor(phoneticSpelling, meaning, tense, root, verbForm) {
        this.phoneticSpelling = phoneticSpelling;
        this.meaning = meaning;
        this.tense = this.setTense(tense);
        this.root = root;
        this.verbForm = verbForm;
    }

    setTense(tense) {
        let trueTense = tense;

        if (trueTense.charAt(0) == ",") {
            trueTense = trueTense.substring(2);
        }

        if (trueTense.length >= 2 && trueTense.charAt(trueTense.length - 2) == ",") {
            trueTense = trueTense.substring(0, trueTense.length - 2);
        }

        return trueTense;
    }

    toDict() {
        return {
            "phoneticSpelling": this.phoneticSpelling,
            "meaning": this.meaning,
            "tense": this.tense,
            "root": this.root,
            "verbForm": this.verbForm
        }
    
    }
}


class WordCombination {

    prefix
    stem
    suffix
    combinationSolutions

    constructor(prefix, stem, suffix) {
        this.prefix = prefix;
        this.stem = stem;
        this.suffix = suffix;
        this.combinationSolutions = []
    }

    addSolution(solution) {
        this.combinationSolutions.push(solution);
    }

}


module.exports = { SegmentedWord, WordSolution, WordCombination };



