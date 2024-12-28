import ColumnElement from "./ColumnElement";
import BerryElement from "./BerryElement";
import MovingElement from "./MovingElement";
import LineElement from "./LineElement";
import LevelElement from "./LevelElement";
import Player from "./Player";
import FadeAway from "./FadeAway";
import UIManager from "./UIManager";
const { ccclass, property } = cc._decorator;
const GeneratorQueueLength = 5000;
const BackgroundRepeatPeriod = 24000;
const ElementDeletionDistance = -2500;
const StartingColumnWidth = 100;
const StartingDisplacement = -155;

@ccclass
export default class Level extends cc.Component {

    public static Level = [];
    static LevelElementsParent: cc.Node
    static ColumnPrefab: cc.Prefab
    static LinePrefab: cc.Prefab
    static FruitPrefab: cc.Prefab
    public static DistanceFromStart: number = StartingDisplacement
    public static Background: cc.Node
    static BaseWalkSpeed = 600;

    public static ResetLevel()
    {
        Player.SetDeafaultPos();
        Level.Background.setPosition(Math.random() * 19000 + 1000, 0);
        Level.DistanceFromStart = StartingDisplacement;
        Level.Level.forEach(function (value) {
            value.node.destroy();
        })
        Level.Level = [];
        let column = cc.instantiate(Level.ColumnPrefab);
        column.parent = Level.LevelElementsParent;
        column.getComponent(ColumnElement).FirstPos = -StartingColumnWidth;
        column.getComponent(ColumnElement).LastPos = 0;
        column.getComponent(ColumnElement).EndsAt = 0;
        column.getComponent(ColumnElement).WasVisited = true;
        Level.Place(column.getComponent(ColumnElement));
        Level.Level.push(column.getComponent(ColumnElement));
        Level.GenerateLevel();
        Level.PlayerAt = column.getComponent(ColumnElement);
        let i = 1;
        do {
            Level.TargetAt = Level.Level[Level.Level.findIndex(Level.FindPlayerAt) + i];
            i++;
        } while (Level.TargetAt.WasVisited != false);
        console.log("Next target is at " + Level.TargetAt.FirstPos + " " + Level.TargetAt.EndsAt);
        Level.stage = 1;
    }

    public static Place(elem:any) {
        elem.node.setPosition((elem.LastPos + elem.FirstPos) / 2 + Level.DistanceFromStart, elem.node.y);
        elem.node.width = elem.LastPos - elem.FirstPos;
    }

    public static MoveAll(Distance: number) {
        Level.Level.forEach(function (value) {
            Level.Move(value,Distance);
        });
        Level.MoveBackground(Distance);        
        Level.DistanceFromStart -= Distance;
    }

    public static MoveBackground(Distance: number) {
        Level.Background.x -= Distance * Level.Background.getComponent(MovingElement).ParallaxFactor;
        Level.Background.getComponent(MovingElement).EndsAt -= Distance;
        if (Level.Background.x < -1 * 1.25 * cc.view.getCanvasSize().width) {
            Level.Background.x += BackgroundRepeatPeriod;
        }
    }

    private static Move(thisEl: LevelElement, Distance: number) {
        thisEl.node.x -= Distance * thisEl.ParallaxFactor;        
        thisEl.EndsAt -= Distance;
        if (thisEl.EndsAt < ElementDeletionDistance) {              
            Level.Level = Level.Level.reverse();
            console.log("Deleting at " + thisEl.EndsAt + " " + Level.Level.pop().EndsAt);
            Level.Level = Level.Level.reverse();
            thisEl.node.destroy;
        }        
    } 

    private static GenerateLevel() {
        Level.SortLevelOrder();
        let LastElementPos = Math.floor(Level.Level[Level.Level.length - 1].LastPos);
        let LastElementEndsAt = Math.floor(Level.Level[Level.Level.length - 1].EndsAt);
        console.log("Creating from anchor " + LastElementPos + " " + LastElementEndsAt);
        while (LastElementEndsAt < GeneratorQueueLength) {             
            let column = cc.instantiate(Level.ColumnPrefab);
            column.parent = Level.LevelElementsParent;
            ColumnElement.Parametres = [LastElementPos, LastElementEndsAt]
            let newColumn = ColumnElement.newColumn();            
            column.getComponent(ColumnElement).FirstPos = newColumn.FirstPos;
            column.getComponent(ColumnElement).LastPos = newColumn.LastPos;
            column.getComponent(ColumnElement).EndsAt = newColumn.EndsAt;
            column.getComponent(ColumnElement).WasVisited = false;
            Level.Place(column.getComponent(ColumnElement));
            if (Math.random() > 0.4) {                
                BerryElement.Parametres = [LastElementPos, newColumn.FirstPos, LastElementEndsAt];
                let newFruit = BerryElement.newBerry();
                let fruit = cc.instantiate(Level.FruitPrefab);
                fruit.parent = Level.LevelElementsParent;
                console.log("    Created berry at " + newFruit.FirstPos + " " + newFruit.LastPos + " " + newFruit.EndsAt);
                fruit.getComponent(BerryElement).FirstPos = newFruit.FirstPos;
                fruit.getComponent(BerryElement).LastPos = newFruit.LastPos;
                fruit.getComponent(BerryElement).EndsAt = newFruit.EndsAt;
                Level.Place(fruit.getComponent(BerryElement));
                Level.Level.push(fruit.getComponent(BerryElement));
            }
            console.log("    Created column at " + newColumn.FirstPos + " " + newColumn.LastPos + " " + newColumn.EndsAt);
            Level.Level.push(column.getComponent(ColumnElement));
            LastElementPos = newColumn.LastPos;
            LastElementEndsAt = newColumn.EndsAt;
        }
        Level.SortLevelOrder();
    }

