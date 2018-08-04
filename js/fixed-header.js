$(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('fixed');
    } else {
        $('.navbar').removeClass('fixed');
    }
});
