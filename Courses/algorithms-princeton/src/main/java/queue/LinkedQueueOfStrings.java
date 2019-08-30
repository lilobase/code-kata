package queue;

public class LinkedQueueOfStrings implements  QueueOfStrings{

    public void enqueue(String item) {

    }

    public String dequeue() {
        return null;
    }

    public boolean isEmpty() {
        return false;
    }

    public int size() {
        return 0;
    }

    private class Node {
        Node next;
        String item;
    }
}
