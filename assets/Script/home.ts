import Game from './game';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property([cc.Prefab])
    rolePreb:cc.Prefab[]=[];

    game:Game=null;

    role:cc.Node=null;
    

    onLoad () {
        
    }

    start () {
        this.render();
    }

    render(){
        this.renderCandle();     
        this.createRole();
    }

    renderCandle(){
        let h=new Date().getHours();

        if(h>=18||h<6){
            this.node.getChildByName("candle1").active=true;
            this.node.getChildByName("candle2").active=true;
        }else{
            this.node.getChildByName("candle1").active=false;
            this.node.getChildByName("candle2").active=false;
        }
    }

    createRole(){
        if(this.role) this.role.destroy();
        this.role=cc.instantiate(this.getRoleAction());
        this.role.setParent(this.node);
    }

    getRoleAction():cc.Prefab{
        let n=~~(Math.random()*this.rolePreb.length);
        return this.rolePreb[n];
    }

    // update (dt) {}
}
