package com.lmk.Arrays;


public class Array<E> implements ArrayInterface<E> {

    private E[] data;
    private int size;

    public Array (int capacity) {
        data = (E[])new Object[capacity];
        size = 0;
    }

    public Array () {
        this(10);
    }

    @Override
    public int getCapacity() {
        return data.length;
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public void add(int index, E e) {
        if (index < 0 || index > size) {
            throw new IllegalArgumentException("传入的参数必须符合规则");
        }

        if (size == getCapacity()) {
            // 达到容器最大的时候, 扩容操作
            resize(getCapacity() * 2);
        }

        for (int i = size - 1; i >= index; i--) {
            // index后面的位置都得向后走一个位置
            data[i + 1] = data[i];
        }

        data[index] = e;

        size ++;
    }

    // 扩容操作
    private void resize (int newCapacity) {
        E[] newData = (E[])new Object[newCapacity];
        for(int i = 0; i < size; i ++) {
            newData[i] = data[i];
        }
        data = newData;
    }

    @Override
    public void addLast(E e) {
        add(getSize(), e);

    }

    @Override
    public void addFirst(E e) {
        add(0, e);
    }

    @Override
    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IllegalArgumentException("传入的参数必须符合规则");
        }
        return data[index];
    }

    @Override
    public void set(int index, E e) {
        if (index < 0 || index >= size) {
            throw new IllegalArgumentException("传入的参数必须符合规则");
        }
        data[index] = e;
    }

    @Override
    public boolean contains(E e) {
        for(int i = 0; i < size; i++) {
            if (data[i].equals(e)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public int find(E e) {
        for(int i = 0; i < size; i++) {
            if (data[i].equals(e)) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public E remove(int index) {
        if (index < 0 || index >= size) {
            throw new IllegalArgumentException("传入的参数必须符合规则");
        }

        E removeItem = data[index];

        for (int i = index + 1; i < size; i ++) {
            data[i - 1] = data[i];
        }
        data[size - 1] = null;
        size --;
        if (size <= getCapacity() / 4 && getCapacity() /2 != 0) {
            resize(getCapacity() / 2);
        }
        return removeItem;
    }

    @Override
    public E removeFirst() {
        return remove(0);
    }

    @Override
    public E removeLast() {
        return remove(size - 1);
    }

    @Override
    public void removeElement(E e) {
        int index = find(e);
        if (index != -1) {
            remove(index);
        }
    }

    @Override
    public String toString() {
        StringBuilder res = new StringBuilder();
        res.append(String.format("Arrays size = %d, capacity = %d\n", size, data.length));
        res.append('[');
        for (int i = 0; i < size; i++) {
            res.append(data[i]);
            if (i != size -1) {
                res.append(",");
            }
        }
        res.append("]");
        return res.toString();
    }
}
