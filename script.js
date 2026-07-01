/* =====================================================
   CHERRY RED BIRTHDAY WEBSITE
   script.js
   PART 1
===================================================== */

// ---------- Elements ----------

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");

const hero = document.getElementById("hero");

const title = document.getElementById("title");

const shine = document.querySelector(".shine");

const beginButton = document.getElementById("beginButton");

const cursorGlow = document.getElementById("cursorGlow");

// ---------- Timeline ----------

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startExperience(){

    // Initial state

    hero.style.opacity = "0";
    hero.style.transform = "scale(.98)";

    // Wait before first message

    await wait(800);

    // Fade intro in

    introText.style.transition =
        "opacity 1.8s ease, transform 1.8s ease";

    introText.style.opacity = "1";
    introText.style.transform = "translateY(0px)";

    // Hold

    await wait(2600);

    // Fade out

    introText.style.opacity = "0";
    introText.style.transform = "translateY(-15px)";

    await wait(1600);

    // Hide intro screen

    intro.style.display = "none";

    // Reveal hero

    hero.style.transition =
        "opacity 2s ease, transform 2s ease";

    hero.style.opacity = "1";
    hero.style.transform = "scale(1)";

    // Start shimmer after reveal

    setTimeout(runShimmer,900);

}

window.addEventListener("load",startExperience);

// ---------- Title Shimmer ----------

function runShimmer(){

    if(!shine) return;

    shine.animate(

        [

            {left:"-120%"},

            {left:"160%"}

        ],

        {

            duration:2600,

            easing:"ease",

            fill:"forwards"

        }

    );

}

// ---------- Begin Button ----------

beginButton.addEventListener("click",()=>{

    document.body.animate(

        [

            {

                opacity:1,

                transform:"scale(1)"

            },

            {

                opacity:0,

                transform:"scale(1.04)"

            }

        ],

        {

            duration:1500,

            easing:"ease-in-out",

            fill:"forwards"

        }

    );

    setTimeout(()=>{

        alert("✨ Page 2 will be added next! ✨");

    },1500);

});
/* =====================================================
   CHERRY RED BIRTHDAY WEBSITE
   script.js
   PART 2
===================================================== */

// =====================================================
// CURSOR GLOW (Smooth Follow)
// =====================================================

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateCursorGlow(){

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";

    requestAnimationFrame(animateCursorGlow);

}

animateCursorGlow();


// =====================================================
// HERO SLOW CINEMATIC ZOOM
// =====================================================

let heroScale = 1;

function cinematicZoom(){

    heroScale += 0.000015;

    if(heroScale > 1.03){

        heroScale = 1;

    }

    hero.style.transform = `scale(${heroScale})`;

    requestAnimationFrame(cinematicZoom);

}

cinematicZoom();


// =====================================================
// TITLE FLOAT
// =====================================================

let floatTime = 0;

function floatingTitle(){

    floatTime += 0.015;

    const y = Math.sin(floatTime) * 5;

    title.style.transform = `translateY(${y}px)`;

    requestAnimationFrame(floatingTitle);

}

floatingTitle();


// =====================================================
// BUTTON HOVER GLOW
// =====================================================

beginButton.addEventListener("mouseenter",()=>{

    beginButton.animate(

        [

            {

                letterSpacing:"5px",

                opacity:1

            },

            {

                letterSpacing:"8px",

                opacity:0.92

            }

        ],

        {

            duration:250,

            fill:"forwards"

        }

    );

});

beginButton.addEventListener("mouseleave",()=>{

    beginButton.animate(

        [

            {

                letterSpacing:"8px"

            },

            {

                letterSpacing:"5px"

            }

        ],

        {

            duration:250,

            fill:"forwards"

        }

    );

});


// =====================================================
// SUBTITLE FADE
// =====================================================

const subtitle = document.querySelector(".subtitle");

subtitle.animate(

    [

        {

            opacity:0.82

        },

        {

            opacity:1

        },

        {

            opacity:0.82

        }

    ],

    {

        duration:5000,

        iterations:Infinity,

        easing:"ease-in-out"

    }

);


// =====================================================
// REPEAT SHIMMER EVERY 10 SECONDS
// =====================================================

setInterval(runShimmer,10000);
/* =====================================================
   CHERRY RED BIRTHDAY WEBSITE
   script.js
   PART 3
===================================================== */

// =====================================================
// PARTICLE SYSTEM
// =====================================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

