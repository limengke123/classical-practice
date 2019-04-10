package queue;

import com.lmk.queue.ArrayQueue;
import com.lmk.queue.LoopQueue;
import com.lmk.queue.Queue;

import java.util.Random;

public class CompareQueueOfArrayAndLoop {

    private static double testQueue (Queue<Integer> queue, int operationTime) {
        long startTime = System.nanoTime();

        Random random = new Random();
        for (int i = 0; i < operationTime; i ++ ) {
            queue.enqueue(random.nextInt(Integer.MAX_VALUE));
        }

        for (int i = 0; i < operationTime; i ++) {
            queue.dequeue();
        }

        long endTime = System.nanoTime();

        return (endTime - startTime ) / 1000000000.0;
    }

    public static void main (String[] args) {
        int count = 100000;

        Queue<Integer> arrayQueue = new ArrayQueue<>();
        double arrayQueueTime = testQueue(arrayQueue, count);
        System.out.println(String.format("ArrayQueue time: %f s.", arrayQueueTime));

        Queue<Integer> loopQueue = new LoopQueue<>();
        double loopQueueTime = testQueue(loopQueue, count);
        System.out.println(String.format("LoopQueue time: %f s.", loopQueueTime));
    }
}
