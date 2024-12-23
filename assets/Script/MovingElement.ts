import Level from "./Level";

const {ccclass, property} = cc._decorator;
const BackgroundRepeatPeriod = 24000;
const ElementDeletionDistance = -2000;

@ccclass
export default class MovingElement extends cc.Component
{
    @property(Number)
    public ParallaxFactor = 1
    public EndsAt = null
    public static BackGround: MovingElement;

    public static MoveAll(Distance:number)
    {
        let Canvas = cc.find("Canvas");
        let ToMove: MovingElement[];
        Level.Level.forEach(function (value) {
            value.Move(Distance);
        });
        this.BackGround.Move(Distance);
    }

    start() {
        MovingElement.BackGround = cc.find("Canvas/LevelElements/Background").getComponent(MovingElement);
    }

    private Move(Distance:number)
    {
        this.node.x -= Distance;        
        if (this.EndsAt != null) {
            if (this.EndsAt < ElementDeletionDistance) {
                this.node.destroy;
                Level.Level = Level.Level.reverse();
                Level.Level.pop();
                Level.Level = Level.Level.reverse();
            }
        }
        else
        {
            this.EndsAt -= Distance;
            if (this.node.x > -1 * cc.view.getCanvasSize().width)
            {
                this.node.x += BackgroundRepeatPeriod;
            }
        }
    }
}
