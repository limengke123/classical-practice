package com.lmk.array;

public interface Array<E> {

    int getCapacity ();

    int getSize ();

    boolean isEmpty ();

    void add(int index, E e);

    void addLast(E e);

    void addFirst(E e);

    E get(int index);

    E getFirst();

    E getLast();

    void set(int index, E e);

    boolean contains(E e);

    int find(E e);

    E remove(int index);

    E removeFirst();

    E removeLast();


    void removeElement(E e);
}
