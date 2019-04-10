package queue;

import com.lmk.queue.ArrayQueue;
import com.lmk.queue.Queue;

public class ArrayQueueTest {

    public static void main(String[] args) {
        Queue<Integer> arrayQueue = new ArrayQueue<>();

        for(int i = 0; i < 10; i ++) {
            arrayQueue.enqueue(i);
        }

        arrayQueue.dequeue();
        arrayQueue.dequeue();

        System.out.println(arrayQueue);
    }
}
