const { ccclass } = cc._decorator;
const ProjectWidth = 1080;
const ProjectHeight = 1920;

@ccclass
export default class NewClass extends cc.Component
{   
    update()
    {
        this.AdaptResolution();
    }

    private AdaptResolution()
    {
        let scale = Math.min(cc.view.getCanvasSize().width / ProjectWidth, cc.view.getCanvasSize().height / ProjectHeight);
        this.node.setScale(scale / cc.view.getScaleX());        
    }
}
