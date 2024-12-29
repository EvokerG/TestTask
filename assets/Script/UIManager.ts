import Level from "./Level";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Node)
    MenuInterface: cc.Node = null;
    @property(cc.Node)
    GameInterface: cc.Node = null;
    @property(cc.Node)
    GameOverInterface: cc.Node = null;

    @property(cc.Label)
    FruitLabel1: cc.Label = null;
    @property(cc.Label)
    FruitLabel2: cc.Label = null;

    public static Instance: UIManager;
    public static GameLoopStage = 0;

    start() {
        UIManager.Instance = this;
    }

    public Play() {
        Player.Idle();
        UIManager.GameLoopStage = 1;
        this.MenuInterface.active = false;
        this.GameInterface.active = true;
    }

    public Die() {
        UIManager.GameLoopStage = 2;
        this.GameOverInterface.active = true;
    }

    public Restart() {
        Player.Idle();
        UIManager.GameLoopStage = 1;
        this.GameOverInterface.active = false;
        Level.ResetLevel();
    }

    public Home() {
        Player.Idle();
        UIManager.GameLoopStage = 0;
        this.GameOverInterface.active = false;
        this.GameInterface.active = false;
        this.MenuInterface.active = true;
        Level.ResetLevel();
    }

    update() {
        this.FruitLabel1.string = Player.Fruits.toString();
        this.FruitLabel2.string = Player.Fruits.toString();
    }
}
