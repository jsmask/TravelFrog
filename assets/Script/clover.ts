import Game from './game';
import { userInfo } from './global';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Clover extends cc.Component {

    @property([cc.SpriteFrame])
    typeSpriteFrame:cc.SpriteFrame[]=[];

    game:Game=null;

    isActive:boolean=false;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            if(this.isActive) return;
            this.isActive=true;
            
            this.runAction();

        },this);
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            if(this.isActive) return;

        },this);
    }

    setSpriteName(type:number){
        this.node.getComponent<cc.Sprite>(cc.Sprite).spriteFrame=this.typeSpriteFrame[type];
    }

    runAction(){
        this.game.cloverTapAudio&&this.game.cloverTapAudio.play();
        userInfo.money+=5;
        this.node.runAction(cc.sequence(
            cc.scaleBy(.1,1.2),
            cc.callFunc(()=>{
                this.game.ui.upMoney();
            }),
            cc.spawn(
                cc.moveBy(.2,cc.v2(0,55)),
                cc.fadeOut(.3)
            ),
            cc.callFunc(()=>{
                this.node.destroy();
            })
        ))
    }

    start () {

    }

    // update (dt) {}
}
