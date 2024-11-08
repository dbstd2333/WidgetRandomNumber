export default class UniqueRandomGenerator {
    constructor(min, max, exclude = []) {
        this.min = min;
        this.max = max;
        this.exclude = new Set(exclude); // 存储不应被抽取的数字
        this.generatedNumbers = new Set();
    }

    generate() {
        const availableNumbers = Array.from({ length: this.max - this.min + 1 }, (_, i) => i + this.min)
                                      .filter(num => !this.exclude.has(num))
                                      .filter(num => !this.generatedNumbers.has(num));

        if (availableNumbers.length === 0) {
            // 如果所有可用的数字都已经被抽取，则重置
            this.reset();
            return this.generate(); // 重新生成
        }

        const index = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers[index];

        this.generatedNumbers.add(randomNumber);
        return randomNumber;
    }


    reset() {
        this.generatedNumbers.clear();
    }
}
