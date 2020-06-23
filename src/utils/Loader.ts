class Loader {
    private res: {[id: string]: number} = {}
    private progress = 0;
    constructor() {

    }
    addRes(id: string, progress?:number) {
        this.res[id] = progress === undefined ? 0 : progress
    }
    updateRes(id: string, progress:number) {
        this.res[id] = progress
    }
    getTargetProgress() {
        let sum = 0, target = 0
        for (let key in this.res) {
            sum += this.res[key]
            target += 1
        }
        if(target === 0) return 0
        return sum / target
    }
    getProgress(){
        if(this.progress > 0.999) return 1
        return this.progress
    }
    reset() {
        this.res = {}
    }
    anim() {
        let targetProgress = this.getTargetProgress()
        this.progress += (targetProgress - this.progress) * 0.1
    }

}
const loader =  new Loader()
export default loader