/**
 * Created by alemaire on 27/08/2016.
 */
public class FizzBuzzTDD {


    public static String fizzBuzz(int i) {
        if(i%15 == 0) return "FizzBuzz";
        if(i%3 == 0) return "Fizz";
        if(i%5 == 0) return "Buzz";

        return String.valueOf(i);
    }
}
