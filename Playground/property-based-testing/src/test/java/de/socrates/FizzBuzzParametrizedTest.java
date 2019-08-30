import com.tngtech.java.junit.dataprovider.*;
import org.junit.*;
import org.junit.runner.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by alemaire on 27/08/2016.
 */
@RunWith(DataProviderRunner.class)
public class FizzBuzzParametrizedTest {


    @DataProvider
    public static Object[][] times3() throws Exception {
        return new Object[][]{
                {3},
                {6},
                {9},
        };

    }

    @Test
    @UseDataProvider("times3")
    public void should_return_fizz_when_times_3(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("Fizz");
    }

    @DataProvider
    public static Object[][] times5() throws Exception {
        return new Object[][]{
                {5},
                {10},
                {20},
        };

    }

    @Test
    @UseDataProvider("times5")
    public void should_return_buzz_when_times_5(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("Buzz");
    }

    @DataProvider
    public static Object[][] times15() throws Exception {
        return new Object[][]{
                {3*5},
                {3*5*2},
                {3*5*4},
        };

    }

    @Test
    @UseDataProvider("times15")
    public void should_return_fizzbuzz_when_times_15(int n) {
        assertThat(FizzBuzzTDD.fizzBuzz(n)).isEqualTo("Fizz"+"Buzz");
    }


}
