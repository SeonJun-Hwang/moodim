import MoodimOption from "~types/moodimOption";
import Strategy from "~strategy/BaseStrategy";
import StrategyFactory from "~strategy/StrategyFactory";
import StrategyOption from "~types/strategyOption";
import { isHTML } from "~src/utils/String";

class Moodim {
    private $parents: JQuery<HTMLElement>;
    private $targets: JQuery<HTMLElement>;
    private $moreView: JQuery<HTMLElement>;
    private strategy: Strategy;
    private maxHeight: number;

    constructor(type: string, options: MoodimOption) {
        const { selector, childSelector, maxHeight, moreView, ...others } = options;
        const strategyOption: StrategyOption = others as StrategyOption;

        // 초기화
        this.$parents = $(selector);
        this.$moreView = this.parseMoreView(moreView || "...");
        this.strategy = StrategyFactory.create(type, this.findTarget(childSelector), strategyOption);
        this.maxHeight = maxHeight || this.$targets.innerHeight();

        window.addEventListener("load", this.onLoad);
        window.addEventListener("resize", this.onResize);
    }

    private findTarget(selector: string): JQuery<HTMLElement> {
        return selector ? this.$parents.find(selector) : this.$parents;
    }

    private onLoad() {
        this.strategy.onLoad(this.maxHeight);
        this.attachMoreView();
    }

    private onResize() {
        this.detachMoreView();
        this.strategy.onResize(this.maxHeight);
        this.attachMoreView();
    }

    private parseMoreView(moreView): JQuery<HTMLElement> {
        let result: JQuery<HTMLElement>;
        // 문자열 이지만 HTML로 파싱이 불가능한 경우
        if (typeof moreView === "string" && !isHTML(moreView)) result = $(`<span>${moreView}</span>`);

        // 그 외의 경우
        result = typeof moreView === "string" ? $(moreView) : moreView;

        return result.addClass("moodim-ellipsis");
    }

    private attachMoreView(): void {
        if (!this.strategy.needMoreView()) return;

        if (this.$parents.find(this.$moreView).length) this.$parents.append(this.$moreView);

        this.$moreView.show();
    }

    private detachMoreView() {
        this.$moreView.hide();
    }

    private expandEventListener(e: JQuery.ClickEvent) {
        console.dir("Expand!");
    }
}

export default Moodim;
