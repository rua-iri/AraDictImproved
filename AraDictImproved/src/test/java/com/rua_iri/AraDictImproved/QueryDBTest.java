package com.rua_iri.AraDictImproved;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.rua_iri.AraDictImproved.QueryDB;

@SpringBootTest
class QueryDBTest {

    @Test
    void testGenerateConnectionString() {

        String actual = QueryDB.generateConnectionString();
        System.out.println("\n\n\n" + actual + "\n\n\n");

        // String regexPattern = "jdbc:mysql://localhost:+\\w/+\\w\\?user=+\\w&password=+\\w";
        String regexPattern = "jdbc:mysql://localhost:\\w*/\\w*\\?user=\\w*&password=\\w*";

        Pattern pattern = Pattern.compile(regexPattern, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(actual);

        assertTrue(matcher.find());

        assertNotEquals("jdbc:mysql://localhost:%s/%s?user=%s&password=%s", actual);
    }

}
