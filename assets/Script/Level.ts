import LevelElement from "./LevelElement";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends cc.Component {

    @property(LevelElement)
    public static Level: LevelElement[];

    start()
    {
        Level.Level.push(new LevelElement());
    }
}
