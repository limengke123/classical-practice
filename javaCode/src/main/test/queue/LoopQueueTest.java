package queue;

import com.lmk.queue.LoopQueue;
import com.lmk.queue.Queue;

public class LoopQueueTest {

    public static void main (String[] args) {

        Queue<Integer> loopQueue = new LoopQueue<>();
        for(int i = 0 ; i < 10 ; i ++){
            loopQueue.enqueue(i);
            System.out.println(loopQueue);

            if(i % 3 == 2){
                loopQueue.dequeue();
                System.out.println(loopQueue);
            }
        }
    }
}
