const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    private static DeathMomentum = 4;
    private static GravityAcceleration = 25;
    private static Dying: boolean = false;
    public static player: cc.Node;
    static ScoreLabel: cc.Label;
    public static Score: number = 0;

    public static SetDeafaultPos() {
        Player.Dying = false;
        Player.DeathMomentum = 4;
        Player.ScoreLabel.string = "0";
        Player.Score = 0;
        Player.player.getComponentsInChildren(cc.Animation)[0].play();
        Player.player.setPosition(0, 35);
        Player.player.angle = 0;
    }

    public static AddScore() {
        Player.Score++;
        Player.ScoreLabel.string = (Player.Score).toString();
    }

    public static Die() {
        Player.player.getComponentsInChildren(cc.Animation)[0].pause();
        Player.Dying = true;
    }

    public static Idle() {
        Player.player.getComponentsInChildren(cc.Animation)[0].play("Idle");
    }

    public static Run() {
        Player.player.getComponentsInChildren(cc.Animation)[0].play("Run");
    }

    public static Kick() {
        Player.player.getComponentsInChildren(cc.Animation)[0].play("Kick");
    }

    start() {
        Player.player = this.node;
        Player.ScoreLabel = cc.find("Canvas/GameInterface/Score").getComponent(cc.Label);
    }

    update(dt) {
        this.node.zIndex = 100;
        if (Player.Dying) {
            Player.player.y += Player.DeathMomentum;
            Player.player.angle += Math.random() * 5 + 1;
            Player.DeathMomentum -= Player.GravityAcceleration * dt;
        }
    }
}
