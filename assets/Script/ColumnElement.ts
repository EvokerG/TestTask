import LevelElement from "./LevelElement";
const {ccclass, property} = cc._decorator;
const ColumnCenterHalfWidth = 5;

@ccclass
export default class ColumnElement extends LevelElement
{
    public OnCenter(Position: number):boolean
    {
        let Center = (this.FirstPos + this.LastPos) / 2;
        return (Position >= Center - ColumnCenterHalfWidth && Position <= Center + ColumnCenterHalfWidth);
    }
}
