package com.lmk.queue;

import com.lmk.array.Array;
import com.lmk.array.ArrayImpl;

public class ArrayQueue<E> implements Queue<E>{

    private Array<E> array;

    public ArrayQueue (int capacity) {
        array = new ArrayImpl<>(capacity);
    }

    public ArrayQueue() {
        array = new ArrayImpl<>();
    }

    @Override
    public int getSize() {
        return array.getSize();
    }

    @Override
    public boolean isEmpty() {
        return array.isEmpty();
    }

    @Override
    public void enqueue(E e) {
        array.addLast(e);
    }

    @Override
    public E dequeue() {
        return array.removeFirst();
    }

    @Override
    public E getFront() {
        return array.getFirst();
    }

    @Override
    public String toString () {
        StringBuilder str = new StringBuilder();
        str.append("arrayQueue: ");
        str.append("front [");
        for (int i = 0; i < array.getSize(); i ++ ) {
            str.append(array.get(i));
            if (i != array.getSize() - 1) {
                str.append(",");
            }
        }
        str.append("] tail");

        return str.toString();
    }
}
