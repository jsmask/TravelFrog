import Game from './game';
import Clover from './clover';
import { userInfo } from './global';
const { ccclass, property } = cc._decorator;

interface cloverTemp {
    x: number,
    y: number,
    type: number
}

@ccclass
export default class Stage extends cc.Component {

    @property(cc.Prefab)
    clover: cc.Prefab = null;

    camera: cc.Camera = null;

    game: Game = null;

    @property([cc.SpriteFrame])
    bgTypeFrame:cc.SpriteFrame[]=[];

    roleBox:cc.Node=null;
    cloverBox: cc.Node = null;
    cloverData: cloverTemp[] = [
        { x: -181, y: 72, type: 0 },
        { x: 140, y: 114, type: 0 },
        { x: 78, y: 59, type: 0 },
        { x: -36, y: 45, type: 0 },
        { x: 226, y: 109, type: 0 },
        { x: 15, y: 12, type: 1 },
        { x: 177, y: 70, type: 1 },
        { x: 139, y: 20, type: 1 },
        { x: -121, y: 30, type: 0 },
        { x: 87, y: -19, type: 1 },
        { x: -83, y: 0, type: 1 },
        { x: 238, y: 40, type: 1 },
        { x: -228, y: 47, type: 1 },
        { x: -15, y: -36, type: 1 },
        { x: -176, y: 12, type: 1 }
    ];
    
    snail:cc.Node=null;

    onLoad() {
        this.camera = this.node.getChildByName("Stage Camera").getComponent<cc.Camera>(cc.Camera);
        this.cloverBox = this.node.getChildByName("bg").getChildByName("cloverBox");

        this.roleBox=this.node.getChildByName("bg").getChildByName("roleBox");
        this.snail=this.roleBox.getChildByName("snail");
        
        this.node.getChildByName("bg").on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            let left = this.camera.node.x;
            left -= event.getDeltaX();
            this.camera.node.x = Math.max(Math.min(left, 0), -384);
        }, this);
    }

    start() {
        this.render();
    }

    render(){
        this.renderBackGroud();
        this.renderClover();
        this.renderMail();
        this.ariseRole();
    }

    renderBackGroud(){
        let h=new Date().getHours();
        let bg=this.node.getChildByName("bg").getComponent<cc.Sprite>(cc.Sprite);
        if(h>=18||h<6){
            bg.spriteFrame=this.bgTypeFrame[1];
        }else{
            bg.spriteFrame=this.bgTypeFrame[0];
        }
    }

    ariseRole(){
        if(this.snail.active) this.snail.active=false;
        if(~~(Math.random()*10)<3){
            if(!this.snail.active) this.snail.active=true;
        }
    }

    renderClover() {
        this.cloverBox.children.forEach((node:cc.Node)=>{
            node.destroy();
        })
        this.cloverData.forEach((data: cloverTemp) => {
            this.createClover(data);
        })
    }

    renderMail(){
        if(userInfo.mail==null) return;
        this.createMail();
    }

    createMail(){
        cc.loader.loadRes("preb/mail",(err,prefab:cc.Prefab)=>{
            if(err) return;
            let mail=cc.instantiate(prefab);
            mail.setParent(this.node.getChildByName("bg"));
        })
    }

    createClover(data: cloverTemp) {
        let cr = cc.instantiate(this.clover).getComponent<Clover>(Clover);
        cr.game=this.game;
        cr.node.setParent(this.cloverBox);
        cr.node.setPosition(cc.v2(data.x, data.y));
        cr.setSpriteName(data.type);    
    }

    // update (dt) {}
}
