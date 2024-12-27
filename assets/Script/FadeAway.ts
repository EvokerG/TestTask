const {ccclass, property} = cc._decorator;

@ccclass
export default class FadeAway extends cc.Component {
    public static FloatSpeed: number;
    static Randomness: number;
    public static Text: cc.Node;
    static BaseWalkSpeed = 600;

    public static PopUp(position: number) {
        FadeAway.Randomness = Math.random() * 2 - 1;
        FadeAway.FloatSpeed = 20;
        FadeAway.Text.opacity = 255;
        FadeAway.Text.x = position;
        FadeAway.Text.y = -125;
        console.log("I'm at " + FadeAway.Text.position);
    }

    start() {
        FadeAway.Text = this.node;
        this.node.zIndex = 100;
    }

    update(dt) {
        this.node.x += (FadeAway.Randomness * FadeAway.FloatSpeed * dt * 10);
        this.node.angle += FadeAway.Randomness * 10 * dt;
        this.node.y += FadeAway.FloatSpeed * dt;
        FadeAway.FloatSpeed -= FadeAway.FloatSpeed / 2 * dt;
        this.node.opacity -= 255 / 0.4 * dt;
    }
}
