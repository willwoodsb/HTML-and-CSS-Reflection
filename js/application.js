



//owl carousel
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: true
    });
});

//initialize variables for sticky header
const $header = $('.sticky-header');
let stuck = false;
var lastScrollTop = 0, delta = 10;

//scroll event listener for sticky header
$(window).scroll(function(){
    var nowScrollTop = $(this).scrollTop();
    console.log(nowScrollTop, stuck);
    if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
        //if user scrolls all the way to top, unstick
        if (nowScrollTop < 10) {
            $header.removeClass('reveal').removeClass("stuck");
            stuck == false;

        //if not already stuck and user scrolls up before reaching 600px down the page, the header doesn't stick yet
        } else if (nowScrollTop < 600 && stuck == false) {
            
        //scrolling up stick condition
        } else if (nowScrollTop < lastScrollTop && stuck == false) {
            $header.addClass('stuck').addClass('reveal');
            stuck = true;


        //scrolling down unstick condition
        } else if (nowScrollTop > lastScrollTop && stuck == true) {
            $header.removeClass('reveal').css('transition-delay', '.2s');
            setTimeout(function() {
                $header.removeClass("stuck").css('transition-delay', ''); 
                stuck = false;
                console.log(nowScrollTop, stuck);
            }, 300);

        } 


        
        lastScrollTop = nowScrollTop;
    }
});

