﻿/*
	S.Sams Lifexperience
	-----------------------------------------------------
	Copyright (C) 2002 - 2008 S.Sams Lifexperience!
	All rights reserved
	Email:		Cassams@gmail.com / S.Sams@msn.com
	WebSite:	Http://lab.travelive.com.cn/
	Msn:		S.Sams@Msn.com
	Author:		Sam Shen
*/

(function($) {
    $.fn.tooltip = function(options){
        var opts = $.extend({}, $.fn.tooltip.defaults, options);
        $('body').append('<div class="tooltipshowpanel"></div>');
        $(document).mouseover(function(){$('.tooltipshowpanel').hide();});
        this.each(function(){
            // Tooltip
            if($(this).attr('tip') != undefined)
            {
                $(this).hover(function(){
                    $('.tooltipshowpanel')
                        .css({left:$.getLeft(this)+'px',top:$.getTop(this)+'px'});
                    $('.tooltipshowpanel').html($(this).attr('tip'));
                    $('.tooltipshowpanel').fadeIn("fast");

                },
                function(){
                    $('.tooltipshowpanel').hide();
                });
            }
            // Validate
            if($(this).attr('reg') != undefined)
            {
                $(this).focus(function(){
                    $(this).removeClass('tooltipinputerr');
                }).blur(function(){
                    var thisReg = new RegExp($(this).attr('reg'));
                    if(thisReg.test(this.value))
                    {
                        $(this).removeClass('tooltipinputerr').addClass('tooltipinputok');
                    }
                    else
                    {
                        $(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
                    }
                    if($(this).attr('toupper') == 'true')
                    {
                        this.value = this.value.toUpperCase();
                    }
                });
            }
        });
        // Form Check
        if(opts.onsubmit)
        {
            $('form').submit( function () {
                var isSubmit = true;
                $(this).find('input[reg]').each(function(){
                    var thisReg = new RegExp($(this).attr('reg'));
                    if(!thisReg.test(this.value))
                    {
                        $(this).removeClass('tooltipinputok').addClass('tooltipinputerr');
                        isSubmit = false;
                    }
                });
                return isSubmit;
            } ); 
        }
    };
    
    $.extend({
        getWidth : function(object) {
            return object.offsetWidth;
        },

        getLeft : function(object) {
            var go = object;
            var oParent,oLeft = go.offsetLeft;
            while(go.offsetParent!=null) {
                oParent = go.offsetParent;
                oLeft += oParent.offsetLeft;
                go = oParent;
            }
            return oLeft;
        },

        getTop : function(object) {
            var go = object;
            var oParent,oTop = go.offsetTop;
            while(go.offsetParent!=null) {
                oParent = go.offsetParent;
                oTop += oParent.offsetTop;
                go = oParent;
            }
            return oTop + 22;
        },
        
        onsubmit : true
    });  
    $.fn.tooltip.defaults = { onsubmit: true };
    
    $(document).ready(function() {jQuery('input[tip],input[reg]').tooltip()});
    
})(jQuery)