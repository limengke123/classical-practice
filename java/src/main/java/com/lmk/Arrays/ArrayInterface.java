package com.lmk.Arrays;

public interface ArrayInterface<E> {

    int getCapacity ();

    int getSize ();

    boolean isEmpty ();

    void add(int index, E e);

    void addLast(E e);

    void addFirst(E e);

    E get(int index);

    void set(int index, E e);

    boolean contains(E e);

    int find(E e);

    E remove(int index);

    E removeFirst();

    E removeLast();

    void removeElement(E e);
}
