package stack;

import edu.princeton.cs.algs4.*;

public class Main {
    public static void main(String[] args) {
        StackOfStrings stack = new StackOfStrings() {
            public void push(String item) {

            }

            public String pop() {
                return null;
            }

            public boolean isEmpty() {
                return false;
            }

            public int size() {
                return 0;
            }
        };

        while(!StdIn.isEmpty())
        {
            String s = StdIn.readString();
            if(s.equals("-")) StdOut.print(stack.pop());
            else stack.push(s);
        }
    }
}
