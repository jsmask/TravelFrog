import Game from './game';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Load extends cc.Component {

    @property(cc.Sprite)
    progressBar:cc.Sprite=null;

    prebdata:string[]=[];

    num:number=0;

    game:Game=null;
    

    onLoad () {
        this.game=this.node.parent.getComponent<Game>(Game);
        this.prebdata=this.game.loadPrebs;
        this.loadData(this.prebdata[this.num]);      
    }

    loadData(name:string){
        this.loadRes(name).then((prefab:cc.Prefab)=>{
            this.game.partdata[this.prebdata[this.num]]=prefab;      
            this.num++;
            if(this.num>=this.prebdata.length){
                this.loadComplete();
            }else{
                this.loadData(this.prebdata[this.num]);
            }
            this.reader();  
        });
    }

    loadComplete(){
        this.game.loadComplete();
        this.node.destroy();
    }

    start () {

    }

    reader(){
        this.progressBar.fillRange=this.num/this.prebdata.length;
    }

    loadRes(name){
        cc.log(name)
        return new Promise((resolve,reject)=>{
            cc.loader.loadRes(`preb/${name}`, (err, prefab)=>{
                if(err) reject(err);        
                resolve(prefab);
            });
        })
    }

    // update (dt) {}
}
