const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScaler extends cc.Component
{       
    @property(Number)
    static ProjectWidth = 0
    static ProjectHeight = 0;

    start() {
        UIScaler.ProjectWidth = cc.find("Canvas").getComponent(cc.Canvas).designResolution.width;
        UIScaler.ProjectHeight = cc.find("Canvas").getComponent(cc.Canvas).designResolution.height;
    }

    update()
    {
        this.AdaptResolution();
    }

    private AdaptResolution()
    {
        let scale = Math.min(cc.view.getCanvasSize().width / UIScaler.ProjectWidth, cc.view.getCanvasSize().height / UIScaler.ProjectHeight);
        this.node.setScale(scale / cc.view.getScaleX());        
    }
}
