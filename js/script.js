function disableBodyScroll() {
    $("body").css("margin-right", window.innerWidth - $("body").width()).addClass("noScroll")
}

function enableBodyScroll() {
    $("body").css("margin-right", 0).removeClass("noScroll");
    $("html").css("overflow", "visible").css("position", "static");
    $("html,body").animate({
        scrollTop: currentScrollPos
    })
}

function scrollToTheNextSlide(e, t, n) {
    $("html, body").stop(true, true).animate({
        scrollTop: $(e).offset().top
    }, t, "easeInOutExpo")
}

function setUrl(e) {
    window.location.hash = e
}

function getUrl() {
    var e = window.location.href.match(/([^/])+/g);
    return e[e.length - 1]
}

function cleanUrl() {
    var e, t, n = window.location;
    if ("pushState" in history) history.pushState("", document.title, n.pathname + n.search);
    else {
        e = document.body.scrollTop;
        t = document.body.scrollLeft;
        n.hash = "";
        document.body.scrollTop = e;
        document.body.scrollLeft = t
    }
}

function validateEmail(e) {
    var t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return t.test(e)
}

function valid(e) {
    if ($.trim($(e).val()).length > 0) {
        $(e).css("border", "1px solid #dadada");
        if (e.attr("name") == "email") {
            if (validateEmail(e.val())) {
                $(e).css("border", "1px solid #dadada")
            } else {
                $(e).css("border", "1px solid red");
                return false
            }
        }
        return true
    } else {
        $(e).css("border", "1px solid red");
        return false
    }
}