const particles = [];

const PARTICLE_COUNT = 35;

class Particle{

    constructor(){

        this.reset();

        this.y = Math.random() * canvas.height;

    }

    reset(){

        this.x = Math.random() * canvas.width;

        this.y = canvas.height + Math.random()*100;

        this.radius = Math.random()*2 + 0.5;

        this.speed = Math.random()*0.25 + 0.08;

        this.opacity = Math.random()*0.35 + 0.05;

        this.swing = Math.random()*100;

    }

    update(){

        this.y -= this.speed;

        this.swing += 0.015;

        this.x += Math.sin(this.swing) * 0.15;

        if(this.y < -20){

            this.reset();

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fillStyle = `rgba(219,44,69,${this.opacity})`;

        ctx.shadowColor = "#db2c45";

        ctx.shadowBlur = 8;

        ctx.fill();

    }

}

for(let i=0;i<PARTICLE_COUNT;i++){

    particles.push(new Particle());

}

function animateParticles(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();


// =====================================================
// WINDOW RESIZE
// =====================================================

window.addEventListener("resize",resizeCanvas);
/* =====================================================
   CHERRY RED BIRTHDAY WEBSITE
   script.js
   PART 4
===================================================== */

// =====================================================
// BACKGROUND GLOW PARALLAX
// =====================================================

const leftGlow = document.querySelector(".gradient-left");
const rightGlow = document.querySelector(".gradient-right");

let glowTargetX = 0;
let glowTargetY = 0;

window.addEventListener("mousemove", (e) => {

    glowTargetX = (e.clientX / window.innerWidth - 0.5) * 40;
    glowTargetY = (e.clientY / window.innerHeight - 0.5) * 40;

});

let glowCurrentX = 0;
let glowCurrentY = 0;

function animateGlow(){

    glowCurrentX += (glowTargetX - glowCurrentX) * 0.04;
    glowCurrentY += (glowTargetY - glowCurrentY) * 0.04;

    leftGlow.style.transform =
        `translate(${glowCurrentX}px, ${glowCurrentY}px)`;

    rightGlow.style.transform =
        `translate(${-glowCurrentX}px, ${-glowCurrentY}px)`;

    requestAnimationFrame(animateGlow);

}

animateGlow();


// =====================================================
// HERO FADE WHEN TAB IS HIDDEN
// =====================================================

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        hero.style.filter = "brightness(.8)";

    }else{

        hero.style.filter = "brightness(1)";

    }

});


// =====================================================
// TITLE LETTER GLOW PULSE
// =====================================================

const titleLetters = document.querySelectorAll("#title span");

setInterval(()=>{

    titleLetters.forEach(letter=>{

        letter.animate(

            [
                {
                    textShadow:"0 0 10px rgba(177,18,38,.15)"
                },
                {
                    textShadow:"0 0 28px rgba(219,44,69,.35)"
                },
                {
                    textShadow:"0 0 10px rgba(177,18,38,.15)"
                }
            ],

            {
                duration:3500,
                easing:"ease-in-out"
            }

        );

    });

},4500);


// =====================================================
// BUTTON CLICK RIPPLE
// =====================================================

beginButton.addEventListener("click",(e)=>{

    const ripple = document.createElement("span");

    ripple.style.position = "absolute";
    ripple.style.left = (e.offsetX - 5) + "px";
    ripple.style.top = (e.offsetY - 5) + "px";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(219,44,69,.6)";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(1)";

    beginButton.appendChild(ripple);

    ripple.animate(

        [
            {
                transform:"scale(1)",
                opacity:0.8
            },
            {
                transform:"scale(18)",
                opacity:0
            }
        ],

        {
            duration:700,
            easing:"ease-out"
        }

    );

    setTimeout(()=>{

        ripple.remove();

    },700);

});


// =====================================================
// SUBTITLE FLOAT
// =====================================================

let subtitleTime = 0;

function animateSubtitle(){

    subtitleTime += 0.01;

    const y = Math.sin(subtitleTime) * 3;

    subtitle.style.transform = `translateY(${y}px)`;

    requestAnimationFrame(animateSubtitle);

}

animateSubtitle();


// =====================================================
// RANDOM SHIMMER TIMING
// =====================================================

function randomShimmer(){

    runShimmer();

    const next = 8000 + Math.random() * 6000;

    setTimeout(randomShimmer,next);

}

setTimeout(randomShimmer,12000);
