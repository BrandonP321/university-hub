export class NumberUtils {
    /**
     * Returns a random floating number between a min (inclusive) and max (exclusive) value.
     */
    public static randomFloatInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
    }

    /**
     * Returns a random integer between a min (inclusive) and max (exclusive) value.
     * @param maxInclusive - if true, max is included in range
     */
    public static randomIntInRange = ({ max, min, maxInclusive }: { min: number; max: number; maxInclusive?: boolean }) => {
        return Math.floor(this.randomFloatInRange(Math.ceil(min), Math.floor(maxInclusive ? max + 1 : max)));
    }

    public static isNumb = (numb: number) => {
        return !isNaN(numb);
    }
}
