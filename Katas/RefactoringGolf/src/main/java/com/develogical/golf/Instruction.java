package com.develogical.golf;

public class Instruction {

    public static Instruction toPerform(String command) {
        String[] parts = command.split(" ");
        String direction = parts[0];
        int amount = Integer.parseInt(parts[1]);

        Instruction instruction = null;
        if (direction.equals("foward")) {
            instruction = new MoveInstruction(amount);
        }
        if (direction.equals("left")) {
            instruction = new TurnInstruction(amount);
        }
        if (direction.equals("right")) {
            instruction = new TurnInstruction(-1 * amount);
        }
        return instruction;
    }
}
