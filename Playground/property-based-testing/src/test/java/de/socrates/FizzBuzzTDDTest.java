import org.junit.*;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

public class FizzBuzzTDDTest {
    @Test
    public void it_returns_1_for_1() {
        assertThat(FizzBuzzTDD.fizzBuzz(1)).isEqualTo("1");
    }

    @Test
    public void it_return_2_for_2() {
        assertThat(FizzBuzzTDD.fizzBuzz(2)).isEqualTo("2");
    }
}