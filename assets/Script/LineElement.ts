const { ccclass, property } = cc._decorator;
const StickExtensionSpeed = 350;

@ccclass
export default class LineElement extends cc.Component {

    @property(Number)
    private Sticklength: number;
    private StickFallDelay: number;
    @property(Boolean)
    private CanExtend: boolean = true
    private CanExtendPrev: boolean = true
    private Pressed: boolean = false
    private PressedPrev: boolean = false
    private Falling: boolean = false; 

    onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            this.Pressed = true;
        }, this.node.parent);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.Pressed = true;
        }, this.node.parent);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            this.Pressed = false;
        }, this.node.parent);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.Pressed = false;
        }, this.node.parent);
        console.log(this.CanExtend);
    }

    update(deltaTime: number)
    {
        if (this.CanExtend && this.Pressed) {
            this.Sticklength += StickExtensionSpeed * deltaTime;
            this.node.scaleY = this.Sticklength;
        } else {
            if (this.PressedPrev != this.Pressed) {
                this.CanExtend = false;
                this.StickFallDelay = 0.5;
            } else {
                if (this.StickFallDelay <= 0) {
                    this.node.rotation -= Math.min((5-this.node.rotation)*deltaTime,Math.abs(this.node.rotation + 90));
                } else {
                    this.StickFallDelay -= deltaTime;
                }
            }
        }
                
        this.PressedPrev = this.Pressed;
    }
}
