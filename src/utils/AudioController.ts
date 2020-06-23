/* eslint-disable */
import {Howl, Howler} from 'howler';
 

class AudioController {
    private publicPath = process.env.PUBLIC_URL
    private prefix = this.publicPath + '/audios/'
    private config = [
        {key: ''},
    ]
    private sound:{[id:string]: Howl} = {}
    constructor() {
        for(let i = 0 ; i < this.config.length ; i++) {
            let key = this.config[i].key;
            this.sound[key] = new Howl({
                src: [this.prefix + `${key}.mp3`],
            });
        }
        // Loop 参数失效；采取蠢办法
        // this.sound['walk'] = new Howl({
        //     src: [this.prefix + `walk.mp3`],
        //     onend: () => {
        //         this.play('walk');
        //     }
        // });
    }
    play(key: string) {
        if(this.sound.hasOwnProperty(key)) {
            console.log('play', key)
            this.sound[key].play();
        }
    }
    stop(key: string) {
        if(this.sound.hasOwnProperty(key)) {
            this.sound[key].stop();
        }
    }
    stopAllExceptBGM() {
        for (let key in this.sound) {
            if(key != 'bgm') {
                this.sound[key].stop();
            }
        }
    }
    setEnabled(enabled: boolean) {
        if(enabled) {
            Howler.volume(0.5);
        } else {
            Howler.volume(0);
        }
    }
}
const audioController = new AudioController()
export default audioController