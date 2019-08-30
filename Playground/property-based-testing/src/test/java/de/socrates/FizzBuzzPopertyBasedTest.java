import com.pholser.junit.quickcheck.*;
import com.pholser.junit.quickcheck.generator.*;
import com.pholser.junit.quickcheck.random.*;
import com.pholser.junit.quickcheck.runner.*;
import org.junit.runner.*;

import java.lang.annotation.*;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;
import static org.assertj.core.api.Assertions.*;

/**
 * Created by alemaire on 27/08/2016.
 */
@RunWith(JUnitQuickcheck.class)
public class FizzBuzzPopertyBasedTest {

    @Property(trials = 250)
    public void shouldContainsFizzForMultiplesOf3(@Multiple Integer n) {
        //assumeThat(n%3,equalTo(0));
        assertThat(FizzBuzzTDD.fizzBuzz(n)).contains("Fizz");
    }

    @Target({PARAMETER, FIELD, ANNOTATION_TYPE, TYPE_USE})
    @Retention(RUNTIME)
    @GeneratorConfiguration
    public @interface Multiple {
    }

    public class FizzBuzzGenerator extends Generator<Integer> {
        public FizzBuzzGenerator() {
            super(Integer.class);
        }

        @Override
        public Integer generate(SourceOfRandomness random, GenerationStatus status) {
            int value = random.nextInt();
            return multiple != null ? value * 3 : value;
        }

        public void configure(Multiple multiple) {
            this.multiple = multiple;
        }

        private Multiple multiple;
    }


}
