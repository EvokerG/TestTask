const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    private static DeathMomentum = 4;
    private static GravityAcceleration = 25;
    private static Dying: boolean = false;
    public static player: cc.Node;
    static ScoreLabel: cc.Label;
    public static Score: number = 0;
    public static AllowFlip: boolean = false;
    public static Flipped: boolean = false;
    public static PossibleFruits: number = 0;
    public static Fruits: number = 0;

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
        if (Player.Flipped) {
            Player.Flip();
        }
        Player.player.getComponentsInChildren(cc.Animation)[0].pause();
        Player.PossibleFruits = 0;
        Player.Dying = true;
    }

    public static Idle() {
        Player.player.getComponentsInChildren(cc.Animation).forEach(function (value) { value.play("Idle") });
    }

    public static Run() {
        Player.player.getComponentsInChildren(cc.Animation).forEach(function (value) { value.play("Run") });
    }

    public static Kick() {
        Player.player.getComponentsInChildren(cc.Animation).forEach(function (value) { value.play("Kick") });
    }       

    public static PlayerAddEvent() {
        Player.player.parent.parent.on(cc.Node.EventType.TOUCH_START, function () {
            if (Player.AllowFlip) { Player.Flip(); }
        }, this);
    }

    static Flip() {
        Player.player.parent.scaleY *= -1;
        Player.Flipped = !Player.Flipped;
    }

    start() {
        Player.player = this.node;
        Player.ScoreLabel = cc.find("Canvas/GameInterface/Score").getComponent(cc.Label);
        Player.PlayerAddEvent();
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
