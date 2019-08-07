(function($) {
jQuery(document).ready(function($){
    if($('.navContain').length!==0){
        if($('.dt-footer-blue').length > 0){
            $( "<div class='stop'></div>" ).insertBefore( ".dt-footer-blue" );
        }       
        var secondaryNav = $('.navContain'),
            secondaryNavTopPosition = secondaryNav.offset().top,
            contentSections = $('.accordion-level'),
            endScroll = $('.stop');

        $(window).on('scroll', function(){			
            endScrollPos = endScroll.offset().top;
            if($(window).scrollTop() > secondaryNavTopPosition && $(window).scrollTop() < endScrollPos) {
                secondaryNav.addClass('is-fixed sticky fadeInDown animated');
            }else if($(window).scrollTop() > endScrollPos ) {
                secondaryNav.removeClass('is-fixed sticky fadeInDown animated');
                $('.contact-sales-tab').removeClass('active');
                $('.contact-sales-box').css({'display': 'none'});
            } else {
                secondaryNav.removeClass('is-fixed sticky fadeInDown animated');
            }
            updateSecondaryNavigation();
            if($('.navContain').hasClass('sticky')){
                if($('.contact-sales-tab').length > 0){
                    contactUsOverlay();
                }
            }else{
                $('.contact-sales-box').css({'left': 'inherit'});
            }           
        });

        function updateSecondaryNavigation() {
            contentSections.each(function(){
                var actual = $(this),
                    actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
                    actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
                if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
                    actualAnchor.addClass('active');                    
                }else {
                    actualAnchor.removeClass('active');
                    
                }           
            });
            /* DT Parallax video*/
            var parallaxSections = $('.new-dt-parallax-panel');
            if(parallaxSections){
                parallaxSections.each(function(){
                    var actual = $(this),
                        actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) - parseInt(actual.css('paddingBottom').replace('px', '')),
                        actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
                    if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {                    
                            $(this).find('video').addClass('active');   
                    }else {
                            $(this).find('video').removeClass('active');
                    }    
                });
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                    $('.fade-ani').each(function(){
                        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                        if( bottom_of_object >  bottom_of_window){
                            $(this).addClass('showing');
                        }else{
                            $(this).removeClass('showing');
                        }
                    });
            }
        }
        secondaryNav.find('ul.stickyNav a').on('click', function(event){
            if(!$(this).hasClass('trypentaho-sticky') && !$(this).hasClass('training-sticky') && !$(this).hasClass('contact-sales-tab')){
                event.preventDefault();
                var target= $(this.hash);
                $('body,html').animate({
                    'scrollTop': target.offset().top + 4
                    }, 400
                ); 
            }            
        });
        function contactUsOverlay(){
            var a = $('.contact-sales-tab').offset().left,
                b = $('.contact-sales-tab').outerWidth(),
                c = $('.contact-sales-box').outerWidth();
                d = (a + b) - c;
                $('.contact-sales-box').css({'left': d});
        }
        $(document).on('click', '.contact-sales-tab', function(){
            if($('.navContain').hasClass('sticky')){
                contactUsOverlay();
            }
            if($('.contact-sales-box').is(':visible')){
                $(this).removeClass('active');
                $('.contact-sales-box').css({'display': 'none'});
            }else{
                $(this).addClass('active');
                $('.contact-sales-box').css({'display': 'block'});
            }
        });

        var cHtml = $('.navContain').find('.contact-sales-box').html();
        $('<div/>', {"class": 'contact-sales-accord hidden-lg hidden-md'}).html(cHtml).appendTo('#contact-us .accordion-content');
    }
    $(window).on("orientationchange", function(event) {	
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(ipad)/);      
        if (agentID) {
            var $checkStatus = hds.resourceLib._returnCheckStatus();
            if (window.matchMedia("(orientation: landscape)").matches) {
                if($('.navContain').is(':visible')){
                    secondaryNavTopPosition = secondaryNav.offset().top;
                }
                
            }
        }
            
    });
    $(window).on('resize', function() {
        $(".contact-sales-tab").removeClass("active");
        $(".contact-sales-box").hide();
        if($('.dt-Accordion').length > 0){
            secondaryNav.removeClass('is-fixed sticky fadeInDown animated');
            secondaryNavTopPosition = secondaryNav.offset().top;
        }
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(ipad)/);
        if (agentID) {
            if($('.navContain').is(':visible')){
                secondaryNavTopPosition = secondaryNav.offset().top;	
            }			
        }
        
    })

    $(document).on('click', function(e) {
        if (!$(e.target).is('.contact-sales-tab, .contact-sales-box')) {
            $(".contact-sales-tab").removeClass("active");
            $(".contact-sales-box").hide();
        }               
    });
    
    /* Tech Specs Table Grid Function Call */
    setColW();
    $(window).resize(function() {setColW();});
});

    // Get text values from Sticky Nav, apply to Accordion labels
    $("ul.stickyNav li a").each(function(i) {
        var stickyLabel = $(this).text();
        $("#stickyNav-"+i).text(stickyLabel);
    });

    var allMenus = $('.accordion-menu-container');
    var allContents = $('.accordion-content');

    $(document).on('click','.accordion-level > .accordion-menu-container' , function(event) {
        var $currentContent = $(this).closest('div').next('div.accordion-content',this);
        if ($(this).hasClass("open") && $(this).next().queue().length === 0) {
            $currentContent.removeClass('open');
            $(this).removeClass("open");
        } else if (!$(this).hasClass("open") && $(this).next().queue().length === 0) {
            $currentContent.addClass('open');
            $(this).addClass("open");
        }
        return false;
    });
    
    /* Read More Less Code Start */
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipad|android)/);      
    if (agentID) {
        $(".product-desc").each(function( index ) {
            pCount = $(this).children("p").length
            if(pCount > 1){
                $(this).find('p:not(:first-child)').hide();
                $(this).find('p:first-child').css({'margin-bottom':'0'}).append('<a href="javascript:void(0);" class="read-more"><span class="read-dot">..</span>read more</a>');
                $(this).find('p:last-child').append('<a href="javascript:void(0);" class="read-less"><span class="read-dot">..</span>read less</a>');
            }   
        })

        $('.product-desc .read-more').click(function(){
            $(this).parent().siblings().show();
            $(this).parent().parent().find('p:first-child').css({'margin-bottom':'30px'}).show();
            $(this).hide();
        })

        $('.product-desc .read-less').click(function(){
            $(this).parent().parent().find('p').hide();
            $(this).parent().parent().find('p:first-child, a.read-more').css({'margin-bottom':'0'}).show();
        })
    }
    /* Read More Less Code End */

    /* Product & Solution Active Tab */
    if(window.location.href.indexOf("products-solutions") > -1) {
        $('.sub-navigation ul li:first-child a').addClass('active');
    }
    
    if($('.resources-category-box').length!=0){
        $('.resources-category .resources-category-box').each(function(index,item){
            this.id = 'fixedRes' + index;
        })
    }
    $('.resources-section').each(function(){
        if($(this).find('.resources-category').length == 1){
            $(this).find('.resources-category').find('.resources-category-box').attr('style','min-height:initial');
        }
    });
})(jQuery);
if($('.accordion-level').length!==0){
    $( ".contentarea .accordion-level" ).last().addClass("accordion-level-last");
}

