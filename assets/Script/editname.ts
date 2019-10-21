import { userInfo } from './global';
const {ccclass, property} = cc._decorator;

@ccclass
export default class EditName extends cc.Component {

    @property(cc.EditBox)
    nickname: cc.EditBox = null;

    @property(cc.EditBox)
    nicktitle: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onSubmit(){
        let nickname=this.nickname.string;
        let nicktile=this.nicktitle.string;
        if(nickname!=""&&nicktile!=""){
            userInfo.nickname=nickname;
            userInfo.nicktitle=nicktile;
            this.node.destroy();
        }
        
    }

    // update (dt) {}
}
