const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
const popup = document.querySelector('.copy-container');
const adjustBtn = document.querySelectorAll('.adjust');
const lockBtn = document.querySelectorAll('.lock');
const closeAdjustments = document.querySelectorAll('.close-adjustment');
const sliderContainers = document.querySelectorAll('.sliders');
let initialColors;
//This is for localStorage
let savedPalettes = [];


//Event Listeners
generateBtn.addEventListener('click', ramdomColors);

lockBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        lockColor(index);
    });
})


sliders.forEach(slider => {
    slider.addEventListener('input', hslControls)
});

colorDivs.forEach((div, index) => {
    div.addEventListener('change', () => {
       updateTextUI(index);
    });
});

currentHexes.forEach(hex => {
    hex.addEventListener('click', ()=> {
        copyToClipboard(hex);
    });
});

popup.addEventListener('transitionend', ()=> {
    const popupBox = popup.children[0];
    popup.classList.remove('active');
    popupBox.classList.remove('active');
})

adjustBtn.forEach((btn,index) => {
   btn.addEventListener('click', ()=> {
    openAdjustmentPanel(index);
   }) 
})

closeAdjustments.forEach((btn, index) => {
    btn.addEventListener('click', () => {
    closeAdjustmentPanel(index);

    });
});

// functions

function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}

function ramdomColors() {
    initialColors = [];
    colorDivs.forEach((div,index) =>{
        const hexText = div.children[0];
        const randomColor = generateHex();
        // add it to the array
        if(div.classList.contains('locked')){
            initialColors.push(hexText.innerText);
            return;
        }else {
            initialColors.push(chroma(randomColor).hex())
        }
        initialColors.push(chroma(randomColor).hex());
        //Add the color to the bgc
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //check for contrast
        checkTextContrast(randomColor, hexText);

        //Initialize colorize Sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input");
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue,brightness,saturation);
    });

    resetInputs();
    //Check for button contrast
    adjustBtn.forEach((btn,index) => {
        checkTextContrast(initialColors[index], btn); 
        checkTextContrast(initialColors[index], lockBtn[index]);
    });
}

function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    if(luminance > 0.5) {
        text.style.color = 'black';
    } else {
        text.style.color = 'white';
    }
}

function colorizeSliders(color, hue, brightness,saturation){
    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);

    //scale brightness 
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(['black', midBright, 'white']);



    //Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;

    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)},${scaleBright(1)})`;
    
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204), rgb(204,75,204),rgb(204,75,75))`;
}

function hslControls(e){
    const index = 
    e.target.getAttribute('data-bright') || 
    e.target.getAttribute('data-sat') ||
    e.target.getAttribute('data-hue');

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];    
    const brightness = sliders[1];    
    const saturation = sliders[2];  
    
    const bgColor = initialColors[index];

    // console.log(hue.value, brightness.value, saturation.value)

    let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l', brightness.value)
    .set('hsl.h', hue.value);

    colorDivs[index].style.backgroundColor = color;

    //Colorize inputs/sliders
    colorizeSliders(color,hue, brightness,saturation)
}

function updateTextUI(index) {
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();
    //check Contrast
    checkTextContrast(color, textHex);
    for (const icon of icons) {
        checkTextContrast(color,icon);
    }
}

function resetInputs() {
    const sliders = document.querySelectorAll('.sliders input');
    sliders.forEach(slider => {
        if (slider.name==='hue') {
            const hueColor = initialColors[slider.getAttribute('data-hue')];
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue);
        }
        if (slider.name==='brightness') {
            const brightnessColor = initialColors[slider.getAttribute('data-bright')];
            const brightValue = chroma(brightnessColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
        }
        if (slider.name==='saturation') {
            const saturationColor = initialColors[slider.getAttribute('data-sat')];
            const saturationValue = chroma(saturationColor).hsl()[1];
            slider.value = Math.floor(saturationValue * 100) / 100;
        }
        
    });   
}

function copyToClipboard(hex){
    const copy = navigator.clipboard.writeText(hex.innerText);
    // Popup animation
    const popupBox = popup.children[0];
    popup.classList.add('active');
    popupBox.classList.add('active');

    return copy;
    
}

function openAdjustmentPanel(index) {
    sliderContainers[index].classList.toggle('active')
}

function closeAdjustmentPanel(index) {
    sliderContainers[index].classList.remove('active')
}

function lockColor(index){
    const div = colorDivs[index];
    div.classList.toggle('locked');
    lockBtn[index].innerHTML = div.classList.contains('locked') 
    ? `<i class="fas fa-lock"></i>` 
    : `<i class="fas fa-lock-open"></i>`;
}

