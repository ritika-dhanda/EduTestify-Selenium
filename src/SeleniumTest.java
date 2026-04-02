import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;
import java.util.HashMap;

public class SeleniumTest {
    public static void main(String[] args) {
        // Set path to your chromedriver.exe
        // System.setProperty("webdriver.chrome.driver", "chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        try {
            // Open quiz page
            driver.get("http://localhost:5000/quiz");
            System.out.println("Page opened successfully");

            // Correct answers mapping: question ID -> correct option value
            HashMap<String, String> correctAnswers = new HashMap<>();
            correctAnswers.put("q1", "4");       // Example: Question 1 answer is "4"
            correctAnswers.put("q2", "Delhi");   // Example: Question 2 answer is "Delhi"

            // Find all questions
            List<WebElement> questions = driver.findElements(By.className("question"));

            for (WebElement question : questions) {
                String questionId = question.getAttribute("id"); // e.g., "q1"
                String answer = correctAnswers.get(questionId);

                List<WebElement> options = question.findElements(By.tagName("input"));
                for (WebElement option : options) {
                    if (option.getAttribute("value").equals(answer)) {
                        option.click(); // Select correct answer
                        break;
                    }
                }
            }

            // Click Submit Quiz
            WebElement submitButton = driver.findElement(By.id("submitQuiz"));
            submitButton.click();

            // Wait a bit for result
            Thread.sleep(1000);

            // Get result
            WebElement result = driver.findElement(By.id("result"));
            System.out.println("Quiz Result: " + result.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit(); // Close browser
        }
    }
}
