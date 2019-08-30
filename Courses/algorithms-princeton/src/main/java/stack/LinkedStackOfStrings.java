package stack;

public class LinkedStackOfStrings implements StackOfStrings {
    public void push(String item) {
        Node oldFirst = first;
        first = new Node();
        first.item = item;
        first.next = oldFirst;
    }

    public String pop() {
        String item = first.item;
        first = first.next;
        return item;
    }

    public boolean isEmpty() {
        return first == null;
    }

    public int size() {
        return 0;
    }

    private Node first = null;

    private class Node
    {
        String item;
        Node next;
    }
}
