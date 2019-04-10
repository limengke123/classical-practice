package stack;
import com.lmk.stack.Stack;
import com.lmk.stack.ArrayStack;

public class ArrayStackTest {

    public static void main (String[] args) {
        Stack<Integer> arrayStack = new ArrayStack<>();
        for (int i = 0; i < 5; i++) {
            arrayStack.push(i);
        }

        arrayStack.pop();

        System.out.println(arrayStack.toString());
    }
}
