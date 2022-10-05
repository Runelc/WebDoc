const sections = document.querySelectorAll("section");

let currentSection = 0;
let isScrolling = false;


window.onresize = () => {
    sections[currentSection].scrollIntoView();
}

window.onbeforeunload = function () {
    if(window.scrollTo) window.scrollTo(0,0);
};

window.addEventListener("keydown", fullPageClick)

const bubbles = document.querySelectorAll(".bubble");


let bubbleNum = 0;

bubbles.forEach(bubble => {
    let num = bubbleNum;
    bubble.addEventListener("click", () => {
        currentSection = num;
        sections[num].scrollIntoView({behavior: "smooth"});
        changeBubbles()

    })
    bubbleNum++
})

function changeBubbles() {
    if(currentSection >= 3) return;
    bubbles.forEach(bubble => {
        bubble.classList.remove("currentPage")
    })
    bubbles[currentSection].classList.toggle("currentPage")
}


function clickSection() {
    sections[currentSection].scrollIntoView({behavior: "smooth"});
    setTimeout(() => {
        isScrolling = false;
    }, 700);
}

function fullPageClick(event) {
    if (isScrolling) return;
    
    if (event.key == "ArrowDown") {
        if (currentSection >= 2) return;
        if (currentSection == sections.length - 1) return;
        isScrolling = true;
        currentSection++
        changeBubbles()
    }
    else if(event.key == "ArrowUp"){
        if (currentSection === 0) return;
        isScrolling = true;
        currentSection--
        changeBubbles()
    }
    clickSection();
}

function arrowClick(){
    currentSection++
    sections[currentSection].scrollIntoView({behavior: "smooth"});
    changeBubbles()
}

const intro = document.getElementById("introVid");

intro.onended = function(){
    document.getElementById("intro").classList.add("videoFade")
    setTimeout(() => {
        document.getElementById("intro").remove();
    }, 400);
}



function playVid() { 
    const niclasVid = document.getElementById("niclas-video"); 
    niclasVid.addEventListener("click", playVid)
    niclasVid.volume = 0.25;
    document.querySelector(".skip").style.display = "block"

    niclasVid.onended = () => {
        document.querySelector(".spil-overlay").classList.toggle("show-spil-overlay");
        
    }

    if (niclasVid.paused) {
        niclasVid.play();
        console.log("play")
    }
    else{
        niclasVid.pause();
        console.log("pause")
    }
}

function replayVid() {
    const niclasVid = document.getElementById("niclas-video"); 
    document.querySelector(".spil-overlay").classList.toggle("show-spil-overlay");
    niclasVid.currentTime = 0;
    playVid();
}

function skipVid() {
    const niclasVid = document.getElementById("niclas-video");
    document.querySelector(".skip").style.display = "none"
    niclasVid.currentTime = niclasVid.duration - 0.5;
    niclasVid.play();
}

function removeOverlay() {
    const overlay = document.querySelector(".video_overlag");
    overlay.style.display = "none";
}

function nextRule() {
    const nextSlide = document.getElementById("tree");
    const thisSlide = document.getElementById("ikoner");
    thisSlide.classList.add("hide-ikoner")
    nextSlide.style.display = "block";
    setTimeout(() => {
        thisSlide.style.display = "none";
        nextSlide.classList.add("show-tree")
        document.getElementById("info-pil").style.display = "block"
    }, 200);
}

function prevRule() {
    const nextSlide = document.getElementById("ikoner");
    const thisSlide = document.getElementById("tree");
    thisSlide.classList.remove("show-tree")
    setTimeout(() => {
        nextSlide.style.display = "block";
    }, 200);
    setTimeout(() => {
        thisSlide.style.display = "none";
        nextSlide.classList.remove("hide-ikoner")
    }, 300);
}

function startGame() {
    document.getElementById("bubbles").style.display = "none";
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.classList.toggle("scene-skift");
    setTimeout(() => {
        currentSection++
        sections[currentSection].scrollIntoView()
    }, 500);
    setTimeout(() => {
        div.remove()
    }, 1100);
}




/* VINDER VIDEO - niclasVid2*/



function playVidDone() { 
    const niclasVidDone = document.getElementById("niclas-video-done"); 
    niclasVidDone.addEventListener("click", playVidDone)
    niclasVidDone.volume = 0.25;
    document.querySelector(".skip-done").style.display = "block"

    niclasVidDone.onended = () => {
        document.querySelector(".spil-overlay-done").classList.toggle("show-spil-overlay-done");
    }

    if (niclasVidDone.paused) {
        niclasVidDone.play();
        console.log("play")
    }
    else{
        niclasVidDone.pause();
        console.log("pause")
    }
    
}

