function getOffSet(){
    var _offset = 450;
    var windowHeight = window.innerHeight;

    if(windowHeight > 500) {
      _offset = 400;
    } 
    if(windowHeight > 680) {
      _offset = 300
    }
    if(windowHeight > 830) {
      _offset = 210;
    }

    return _offset;
  }

  function setParallaxPosition($doc, multiplier, $object){
    var offset = getOffSet();
    var from_top = $doc.scrollTop(),
      bg_css = 'right ' +(multiplier * from_top - offset) + '200px';
    $object.css({"background-position" : bg_css });
  }

  // Parallax 
     
  var background_image_parallax = function($object, multiplier, forceSet){
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);
    // $object.css({"background-attatchment" : "fixed"});

    if(forceSet) {
      setParallaxPosition($doc, multiplier, $object);
    } else {
      $(window).scroll(function(){          
        setParallaxPosition($doc, multiplier, $object);
      });
    }
  };

  var background_image_parallax_2 = function($object, multiplier){
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);
    $object.css({"background-attachment" : "fixed"});
    
    $(window).scroll(function(){
      if($(window).width() > 768) {
        var firstTop = $object.offset().top,
            pos = $(window).scrollTop(),
            yPos = Math.round((multiplier * (firstTop - pos)) - 186);              

        var bg_css = 'center ' + yPos + 'px';

        $object.css({"background-position" : bg_css });
      } else {
        $object.css({"background-position" : "center" });
      }
    });
  };
  
  $(function(){

    background_image_parallax($(".tm-parallax"), 0.80, false);
    background_image_parallax_2($("#contact"), 0.80);   
    background_image_parallax_2($("#About"), 0.80);   
    
    window.addEventListener('resize', function(){
      background_image_parallax($(".tm-parallax"), 0.30, true);
    }, true);

    //update navbar
    $(window).scroll(function(e){          
      if($(document).scrollTop() > 120) {
        $('.tm-navbar').addClass("scroll");
      } else {
        $('.tm-navbar').removeClass("scroll");
      }
    });
    
    // Close menu after click 
    $('#tmNav a').on('click', function(){
      $('.navbar-collapse').removeClass('show'); 
    })

    // scroll animation
    $('#tmNav').singlePageNav({
      'easing': 'easeInOutExpo',
      'speed': 30
    });        
    
    // smooth scroll
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 30, 'easeInOutExpo', function(){
          window.location.hash = hash;
        });
      } 
    });

    // Pop up
    $('.tm-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true }
    });

    $('.tm-About-carousel').slick({
      dots: true,
      prevArrow: false,
      nextArrow: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, 
        {
          breakpoint: 480,
          settings: {
              slidesToShow: 1
          }                 
        }
      ]
    });

    // Gallery
    $('.tm-gallery').slick({
      dots: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    });
  });