package com.ruairi.AraDictImproved;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.rua_iri.AraDictImproved.QueryDB;


public class QueryDBTest {

    @Test
    public void testGenerateConnectionString() {
        System.out.println("AppTest Running");


        String expected = "";
        String actual = QueryDB.generateConnectionString();
        
        assertEquals(expected, actual);
    }
    
}
