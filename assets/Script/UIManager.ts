import Level from "./Level";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Node)
    MenuInterface: cc.Node = null;
    @property(cc.Node)
    GameInterface: cc.Node = null;
    @property(cc.Node)
    GameOverInterface: cc.Node = null;

    public static Instance: UIManager;

    public static Stage = 0;

    start() {
        UIManager.Instance = this;
    }

    public Play() {
        UIManager.Stage = 1;
        this.MenuInterface.active = false;
        this.GameInterface.active = true;
    }

    public Die() {
        UIManager.Stage = 2;
        this.GameInterface.active = false;
        this.GameOverInterface.active = true;
    }

    public Restart() {
        UIManager.Stage = 1;
        this.GameInterface.active = true;
        this.GameOverInterface.active = false;
        Level.ResetLevel();
    }

    public Home() {
        UIManager.Stage = 0;
        this.GameOverInterface.active = false;
        this.GameInterface.active = false;
        this.MenuInterface.active = true;
        Level.ResetLevel();
    }
}