/* Equal Column Height */
$(window).bind("load", function() {
    window.addEventListener("resize", function() {
        // Get screen size (inner/outerWidth, inner/outerHeight)
        setTimeout(function(){
            equalColumns('.cs-selections .cs-selection-box');
            equalColumns('.news-insight-explore .spotlight-normal .spotlight-content');
            equalColumns('.about-hds-latest .about-hds-events-content');
            equalColumns('.services-list-section .section-service-col .card-link1');
            equalColumns('.service-support-main .section-service-col');
            equalColumns('.detail-container .details-box');
            equalColumns('.train-resrcprdct-bx .prdct-inner');
            equalColumns('.resources-spotlight .spotlight-content');
            equalColumns('.solution-section .solution-category-box .card-link1');
            equalColumns('.stay_touch_container .comment_box');
            equalColumns('.product-list-section .panel-box');           
            equalColumns('.hitachi-honor .hitachi-honor-box');
            equalColumns('.we-mean-business .si-comm-box');
            equalColumns('.RTP_RCMD2 .rtp_rcmd2_item_inner');
            equalColumns('.resources-category .resources-category-box');
            equalColumns('.welcome-pop-btn a');
            equalColumns('.grey_container .grey-box-inner');
            equalColumns('.hds-solution-case .txt');
            equalColumns('.featured-customer-listing .resource-item .card-link1');
            equalColumns('.adv-vs-gallery .vs-gallery-list .col-sm-6');
            equalColumns('.location-resources-column .location-resource-item');
            equalColumns('.service-infra .news-resources-col .card-link1');
            equalColumns('.services-list-section .section-service-col .card-link1');
            equalColumns('.mes-section .product-box .card-link1');
            equalColumns('.product-list-section .panel-box .card-link1');
            equalColumns('.explore-insight .insight-common-box .card-link1');
            equalColumns('.community-common-box .card-link1');
            equalColumns('.pr-explore-container .pr-common-box .card-link1');
            equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight .card-link1');
            equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight.spotlight-normal > .card-link1');
            equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight .card-link1 .spotlight-content');
            equalColumns('.location-centers .location-centers-box .card-link1');
            equalColumns('.hv-our-stories .hv-story-box .card-link1');
            equalColumns('.dt-contact-us-panel .col-sm-6');         
            equalColumns('.dt-featured-tiles .dt-feat-tile .dt-feat-content');
            equalColumns('.dt-featured-tiles .dt-feat-tile .card-link1');
            equalColumns('.hv-home-featured-listing .hv-home-resources-column .hv-home-resource-item .card-link1');
            equalColumns('.hv-popular-courses .courses-column .courses-item .card-link1');
            equalColumns('.hv-resource-interaction .res-int-item .card-link1');
            equalColumns('.hv-train-schedule .schedule-list .schedule-item');
            equalColumns('.hv-ps-related .hv-related-box');
            equalColumns('.hv-ps-related .hv-related-box .box-title h3');
            equalColumns('.hv-ps-solution-industry-panel .solution-industry-box');
            equalColumns('.hv-ps-overview-panel .overview-tile .promo-tile');
            equalColumns('.hv-product-features .feature-box');
            equalColumns('.hv-ps-subcategory .hv-subcategory-box');
            equalColumns('.hv-overview-services .ps-overview-list');
            equalColumns('.hv-training-panel .col-sm-6 .read-more a.animateLink');
            equalColumns('.hv-training-resources .news-insight-explore .news-insight-explore-spotlight .spotlight-content a.card-link1 .card-link1-content p');
            equalColumns('.hv-overview-services .ps-overview-list .overview-right-text');
            hds.commonFunctions.cardSample1();
            hds.commonFunctions.cardSample2();
            hds.commonFunctions.centerVideoIcon('.about-hds-articles-spotlight');
            hds.commonFunctions.centerVideoIcon('.news-insight-explore-spotlight');
            setTimeout(function(){
                if ($('.contact-banner').length > 0) {
                    hds.commonFunctions.contactBannerCards();
                }
            }, 500)
        }, 500);

        var actualWidth = $(window).width() + 17;
        if (actualWidth <= 768) {
            $('.fb-category-points-box').css({'height':'auto'});
            $('.resources-all').css({'height':'auto'});
        }else{
            if($('.fb-category-container').length!==0){
                $('.fb-category-container').each(function(index,item){
                    this.id = 'fixedRate' + index;
                    equalColumns('#fixedRate'+index+ ' .fb-category-points-box');
                });
            }
            equalColumns('.res-col-content .resources-all.cs-selection-box a');
            equalColumns('.service-detail-resource .resources-all.cs-selection-box');
            equalColumns('.about-hds-csr-quote .resources-all.cs-selection-box a');
        }        
    }, false);

    setTimeout(function(){
        equalColumns('.cs-selections .cs-selection-box');
        equalColumns('.news-insight-explore .spotlight-normal .spotlight-content');
        equalColumns('.about-hds-latest .about-hds-events-content');
        equalColumns('.services-list-section .section-service-col .card-link1');
        equalColumns('.service-support-main .section-service-col');
        equalColumns('.detail-container .details-box');
        equalColumns('.train-resrcprdct-bx .prdct-inner');
        equalColumns('.resources-spotlight .spotlight-content');
        equalColumns('.solution-section .solution-category-box .card-link1');
        equalColumns('.stay_touch_container .comment_box');
        equalColumns('.product-list-section .panel-box');
        equalColumns('.hitachi-honor .hitachi-honor-box');
        equalColumns('.we-mean-business .si-comm-box');
        equalColumns('.RTP_RCMD2 .rtp_rcmd2_item_inner');
        equalColumns('.resources-category .resources-category-box');
        equalColumns('.welcome-pop-btn a');
        equalColumns('.grey_container .grey-box-inner');
        equalColumns('.hds-solution-case .txt');
        equalColumns('.featured-customer-listing .resource-item .card-link1');
        equalColumns('.adv-vs-gallery .vs-gallery-list .col-sm-6');
        equalColumns('.location-resources-column .location-resource-item');
        equalColumns('.service-infra .news-resources-col .card-link1');
        equalColumns('.services-list-section .section-service-col .card-link1');
        equalColumns('.mes-section .product-box .card-link1');
        equalColumns('.product-list-section .panel-box .card-link1'); 
        equalColumns('.explore-insight .insight-common-box .card-link1');
        equalColumns('.community-common-box .card-link1');
        equalColumns('.pr-explore-container .pr-common-box .card-link1');
        equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight .card-link1');
        equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight.spotlight-normal .card-link1');
        equalColumns('.news-insight-explore.card-box .news-insight-explore-spotlight .card-link1 .spotlight-content');
        equalColumns('.location-centers .location-centers-box .card-link1');
        equalColumns('.hv-our-stories .hv-story-box .card-link1');
        equalColumns('.dt-contact-us-panel .col-sm-6');
        equalColumns('.dt-featured-tiles .dt-feat-tile .dt-feat-content');
        equalColumns('.dt-featured-tiles .dt-feat-tile .card-link1');
        equalColumns('.hv-home-featured-listing .hv-home-resources-column .hv-home-resource-item .card-link1');
        equalColumns('.hv-popular-courses .courses-column .courses-item .card-link1');
        equalColumns('.hv-resource-interaction .res-int-item .card-link1');
        equalColumns('.hv-train-schedule .schedule-list .schedule-item');
        equalColumns('.hv-ps-related .hv-related-box');
        equalColumns('.hv-ps-related .hv-related-box .box-title h3');
        equalColumns('.hv-ps-solution-industry-panel .solution-industry-box');
        equalColumns('.hv-ps-overview-panel .overview-tile .promo-tile');
        equalColumns('.hv-product-features .feature-box');
        equalColumns('.hv-ps-subcategory .hv-subcategory-box');
        equalColumns('.hv-overview-services .ps-overview-list');
        equalColumns('.hv-training-panel .col-sm-6 .read-more a.animateLink');
        equalColumns('.hv-training-resources .news-insight-explore .news-insight-explore-spotlight .spotlight-content a.card-link1 .card-link1-content p');
        equalColumns('.hv-overview-services .ps-overview-list .overview-right-text');

        var actualWidth = $(window).width() + 17;
        if (actualWidth >= 768) {
            if($('.fb-category-container').length!==0){
                $('.fb-category-container').each(function(index,item){
                    this.id = 'fixedRate' + index;
                    equalColumns('#fixedRate'+index+ ' .fb-category-points-box');
                });
            }
            equalColumns('.res-col-content .resources-all.cs-selection-box a');
            equalColumns('.service-detail-resource .resources-all.cs-selection-box');
            equalColumns('.about-hds-csr-quote .resources-all.cs-selection-box a');
        }
        hds.commonFunctions.cardSample1();
        hds.commonFunctions.cardSample2();
        hds.commonFunctions.centerVideoIcon('.about-hds-articles-spotlight');
        hds.commonFunctions.centerVideoIcon('.news-insight-explore-spotlight');
        if ($('.contact-banner').length > 0) {
            hds.commonFunctions.contactBannerCards();
        }
    }, 500);
    /* Support section component CTA Height */
    equalHeightcta();
    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(equalHeightcta, 500);
    });
    
});

