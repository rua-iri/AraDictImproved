package com.ruairi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

public class SqlQuery {

    // TODO I should probably make a new class for the word
    private String prefix;
    private String stem;
    private String suffix;
    private String[] wordMeaning;
    private String[] vocForm;
    private String preCat;
    private String steCat;
    private String sufCat;

    private final String jdbcUrl = SecretStuff.jdbcUrl.label;
    private final String[][] tableColumn = { { "tableAB", "prefCat", "stemCat" },
            { "tableAC", "prefCat", "suffCat" },
            { "tableBC", "stemCat", "suffCat" } };

    public SqlQuery(String prefix, String stem, String suffix) {
        this.prefix = prefix;
        this.stem = stem;
        this.suffix = suffix;
        this.wordMeaning = new String[3];
        this.vocForm = new String[3];

        // TODO add more instance variables for the word's definition, root etc
    }

    // TODO WRITE THIS!
    // method to run all queries and determine if the combination is valid and what
    // the overall meaning is
    public void runAllQueries() {
        boolean wordExists = selectQuery("prefixes", this.prefix);

        if (wordExists) {
            wordExists = selectQuery("stems", this.stem);
        }

        if (wordExists) {
            wordExists = selectQuery("suffixes", this.suffix);
        }

        if (wordExists) {
            System.out.println("\n\n");
            System.out.println(this.toString());
            System.out.println("\n\n");
        }

    }

    // TODO return a value or update instance variable
    // Method to query for a segment's form in the database
    public boolean selectQuery(String tableName, String wrdForm) {

        // set url for sql db and query to be executed
        String sqlSelectQuery = "SELECT * FROM ";
        boolean hasResults = false;

        // concatenate elements to create sql query
        sqlSelectQuery += " " + tableName + " " + " WHERE FORM = ?";

        // TODO maybe make a separate reusable method for sql queries and return a
        // Results set object

        try {
            Connection conn = DriverManager.getConnection(jdbcUrl);
            PreparedStatement ps = conn.prepareStatement(sqlSelectQuery);
            ps.setString(1, wrdForm);

            ResultSet rs = ps.executeQuery();

            if (rs.isBeforeFirst()) {

                while (rs.next()) {

                    // TODO store this data in instance variables
                    String vocForm = rs.getString("VOC_FORM");
                    String gloss = rs.getString("GLOSS");
                    String type = rs.getString("CAT");

                    if (tableName == "prefixes") {
                        setPreCat(type);
                        setWordMeaning(0, gloss);
                        setVocForm(0, vocForm);

                    } else if (tableName == "stems") {
                        // check prefix-stem valid
                        if (isValidCombination("preste", getPreCat(), type)) {
                            setSteCat(type);
                            setWordMeaning(1, gloss);
                            setVocForm(1, vocForm);

                            break;

                        } else {
                            continue;
                        }

                    } else if (tableName == "suffixes") {
                        // check that both prefix-suffix and stem-suffix are valid
                        if (isValidCombination("presuf", getPreCat(), type)
                                && isValidCombination("stesuf", getSteCat(), type)) {
                            setSufCat(type);
                            setWordMeaning(2, gloss);
                            setVocForm(2, vocForm);

                            continue;

                        } else {
                            continue;
                        }
                    }

                    System.out.println(vocForm + " - " + gloss + " - " + type);
                }
                hasResults = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return hasResults;

    }

    // TODO create method to compare the category for each segment and check if it's
    // a valid combination
    public boolean isValidCombination(String columnCombination, String columnOneData, String columnTwoData) {

        boolean recordExists = false;
        String tableName = "";
        String columnOneName = "";
        String columnTwoName = "";

        // TODO add a default case if that's necessary
        // alter the table and column names depending on what data is being passed
        switch (columnCombination) {
            case "preste":
                tableName = this.tableColumn[0][0];
                columnOneName = this.tableColumn[0][1];
                columnTwoName = this.tableColumn[0][2];
                break;
            case "presuf":
                tableName = this.tableColumn[1][0];
                columnOneName = this.tableColumn[1][1];
                columnTwoName = this.tableColumn[1][2];
                break;
            case "stesuf":
                tableName = this.tableColumn[2][0];
                columnOneName = this.tableColumn[2][1];
                columnTwoName = this.tableColumn[2][2];
                break;
        }

        String sqlSelectQuery = "SELECT * FROM " + tableName + " WHERE " + columnOneName + "='" + columnOneData
                + "' AND " + columnTwoName + "='" + columnTwoData + "';";

        // connect to database and check if there is a record for this combination
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl);
            PreparedStatement ps = conn.prepareStatement(sqlSelectQuery);

            ResultSet rs = ps.executeQuery();

            // return true if record does exist
            if (rs.isBeforeFirst()) {
                recordExists = true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return recordExists;
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

    public String[] getWordMeaning() {
        return wordMeaning;
    }

    public void setWordMeaning(int index, String wordMeaning) {
        this.wordMeaning[index] = wordMeaning;
    }

    public String getPreCat() {
        return preCat;
    }

    public void setPreCat(String preCat) {
        this.preCat = preCat;
    }

    public String getSteCat() {
        return steCat;
    }

    public void setSteCat(String steCat) {
        this.steCat = steCat;
    }

    public String getSufCat() {
        return sufCat;
    }

    public void setSufCat(String sufCat) {
        this.sufCat = sufCat;
    }

    public String[] getVocForm() {
        return vocForm;
    }

    public void setVocForm(int index, String vocForm) {
        this.vocForm[index] = vocForm;
    }

    // toString method
    @Override
    public String toString() {
        return "Prefix: " + this.prefix + "\nStem: " + this.stem + "\nSuffix: " + this.suffix +
                "\nPronunciation: " + this.vocForm[0] + this.vocForm[1] + this.vocForm[2] +
                "\nMeaning: " + this.wordMeaning[0] + this.wordMeaning[1] + this.wordMeaning[2];
    }

}
