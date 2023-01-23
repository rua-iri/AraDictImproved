package com.ruairi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

public class SqlQuery {

    private static final String jdbcUrl = SecretStuff.jdbcUrl.label;
    private static final String sQueryString = "SELECT CONCAT(prefixes.VOC_FORM, stems.VOC_FORM, suffixes.VOC_FORM) AS VOC_FORM, prefixes.GLOSS AS PRE_GLOSS, stems.GLOSS AS STE_GLOSS, suffixes.GLOSS AS SUF_GLOSS, CONCAT(prefixes.POS_NICE, ', ', stems.POS_NICE, ', ', suffixes.POS_NICE) AS POS, stems.ROOT, stems.MEASURE FROM stems INNER JOIN tableAB ON stems.CAT=tableAB.stemCat INNER JOIN prefixes ON tableAB.prefCat=prefixes.CAT INNER JOIN tableBC ON stems.CAT=tableBC.stemCat INNER JOIN suffixes ON tableBC.suffCat=suffixes.CAT WHERE BINARY prefixes.FORM='%1$s' AND BINARY stems.FORM='%2$s' AND BINARY suffixes.FORM='%3$s' AND EXISTS (SELECT * FROM tableAC WHERE tableAC.prefCat=prefixes.CAT AND tableAC.suffCat=suffixes.CAT); ";

    // Method to query for a segment's form(s) in the database
    public static void selectQuery(WordCombination wordCombination) {

        boolean isUnique;

        // set sql query to be executed
        String sqlSelectQuery = String.format(sQueryString, wordCombination.getPrefix(), wordCombination.getStem(),
                wordCombination.getSuffix());

        // query the database
        ResultSet rs = queryDatabase(sqlSelectQuery);

        try {
            if (rs.isBeforeFirst()) {

                // iterate through each record returned
                while (rs.next()) {

                    // Reset isUnique to true for each iteration
                    isUnique = true;

                    String glossMeaning = rs.getString("PRE_GLOSS");

                    // if <verb> is in the results returned then replace it with the stem's meaning
                    if(rs.getString("SUF_GLOSS").contains("<verb>")) {
                        glossMeaning += rs.getString("SUF_GLOSS");
                        glossMeaning = glossMeaning.replaceAll("<verb>", rs.getString("STE_GLOSS"));
                    } else {
                        glossMeaning += rs.getString("STE_GLOSS") + rs.getString("SUF_GLOSS");
                    }


                    // instantiate new solution for every record and add it to the solutions for the
                    // combination
                    WordSolution wordSolution = new WordSolution(rs.getString("VOC_FORM"), glossMeaning,
                            rs.getString("POS"), rs.getString("ROOT"), rs.getString("MEASURE"));

                    
                    // Check if the solution is unique
                    for (WordSolution wSol : wordCombination.getCombinationSolutions()) {
                        if (wordSolution.toString().equals(wSol.toString())) {
                            isUnique = false;
                        }
                    }

                    // only add the solution if it is unique
                    if (isUnique) {
                        wordCombination.setCombinationSolutions(wordSolution);
                    }

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