/* Contact Sales Form */
window.addEventListener("resize", function() {
    if ($('#hdsModalWindow').length > 0) {
        setIframeHeight('hdsModalWindow');
    }
})
$(window).on( "orientationchange", function( event ) {
    if ($('#hdsModalWindow').length > 0) {
        setIframeHeight('hdsModalWindow');
    }
})

/* Contact Us Promo Banner - Request Info Form */
if ($('#hdsRequestInfo').length > 0) {
    $(window).bind("load", function() {
        if(location.hostname.match('hds.com')){
            setIframeHeight('hdsRequestInfo');
            setTimeout(function(){
                document.getElementById('modal-loading').remove();
            }, 3000);
        }
        if(location.hostname.match('hitachivantara.com')){
            setIframeHeight('hdsRequestInfo');
            setTimeout(function(){
                document.getElementById('modal-loading').remove();
            }, 3000);
        }
    })
    window.addEventListener("resize", function() {
        $('body').find('#modal-loading').remove();
        $('body').append('<div id="modal-loading"></div>');
        setIframeHeight('hdsRequestInfo');
    })
    $(window).on( "orientationchange", function( event ) {
        $('body').find('#modal-loading').remove();
        $('body').append('<div id="modal-loading"></div>');
        setIframeHeight('hdsRequestInfo');
    })
}
function equalHeightcta(){
    /* Support section component CTA Height */
    if($('.section-service-col.dummy').length > 0){
        $('.section-service-col.dummy .support-connect-login').css('height', '');
        setTimeout(function(){ $('.section-service-col.dummy').each(function(){         
            var th= $('.section-service-col.dummy').height();
            var uh = $('.section-service-col.dummy .card-link1').height();
            var bh = th-uh-38;
            $('.section-service-col.dummy .support-connect-login').css("height", bh);
        })
        },1000);
    }
    if($('.section-service-col.service-blue-box').length > 0){
        $('.section-service-col.service-blue-box .support-phone-no').css("height", '');
            $('.section-service-col.service-blue-box .support-connect-login').css("height", '');
        setTimeout(function(){ $('.section-service-col.service-blue-box').each(function(){          
            var th1= $('.section-service-col.service-blue-box').height();
            var uh1 = $('.section-service-col.service-blue-box .card-link1').height();
            var bh1 = th1-uh1-38;
            $('.section-service-col.service-blue-box .support-phone-no').css("height", bh1);
            $('.section-service-col.service-blue-box .support-connect-login').css("height", bh1);
        })
        },1000);
    }
}
function equalColumns(htmlElements){
    $(htmlElements).removeAttr('style');
    var heights = $(htmlElements).map(function() {
        return $(this).height();
    }).get(),
    maxHeight = Math.max.apply(null, heights);
    $(htmlElements).height(maxHeight);
}

