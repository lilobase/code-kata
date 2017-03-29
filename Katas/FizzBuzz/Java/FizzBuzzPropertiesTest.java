import com.pholser.junit.quickcheck.*;
import com.pholser.junit.quickcheck.runner.*;
import org.junit.runner.*;

import static org.assertj.core.api.Java6Assertions.*;
import static org.hamcrest.core.IsEqual.*;
import static org.junit.Assume.*;

@RunWith(JUnitQuickcheck.class)
public class FizzBuzzPropertiesTest {
    @Property
    public void multiple_of_three_contains_fizz(int n) {
        assumeThat(n%3, equalTo(0));
        assertThat(FizzBuzzTDD.fizzBuzz(n)).contains("Fizz");
    }
    @Property
    public void multiple_of_five_contains_buzz(int n) {
        assumeThat(n%5, equalTo(0));
        assertThat(FizzBuzzTDD.fizzBuzz(n)).contains("Buzz");
    }
}
