package com.ruairi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

public class SqlQuery {

    private String prefix;
    private String stem;
    private String suffix;
    private String wordMeaning;

    private final String jdbcUrl = SecretStuff.jdbcUrl;
    private final String[][] tableColumn = { { "tableAB", "prefCat", "stemCat" },
            { "tableAC", "prefCat", "suffCat" },
            { "tableBC", "stemCat", "suffCat" } };

    public SqlQuery(String prefix, String stem, String suffix) {
        this.prefix = prefix;
        this.stem = stem;
        this.suffix = suffix;
        this.wordMeaning = "";

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
            System.out.println(this.toString());
        }

    }

    // TODO return a value or update instance variable
    // Method to query for a segment's form in the database
    public boolean selectQuery(String tableName, String wrdForm) {

        // set url for sql db and query to be executed
        String sqlSelectQuery = "SELECT * FROM ";
        boolean hasResults = false;

        // TODO add default case
        // use switch statement to check which table to query
        switch (tableName) {
            case "stems":
                sqlSelectQuery += " stems ";
                break;
            case "prefixes":
                sqlSelectQuery += " prefixes ";
                break;
            case "suffixes":
                sqlSelectQuery += " suffixes ";
                break;
        }

        sqlSelectQuery += " WHERE FORM = ?";

        try {
            Connection conn = DriverManager.getConnection(jdbcUrl);
            PreparedStatement ps = conn.prepareStatement(sqlSelectQuery);
            ps.setString(1, wrdForm);

            ResultSet rs = ps.executeQuery();

            if (!rs.isBeforeFirst()) {
                
            } else {

                while (rs.next()) {

                    // TODO do something with this data
                    String vocForm = rs.getString("VOC_FORM");
                    String gloss = rs.getString("GLOSS");
                    String type = rs.getString("CAT");


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

        System.out.println(sqlSelectQuery);

        // connect to database and check if there is a record for this combination
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl);
            PreparedStatement ps = conn.prepareStatement(sqlSelectQuery);

            System.out.println(ps);
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

    public String getWordMeaning() {
        return wordMeaning;
    }

    public void setWordMeaning(String wordMeaning) {
        this.wordMeaning = wordMeaning;
    }

    // toString method
    public String toString() {
        return "Prefix: " + this.prefix + "\nStem: " + this.stem + "\nSuffix: " + this.suffix;
    }

}
