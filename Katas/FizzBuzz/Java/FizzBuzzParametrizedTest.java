import com.tngtech.java.junit.dataprovider.*;
import org.junit.*;
import org.junit.runner.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(DataProviderRunner.class)
public class FizzBuzzParametrizedTest {

    @DataProvider
    public static Object[][] times3() {
        return new Object[][]{{3},{6}};
    }

    @Test
    @UseDataProvider("times3")
    public void it_returns_fizz_when_times_3(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("Fizz");

    }

    @DataProvider
    public static Object[][] times5() {
        return new Object[][]{{5},{10}};
    }

    @Test
    @UseDataProvider("times5")
    public void it_returns_buzz_when_times_5(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("Buzz");

    }

    @DataProvider
    public static Object[][] times15() {
        return new Object[][]{{15},{30}};
    }

    @Test
    @UseDataProvider("times15")
    public void it_returns_fizzbuzz_when_times_15(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("FizzBuzz");

    }
}
