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
        Player.ScoreLabel.string = "0";
        Player.Score = 0;
        Player.player.getComponent(cc.Animation).pause();
        Player.player.setPosition(-190, -144.6);
    }

    public static AddScore() {
        Player.Score++;
        Player.ScoreLabel.string = (Player.Score).toString();
    }

    public static Die() {
        Player.Dying = true;
    }

    public static Idle() {
        Player.player.getComponent(cc.Animation).play("Idle");
    }

    public static Run() {
        Player.player.getComponent(cc.Animation).play("Run");
    }

    public static Kick() {
        Player.player.getComponent(cc.Animation).play("Kick");
    }

    start() {
        Player.player = this.node;
        Player.ScoreLabel = cc.find("Canvas/Score").getComponent(cc.Label);
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
