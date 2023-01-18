package com.ruairi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import java.sql.ResultSet;

public class SqlQuery {

    public static void main(String[] args) {

        selectQuery("stems", "fEl");

    }

    // TODO make non static later and return a value
    // Method to query for a segment's form in the database
    public static void selectQuery(String tableName, String wrdForm) {

        // set url for sql db and query to be executed
        String jdbcUrl = SecretStuff.jdbcUrl;
        String sqlSelectQuery = "SELECT * FROM ";


        // TODO add default case
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

            System.out.println(ps);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                // TODO do something with this data
                String vocForm = rs.getString("VOC_FORM");
                String gloss = rs.getString("GLOSS");
                String type = rs.getString("POS_ABBR");

                System.out.println(vocForm + " - " + gloss + " - " + type);

            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    

}
