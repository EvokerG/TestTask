import ColumnElement from "./ColumnElement";
import LevelElement from "./LevelElement";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Level extends cc.Component {

    @property(LevelElement)
    public static Level: LevelElement[];

    public ResetLevel()
    {
        Level.Level.forEach(function (value) {
            Level.Level.pop();
        })
    }

    private static SortLevelOrder() {
        Level.Level = Level.Level.sort((a, b) => {
            if (a.EndsAt > b.EndsAt)
                return 1;
            if (a.EndsAt < b.EndsAt)
                return -1;
            return 0;
        })
    }

    Add(levelElement: LevelElement) {
        Level.Level.push(levelElement);
        Level.SortLevelOrder();
    }

    start()
    {
        Level.Level = [];        
    }
}
