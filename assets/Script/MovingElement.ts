const {ccclass, property} = cc._decorator;

@ccclass
export default class MovingElement extends cc.Component
{
    @property(Number)
    public ParallaxFactor = 1;

    public static MoveAll(Distance:number)
    {
        let Canvas = cc.find("Canvas");
        let ToMove: MovingElement[];
        Canvas.getComponentsInChildren(MovingElement).forEach(function (value) {
            value.Move(Distance);
        });
    }

    private Move(Distance:number)
    {

    }
}
