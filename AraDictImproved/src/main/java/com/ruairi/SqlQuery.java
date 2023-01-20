package com.ruairi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

public class SqlQuery {

    private static final String jdbcUrl = SecretStuff.jdbcUrl.label;
    private static final String sQueryString = "SELECT CONCAT(prefixes.VOC_FORM, stems.VOC_FORM, suffixes.VOC_FORM) AS VOC_FORM, CONCAT(prefixes.GLOSS, ' ',  stems.GLOSS, ' ', suffixes.GLOSS) AS GLOSS, CONCAT(prefixes.POS_NICE, ', ', stems.POS_NICE, ', ', suffixes.POS_NICE) AS POS, stems.ROOT, stems.MEASURE FROM stems INNER JOIN tableAB ON stems.CAT=tableAB.stemCat INNER JOIN prefixes ON tableAB.prefCat=prefixes.CAT INNER JOIN tableBC ON stems.CAT=tableBC.stemCat INNER JOIN suffixes ON tableBC.suffCat=suffixes.CAT WHERE BINARY prefixes.FORM='%1$s' AND BINARY stems.FORM='%2$s' AND BINARY suffixes.FORM='%3$s' AND EXISTS (SELECT * FROM tableAC WHERE tableAC.prefCat=prefixes.CAT AND tableAC.suffCat=suffixes.CAT); ";

    // Method to query for a segment's form(s) in the database
    public static void selectQuery(WordCombination wordCombination) {


        // TODO sql queries need to be case sensitive
        // a search for حول returns results for هول aswell 
        // which is highly undesirable


        // set sql query to be executed
        String sqlSelectQuery = String.format(sQueryString, wordCombination.getPrefix(), wordCombination.getStem(), wordCombination.getSuffix());

        // query the database
        ResultSet rs = queryDatabase(sqlSelectQuery);

        try {
            if (rs.isBeforeFirst()) {

                // iterate through each record returned
                while (rs.next()) {

                    // TODO verbs can return the meaning with the subject before the verb's meaning
                    // e.g. "fan;ventilate;revive he/it <verb>" 
                    // this means that the response must be formatted and the database query should be modified
                    // this format only seems to exist for suffixes

                    // instantiate new solution for every record and add it to the solutions for the
                    // combination
                    WordSolution wordSolution = new WordSolution(rs.getString("VOC_FORM"), rs.getString("GLOSS"),
                            rs.getString("POS"), rs.getString("ROOT"), rs.getString("MEASURE"));


                    wordCombination.setCombinationSolutions(wordSolution);

                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    // method to facilitate communication with database
    public static ResultSet queryDatabase(String queryString) {
        ResultSet rs = null;
        try {
            Connection conn = DriverManager.getConnection(jdbcUrl);
            PreparedStatement ps = conn.prepareStatement(queryString);
            rs = ps.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;
    }

}
