abstract class BaseStrategy {
    private flagWidth: number;
    private flagHeight: number;
    private lastIdx: number;
    private elementCount: number;

    protected $target: JQuery<HTMLElement>;
    protected original: string;

    constructor($target: JQuery<HTMLElement>) {
        this.$target = $target;
        this.flagWidth = $target.innerWidth();
        this.original = this.preprocess();
        this.elementCount = this.original.length;
        this.lastIdx = this.elementCount;
    }

    public onLoad(maxHeight: number): void {
        this.lastIdx = this.elementCount < 500 ? this.findLastIdxAtFront(maxHeight) : this.findLastIdxByBSearch(maxHeight);
        this.flagHeight = maxHeight;
        this.cropByIdx(this.lastIdx);
    }

    public onResize(maxHeight: number): void {
        if (!this.needUpdate(this.$target)) return;

        if (this.$target.innerHeight() > maxHeight) this.expanding(maxHeight);
        else this.collapsing(maxHeight);

        this.flagWidth = this.$target.innerWidth();
    }

    public needMoreView(): boolean {
        return this.lastIdx < this.elementCount;
    }

    protected abstract preprocess();

    protected abstract cropByIdx(idx: number);

    private findLastIdxAtFront(maxHeight: number): number {
        let right = 0;

        do {
            right += 5;
            this.cropByIdx(right);
        } while (this.$target.innerHeight() <= maxHeight);

        while (this.$target.innerHeight() > maxHeight) this.cropByIdx(--right);

        return right;
    }

    private findLastIdxByBSearch(maxHeight: number): number {
        let left: number = 0,
            right: number = this.lastIdx;

        while (left <= right) {
            const mid = (left + right) >> 1;

            this.cropByIdx(mid);

            if (this.$target.innerHeight() > maxHeight) right = mid - 1;
            else left = mid + 1;
        }

        return right;
    }

    private expanding(maxHeight: number) {
        while (this.lastIdx < this.elementCount && this.$target.innerHeight() <= maxHeight) this.cropByIdx(this.lastIdx++);
    }

    private collapsing(maxHeight: number) {
        while (this.lastIdx && this.$target.innerHeight() > maxHeight) this.cropByIdx(--this.lastIdx);
    }

    private reserve(maxHeight: number) {
        while (this.$target.innerHeight() < maxHeight) this.cropByIdx(this.lastIdx++);
        while (this.$target.innerHeight() > maxHeight) this.cropByIdx(--this.lastIdx);
    }

    private needUpdate($el: JQuery<HTMLElement>): boolean {
        return this.flagWidth !== $el.innerWidth();
    }

    private isExpand(nowMaxHeight: number): boolean {
        return this.flagHeight < nowMaxHeight;
    }
}

export default BaseStrategy;
