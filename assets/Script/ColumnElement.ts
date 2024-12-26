import LevelElement from "./LevelElement";
const {ccclass, property} = cc._decorator;
const ColumnCenterHalfWidth = 10;
const MinColumnDist = 70;
const MaxColumnDist = 350;
const MinColumnWidth = 20;
const MaxColumnWidth = 150;

@ccclass
export default class ColumnElement extends LevelElement
{
    public WasVisited
    public static Parametres = [];

    public static newColumn(): ColumnElement {
        let col = new ColumnElement();
        if (ColumnElement.Parametres[0] == null) {
            ColumnElement.Parametres[0] = 0;
        }
        if (ColumnElement.Parametres[1] == null) {
            ColumnElement.Parametres[1] = 0;
        }       
        let Distance = Math.floor(Math.random() * (MaxColumnDist - MinColumnDist) + MinColumnDist);
        col.FirstPos = ColumnElement.Parametres[0] + MinColumnDist + Distance;
        let Width = Math.floor(Math.min(Math.random() * (MaxColumnWidth - MinColumnWidth) + MinColumnWidth, Math.random() * (MaxColumnWidth - MinColumnWidth) + MinColumnWidth));        
        col.LastPos = col.FirstPos + MinColumnWidth + Width;
        col.EndsAt = ColumnElement.Parametres[1] + MinColumnDist + Distance + MinColumnWidth + Width;
        col.WasVisited = false;
        return col;
    }

    public OnCenter(Position: number):boolean
    {
        let Center = (this.FirstPos + this.LastPos) / 2;
        return (Position >= Center - ColumnCenterHalfWidth && Position <= Center + ColumnCenterHalfWidth);
    }

    update(dt) {
        this.node.children[0].active = !this.WasVisited;
    }
}
