class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll('select');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.muteBtns = document.querySelectorAll('.mute'); 
        this.index = 0;
        this.bpm = 90;
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
            this.playBtn.classList.add('active');

        } if(!this.isPlaying) {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
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

    changeTempo(e){
        const tempoText = document.querySelector('.tempo-text');
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
    muteAudio(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
          switch (muteIndex) {
            case "0":
              this.kickAudio.volume = 0;
              break;
            case "1":
              this.snareAudio.volume = 0;
              break;
            case "2":
              this.hihatAudio.volume = 0;
              break;
          }
        } else {
          switch (muteIndex) {
            case "0":
              this.kickAudio.volume = 1;
              break;
            case "1":
              this.snareAudio.volume = 1;
              break;
            case "2":
              this.hihatAudio.volume = 1;
              break;
          }
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

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e) {
    drumKit.updateTempo(e);
})

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', e=> {
        drumKit.muteAudio(e);
    })
})
