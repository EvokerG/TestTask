import MovingElement from "./MovingElement";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelElement extends MovingElement
{
    @property(Number)
    public FirstPos
    public LastPos;    
}
