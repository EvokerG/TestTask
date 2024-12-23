import LevelElement from "./LevelElement";
const {ccclass, property} = cc._decorator;
const ColumnCenterHalfWidth = 10;
const MinColumnDist = 100;
const MaxColumnDist = 450;
const MinColumnWidth = 50;
const MaxColumnWidth = 200;
const StartingColumnWidth = 100;

@ccclass
export default class ColumnElement extends LevelElement
{
    @property(Boolean)
    public WasVisited;

    constructor(position: number, endsAt: number, fixed: boolean = false) {
        super();
        if (fixed)
        {
            this.FirstPos = 0;
            this.LastPos = StartingColumnWidth;
            this.EndsAt = 0;            
        }
        else
        {
            let Distance = Math.floor(Math.random() * (MaxColumnDist - MinColumnDist));
            this.FirstPos = position + MinColumnDist + Distance;
            let Width = Math.floor(Math.random() * (MaxColumnWidth - MinColumnWidth));
            this.LastPos = this.FirstPos + MinColumnWidth + Width;
            this.EndsAt = endsAt + Distance + Width;
        }
        this.WasVisited = fixed;
    }

    public OnCenter(Position: number):boolean
    {
        let Center = (this.FirstPos + this.LastPos) / 2;
        return (Position >= Center - ColumnCenterHalfWidth && Position <= Center + ColumnCenterHalfWidth);
    }
}
