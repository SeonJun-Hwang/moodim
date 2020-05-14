import BaseStrategy from "~src/strategy/Base";

interface MoodimOption {
    childSelector?: string;
    maxHeight?: number;
}

class Moodim {
    private $targets: JQuery<HTMLElement>;
    private strategy: BaseStrategy;
    private maxHeight: number;

    constructor(selector: string, strategy: BaseStrategy, options: MoodimOption = {}) {
        const { childSelector, maxHeight } = options;

        // 초기화
        this.$targets = this.findTargets(selector, childSelector);
        this.strategy = strategy;
        this.maxHeight = maxHeight ? maxHeight : this.$targets.innerHeight();

        window.addEventListener("load", this.onLoad);
        window.addEventListener("resize", this.onResize);
    }

    private findTargets(selector: string, childSelector?: string): JQuery<HTMLElement> {
        return childSelector ? $(selector).find(childSelector) : $(selector);
    }

    private onLoad() {
        this.$targets.each((_, target) => {
            const $target = $(target);

            this.strategy.onLoad($target, this.maxHeight);
            this.strategy.attachEllipsis($target, this.maxHeight);
        });
    }

    private onResize() {
        this.$targets.each((_, target) => {
            const $target = $(target);

            this.strategy.detachEllipsis(this.maxHeight);
            this.strategy.onResize($target, this.maxHeight);
            this.strategy.attachEllipsis($target, this.maxHeight);
        });
    }
}

export default Moodim;
