package com.rua_iri.AraDictImproved;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class QueryDBTest {

    QueryDB queryDB;

    @Before
    void main() {
        queryDB = new QueryDB();
    }

    @Test
    void testGenerateConnectionString() {

        String actual = QueryDB.generateConnectionString();

        Pattern pattern = Pattern.compile(
                "jdbc:mysql://localhost:\\w*/\\w*\\?user=\\w*&password=\\w*",
                Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(actual);

        assertTrue(matcher.find());

        assertNotEquals("jdbc:mysql://localhost:%s/%s?user=%s&password=%s", actual);
    }

}
