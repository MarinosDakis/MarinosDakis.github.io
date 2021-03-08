// all files were taken and adapted from: https://files3.lynda.com/secure/courses/574716/exercises/Ex_Files_JavaScript_EssT.zip?NBNXBBDymNe-Ln4cZhnSgnYBZSZulflDHgmdJIzi0CC-dk1G-JWNfBKaGZEF6ePUWobUw8YYwC86jOSTwuUtoaZSKwTE0oZauStPJARIES04RSBIplAniZnshIo_SfFmRy7zJTGa8eYp_8esBEi7ZmlhoFhBNrHPnzXU

$(window).load(function() {
    $('.front-slider').flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: false
    });

    $('.story-slider').flexslider({
        animation: "slide",
        controlNav: true,
        directionNav: true
    });
});
