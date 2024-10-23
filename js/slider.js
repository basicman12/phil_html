$(document).ready(function(){
    var $slider = $('#slider');
    var $ul = $slider.find('ul');
    var $li = $slider.find('li');
    var length = $li.length;
    var linkStep = 1;
    var animateSpeed = 300;
    var step = 7000;
    var Timer;
    if(length > 0){
        $ul.css('width',(length * 100) + '%');
        $li.css('width',(100/length) + '%' );
        $li.each(function(i){
            var $this = $(this);
            $this.css('margin-left',(i*(100/length)) + '%');
            $this.show();
            var width = (100 - ((length-1)*linkStep)) / length;
            var link = '<a href="#" data-id="'+i+'" class="toslide'+ (i===0 ? ' active' : '') +'" style="width:'+ width +'%"><span class="bg"><span class="active"></span></span></a>';
            if(i > 0){
                $('<div class="g-left step"></div>').appendTo($slider);
            }
            $(link).appendTo($slider).bind('clickAction', function(){
                var $this = $(this);
                var $toSlide = $slider.find('a.toslide');
                $toSlide.find('.active').stop().css('width',0);
                $ul.animate({
                    left: '-' +(100 * i)+'%'
                },animateSpeed);
                $toSlide.removeClass('active');
                $this.addClass('active');
                return false;
            }).bind('click', function(){
                var $this = $(this);
                clearTimeout(Timer);
                $this.trigger('clickAction');
                $this.find('.active').animate({width : '100%'},step,'linear',function(){
                    $(this).css('width','0px');
                });
                Timer = setTimeout(function(){
                    nextStep();
                },step);
                return false;
            });
        });
        $slider.append('<div class="g-clr"></div>');
        function nextStep(){
            var $toSlideActive = $('#slider a.toslide[data-id="'+($('#slider a.toslide.active').data('id') + 1)+'"]');
            if(!$toSlideActive.length > 0){
                $toSlideActive = $('#slider a.toslide:first');
            }
            $toSlideActive.trigger('clickAction');
            $toSlideActive.find('.active').animate({width : '100%'},step,'linear',function(){
                $(this).css('width','0px');
            });
            Timer = setTimeout(function(){
                nextStep();
            },step);
        }

        $slider.find('a.toslide:first .active').animate({width : '100%'},step,'linear', function(){
            $(this).css('width','0px');
        });
        Timer = setTimeout(nextStep, step);
    }

});