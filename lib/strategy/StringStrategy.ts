import BaseStrategy from "~strategy/BaseStrategy";

class StringStrategy extends BaseStrategy {
    protected preprocess() {
        return this.$target.text();
    }

    protected cropByIdx(idx: number) {
        this.$target.text(this.original.substring(0, idx));
    }
}

export default StringStrategy;
