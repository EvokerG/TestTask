import LevelElement from "./LevelElement";
import Player from "./Player";

const { ccclass, property } = cc._decorator;
const StickExtensionSpeed = 1100;

@ccclass
export default class LineElement extends LevelElement {

    private Sticklength: number = 0;
    private StickFallDelay: number = 0;
    public CanExtend: boolean = true
    private Pressed: boolean = false
    private PressedPrev: boolean = false
    public Falling: boolean = false; 
    Crashing: boolean = false;

    constructor() {
        super();
        this.FirstPos = arguments[0];
        this.CanExtend = true;
    }

    onLoad() {
        this.CanExtend = true;
        this.node.parent.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.Pressed = true;
        }, this);        
        this.node.parent.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.Pressed = false;            
        }, this);
        this.Sticklength = 0;
    }

    start() {
        this.node.active = true;
    }

    EndedFall() {
        this.Falling = false; 
        this.LastPos = this.FirstPos + this.Sticklength;
        this.EndsAt = this.LastPos;
    }

    public Crash() {
        this.Crashing = true;
    }

    update(deltaTime: number)
    {
        if (this.Crashing) {
            this.node.angle -= Math.min(Math.abs(70 - this.node.rotation) * 10 * deltaTime, Math.abs(this.node.rotation - 180));
            if (this.node.rotation == 180) {
                this.Crashing = false;
            }
        }
        else {
            if (this.CanExtend && this.Pressed) {
                this.Sticklength += StickExtensionSpeed * deltaTime;
                this.node.height = this.Sticklength;
            } else {
                if (this.PressedPrev != this.Pressed && this.CanExtend) {
                    this.CanExtend = false;
                    this.Falling = true;
                    this.StickFallDelay = 0.5;
                    this.node.parent.off(cc.Node.EventType.TOUCH_START);
                    this.node.parent.off(cc.Node.EventType.TOUCH_END);
                    Player.Kick();
                }
                if (this.StickFallDelay <= 0 && this.Falling) {
                    this.node.angle -= Math.min(Math.abs(-5 - this.node.rotation) * 5 * deltaTime, Math.abs(this.node.rotation - 90));
                    if (this.node.rotation == 90) {
                        this.EndedFall();
                    }
                } else {
                    this.StickFallDelay -= deltaTime;
                }
            }
            this.PressedPrev = this.Pressed;
        }
    }
}
