const { ccclass, property } = cc._decorator;
const ProjectWidth = 960;
const ProjectHeight = 640;

@ccclass
export default class NewClass extends cc.Component
{    
    start()
    {
        let scale = Math.min(cc.view.getCanvasSize().width / ProjectWidth, cc.view.getCanvasSize().height /ProjectHeight);
        this.node.setScale(scale / cc.view.getScaleX());
        console.log("Width: " + cc.view.getCanvasSize().width + " Height: " + cc.view.getCanvasSize().height + " Scales: " + cc.view.getScaleX() + " " + cc.view.getScaleY() + " " + scale);
    }
}
