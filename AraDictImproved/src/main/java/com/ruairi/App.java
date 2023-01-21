package com.ruairi;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class App 
{

    public static void main( String[] args )
    {
		SpringApplication.run(App.class, args);

    }

    // TODO add another method to return something if no results are found
    // TODO maybe add a default value here @RequestParam(value = "q", defaultValue = "تجربة")
    @GetMapping("/api/word")
    public List<WordSolution> solutionMapper(@RequestParam(value = "q") String apiQuery) {
        return WordAnalyser.runAnalyser(apiQuery);
    }

}
