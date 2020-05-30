import Strategy from "~strategy/BaseStrategy";
import StrategyOption from "~types/strategyOption";
import StringStrategy from "~strategy/StringStrategy";
import WordStrategy from "~strategy/WordStrategy";

class StrategyFactroy {
    static create(type: string, $target: JQuery<HTMLElement>, option: StrategyOption): Strategy {
        switch (type) {
            case "String":
                return new StringStrategy($target);
            case "Word":
                return new WordStrategy($target, option);
        }

        return undefined;
    }
}

export default StrategyFactroy;
