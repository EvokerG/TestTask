const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    public Active() {
        this.node.active = true;
    }

    public Inactive() {
        this.node.active = false;
    }
}
