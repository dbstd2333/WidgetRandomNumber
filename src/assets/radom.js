import { Message } from '@arco-design/web-vue';

export class WeightedRandomGenerator {
    constructor(rangeStart, rangeEnd, initialWeights = 10, weightDecrement = 6) {
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
        this.weights = Array(rangeEnd - rangeStart + 1).fill(initialWeights);
        this.weightDecrement = weightDecrement;
        this.generatedNumbers = []; // 新增: 用于存储已生成的数字
    }

    adjustWeights(selectedIndex) {
        const index = selectedIndex - this.rangeStart;
        if (this.weights[index] > this.weightDecrement) {
            this.weights[index] -= this.weightDecrement;
        } else {
            this.weights[index] = 0;
        }
    }

    generate() {
        this.ensureWeightsArePositive(); // 确保权重非负
        let totalWeight = this.weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let weightSum = 0;
        console.log(this.weights);
        for (let i = 0; i < this.weights.length; i++) {
            weightSum += this.weights[i];
            if (random <= weightSum) {
                this.adjustWeights(this.rangeStart + i);
                return this.rangeStart + i;
            }
        }
    }

    generateUnique() {
        this.ensureWeightsArePositive(); // 确保权重非负
        let totalWeight = this.weights.reduce((a, b) => a + b, 0);
        let random,
            weightSum,
            selected,
            attemptCount = 0;
        const maxAttempts = this.weights.length * 3; // 假设最大尝试次数为权重数量的三倍

        do {
            if (attemptCount >= maxAttempts) {
                // 达到最大尝试次数后，重置并重新开始
                this.generatedNumbers = [];
                attemptCount = 0;
                this.resetWeights();
            }

            random = Math.random() * totalWeight;
            weightSum = 0;
            for (let i = 0; i < this.weights.length; i++) {
                weightSum += this.weights[i];
                if (random <= weightSum) {
                    selected = this.rangeStart + i;
                    break;
                }
            }
            attemptCount++;
        } while (this.generatedNumbers.includes(selected)); // 如果已生成，则继续选择
        console.log(this.weights);
        this.generatedNumbers.push(selected); // 记录已生成的数字
        this.adjustWeights(selected);
        return selected;
    }

    ensureWeightsArePositive() {
        if (this.weights.some((weight) => weight < 0)) {
            this.resetWeights();
        }
    }

    resetWeights() {
        this.weights.fill(10);
        Message.info('触发权重被动重置');
    }

    manuallyResetWeights() {
        this.weights.fill(10);
    }
}
