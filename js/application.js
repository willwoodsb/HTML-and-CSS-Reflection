



//owl carousel set-up
$(document).ready(function(){
    $('#banner-img').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: true
    });
    $('#accreditation').owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      dots: false,
      autoWidth: true,
      margin: 50
  });
});

//initialize variables for sticky header
const $header = $('.sticky-header');
let stuck = false;
var lastScrollTop = 0, delta = 10;

//scroll event listener for sticky header
$(window).scroll(function(){
    var nowScrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - nowScrollTop) >= delta && left == false){
        //if user scrolls all the way to top, unstick
        if (nowScrollTop < 10) {
            $header.removeClass('reveal').removeClass("stuck");
            stuck = false;

        //if not already stuck and user scrolls up before reaching 600px down the page, the header doesn't stick yet
        } else if (nowScrollTop < 600 && stuck == false) {
        //scrolling up stick condition
        } else if (nowScrollTop < lastScrollTop && stuck == false) {
            $header.addClass('stuck').addClass('reveal').css('transition', '.5s');
            stuck = true;
            setTimeout(function() {
              $header.css('transition', '')
            }, 500);


        //scrolling down unstick condition
        } else if (nowScrollTop > lastScrollTop && stuck == true) {
            $header.removeClass('reveal').css('transition', '.5s');
            setTimeout(function() {
                $header.removeClass("stuck").css('transition', ''); 
            }, 200);
            setTimeout(function() {
              stuck = false;
            }, 300);

        } 


        
        lastScrollTop = nowScrollTop;
    }
});

//---------------------
//cookie popup
//---------------------

//on document load (setTimeout added just to make it look smoother)
$(document).ready(function(){
  disableScroll();
  setTimeout(function() {
    // set cookies
    var cookieName= "CookieConsent";
    var cookieValue="Accepted";
    var cookieExpireDays= 30;

    // when users click the accept button
    let acceptCookie= document.getElementById("acceptCookie");
    acceptCookie.onclick= function(){
        createCookie(cookieName, cookieValue, cookieExpireDays);
    }
    // function to set cookie in web browser
    let createCookie= function(cookieName, cookieValue, cookieExpireDays){
      let currentDate = new Date();
      currentDate.setTime(currentDate.getTime() + (cookieExpireDays*24*60*60*1000));
      let expires = "expires=" + currentDate.toGMTString();
      document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
      if(document.cookie){
        document.getElementById("cookiePopup-overlay").style.display = "none";
        document.getElementById("cookiePopup").style.display = "none";
        enableScroll();
      }else{
        alert("Unable to set cookie. Please allow all cookies site from cookie setting of your browser");
      }
    }
    // retrieve specific cookie from web browser
    let getCookie= function(cookieName){
      let name = cookieName + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    // check to see if the cookie has been set or not (and therefore if should display consent box or not)
    let checkCookie= function(){
      let check=getCookie(cookieName);
      if(check==""){
          document.getElementById("cookiePopup-overlay").style.display = "block";
          document.getElementById("cookiePopup").style.display = "block";
          
      }else{
          document.getElementById("cookiePopup-overlay").style.display = "none";
          document.getElementById("cookiePopup").style.display = "none";
          enableScroll();
      }
    }
  checkCookie();
  }, 300);
});


//functions to enable and disable scrolling when cookie popup opens and closes
function disableScroll() {
  if ($(document).height() > $(window).height()) {   
    $('html').addClass('noscroll');       
  }
}

function enableScroll() {
  $('html').removeClass('noscroll');
}


//-----------------
//hamburger menu
//-----------------

const $hamburger = $('.hamburger');
let left = false;
const $contentToSlide = $('.content-wrapper, #hamburger-menu');
const $hamMenu = $('#hamburger-menu');
let scrollPos;

$hamburger.click(function($e) {

  //if the menu is hidden (i.e. not to the left) run this code
  if (left == false) {
    //set left to true and get the scroll position
    left = true;
    scrollPos = $(document).scrollTop();

    //css properties added like this rather than in classes to make properly animating it easier 
    $contentToSlide
      .css('transition', '.5s ease')
      .addClass('slide-left')
      .addClass('noscroll');
    $('.content-wrapper').css('top', -scrollPos);
    $('#grey-out').css('top', scrollPos);
    if (scrollPos>=600) {
      $header.css('top', scrollPos-300);
    }
    $header
      .css('z-index', '1000')
      .css('position', 'fixed')
      .css('width', '100%');
    
    $hamburger.addClass('is-active');

    $('#grey-out').css('display', 'block').css('transition', '.5s ease');
    //this timeout is just here so the animation of the fading color gets properly triggered 
    setTimeout(function() {
      $('#grey-out').css('background-color','rgba(0,0,0,0.7)');
    }, 1);

  //run this code if menu is out already - mostly just reversing properties set in previous 
  //stage but using setTimeout to do so at the proper times according to the animation sequence
  } else {
    $contentToSlide.removeClass('slide-left');
    $hamburger.removeClass('is-active');

    $('#grey-out').css('background-color', '');

    //this block of code will run after the sliding animation is complete
    setTimeout(function() {
      $('#grey-out').css('top', '');
      $('.content-wrapper').css('top', '');
      $contentToSlide.css('transition', '').removeClass('noscroll');
      $('#grey-out').css('display', '').css('transition', '');
      $(window).scrollTop(scrollPos);
      $header
        .css('position', '')
        .css('z-index', '')
        .css('top', '')
        .css('width', '');
      left = false;
    }, 500);
    console.log(scrollPos);
  }

});




