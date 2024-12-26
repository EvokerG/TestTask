import LevelElement from "./LevelElement";

const { ccclass, property } = cc._decorator;
const FruitSafeZone = 33;

@ccclass
export default class BerryElement extends LevelElement {    

    public static Parametres = [];

    public static newBerry() {
        let ber = new BerryElement();
        if (BerryElement.Parametres[0] == null) {
            BerryElement.Parametres[0] = 0;
        }
        if (BerryElement.Parametres[1] == null) {
            BerryElement.Parametres[1] = 0;
        }
        if (BerryElement.Parametres[2] == null) {
            BerryElement.Parametres[2] = 0;
        }
        ber.FirstPos = Math.floor(Math.random() * (BerryElement.Parametres[1] - FruitSafeZone - BerryElement.Parametres[0]) + BerryElement.Parametres[0]);
        ber.LastPos = ber.FirstPos + FruitSafeZone;
        ber.EndsAt = ber.LastPos - BerryElement.Parametres[0] + BerryElement.Parametres[2];
        return ber;
    }

    start() {
        this.node.on("onTriggerEnter", this.PickedUp, this);
    }

    private PickedUp(event: cc.ITriggerEvent) {
        this.node.off("onTriggerEnter", this.PickedUp, this);
    }
}