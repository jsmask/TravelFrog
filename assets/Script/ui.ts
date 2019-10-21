import Game from './game';
import { userInfo, stageType } from './global';
const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {

    game:Game=null;
    money:cc.Label=null;
    outbtn:cc.Node=null;
    housebtn:cc.Node=null;

    stageStatus:string="";

    onLoad () {
        this.money=this.node.getChildByName("sys_clover_window").getChildByName("money").getComponent<cc.Label>(cc.Label);
    }

    start () {
        this.node.active=false;
        this.outbtn=this.node.getChildByName("outbtn");
        this.housebtn=this.node.getChildByName("housebtn");     
        this.render();
    }

    render(){
        if(this.game){
            this.stageStatus=this.game.stageStatus;
            this.node.active=true;
            this.outbtn.active=false;
            this.housebtn.active=false;
            if(this.game.stageStatus===stageType.HOME){
                this.outbtn.active=true;       
            }else{
                this.housebtn.active=true;            
            }
        }
    }

    onOut(){
        this.game&&this.game.onOut()
    }

    onHouse(){
        this.game&&this.game.onHouse()
    }

    onMenu(){

    }

    onShop(){

    }

    upMoney(){
        this.money.node.runAction(
            cc.sequence(
                cc.moveBy(.05,cc.v2(0,10)),
                cc.callFunc(()=>{
                    this.money.string=`${userInfo.money}`;
                }),
                cc.moveBy(.05,cc.v2(0,-10))
            )
        )
    }

    update (dt) {
        if(this.game==null) return;
        if(this.stageStatus!=this.game.stageStatus){
            this.render();
        }
    }
}
