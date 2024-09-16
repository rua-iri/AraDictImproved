package com.rua_iri;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.ResultSet;

public class SqlQuery {

    private static final String sQueryString = "SELECT DISTINCT CONCAT(prefixes.VOC_FORM, stems.VOC_FORM, suffixes.VOC_FORM) AS VOC_FORM, prefixes.GLOSS AS PRE_GLOSS, stems.GLOSS AS STE_GLOSS, suffixes.GLOSS AS SUF_GLOSS, CONCAT(prefixes.POS_NICE, ', ', stems.POS_NICE, ', ', suffixes.POS_NICE) AS POS, stems.ROOT, stems.MEASURE FROM stems INNER JOIN tableAB ON stems.CAT_ID=tableAB.stemCatId INNER JOIN prefixes ON tableAB.prefCatID=prefixes.CAT_ID INNER JOIN tableBC ON stems.CAT_ID=tableBC.stemCatID INNER JOIN suffixes ON tableBC.suffCatID=suffixes.CAT_ID WHERE BINARY prefixes.FORM='%1$s' AND BINARY stems.FORM='%2$s' AND BINARY suffixes.FORM='%3$s' AND EXISTS (SELECT * FROM tableAC WHERE tableAC.prefCatID=prefixes.CAT_ID AND tableAC.suffCatID=suffixes.CAT_ID); ";

    // Method to query for a segment's form(s) in the database
    public static void selectQuery(WordCombination wordCombination) {

        // set sql query to be executed
        String sqlSelectQuery = String.format(sQueryString, wordCombination.getPrefix(), wordCombination.getStem(),
                wordCombination.getSuffix());

        // query the database
        ResultSet rs = queryDatabase(sqlSelectQuery);

        try {
            if (rs.isBeforeFirst()) {

                // iterate through each record returned
                while (rs.next()) {

                    String glossMeaning = rs.getString("PRE_GLOSS");

                    // if <verb> is in the results returned then replace it with the stem's meaning
                    if (rs.getString("SUF_GLOSS").contains("<verb>")) {
                        glossMeaning += " " + rs.getString("SUF_GLOSS");
                        glossMeaning = glossMeaning.replaceAll("<verb>", rs.getString("STE_GLOSS"));
                    } else {
                        glossMeaning += " " + rs.getString("STE_GLOSS") + " " + rs.getString("SUF_GLOSS");
                    }

                    // instantiate new solution for every record and add it to the solutions for the
                    // combination
                    WordSolution wordSolution = new WordSolution(rs.getString("VOC_FORM"), glossMeaning,
                            rs.getString("POS"), rs.getString("ROOT"), rs.getString("MEASURE"));

                    // add the solution
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

            Dotenv dotenv = null;
            dotenv = Dotenv.configure().load();

            String connString = "jdbc:mysql://localhost:%s/%s?user=%s&password=%s";
            connString = String.format(connString,
                    dotenv.get("DB_PORT"),
                    dotenv.get("DB_NAME"),
                    dotenv.get("DB_USER"),
                    dotenv.get("DB_PASSWORD"));

            Connection conn = DriverManager.getConnection(connString);
            PreparedStatement ps = conn.prepareStatement(queryString);
            rs = ps.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;
    }

}