/* Tech Specs Table grid section script to control columns width */
function setColW(){
    var wW, table, tr, td, tdFirst, tdLast, tableW, tdFirstW, tdLastW, n, tdNewW, dText;
    table = $('#tech-specifications #no-more-tables table tbody');
    tr = $('#tech-specifications #no-more-tables table tbody tr.trdata');
    td = $('#tech-specifications #no-more-tables table tbody tr.trdata td');
    tdlast = $('#tech-specifications #no-more-tables table tbody tr.trdata td:last-child');

    tr.each(function(){
        if(!$(this).parents('table').hasClass('tfootnote')){
            n = $(this).children().length;
        }
    })

    tdFirst = tr.find('th').first();
    tdLast = tr.find('td').last();
    wW = $(window).width();

    tdFirstW = tdFirst.width();
    tdLastW = tdLast.width();
    dText=tdLast.text().trim();
    
    if (wW > 768 ) {
        if (n > 2){
            if (!tdlast.find('div').hasClass('pro-type') && tdlast.find('a').hasClass('animateLink')) {
                tdlast.addClass('down-specs');
                tableW = table.width() - ( tdFirstW + tdLastW );
                n=n-2;
                tdNewW = tableW/n;
                td.css('width', tdNewW+'px');
                tdlast.removeAttr('style');
            } else {
                tableW = table.width() - tdFirstW;
                n=n-1;
                tdNewW = tableW/n;
                td.css('width', tdNewW+'px');
            }
        } else if (n == 2) {
                tableW = table.width() - tdFirstW;
                n=n-1;
                tdNewW = tableW/n;
                td.css('width', tdNewW+'px');
        }
    }else{
        if (!tdlast.find('div').hasClass('pro-type') && tdlast.find('a').hasClass('animateLink')) {
            tdlast.addClass('down-specs');
        }
        td.removeAttr('style');
    }
    /* Check for blank cell in mobile */
    if ($(window).width() < 991) {
        $('.specs-table .product-specs .pro-category').each(function(){
            if($(this).find('span').hasClass('hyphon') || $(this).text() == '-'){
                $(this).closest('td').addClass('hidden-xs');
            }
        })
    }
}

