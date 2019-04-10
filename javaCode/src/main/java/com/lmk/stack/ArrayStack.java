package com.lmk.stack;

import com.lmk.array.Array;
import com.lmk.array.ArrayImpl;

public class ArrayStack<E> implements Stack<E> {

    private Array<E> array;

    public ArrayStack(int capacity) {
        array = new ArrayImpl<>(capacity);
    }

    public ArrayStack() {
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
    public E pop() {
        return array.removeLast();
    }

    @Override
    public void push(E e) {
        array.addLast(e);
    }

    @Override
    public E peek() {
        return array.getLast();
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("Stack :");
        str.append("[");
        for (int i = 0; i < array.getSize(); i++) {
            str.append(array.get(i));
            str.append(", ");
        }
        str.append("] top");
        return str.toString();
    }
}