function clearInputs() {
    $("form[name='contact'] .inputS,form[name='contact'] textarea").val("")
}
$(document).ready(function() {
    function u() {
        if (parseInt($("#ld_pc").html(), null) == 100) {
            clearInterval(o);
            enableBodyScroll();
            $("#loader").fadeOut(1e3);
            return false
        }
        $("#ld_pc").html(parseInt($("#ld_pc").html(), 10) + 1)
    }

    function f() {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null)
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE)
        }
    }

    function l() {
        var e = [{
            stylers: [{
                hue: "#000000"
            }, {
                saturation: -100
            }]
        }, {
            featureType: "all",
            elementType: "all",
            stylers: [{
                lightness: 0
            }, {
                gamma: .3
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }]
        }];
        var t = new google.maps.StyledMapType(e, {
            name: "Styled Map"
        });
        var n = new google.maps.Geocoder;
        var r = new google.maps.LatLng(43.22033, 27.95954);
        var i = new google.maps.InfoWindow;
        var s = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        var o = new google.maps.Map(document.getElementById("map_canvas"), s);
        var u = new google.maps.Marker({
            map: o,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: r,
            icon: "img/marker.png"
        });

        //google.maps.event.addListener(u, "click", f);

        google.maps.event.addListener(u, "click", function(){
        	window.open("http://bit.ly/DevLabsOfficeLocation");
        });

        n.geocode({
            location: r
        }, function(e, t) {
            if (t == google.maps.GeocoderStatus.OK) {
                o.setCenter(e[0].geometry.location)
            } else {
                console.log("Geocode was not successful for the following reason: " + t)
            }
        });
        o.mapTypes.set("map_style", t);
        o.setMapTypeId("map_style")
    }
    var e = $(window).width();
    var t = getUrl();
    if (t != "" && t != "#" && t.indexOf("#") != -1) {
        t = t.replace("index.html", "");
        var n = $("[data-href='" + t.replace("#", "") + "']");
        $(window).on("load", function() {
            if (n.length > 0) {
                setTimeout(function() {
                    n.trigger("click")
                }, 1500)
            }
        })
    }
    $(".hamburger").on("click", function() {
        $(".pageNav").stop(true, true).slideToggle()
    });
    var r = window.location;
    window.addEventListener("orientationchange", function() {
        window.location = r
    }, false);
    var i = $(window).width();
    $(window).on("resize", function() {
        var e = $(window).width();
        if (i > 1024 && e <= 1024) {
            window.location = r
        } else if (i <= 1024 && e > 1024) {
            window.location = r
        }
    });
    $.fn.randomize = function(e) {
        return this.each(function() {
            var t = $(this);
            var n = t.children(e);
            n.sort(function() {
                return Math.round(Math.random()) - .5
            });
            t.remove(e);
            for (var r = 0; r < n.length; r++) t.append(n[r])
        })
    };
    $("#team_players").randomize(".item");
    var s = $("#team_players");
    s.owlCarousel({
        items: 3,
        itemsDesktop: [1100, 3],
        itemsDesktopSmall: [900, 3],
        itemsTablet: [768, 2],
        itemsMobile: [480, 1],
        slideSpeed: 400,
        rewindSpeed: 1500,
        autoPlay: 5e3
    });
    $(".next").click(function() {
        s.trigger("owl.next")
    });
    $(".prev").click(function() {
        s.trigger("owl.prev")
    });
    $("#loader img").animate({
        opacity: 1
    });
    var o = setInterval(u, 10);
    $(window).load(function() {
        $("body").css("overflow-y", "auto")
    });
    $("#firstSlideSlideDown").click(function() {
        scrollToTheNextSlide("#secondHomeBlock", 1500);
        return false
    });
    $("#secondSlideSlideDown").click(function() {
        scrollToTheNextSlide("#mobile_apps", 1500);
        return false
    });
    $("[data-link]").on("click", function() {
        var e = $(this).data("link");
        if (e == "#mobile_apps") {
            scrollToTheNextSlide(e, 1500, true)
        } else {
            scrollToTheNextSlide(e, 1500)
        }
    });
    $("[data-href]").on("click", function() {
        var e = $(this).data("href");
        setUrl(e)
    });
    window.currentScrollPos = $(document).scrollTop();
    disableBodyScroll();
    $("#portfolio_items").on("click", "li", function() {
        window.currentScrollPos = $(document).scrollTop();
        $("#popup_slides").html($($(this).data("project")).find(".slider_content").html());
        $("#popup_text").html($($(this).data("project") + " .text-holder").html());
        $("#web_portfolio_popUp").addClass("active");
        $(".web_portfolio_slider").filter(":visible").cycle({
            fx: "scrollRight",
            easing: "easeOutBack",
            next: ".screen_holder",
            delay: 4e3,
            timeout: 4e3,
            speedIn: 800,
            speedOut: 800,
            manualTrump: false
        });
        setTimeout(function() {
            disableBodyScroll();
            $("#web_portfolio_popUp").css("overflow-y", "scroll")
        }, 600);
        $(document).on("keyup", function(e) {
            if (e.which == 27) {
                $("#closePortfolio").trigger("click")
            }
        })
    });
    $("#closePortfolio").click(function() {
        $(document).off("keyup");
        $("#web_portfolio_popUp").css("overflow-y", "none");
        enableBodyScroll();
        $("#web_portfolio_popUp").removeClass("active");
        cleanUrl()
    });
    if (e > 1024) {
        var a = $.superscrollorama({
            triggerAtCenter: true,
            playoutAnimations: true
        });
        a.addTween("#secondHomeBlock", (new TimelineLite).append([TweenMax.fromTo($(".secondSlide_img_bottle"), 1, {
            css: {
                right: -213
            },
            immediateRender: true
        }, {
            css: {
                left: -200
            }
        }), TweenLite.to($(".secondSlide_img_bottle"), 2, {
            rotation: 120,
            transformOrigin: "center center"
        }), TweenMax.to($(".secondSlide_img_flat"), 1.5, {
            css: {
                top: 20,
                left: 1500
            }
        }), TweenLite.to($(".secondSlide_img_flat"), 1.5, {
            rotation: 450,
            transformOrigin: "center center"
        }), TweenLite.to($(".secondSlide_img_nut1"), 1.5, {
            top: 300
        }), TweenLite.to($(".secondSlide_img_nut2"), 1.5, {
            top: 700,
            left: 300
        }), TweenLite.fromTo($(".secondSlide_textImg_toCreate"), .5, {
            width: 0,
            ease: Elastic.easeOut
        }, {
            width: 510,
            ease: Power2.easeOut
        }), TweenLite.fromTo($(".secondSlide_textImg_brave"), .5, {
            css: {
                left: -150
            }
        }, {
            css: {
                left: 600
            }
        }), TweenLite.fromTo($(".secondSlide_textImg_web"), .5, {
            css: {
                left: 800
            }
        }, {
            css: {
                left: 50
            }
        }), TweenLite.from($(".secondSlide_textImg_solutions"), .5, {
            css: {
                opacity: 0
            }
        })]), 1500);
        a.addTween("#mobile_apps", TweenMax.fromTo($(".hand"), .5, {
            css: {
                left: -300,
                opacity: 0
            }
        }, {
            css: {
                left: 100,
                opacity: 1
            }
        }));
        a.addTween("#mobile_apps", (new TimelineLite).append([TweenLite.fromTo($(".apps_info"), .1, {
            bottom: 0
        }, {
            bottom: 450
        })]), 1500);
        a.addTween("#web_portfolio", TweenMax.from($("#web_portfolio"), .5, {
            css: {
                opacity: 0
            }
        }));
        a.addTween("#web_portfolio", TweenLite.from($("#portfolio_items li"), .5, {
            scaleX: 0,
            scaleY: 0,
            rotation: -180
        }));
        a.addTween("#secondHomeBlock", TweenLite.from($("#secondHomeBlock"), .5, {
            css: {
                opacity: 0
            }
        }));
        a.addTween("#secondHomeBlock", TweenLite.to($(".secondSlide_textImg_solutions"), .5, {
            css: {
                top: 350
            },
            ease: Bounce.easeOut
        }));
        a.addTween(".scroll_getter_first", (new TimelineLite).append([TweenMax.fromTo($(".bird"), 1, {
            css: {
                right: -100,
                top: -30
            },
            immediateRender: true
        }, {
            css: {
                right: 900,
                top: 700
            }
        }), TweenMax.to($(".blured_bird"), 1, {
            css: {
                top: 10,
                left: 500
            }
        }), TweenMax.to($(".firstSlide_textImg_we"), 1, {
            css: {
                top: 10
            }
        }), TweenLite.to($(".firstSlide_textImg_we"), 1, {
            scaleX: 0,
            scaleY: 0
        }), TweenMax.to($(".firstSlide_textImg_think"), 1, {
            css: {
                top: 1200
            }
        }), TweenLite.to($(".firstSlide_textImg_think"), 1, {
            rotation: 360
        }), TweenMax.to($(".firstSlide_textImg_digital"), 1, {
            css: {
                top: 800,
                left: -400
            }
        }), TweenMax.to($(".firstSlide_textImg_and"), 1, {
            css: {
                top: 1600
            }
        }), TweenLite.to($(".firstSlide_textImg_and"), 1, {
            css: {
                rotationY: 360,
                transformOrigin: "center center"
            }
        }), TweenMax.to($(".firstSlide_textImg_love"), 1, {
            css: {
                top: 70
            }
        })]), 1500)
    }
    $("#mobile_apps_slider").cycle({
        fx: "scrollLeft",
        next: ".status_bar",
        delay: 3e3,
        timeout: 3e3,
        speedIn: 800,
        speedOut: 800,
        manualTrump: false
    });
    $("#app_goUp").click(function() {
        scrollToTheNextSlide("#homeBlock", 1500)
    });
    $("#app_goDown").click(function() {
        scrollToTheNextSlide("#web_portfolio", 1500)
    });
    $(window).load(function() {
        setTimeout(function() {
            l()
        }, 2e3)
    })
});
$(document).ready(function() {
    $('form[name="contact"]').submit(function(e) {
        e.preventDefault();
        var t = valid($("input[name='name']"));
        res2 = valid($("input[name='email']"));
        res3 = valid($("input[name='subject']"));
        res4 = valid($("textarea[name='msg']"));
        if (t && res2 && res3 && res4) {
            var n = $.post("sender.php", {
                name: $("input[name='name']").val(),
                email: $("input[name='email']").val(),
                subject: $("input[name='subject']").val(),
                msg: $("textarea[name='msg']").val()
            });
            n.success(function() {
                $("#res").html("Thank you ;)");
                $("#res").show(1500);
                setTimeout(function() {
                    $("#res").hide(1500)
                }, 3e3);
                clearInputs()
            });
            n.fail(function() {
                $("#res").html("An error occured :(");
                $("#res").show(1e3);
                setTimeout(function() {
                    $("#res").hide(300)
                }, 5e3)
            })
        }
    });
    $(".pageNav ul li a").on("click", function(e) {
        if ($(".hamburger").is(":visible")) {
            $(".pageNav").slideUp()
        }
    })
})