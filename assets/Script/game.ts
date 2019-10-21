const {ccclass, property} = cc._decorator;
import UI from './ui';
import Home from './home';
import Stage from './stage';
import { system, stageType } from './global';

@ccclass
export default class Game extends cc.Component {

    loadPrebs:string[]=["ui",'home',"stage","bgm","cloverTapAudio","editname"];

    partdata:any={};

    bgm:cc.AudioSource=null;
    stage:Stage=null;
    home:Home=null;
    ui:UI=null;
    cloverTapAudio:cc.AudioSource=null;

    editname:cc.Node=null;

    stageStatus:string=stageType.HOME;

    during:number=0;

    onLoad () {}

    start () {

    }

    createNode(prefab:cc.Prefab):cc.Node{
        let node = cc.instantiate(prefab);
        node.setParent(this.node);
        return node;
    }

    loadComplete(){

        this.stageStatus=stageType.HOME;

        this.bgm=this.createNode(this.partdata["bgm"]).getComponent<cc.AudioSource>(cc.AudioSource);
        this.cloverTapAudio=this.createNode(this.partdata["cloverTapAudio"]).getComponent<cc.AudioSource>(cc.AudioSource);
       
        this.createStage();

        this.createHome();

        this.createUI();

        this.createEditName();
        
    }

    createHome(){
        this.home=this.createNode(this.partdata["home"]).getComponent<Home>(Home);
        this.home.game=this;
    }

    createEditName(){
        this.editname=this.createNode(this.partdata["editname"]);
    }

    createStage(){
        this.stage=this.createNode(this.partdata["stage"]).getComponent<Stage>(Stage);
        this.stage.game=this;
        this.stage.node.active=false;
    }

    createUI(){
        this.ui = this.createNode(this.partdata["ui"]).getComponent<UI>(UI);
        this.ui.game=this; 
    }

    onOut(){
        this.stageStatus=stageType.STAGE;
        if(this.home.node.active) this.home.node.active=false;
        if(!this.stage.node.active) this.stage.node.active=true; 
    }

    onHouse(){
        this.stageStatus=stageType.HOME;
        if(this.stage.node.active) this.stage.node.active=false;
        if(!this.home.node.active) this.home.node.active=true;
        this.home.render();
    }

    update (dt) {
        system.time-=dt
        if(system.time<=0){
            system.time=system.fill;
            this.stage.render();        
        }
    }
}
