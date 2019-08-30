package stack;

public class FixedCapacityStackOfStrings implements StackOfStrings {

    public FixedCapacityStackOfStrings(int capacity) {
        s = new String[capacity];
    }

    public void push(String item) {
        s[N++] = item;
    }

    public String pop() {
        String item = s[--N];
        s[N] = null;
        return item;
    }

    public boolean isEmpty() {
        return N == 0;
    }

    public int size() {
        return 0;
    }

    private final String[] s;
    private int N = 0;
}