function replayVidDone() {
    const niclasVidDone = document.getElementById("niclas-video-done"); 
    document.querySelector(".spil-overlay-done").classList.toggle("show-spil-overlay-done");
    niclasVidDone.currentTime = 0;
    playVidDone();
}

function skipVidDone() {
    const niclasVidDone = document.getElementById("niclas-video-done");
    document.querySelector(".skip-done").style.display = "none"
    niclasVidDone.currentTime = niclasVidDone.duration - 0.5;
    niclasVidDone.play();
    
}

function removeOverlayDone() {
    const overlaydone = document.querySelector(".video_overlag_done");
    overlaydone.style.display = "none";
}

function credits() {
    currentSection = 9;
    sections[currentSection].scrollIntoView({behavior: "smooth"})
}


function playStifinder(sti, nextSection) {
    const stifinderURL = "images/stifinder_videoer/stifinder_";
    const stifinderArray = [
        "start.webm",
        /* UNI = venstre arm  */
        "1.webm",
        "1_1.webm",
        "1_2.webm",
        "1_3.webm",
        /* EAAA = Højre arm */
        "2.webm",
        "2_1.webm",
        "2_2.webm",
        "2_3.webm",
        "win.webm"
    ]
    const stifinder = document.getElementById("stifinder");
    const stifinderVid = document.getElementById("stifinder-vid");

    stifinderVid.src = stifinderURL + stifinderArray[sti];
    stifinder.classList.toggle("stifinderAnim");

    stifinderVid.oncanplay = () => {
        setTimeout(() => {
            stifinderVid.play();
        }, 500);
    }

    stifinderVid.onended = () => {
        currentSection = nextSection;
        sections[currentSection].scrollIntoView();
        setTimeout(() => {
            stifinder.classList.toggle("stifinderAnim");
            setTimeout(() => {
                stifinderVid.src = "";
            }, 300);
        }, 600);
    } 
}

/* Valg af instituation til uddannelse  */
function skoleValg(skole) {
    if (skole === 1) {
        playStifinder(1, 6);
    }
    else{
        playStifinder(5, 5);
    }
}

/* Valg af uddannelse til rigtig eller forkert valg */
function uddValg(uddannelse) {
    const uddannelser = [
        'Datamatiker', 
        'Multimediedesigner',
        'Markedsføringsøkonom',
        'IT-produktudvikling', 
        'Informationsvidenskab',
        'International virksomhedskommunikation'
    ]
 
    const skoleBillede = document.querySelector(".skole-billede");
    const uddannelsesNavn = document.getElementById("udd-navn");

    const auURL = "images/niclas-ked-au.webp";
    const eaaaURL = "images/niclas-ked-eaaa.webp";

    switch (uddannelse) {
        case 0:
            playStifinder(6, 7);

            uddannelsesNavn.textContent=uddannelser[uddannelse];
            skoleBillede.src = eaaaURL
            skoleBillede.alt = "Niclas ked ved EAAA"
            break;
        case 1:
            playStifinder(7, 8);
            break;
        case 2:
            playStifinder(8, 7);
            uddannelsesNavn.textContent=uddannelser[uddannelse];
            skoleBillede.src = eaaaURL
            skoleBillede.alt = "Niclas ked ved EAAA"
            break;
        case 3:
            playStifinder(2, 7);
            uddannelsesNavn.textContent=uddannelser[uddannelse];
            skoleBillede.src = auURL
            skoleBillede.alt = "Niclas ked ved AU"
            break;
        case 4:
            playStifinder(3, 7);
            uddannelsesNavn.textContent=uddannelser[uddannelse];
            skoleBillede.src = auURL
            skoleBillede.alt = "Niclas ked ved AU"
            break;
        case 5:
            playStifinder(4, 7);
            uddannelsesNavn.textContent=uddannelser[uddannelse];
            skoleBillede.src = auURL
            skoleBillede.alt = "Niclas ked ved AU"
            break;

        default:
            break;
    }
}

function retry() {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.classList.toggle("scene-skift");
    setTimeout(() => {
        currentSection = 4;
        sections[currentSection].scrollIntoView()
    }, 500);
    setTimeout(() => {
        div.remove()
    }, 1100);
}