/* New Customer Case Study Panel */
$(window).on('load', function() {
    /* Quotes Icons Next Line */
    if($('.cs-highlight-box').length > 0){
        $(".cs-highlight-box .cs-quote-text").each(function(){
            var nodeVal = $.trim($(this).text());
            var charLen = countWords(nodeVal);
            if(charLen > 1){
                var w = ccsGetLastWord($(this).text(), 0);
                var p = $(this).text().substring(0, $(this).text().lastIndexOf(" "));
                $(this).text('').text(p);
                $(this).next('.cs-quote-close').prepend(w);
            }
        })
    }
    
    if($('.specific-quote').length > 0){
        $(".specific-quote .dp-quote-text").each(function(){
            var nodeVal = $.trim($(this).text());
            var charLen = countWords(nodeVal);
            if(charLen > 1){
                var w = ccsGetLastWord($(this).text(), 0);
                var p = $(this).text().substring(0, $(this).text().lastIndexOf(" "));
                $(this).text('').text(p);
                $(this).next('.dp-quote-close').prepend(w);
            }            
        })
    }
    if($('.hv-story-quote').length > 0){
        $(".hv-story-quote .dp-quote-text").each(function(){
            var nodeVal = $.trim($(this).text());
            var charLen = countWords(nodeVal);
            if(charLen > 1){
                var w = ccsGetLastWord($(this).text(), 0);
                var p = $(this).text().substring(0, $(this).text().lastIndexOf(" "));
                $(this).text('').text(p);
                $(this).next('.dp-quote-close').prepend(w);
            }
        })
    }
    if($('.ccs-section').length > 0){
        ccsSlider();
        /* Quotes Icons Next Line */
        $(".ccsq-text p").each(function(){
            var nodeVal = $.trim($(this).text());
            var charLen = countWords(nodeVal);
            if(charLen > 1){
                var w = ccsGetLastWord($(this).text(), 0);
                var p = $(this).text().substring(0, $(this).text().lastIndexOf(" "));
                $(this).text('').text(p);
                $(this).parent('.ccsq-text').next('.ccsq-close').prepend(w);
            }
        })
    }
    if($('.ccs-logo-carousal').length == 0){
        $('.ccs-quote-section').css({'min-height':'inherit'});
    }
    /* Carat/New window icon Next Line  */
    ctaCaratIcons();
    /* Customer Case study top position */
    if($(".customer-case-study-grey").length > 0){  
        caseStudytop();
    }
    /* Hitachi Vantara Stories Section */
    $(".hv-more-story").on('click', function (e) {
        e.preventDefault();
        $("div.hv-box:hidden").slice(0, 3).slideDown();
        if ($("div.hv-box:hidden").length == 0) {
            $(".hv-more-story").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
})
$(window).on('resize', function() {
    if($('.ccs-section').length > 0){
        ccsSlider();
    }

    if($('.ccs-logo-carousal').length == 0){
        $('.ccs-quote-section').css({'min-height':'inherit'});
    }
    /* Customer Case study top position */
    if($(".customer-case-study-grey").length > 0){  
        caseStudytop();
    }
})

$(document).ready(function(){
    $(".ccs-item").hide();
    $(".ccs-item:first").show();
    $('.ccs-circle-img:first').addClass('active');
    $('.ccs-circle-img').on( "click", function(e) {
        e.preventDefault();
        var width = $(window).width() + 17;
        var ntarget = $('.ccs-quote-section ');
        var dId = $(this).parent().data('id');
        $("div.ccs-item").hide();
        $("div.ccs-item").each(function(){
            if($(this).attr('id') == dId) {
                $(this).show();
            }
        });
        if(ntarget.length){
            if(width > 991){
                $('html, body').animate({ scrollTop : $(ntarget).offset().top - 60});
            }else{
                $('html, body').animate({ scrollTop : $(ntarget).offset().top});
            }
        }

        $('.ccs-circle-img').removeClass('active');
        $(this).addClass("active");
        $("div.ccs-circle-img").each(function(){
            if(!$(this).hasClass('active')){
                var imgNorm = $(this).data('img-normal');
                $(this).find("img").attr('src', imgNorm);
            }
            else{
                var logoimage = $(this).data('img-hover');
                $(this).find("img").attr('src', logoimage); 
            }
        })
    });
    /* Gray logo on hover */
    $(".ccs-circle-img").each(function(){
        if($(this).hasClass('active')){
            var logoimage = $(this).data('img-hover');
            $(this).find("img").attr('src', logoimage);
        }
    })
    if($(window).width() >= 1024){        
        $(".ccs-circle-img").hover(function(){
            if(!$(this).hasClass('active')){
                var logoimage = $(this).data('img-hover');
                $(this).find("img").attr('src', logoimage);
            }
            
        }, function(){
            if($(this).hasClass('active')){
                var logoimage = $(this).data('img-hover');
                $(this).find("img").attr('src', logoimage);
            }
            else{
                var logoimage = $(this).data('img-normal');
                $(this).find("img").attr('src', logoimage);
            }
            
        });
    }

    /* CCS - Caching of gray scale hover images */
    var ccsGallery = [];
    var ccsImgObj = [];
    $('.ccs-circle-img').each(function(){
        ccsGallery.push($(this).data('img-hover'));
    })

    for (i = 0; i < ccsGallery.length; i++) {
        ccsImgObj[i] = new Image();
        ccsImgObj[i].src = ccsGallery[i];
        $(ccsImgObj[i]).attr('style','display:none');
        $('body').append(ccsImgObj[i]);
    }
});
function ccsSlider(){
    var actualWidth = '';
        if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
            actualWidth = $(window).width();
        }else{
            actualWidth = $(window).width() + 17;
        }
    if (actualWidth <= 785) {
        $('.ccs-logo-carousal').not('.slick-initialized').slick({
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            touchMove: false
        });
    }else{
        if($('.ccs-logo-carousal').hasClass('slick-initialized')){
                $('.ccs-logo-carousal')[0].slick.unslick();
        }
    }           
}
/* Generic function for links having carat / new window icon Starts */
function ctaCaratIcons(){
    $('a.animateLink, a.animateAnchor, .card-click-cta').each(function(){
        if(!$(this).find('div').hasClass('true')){
            var gLock = false;
            var gHtml = '';
            var nodeTxt = $(this).contents().filter(function () {
                return this.nodeType === 3; 
            });

            var nodeVal = $.trim(nodeTxt.text());
            var charLen = countWords(nodeVal);
            if(charLen > 0){
            if(!$(this).find('span').hasClass('glyphicon-menu-left')){
                if($(this).hasClass('isGatedLock')){
                    if($(this).find('span').hasClass('gated-pdf')){
                    gHtml = '<span class="glyphicon gated-pdf"></span>';
                    $(this).find('span.gated-pdf').remove();
                    }
                    if($(this).find('span').hasClass('glyphicon-lock')){
                    gHtml = '<span class="glyphicon glyphicon-lock"></span>';
                    $(this).find('span.glyphicon-lock').remove(); 
                    }  
                    gLock = true;
                }
                var w = ccsGetLastWord(nodeVal, 0);
                var p = nodeVal.substring(0, nodeVal.lastIndexOf(" "));
                $(this).contents().filter(function () {
                        return this.nodeType === 3; 
                }).remove();

                var ss = $(this).html();
                if(gLock == true){
                    $(this).html('').prepend(gHtml + p + ' <div class="true" style="display:inline-block;">' + w + ss + '</div> ');
                }else{
                    $(this).html('').prepend(p + ' <div class="true" style="display:inline-block;">' + w + ss + '</div> ');
                }
                }
            }
        }
    })
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipad|android)/);
    var $htmlEle = $('.tile-scale-shadow, .section-product-col, .section-service-col, .product-box, .news-resources-col, .community-common-box, .section-service-col, .news-insight-explore-spotlight.spotlight-normal, .insight-common-box, .pr-common-box, .resource-item, .customer, .leaders-info, .white-box, .transy-white-box, .hv-home-resource-item, .sol-circle .sol-click,.res-int-item,.mega-menu-featured-box');
    var $anilink = $('.animateLink, .animateAnchor');
    var $detailBox = $('.details-box .card-link1');
    if (!agentID) {
        $htmlEle.find('.animateLink').addClass('ctbox');
        $htmlEle.hover(function(){
            $(this).find('.animateLink span.glyphicon-menu-right, .animateAnchor span.glyphicon-menu-right').animate({'left':10}, 100);
        },
        function(){
            $(this).find('.animateLink span.glyphicon-menu-right, .animateAnchor span.glyphicon-menu-right').animate({'left':5}, 100);
        })

        $detailBox.each(function(){
            $(this).hover(function(){
                $(this).next('.contact-link').find('.animateLink:first span.glyphicon-menu-right').animate({'left':10}, 100);
            },
            function(){
                $(this).next('.contact-link').find('.animateLink:first span.glyphicon-menu-right').animate({'left':5}, 100);
            })
        })

        setTimeout(function(){
            $anilink.each(function(){
                if(!$(this).hasClass('ctbox')){
                    $(this).hover(function(){
                        $(this).find('span.glyphicon-menu-right').animate({'left':10}, 100);
                    },
                    function(){
                        $(this).find('span.glyphicon-menu-right').animate({'left':5}, 100);
                    })
                } 
            })
        }, 1000);
    }
    $(".sol-circle").each(function () {    //loop over each list item
        mypos= $(".custom-pos", this);         
        $("div.animateAnchor", this).prepend(mypos); 
    });
    $(".sol-click,.card-link1,.card-link2").each(function () {    //loop over each list item
        mypos= $(".glyphicon-lock", this);         
        $("div.card-click-cta", this).prepend(mypos);
    });
}
$(document).ajaxStop(function(e) {
    ctaCaratIcons();    
});
function countWords(str) {
    return str.trim().split(/\s+/).length;
}
function ccsGetLastWord(paragraph, line) {
    return paragraph.split("\n")[line].split(" ").pop();
}
/* Customer Case study Top position */
function caseStudytop(){
    var ctop = $('.customer-case-study-grey').offset().top,
        maintop = $('.customer-cs-content-area').offset().top,
        calcheight = (maintop - ctop) + 30;
        $('.customer-case-study .customer-cs-content-area .top-position').css('margin-top',-calcheight);
}
/* Image pop up overlay */
$(document).ready(function() {
    $('.fancybox').fancybox();
    if($('.fancybox-effects-a').length > 0){
    // Change title type, overlay closing speed
    $(".fancybox-effects-a").fancybox({
        helpers: {
            title : {
                type : 'outside'
            },
            overlay : {
                speedOut : 0
            }
        }
    });
    }
});