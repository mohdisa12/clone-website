const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var t1= gsap.timeline();

    t1.from("#nav-bar",{
        y : '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelm",{
        y : 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })
    t1.from(".bottom",{
        y : '-10',
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}
var timeout
//skew mouse within a range when mousemove from one point to another
function MouseSkew(){
    var xscale= 1;
    var yscale= 1;

    var xprev= 0;
    var yprev= 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale=gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev= dets.clientX;
        yprev= dets.clientY;
        circleMouseFollower(xscale, yscale);

        timeout= setTimeout(function(){
            document.querySelector("#minicircle").style.transform =` translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100)

    })

}
MouseSkew();
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform =` translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    });
}

firstPageAnim();
var diffrot=0;
var rotate=0;

document.querySelectorAll(".content").forEach(function(ts){
    ts.addEventListener("mouseleave", function(dets){
        gsap.to(ts.querySelector("img"),{
            opacity: 0,
            ease: Power3
        });
    });
    ts.addEventListener("mousemove", function(dets){
        var diff= dets.clientY - ts.getBoundingClientRect().top;
        diffrot= dets.clientX - rotate;
        rotate= dets.clientX;
        gsap.to(ts.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.8)

        })
    });
});