    private static SortLevelOrder() {
        Level.Level = Level.Level.sort((a, b) => {
            if (a.FirstPos > b.FirstPos)
                return 1;
            if (a.FirstPos < b.FirstPos)
                return -1;
            return 0;
        })
    }

    start()
    {
        Level.Background = cc.find("Canvas/LevelElements/Background"); 
        Level.Background.setPosition(Math.random() * 19000 + 1000,0);
        Level.LevelElementsParent = cc.find("Canvas/LevelElements");
        Level.Level = [];  
        cc.resources.load("Prefabs/Fruit", cc.Prefab, (err, pref) => {
            Level.FruitPrefab = pref;
        });          
        cc.resources.load("Prefabs/Stick", cc.Prefab, (err, pref) => {
            Level.LinePrefab = pref;
        });    
        cc.resources.load("Prefabs/Column", cc.Prefab, (err, pref) => {
            Level.ColumnPrefab = pref;
        }); 
        this,this.schedule(function () {
            let column = cc.instantiate(Level.ColumnPrefab);
            column.parent = Level.LevelElementsParent;
            column.getComponent(ColumnElement).FirstPos = -StartingColumnWidth;
            column.getComponent(ColumnElement).LastPos = 0;
            column.getComponent(ColumnElement).EndsAt = 0;
            column.getComponent(ColumnElement).WasVisited = true;
            Level.Place(column.getComponent(ColumnElement));
            Level.Level.push(column.getComponent(ColumnElement));
            Level.GenerateLevel();
            Level.PlayerAt = column.getComponent(ColumnElement);
            let i = 1;
            do {
                Level.TargetAt = Level.Level[Level.Level.findIndex(Level.FindPlayerAt) + i];
                i++;
            } while (Level.TargetAt.WasVisited != false);
            console.log("Next target is at " + Level.TargetAt.FirstPos + " " + Level.TargetAt.EndsAt);
            Level.stage = 1;
        }, 0, 0, 0.4);           
    }

    static PlayerAt: ColumnElement
    static MoveTo: number;
    static TargetAt: ColumnElement
    static CurrentStick: cc.Node
    static stage: number;  //0 - ходьба, 1 - инициализация объектов, 2 - ожидание, 3 - проигрыш

    static FindPlayerAt(element, index, array) {
        return (element.FirstPos = Level.PlayerAt.FirstPos && element.LastPos == Level.PlayerAt.LastPos)
    }

    update(dt) {
        if (UIManager.Stage == 1) {
            if (Level.stage == 0) {
                if (-Level.DistanceFromStart >= Level.MoveTo - StartingDisplacement) {
                    if (Level.MoveTo == Level.TargetAt.LastPos) {
                        Player.AddScore();
                        Level.stage = 1;
                        Level.PlayerAt = Level.TargetAt;
                        Player.Idle();
                        Level.PlayerAt.WasVisited = true;
                        Level.SortLevelOrder();
                        let i = 0;
                        do {
                            Level.TargetAt = Level.Level[Level.Level.findIndex(Level.FindPlayerAt) + i];
                            i++;
                        } while (Level.TargetAt.WasVisited != false);
                        console.log("Next target is at " + Level.TargetAt.FirstPos + " " + Level.TargetAt.EndsAt);
                        Level.GenerateLevel();
                    } else {
                        Player.Die();
                        UIManager.Instance.Die();
                        Level.stage = 3;
                    }
                } else {
                    Level.MoveAll(Math.min(Level.BaseWalkSpeed * dt, Level.MoveTo + Level.DistanceFromStart - StartingDisplacement));
                }
            }
            if (Level.stage == 1 || Level.stage == 2) {
                if (Level.stage == 1) {
                    Level.CurrentStick = cc.instantiate(Level.LinePrefab);
                    Level.CurrentStick.setParent(Level.LevelElementsParent);
                    Level.CurrentStick.getComponent(LineElement).FirstPos = Level.PlayerAt.LastPos;
                    Level.CurrentStick.getComponent(LineElement).LastPos = Level.PlayerAt.LastPos;
                    Level.CurrentStick.getComponent(LineElement).EndsAt = Level.PlayerAt.EndsAt;
                    Level.Level.push(Level.CurrentStick.getComponent(LineElement));
                    Level.SortLevelOrder();
                    Level.stage = 2;
                }
                if (Level.stage == 2 && !Level.CurrentStick.getComponent(LineElement).CanExtend && !Level.CurrentStick.getComponent(LineElement).Falling) {
                    Level.stage = 0;
                    Player.Run();
                    if (Level.CurrentStick.getComponent(LineElement).LastPos < Level.TargetAt.FirstPos || Level.CurrentStick.getComponent(LineElement).LastPos > Level.TargetAt.LastPos) {
                        Level.MoveTo = Level.CurrentStick.getComponent(LineElement).LastPos;
                        if (Level.MoveTo - Level.PlayerAt.LastPos > 700) {
                            Level.MoveTo = 700;
                        }
                    } else {
                        Level.MoveTo = Level.TargetAt.LastPos;
                    }
                    if (Level.TargetAt.OnCenter(Level.CurrentStick.getComponent(LineElement).LastPos)) {
                        Player.AddScore();
                        FadeAway.PopUp(-300 + Level.TargetAt.EndsAt + (Level.TargetAt.LastPos - Level.TargetAt.FirstPos) / 2);
                        Level.TargetAt.WasVisited = true;
                    }
                }
            }
        }
    }
}
