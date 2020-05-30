import BaseStrategy from "~strategy/BaseStrategy";
import StrategyOption from "~types/strategyOption";

class WordStrategy extends BaseStrategy {
    private delimter: string;

    constructor($target: JQuery<HTMLElement>, option: StrategyOption) {
        super($target);

        const { delimiter } = option;
        this.delimter = delimiter || " ";
    }

    protected preprocess() {
        return this.$target.text().split(this.delimter);
    }

    protected cropByIdx(idx: number) {
        this.$target.text(this.original.substring(0, idx));
    }
}

export default WordStrategy;
