package stack;

public class ResizingArrayStackOfStrings implements StackOfStrings {
    public ResizingArrayStackOfStrings() {
        s = new String[1];
    }

    public void push(String item) {
        if(N == s.length) resize(2 * s.length);
        s[N++] = item;
    }

    private void resize(int capacity) {
        String[] copy = new String[capacity];
        for(int i = 0; i < N; i++)
            copy[i] = s[i];
        s = copy;
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

    private String[] s;
    private int N = 0;
}
