import MovingElement from "./MovingElement";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelElement extends MovingElement
{
    public FirstPos: number
    public LastPos: number; 
}