//Save palette and localStorage
const saveBtn = document.querySelector('.save');
const submitSave = document.querySelector('.submit-save');
const closeSave = document.querySelector('.close-save');
const saveContainer = document.querySelector('.save-container');
const saveInput = document.querySelector('.save-container input'); 
const libraryContainer = document.querySelector('.library-container');
const libraryBtn = document.querySelector('.library');
const closeLibrarayBtn = document.querySelector('.close-library');

saveBtn.addEventListener('click', openPalette);
closeSave.addEventListener('click', closePalette);
submitSave.addEventListener('click', savePalette);
libraryBtn.addEventListener('click', openLibrary);
closeLibrarayBtn.addEventListener('click', closeLibrary);

function openPalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.add('active');
    popup.classList.add('active');
}

function closePalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.remove('active');
    popup.classList.remove('active');
}

function savePalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.remove('active');
    popup.classList.remove('active');
    const name = saveInput.value;
    const colors = [];
    currentHexes.forEach(hex => {
        colors.push(hex.innerText);
    })

    //Generate object
    let paletteNr;
    const paletteObjects = JSON.parse(localStorage.getItem('palettes'));
    if(paletteObjects){
        paletteNr = paletteObjects.length;
    } else {
        paletteNr = savedPalettes.length;
    }
  
    
    const paletteObj = {name, colors, nr:paletteNr}; 
    savedPalettes.push(paletteObj);

    saveToLocalStorage(paletteObj);
    saveInput.value = '';

    //Generate the palette for library
    const palette = document.createElement('div');
    palette.classList.add('costum-palette');
    const title =  document.createElement('h4');
    title.innerText = paletteObj.name;
    const preview = document.createElement('div');
    preview.classList.add('small-preview');
    paletteObj.colors.forEach(smallColor => {
        const smallDiv = document.createElement('div');
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv); 
    });

    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = "Select";

    //Attach event to the btn
    paletteBtn.addEventListener('click', e => {
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        initialColors = [];
        savedPalettes[paletteIndex].colors.forEach((color,index) => {
            initialColors.push(color);
            colorDivs[index].style.backgroundColor= color;
            const text = colorDivs[index].children[0];
            checkTextContrast(color,text);
            updateTextUI(index);
        });
        resetInputs();
    });
    

    //Append
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    libraryContainer.children[0].appendChild(palette);
}

function saveToLocalStorage(obj) {
    let localPalettes;
    if(localStorage.getItem('palettes') === null) {
        localPalettes =[];
    } else {
        localPalettes = JSON.parse(localStorage.getItem('palettes'));
    }

    
    localPalettes.push(obj);
    localStorage.setItem('palettes',JSON.stringify(localPalettes));
}

function openLibrary(){
    const popup = libraryContainer.children[0];
    popup.classList.add('active');
    libraryContainer.classList.add('active');
}
function closeLibrary(){
    const popup = libraryContainer.children[0];
    popup.classList.remove('active');
    libraryContainer.classList.remove('active');
}

function getLocal(){
    if(localStorage.getItem('palettes') === null) {
        localPalettes =[];
    } else {
        const paletteObjects = JSON.parse(localStorage.getItem('palettes'));
        savedPalettes = [...paletteObjects];
        paletteObjects.forEach(paletteObj => {
            //Generate the palette for library
        const palette = document.createElement('div');
        palette.classList.add('costum-palette');
        const title =  document.createElement('h4');
        title.innerText = paletteObj.name;
        const preview = document.createElement('div');
        preview.classList.add('small-preview');
        paletteObj.colors.forEach(smallColor => {
            const smallDiv = document.createElement('div');
            smallDiv.style.backgroundColor = smallColor;
            preview.appendChild(smallDiv); 
        });

        const paletteBtn = document.createElement('button');
        paletteBtn.classList.add('pick-palette-btn');
        paletteBtn.classList.add(paletteObj.nr);
        paletteBtn.innerText = "Select";

        //Attach event to the btn
        paletteBtn.addEventListener('click', e => {
            closeLibrary();
            const paletteIndex = e.target.classList[1];
            initialColors = [];
            // console.log(paletteObj);
            paletteObjects[paletteIndex].colors.forEach((color,index) => {
                initialColors.push(color);
                console.log(color);
                colorDivs[index].style.backgroundColor= color;
                const text = colorDivs[index].children[0];
                checkTextContrast(color,text);
                updateTextUI(index);
            });
            resetInputs();
        });
    
    //Append
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    libraryContainer.children[0].appendChild(palette);
    });
    }


}

// localStorage.clear()

getLocal();
ramdomColors();