package com.rua_iri.AraDictImproved;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class App {

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  // TODO add another method to return something if no results are found
  @GetMapping("/api/translate")
  public List<WordSolution> solutionMapper(@RequestParam(value = "word", defaultValue = "العربية") String queryWord) {
    try {
      List<WordSolution> solutionList = WordAnalyser.runAnalyser(queryWord);
      return solutionList;
    } catch (Exception e) {
      System.err.println(e);
      return new ArrayList<WordSolution>();
    }
  }

  @GetMapping("/api/hello")
  public String helloMapper() {
    return "Hello, World!";
  }

}
