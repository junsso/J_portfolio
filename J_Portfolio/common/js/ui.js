
var mainCanvasBg = function(){
    class Circle {
        constructor({ x = 0, y = 0, radius = 10, ctx, randomSize, color }) {
        this.ctx = ctx;
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.randomSize = randomSize;
        this.angle1 = 0;
        this.angle2 = 0;
    
        this.circleStartAngle = 0;
        this.circleEndAngle = Math.PI * 2;
        this.counterClockWise = false;
    }
    
    update(time, index) {
        this.angle1 += 0.02;
        this.angle2 += 0.06;
    
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(
            this.x + Math.sin(this.angle1 + index) * 3,
            this.y + Math.sin(this.angle2 + index) * 2,
            this.radius,
            this.circleStartAngle,
            this.circleEndAngle,
            this.counterClockWise
        );
        this.ctx.fill();
        this.ctx.closePath();
    }
    }
    
    class Canvas {
    constructor({ canvas }) {
        this.canvas = canvas;
        this._initialSetup();
        this._setCanvasSize();
        this._createCircles();
    
        this.render();
    }
    
    _initialSetup() {
        this.time = 0;
        this.ctx = this.canvas.getContext("2d");
        this.dpi = devicePixelRatio;
        this.colors = ["#f7f7f7", "#cdcdcd"];
    }
    
    _setCanvasSize() {
        this.canvas.style.width = innerWidth + "px";
        this.canvas.style.height = innerHeight + "px";
        this.canvas.width = Math.floor(innerWidth * this.dpi);
        this.canvas.height = Math.floor(innerHeight * this.dpi);
        this.ctx.scale(this.dpi, this.dpi);
    }
    
    _createCircles() {
        this.circles = [];
    
        for (let i = 0; i < 100; i++) {
            const randomX = Math.random() * innerWidth;
            const randomY = Math.random() * innerHeight;
            const randomSize = Math.random() * 20;
            const randomNumber = 20 + Math.random() * 10;
            const randomColor = Math.round(
                Math.random() * this.colors.length - 1
            );
    
            const circle = new Circle({
                x: randomX,
                y: randomY,
                radius: randomSize,
                ctx: this.ctx,
                randomSize: randomNumber,
                color: this.colors[randomColor]
            });
            this.circles.push(circle);
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.001;
    
        this.circles.forEach((circle, index) => {
            circle.update(this.time, index);
        });
    
        requestAnimationFrame(this.render.bind(this));
    }
    }
    
    const canvas = new Canvas({
    canvas: document.querySelector("canvas")
    });
}

mainCanvasBg();
window.addEventListener("resize", function() {
    mainCanvasBg();
})






$('.header .nav ul li a').on('click', function(){
    if($("input[name=toggleCheck]").is(":checked")){
        $("input[name=toggleCheck]").prop("checked",false);
    }
});
// const showNav = gsap.from(".parallax__nav", {
//     yPercent: -200,
//     paused: true,
//     duration: 0.2
// }).progress(1);

// ScrollTrigger.create({
//     start: "top top",
//     end: 99999,
//     onUpdate: (self) => {
//         self.direction === -1 ? showNav.play() : showNav.reverse();
//     }
// });

// let panels = gsap.utils.toArray(".parallax__item");
// let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

// panels.forEach((panel, i) => {
//     ScrollTrigger.create({
//         trigger: panel,
//         start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
//         pin: true, 
//         pinSpacing: false 
//     });
// });

// ScrollTrigger.create({
//     snap: {
//         snapTo: (progress, self) => {
//             let panelStarts = tops.map(st => st.start), 
//             snapScroll = gsap.utils.snap(panelStarts, self.scroll()); 
//             return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); 
//         },
//         duration: 0.5
//     }
// });
