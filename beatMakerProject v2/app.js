class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll('select');
        this.index = 0;
        this.bpm = 160;
        this.isPlaying = null;
    }
    activePad(){
        this.classList.toggle('active');        
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.p${step}`) 
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.2s alternate ease-in-out`;
            if(bar.classList.contains('active')) {
                if(bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();

                }
                if(bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }                        
            }
        })
        this.index++;

    }

    start(){
        const tempo = (60 / this.bpm) * 1000;
        if(!this.isPlaying){
            this.isPlaying = setInterval(()=> {
                this.repeat(); 
            }, tempo)
        }
        else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }

    }

    playBeat(){
        drumKit.start();
    }

    updateBtn(){
        if(this.isPlaying) {
            this.playBtn.innerText = 'Stop';
        } if(!this.isPlaying) {
            this.playBtn.innerText = 'Play'
        }
    }

    changeAudio(e){
    const selectName = e.target.name;
    const selectValue = e.target.value;

        switch(selectName){
            case "kick-select":
                this.kickAudio.src = selectValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectValue;
                console.log(this.hihatAudio.src)
                break;
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', () => {
        pad.style.animation = `none`;
    })
})

drumKit.playBtn.addEventListener('click', () => {
    drumKit.playBeat();
    drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', e => {
        drumKit.changeAudio(e)
    })
})
