package com.lmk.queue;

public class LoopQueue<E> implements Queue<E> {

    private E[] data;
    private int front, tail;
    private int size;

    public LoopQueue(int capacity) {
        data = (E[]) new Object[capacity + 1];
        front = tail = size = 0;
    }

    public LoopQueue() {
        this(10);
    }

    @Override
    public int getSize() {
        return size;
    }

    public int getCapacity () {
        return data.length - 1;
    }

    @Override
    public boolean isEmpty() {
        return tail == front;
    }

    @Override
    public void enqueue(E e) {
        if ((tail + 1) % data.length == front) {
            resize(getCapacity() * 2);
        }

        data[tail] = e;
        tail = (tail + 1) % data.length;
        size++;
    }

    @Override
    public E dequeue() {
        if (isEmpty()) {
            throw new IllegalArgumentException("can not remove any element in a null queue");
        }

        E removeItem = data[front];
        data[front] = null;
        front = (front + 1) % data.length;
        size --;
        if (size < getCapacity() / 4 && getCapacity() / 2 != 0) {
            resize(getCapacity() / 2);
        }
        return removeItem;
    }

    @Override
    public E getFront() {
        return data[front];
    }

    private void resize (int newCapacity) {
        E[] newData = (E[]) new Object[newCapacity + 1];
        for(int i = 0; i < size; i ++) {
            newData[i] = data[(front + i) % data.length];
        }
        data = newData;
        front = 0;
        tail = size;
    }

    @Override
    public String toString () {
        StringBuilder str = new StringBuilder();
        str.append(String.format("LoopQueue: size = %d, capacity = %d \n", size, getCapacity()));
        str.append("front [");
        for (int i = front; i != tail; i = (i + 1) % data.length) {
            str.append(data[i]);
            if ((i + 1) % data.length != tail) {
                str.append(",");
            }
        }

        str.append("]");
        return str.toString();
    }
}
