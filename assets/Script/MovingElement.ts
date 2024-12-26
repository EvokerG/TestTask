const {ccclass, property} = cc._decorator;

@ccclass
export default class MovingElement extends cc.Component
{
    @property(cc.Float)
    public ParallaxFactor = 1
    public EndsAt = null;    
}
