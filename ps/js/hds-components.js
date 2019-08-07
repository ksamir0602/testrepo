var resultNotFound;
var mFilterCheck = false;
var hvInputPlaceHolder;
var hvsearchpholder;
var hvdc = 0;
var pentdeviceformtitle;
var pentdeviceformdesc;
/* Career Variable */
var cjdUrl, cjaUrl, clUrl;
var ghJobData = '';
var ghRegionMap = '';
var tSearchPHolder = '';
var org = '';

var hds = window.hds || {};
(function(window, document, $, hds) {
	hds.iotlumada = {
		init: function(options) {
			hds.iotlumada.bindEventSelector();
		},
		setTextCircle: function(){
			if($(window).width() > 480){
		        $('.circle1 .text-curve').circleType({radius:170});
		        $('.circle2 .text-curve').circleType({radius:120});
		        $('.circle3 .text-curve').circleType({radius:70});
		    }else{
		        $('.circle1 .text-curve').circleType({radius:95});
		        $('.circle2 .text-curve').circleType({radius:70});
		        $('.circle3 .text-curve').circleType({radius:45});
		    }
		},
		lumadaEcoSystemEvents: function(){
			$("#iot-lumada-ecosystem .tab-content").hide();
			$("#iot-lumada-ecosystem .tab-container:first .tab-content").show();
			$(document).on('click', '#iot-lumada-ecosystem ul.tabs li', function() {
				$("#iot-lumada-ecosystem ul.tabs li").removeClass("active");
				$(this).addClass("active");
				$("#iot-lumada-ecosystem .tab-content").hide();
				var activeTab = $(this).data("rel"); 
				$("#"+activeTab).fadeIn();
				$(".circle-section .text-curve").each(function(){
					var matchTab = $(this).data("rel");
					if(matchTab == activeTab){
						$(".text-curve").removeClass("active");
						$(this).addClass('active');
					}
				})
			});

			$(document).on('click', '.text-curve', function() {
				var attr = $(this).attr('data-rel');
				var activeTab = $(this).data("rel");
				if (typeof attr !== typeof undefined && attr !== false) {
					$(".text-curve").removeClass("active");
					$(this).addClass("active");
					if($(window).width() > 991){				
						$("#iot-lumada-ecosystem .tab-content").hide();				
						$("#"+activeTab).fadeIn();
						$(".text-curve").removeClass("active");
						$(this).addClass("active");
						$("#iot-lumada-ecosystem ul.tabs li").each(function(){
							var matchTab = $(this).data("rel");
							if(matchTab == activeTab){
								$("#iot-lumada-ecosystem ul.tabs li").removeClass("active");
								$(this).addClass('active');
							}
						})
					}else{
						$(".lumada-eco-tab .accordion-menu-container").each(function(){
							var matchTab = $(this).data("rel");
							if(matchTab == activeTab){
								$('.accordion-level > .accordion-menu-container, .accordion-level > .accordion-content').removeClass('open');
								$(this).addClass('open');
								$(this).closest('div').next('div.accordion-content',this).addClass('open');

								var offsetFirst=$($('.lumada-eco-tab .accordion-menu-container:eq(0)')).offset().top;
		                        var clickedIndexHeight= $(this).outerHeight();
		                        var clickedIndex= $(this).parent().index();
		                        var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
								$("body, html").animate({ 
	                                scrollTop: finalIndex                             
	                            }, 600);
							}
						})
					}

				}
			});

			$(document).on('click','.accordion-level > .accordion-menu-container' , function(event) {
				var activeTab = $(this).data("rel");
				$(".circle-section .text-curve").each(function(){
					var matchTab = $(this).data("rel");
					if(matchTab == activeTab){
						$(".text-curve").removeClass("active");
						$(this).addClass('active');
					}
				})
				$('.accordion-level > .accordion-menu-container, .accordion-level > .accordion-content').removeClass('open');
		        var $currentContent = $(this).closest('div').next('div.accordion-content',this);
		        if ($(this).hasClass("open") && $(this).next().queue().length === 0) {
		            $currentContent.removeClass('open');
		            $(this).removeClass("open");
		        } else if (!$(this).hasClass("open") && $(this).next().queue().length === 0) {
		            $currentContent.addClass('open');
		            $(this).addClass("open");
		        }
		        var offsetFirst=$($('.lumada-eco-tab .accordion-menu-container:eq(0)')).offset().top;
                var clickedIndexHeight= $(this).outerHeight();
                var clickedIndex= $(this).parent().index();
                var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
				$("body, html").animate({ 
                    scrollTop: finalIndex                             
                }, 600);
		        return false;
		    });
		},
		bindEventSelector:function(){
			/* Lumada Eco-System Starts */
			hds.iotlumada.setTextCircle();
			hds.iotlumada.lumadaEcoSystemEvents();

		    $(window).on( "orientationchange", function( event ) {
                hds.iotlumada.setTextCircle();
            });
		    /* Lumada Eco-System Ends */

		    $(window).resize(function() {
			   hds.iotlumada.setTextCircle();
			});

		    /* Interactive Banner CTA */
			$('.iot-lumada-interactive-banner a.lumada-ia-btn').on('click', function(event){
				event.preventDefault();
				var target= $(this.hash);
				$('body,html').animate({'scrollTop': target.offset().top + 4}, 400);
			});
		},
	}

	/******** IOT Lumada Carousal ************/
	hds.iotlumadaCarousel = {
		init: function(options) {
			hds.iotlumadaCarousel.bindEventSelector();
		},
		bindEventSelector:function(){
			$('.iot-lumada-carousal').each(function(){
				var car1Time = $(this).find('.carousel1-time').text(),
			    	car1Auto = $(this).find('.carousel1-auto').text(),
			    	car1Bullet = $(this).find('.carousel1-bullet').text();
			    if(car1Bullet == 'true'){
			    	car1Bullet = true;
			    }else{
			    	car1Bullet = false;
			    }
			    $(this).find(".lumada-slider").slick({
			        dots: car1Bullet,
			        infinite: true,
			        speed: 800,
			        slidesToShow: 1,
			        adaptiveHeight: true,
			        autoplay: car1Auto,
			        autoplaySpeed: car1Time,
			        fade: true
			    });
			})

			$('.iot-lumada-platform-carousal').each(function(){
				var car2Time = $(this).find('.carousel2-time').text(),
				    car2Auto = $(this).find('.carousel2-auto').text(),
				    car2Bullet = $(this).find('.carousel2-bullet').text();				    
			    if(car2Bullet == 'true'){
			    	car2Bullet = true;
			    }else{
			    	car2Bullet = false;
			    }			    
				 $(this).find(".lumada-platform-slider").slick({
			        dots: car2Bullet,
			        infinite: true,
			        speed: 800,
			        slidesToShow: 1,
			        adaptiveHeight: true,
			        autoplay: car2Auto,
			        autoplaySpeed: car2Time,
			        fade: true
			    });
			})			
		}
	}

	/******** IOT Lumada Categories Component ************/
	hds.iotlumadaCategories = {
		init: function(options) {
			hds.iotlumadaCategories.bindEventSelector();
		},
		setHideShowState: function(){
			$(window).resize(function() {
				var actualWidth = $(window).width() + 17;
				if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
					{
					  actualWidth = $(window).width();
					}
				if(actualWidth > 991){
					$(".category-content-archives").hide();
					$('.iot-lumada-categories .category-list-archives ul li').each(function(){
						if($(this).hasClass('active')){
							var id = $(this).data('rel');
							$('#' + id).show();
						}
					})
				}else{
					$(".category-content-archives").show();
				}
			})
			if($(window).width() > 991){
				$(".category-content-archives").hide();
				$(".category-content-archives:first").show();
				$(".iot-lumada-categories .category-list-archives ul li").removeClass('active');
				$(".iot-lumada-categories .category-list-archives ul li:first").addClass('active');
			}else{
				$(".category-content-archives").show();
			}
		},
		bindEventSelector:function(){
			hds.iotlumadaCategories.setHideShowState();
            $('.iot-lumada-categories .pr-archives-list .category-content').map(function(){
				$(this).find('h3').first().css({'margin-top':'0'});
			});
			$(document).on('click', '.iot-lumada-categories .category-list-archives ul li', function() {
				var attr = $(this).attr('data-rel');
				var activeTab = $(this).data("rel");
				if (typeof attr !== typeof undefined && attr !== false) {
					$(".iot-lumada-categories .category-list-archives ul li").removeClass("active");
					$(this).addClass("active");
					var actualWidth = $(window).width() + 17;
					if(actualWidth > 991){
						$(".category-content-archives").hide();				
						$("#"+activeTab).fadeIn();
						$(".iot-lumada-categories .category-list-archives ul li").removeClass("active");
						$(this).addClass("active");
						$(".iot-lumada-categories .category-list-archives ul li").each(function(){
							var matchTab = $(this).data("rel");
							if(matchTab == activeTab){
								$(".iot-lumada-categories .category-list-archives ul li").removeClass("active");
								$(this).addClass('active');
							}
						})
					}
				}
			});

			$(window).on( "orientationchange", function( event ) {
                hds.iotlumadaCategories.setHideShowState();
            });
		}
	}

	/******** Customer Hero Short Banner with Carousel ************/
	hds.customerHbCarousal = {
		init: function(options) {
			hds.customerHbCarousal.bindEventSelector();
		},
		bindEventSelector:function(){
			$('.customer-hero-short-banner').each(function(){
				var carTime = $(this).find('.carousel-time').text();
				if ($('.head-scroll div').length > 1) {
					$(this).find(".head-scroll").slick({
						dots: false,
						arrows: false,
						infinite: true,
						speed: 200,
						slidesToShow: 1,
						autoplay: true,
						autoplaySpeed: carTime,
						vertical: true,
						verticalSwiping: true,
						verticalReverse: true,
					});
				}				
			})			
		}
	}

	/******** Customer Testimonials Carousal ************/
	hds.customerTestimonials = {
		init: function(options) {
			hds.customerTestimonials.bindEventSelector();
		},
		bindEventSelector:function(){
			$('.customer-quote-carousal').each(function(){
				var carTime = $(this).find('.carousel-time').text(),
			    	carAuto = $(this).find('.carousel-auto').text();
			    if(carAuto == 'true'){
			    	carAuto = true;
			    }else{
			    	carAuto = false;
			    }
			    $(this).find(".customer-slider").slick({
			        dots: true,
			        arrows: false,
			        infinite: true,
			        speed: 800,
			        slidesToShow: 1,
			        adaptiveHeight: true,
			        autoplay: carAuto,
			        autoplaySpeed: carTime,
			        fade: true
			    });

			})		
		}
	}

	/******** Customer Testimonials Carousal ************/
	hds.featuredCustomers = {
		init: function(options) {
			hds.featuredCustomers.bindEventSelector();
		},
		bindEventSelector:function(){
			$('.featured-customers .resources-column').each(function(){
				var carTime = $(this).find('.carousel-time').text(),
			    	carAuto = $(this).find('.carousel-auto').text();
			    if(carAuto == 'true'){
			    	carAuto = true;
			    }else{
			    	carAuto = false;
			    }
			    $(this).find(".resources-inner-col").slick({
			        dots: true,
			        arrows: false,
			        infinite: true,
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        autoplay: carAuto,
			        autoplaySpeed: carTime,
			        responsive: [{
			                breakpoint: 1024,
			                settings: {
			                    slidesToShow: 3,
			                    slidesToScroll: 3,
			                    infinite: true,
			                    dots: true
			                }
			            }, {
			                breakpoint: 650,
			                settings: {
			                    slidesToShow: 2,
			                    slidesToScroll: 2
			                }
			            }, {
			                breakpoint: 480,
			                settings: {
			                    centerMode: true,
			                    slidesToShow: 1,
			                    slidesToScroll: 1
			                }
			            }
			        ]
			    });
			})

			var heights = $('.featured-customers .resource-item').height();
			$('.featured-customers .news-column').css("height", heights);
			}		
		}
		/******** Home banner Carousal ************/
		hds.homefeaturedCustomers = {
		init: function(options) {
			hds.homefeaturedCustomers.bindEventSelector();
		},
		bindEventSelector:function(){
			$('.hv-home-featured-listing .hv-home-resources-column').each(function(){
				var carTime = $(this).find('.carousel-time').text(),
			    	carAuto = $(this).find('.carousel-auto').text();
			    if(carAuto == 'true'){
			    	carAuto = true;
			    }else{
			    	carAuto = false;
			    }
			    $(this).find(".hv-home-resources-inner-col").slick({
			        dots: false,
			        arrows: true,
			        infinite: true,
			        slidesToShow: 4,
			        slidesToScroll: 1,
					centerMode: false,
			        autoplay: carAuto,
			        autoplaySpeed: carTime,
			        responsive: [{
			                breakpoint: 1024,
			                settings: {
			                    slidesToShow: 3,
			                    slidesToScroll: 1,
			                    infinite: true,
			                    dots: false,
								arrows: false
			                }
			            },{
			                breakpoint: 767,
			                settings: {
			                    slidesToShow: 2,
			                    slidesToScroll: 1,
			                    infinite: true,
			                    dots: false,
								arrows: false
			                }
			            },
						{
			                breakpoint: 650,
			                settings: {
			                    slidesToShow: 1,
			                    slidesToScroll: 1,
								dots: false,
								arrows: false
			                }
			            }, {
			                breakpoint: 480,
			                settings: {
			                    centerMode: true,
			                    slidesToShow: 1,
			                    slidesToScroll: 1,
								dots: false,
								arrows: false
			                }
			            }
			        ]
			    });
			})
			}		
		}
		/******** Pentaho Download & Other Scripts ************/
		hds.pentahoEvents = {
			init: function(options) {
				hds.pentahoEvents.bindEventSelector();
				hds.pentahoEvents.pentahoDownload();
			},
			pentahoDownload: function(){
				/* function to open Pentaho modal window start and detect Operrating System */
			    var dataOS = [{string: navigator.platform,subString: "Win",identity: "Windows"},{string: navigator.platform,subString: "Mac",identity: "Mac"},{string: navigator.platform,subString: "Linux",identity: "Linux"}];
			    var pentos = searchString(dataOS);
			    if(pentos == 'Windows'){
			        $('a[rel="iframePentaho"]').addClass('posdl-win');
			    }
			    if(pentos == 'Linux'){
			        $('a[rel="iframePentaho"]').addClass('posdl-linux');
			    }
			    if(pentos == 'Mac'){
			        $('a[rel="iframePentaho"]').addClass('posdl-mac');
			    }			    

			    $(document).on('click', 'a[rel=iframePentaho]', function (evt) {
			        evt.preventDefault();
			        var targetURL = $(this).attr('href');
			        var ot = $(this).data('os');
			        $('.osLink').text('').text(ot);
			        if(pentos == 'Windows'){
			        	if($(this).hasClass('posdl-linux') || $(this).hasClass('posdl-mac')){
			        		$(this).removeClass('posdl-win');
			        	}
			        }
			        if(pentos == 'Linux'){
			        	if($(this).hasClass('posdl-win') || $(this).hasClass('posdl-mac')){
			        		$(this).removeClass('posdl-linux');
			        	}
			        }
			        if(pentos == 'Mac'){
			        	if($(this).hasClass('posdl-linux') || $(this).hasClass('posdl-win')){
			        		$(this).removeClass('posdl-mac');
			        	}
			        }
			        var pen = $.cookie("pentaho");
			        if (pen != 'true') {			        	
			        	if ($(window).width() < 991 || navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
                            var formTitle = pentdeviceformtitle;
				            var formDesc = pentdeviceformdesc;
				            $('.pentaho-overlay').find('.title').text('').append(formTitle);
				            $('.pentaho-overlay').find('.desc').text('').append(formDesc);
				            $('.pentaho-overlay').find('.sub-title').hide();
                        }else{
                            var formTitle = $(this).attr('data-formtitle');
				            var formDesc = $(this).attr('data-formdescription');
				            var formSubTitle = $(this).attr('data-formsubtitle');
				            $('.pentaho-overlay').find('.title').text('').append(formTitle);
				            $('.pentaho-overlay').find('.sub-title').text('').append(formSubTitle);
				            $('.pentaho-overlay').find('.desc').text('').append(formDesc);

				            if(ot == undefined){
				            	localStorage.setItem('pdos', pentos);
				            }else{
				            	localStorage.setItem('pdos', ot);
				            }				            
                        }
			            $('.pentaho-overlay').find('.form-body').html('<iframe src="' + targetURL + '" height="540" frameborder="0" scrolling="no" id="penModalWindow" onload="pentahoDownloadIframe(this.id)"></iframe><div id="pentaho-modal-loading"></div>');
			            $('.pentaho-overlay').show();
			        }else{
			        	if ($(window).width() < 991 || navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
			                document.location.href = '/en-us/products/big-data-integration-analytics/pentaho-trial-download/request-demo/request-demo-ty.html#thankyou';
			            }else{
			            	if($(this).hasClass('posdl-win')){
				                var filePath = $('#winosfile').text();
				            }
				            if($(this).hasClass('posdl-linux')){
				                var filePath = $('#linuxfile').text();
				            }
				            if($(this).hasClass('posdl-mac')){
				                var filePath = $('#macosfile').text();
				            }
				            var dUrl = window.location.protocol + '//' + window.location.hostname + '/bin/services/s3files?filePath=' + filePath;
				            pentahoDownloadURL(dUrl);
			            }			            
			        }
			        var pot = $('.pentaho-overlay').offset().top;
			        $('.pentaho-overlay .container').css({'margin-top':pot + 100});
			        $('.pentaho-overlay').css({'position':'absolute'});

			        if($(this).hasClass('posdl-vm')){
			            var filePath = $('#vmfile').text();
			            var dUrl = window.location.protocol + '//' + window.location.hostname + '/bin/services/s3files?filePath=' + filePath;
				        pentahoDownloadURL(dUrl);
			        }      
			    });
			    $(document).on('click', '.pentaho-overlay .close-overlay', function (evt) {
			    	$('.pentaho-overlay').find('.form-body').html('');
			        $('.pentaho-overlay').hide();
			        $('.pentaho-overlay, .pentaho-overlay .container').removeAttr('style');
			    })

			    $(document).on('click', '.pentaho-dl-again', function(events){
			    	events.preventDefault();
			    	var filePath = '';
					var pdos = localStorage.getItem('pdos');
					if(pdos == "Windows"){
		                filePath = $('#winosfile').text();
		            }
		            if(pdos == "Linux"){
		                filePath = $('#linuxfile').text();
		            }
		            if(pdos == "Mac"){
		                filePath = $('#macosfile').text();
		            }
		            var dUrl = window.location.protocol + '//' + window.location.hostname + '/bin/services/s3files?filePath=' + filePath;
		            pentahoDownloadURL(dUrl);
				})

			    if($('.common-hero-short-banner .banner-note').length > 0){
			    	if ($(window).width() < 991) {
			    		$('.common-hero-short-banner').find('.btn-square-white.request').css({'margin-bottom':0});
			    	}
			    }
			},
			handleBlGeoOverlay: function(){
	            $('.hds_globalNav_geo-selc .tab-pane .states-names ul li').each(function(){
	                if($.trim($(this).text()) == 'blank'){
	                    if ($(window).width() > 991) {
	                        $(this).removeAttr('style');
	                        $(this).css({'visibility':'hidden'});
	                    }else{
	                        $(this).removeAttr('style');
	                        $(this).css({'display':'none'});
	                    }
	                }
	            })
	        },
			bindEventSelector:function(){
				$(window).on( "load", function( event ) {
					pentdeviceformtitle = $('#deviceformtitle').text();
					pentdeviceformdesc = $('#deviceformdesc').text();
					/* Blank list handling in Geo Overlay */
					hds.pentahoEvents.handleBlGeoOverlay();
				})
				window.addEventListener("resize", function() {
				    if ($('#penModalWindow').length > 0) {
				        pentahoDownloadIframe('penModalWindow');
				    }
				    if ($(window).width() < 991) {
			    		$('.common-hero-short-banner').find('.btn-square-white.request').css({'margin-bottom':0});
			    	}
			    	/* Blank list handling in Geo Overlay */
			    	hds.pentahoEvents.handleBlGeoOverlay();
				})
				$(window).on( "orientationchange", function( event ) {
				    if ($('#penModalWindow').length > 0) {
				        pentahoDownloadIframe('penModalWindow');
				    }
				    if ($(window).width() < 991) {
			    		$('.common-hero-short-banner').find('.btn-square-white.request').css({'margin-bottom':0});
			    	}
			    	/* Blank list handling in Geo Overlay */
			    	hds.pentahoEvents.handleBlGeoOverlay();
				})

				if ($('.request-demo-main').length > 0) {
					if (window.location.href.indexOf("request-demo.html#thankyou") > 0) {
						$('.pentaho-ty').css({'display':'block'});
						$('.request-demo-main ').addClass('thankyou');
						$('.breadcrumb-container .breadcrumb').removeClass('black');
						$('.breadcrumb ul li').last().find('span').text('Thank you');
					}else{
						$('.breadcrumb-container .breadcrumb').addClass('black');
						$('.hds-main-navigation-container').addClass('navwithouthero');
					}
				}

				if ($('.pentaho-install-grid').length > 0) {
					if (window.location.href.indexOf("#thankyou") > 0 && window.document.referrer != "") {
						$('.pentaho-ty').css({'display':'block'});
						$('.pentaho-normal').css({'display':'none'});
					}else{
						$('.pentaho-ty').css({'display':'none'});
						$('.pentaho-normal').css({'display':'block'});
					}
				}
			}		
		}
		
		/******** Customer Search Component ************/
		hds.customerFilterList = {
			init: function(options) {
				var defaults = {
	                filterTopLeft: '.filters-section',
	                filterTarget: '.customer',
	                clearSwitch: '.tagList .sfheight a.clear-results'               
	            }
	            this.options = $.extend(defaults, options);
				hds.customerFilterList.renderJsonObject();
				hds.customerFilterList.bindEventSelector();
			},
			renderJsonObject: function(){
				var jsonText = jData;
				var jo = jsonText;				
				var $ele = $('.hv-our-customers .customers-list .row-centered');
				$.each(jo, function(i, val){
					var $a = '', $b = '', $i = '', $f='', $popup = '';								
					$.each(jo[i].data, function(j, val){
						if(val.atype == 'video'){
							var wamkttitle = jo[i].maintitle + ' (video-icon)';
							$b += '<div class="icon" data-mkt-cta-title="'+ wamkttitle +'"><a href="javascript:void(0);" onclick="hds.resourceLib._openvideooverlayById('+ val.linkUrl +');" target="'+ val.openinnewwindow +'" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><img src="'+ val.iconimage +'"></a></div>';
						}
						if(val.atype == 'pdf'){
							var wamkttitle = jo[i].maintitle + ' (doc-icon)';
							$b += '<div class="icon" data-mkt-cta-title="'+ wamkttitle +'"><a href="'+ val.linkUrl +'" target="'+ val.openinnewwindow +'" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><img src="'+ val.iconimage +'"></a></div>';
						}
						if(val.atype == 'overlay'){
							var wamkttitle = jo[i].maintitle + ' (quote-icon)';
							$b += '<div class="icon overlay" data-mkt-cta-title="'+ wamkttitle +'"><a href="javascript:void(0);" target="'+ val.openinnewwindow +'" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><img src="'+ val.iconimage +'"></a><div class="pointer"></div></div>';
							$popup = '<div class="cust-detail"><div class="close"></div><h2 class="ptitle">'+ val.title +'</h2>'+ val.description + '</div>';
						}			
					});

					if(hds.customerFilterList.checkNumbersOnly(jo[i].mhref)){
						$i = '<a href="javascript:void(0);" data-anc="video" onclick="hds.resourceLib._openvideooverlayById('+ jo[i].mhref +');" target="'+ jo[i].mtarget +'"><img class="img-responsive" src="'+ jo[i].logo +'" alt="'+ jo[i].maintitle +'"></a>';
					}else{
						if(!jo[i].logo){
							$i = '<div class="cust-name"><span><a href="'+ jo[i].mhref +'" target="'+ jo[i].mtarget +'">'+ jo[i].maintitle +'</a></span></div>';
						}else{
							if(jo[i].mhref.indexOf('javascript:void(0)') !== -1){
								$i = '<img class="img-responsive" src="'+ jo[i].logo +'" alt="'+ jo[i].maintitle +'">';
							}else{
								$i = '<a href="'+ jo[i].mhref +'" target="'+ jo[i].mtarget +'"><img class="img-responsive" src="'+ jo[i].logo +'" alt="'+ jo[i].maintitle +'"></a>';
							}							
						}
					}
					
					if(!jo[i].isfeatured){
						$f = '';
					}else{
						$f = jo[i].isfeatured;
					}
					$a = '<div class="customer col-centered" data-featured="'+ $f +'" data-ind="'+ jo[i].industrytype +'" data-asset="'+ jo[i].assettype +'" data-country="'+ jo[i].country +'" data-solution="'+ jo[i].solutiontype +'" data-product="'+ jo[i].producttype +'" data-allfilter="'+ jo[i].allfilter +'" data-search="'+ jo[i].searchfilter +'"><div class="logo">'+ $i +'</div><div class="cta-box clearfix" data-mkt-id="panel" data-mkt-name="panel-customer links"><div class="centered">'+ $b +'</div></div>'+ $popup +'</div>';
					$ele.append($a);
				})
				if($('.hv-filters-box').length == 0){
					$('.customer').each(function(){
						var f = $(this).data('featured');
						if(f != ""){
							$(this).css({'display':'inline-block'});
						}else{
							$(this).css({'display':'none'});
						}
					})
				}
				$('#loading').remove();
			},
			checkNumbersOnly: function(inputtxt){
				var numbers = new RegExp('^[0-9]+$');
				if(inputtxt.match(numbers)){
					return true;
				}
			},
			getSelectedFilters: function(arg1, arg2, arg3, arg4, arg5, arg6){
				var s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', s6 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '', j6 = '';
	            var ff = [];   
	            var aa = [];   
	            var c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0; 
	            var count = 0;	            
	            $('.customers-list .row-centered').append('<div id="loading"></div>');		        
		        $('.customer').each(function(){
		        	var pr = $(this).data('allfilter');
		        	var pr1 = pr.split(',');

		        	var ps = $(this).data('allfilter');
		        	var dsearch = $(this).data("search");

		        	if(arg1 == undefined && arg2 == undefined && arg3 == undefined && arg4 == undefined && arg5 == undefined && arg6 == ''){
	                    $(this).css({'display':'inline-block'});
	                    $(this).addClass('cfilter');
	                } 
	                else if(arg1 != undefined && arg2 != undefined && arg3 != undefined && arg4 != undefined && arg5 != undefined && arg6 != ''){
	                    $.grep(arg1, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s1 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg2, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s2 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg3, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s3 = 'true';
	                            }
	                        })
						})
						
						$.grep(arg4, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s4 = 'true';
	                            }
	                        })
						})
						
						$.grep(arg5, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s5 = 'true';
	                            }
	                        })
	                    })

	                    if (hds.customerFilterList.aContainsB(dsearch, arg6)) {
	                    	s6 = 'true';
	                    }

	                    if(s1 == 'true' && s2 == 'true' && s3 == 'true' && s4 == 'true' && s5 == 'true' && s6 == 'true'){
	                        $(this).css({'display':'inline-block'});
	                        $(this).addClass('cfilter');
	                        count = count + 1;
	                    }else{
	                        $(this).css({'display':'none'});
	                        $(this).removeClass('cfilter');
	                    }
	                }else{
	                    if(arg1 != undefined){                        
	                        $.grep(arg1, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c1 = c1 + 1;
	                                }
	                            })
	                        })
	                        if(c1 == 0){
	                            j1 = 'false'; 
	                        }else{
	                            s1 = 'true';
	                        }
	                    }                    
	                    if(arg2 != undefined){
	                        $.grep(arg2, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c2 = c2 + 1;
	                                }
	                            })
	                        })
	                        if(c2 == 0){
	                            j2 = 'false'; 
	                        }else{
	                            s2 = 'true';
	                        }
	                    }

	                    if(arg3 != undefined){
	                        $.grep(arg3, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c3 = c3 + 1;
	                                }
	                            })
	                        })
	                        if(c3 == 0){
	                            j3 = 'false'; 
	                        }else{
	                            s3 = 'true';
	                        }
						}
						if(arg4 != undefined){
	                        $.grep(arg4, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c4 = c4 + 1;
	                                }
	                            })
	                        })
	                        if(c4 == 0){
	                            j4 = 'false'; 
	                        }else{
	                            s4 = 'true';
	                        }
						}
						if(arg5 != undefined){
	                        $.grep(arg5, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c5 = c5 + 1;
	                                }
	                            })
	                        })
	                        if(c5 == 0){
	                            j5 = 'false'; 
	                        }else{
	                            s5 = 'true';
	                        }
	                    }
	                    if(arg6 != ''){
	                    	if (hds.customerFilterList.aContainsB(dsearch, arg6)) {
		                    	c6 = c6 + 1;
		                    }
		                    if(c6 == 0){
	                            j6 = 'false'; 
	                        }else{
	                            s6 = 'true';
	                        }
	                    }

	                    if(s1 != ''){
	                        ff.push('s1 = ' + s1);
	                    }
	                    if(s2 != ''){
	                        ff.push('s2 = ' + s2);
	                    }
	                    if(s3 != ''){
	                        ff.push('s3 = ' + s3);
	                    }
	                    if(s4 != ''){
	                        ff.push('s4 = ' + s4);
						}
						if(s5 != ''){
	                        ff.push('s5 = ' + s5);
						}
						if(s6 != ''){
	                        ff.push('s6 = ' + s6);
	                    }

	                    var ffLen = ff.length;                
	                    $.each(ff , function(i, val) {
	                        if(ffLen == (i+1)){
	                            aa.push(ff [i] );
	                        }else{
	                            aa.push(ff [i] + ' && ');
	                        }   
	                    });
	                    var b = aa.toString();
	                    var c = b.replace (/,/g, "");
	                    if(c){
	                        $(this).css({'display':'inline-block'});
	                        $(this).addClass('cfilter');
	                        count = count + 1;
	                    }

	                    if(j1 == 'false' || j2 == 'false' || j3 == 'false' || j4 == 'false' || j5 == 'false' || j6 == 'false'){
	                        $(this).css({'display':'none'});
	                        $(this).removeClass('cfilter');
	                    }
	                }

	                s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', s6 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '', j6 = '', c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0;
	                ff = [];                
	                a = [];
		        });				
				$('#loading').remove();
				var resCount = $('.customer:visible').length;
				if(resCount == 0){
					$('.customers-list .row-centered').find('.no-matched-result').remove();
					$('.customers-list .row-centered').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ resultNotFound +'</div>');
					$('.hvc-load-more .vall').hide();
				}else{
					$('.customers-list .row-centered').find('.no-matched-result').remove();
				}
			},
			lmSecondAttempt: function(){
				var size_li = $(".customer.cfilter").size();
				var y=parseInt($('#hv-customer-rcount').text());
				    $('.customer.cfilter:visible').hide();
				    $('.customer.cfilter:lt('+y+')').show();
			        if (size_li <= y) {
	                    $('.hvc-load-more .lmore, .hvc-load-more .vall').hide();
	                    /*if($('.no-matched-result').length > 0){
	                    	$('.hvc-load-more .vall').hide();	
	                    }else{
	                    	$('.hvc-load-more .vall').show();
	                    }*/	                    
	                }else{
	                    $('.hvc-load-more .lmore').show();
	                    $('.hvc-load-more .vall').show();
	                }
			},
	        buildMobileNavigation: function(arg) {
	            if ($(window).width() < 991) {
	                var getMobileSearc = $('.hv-customer-search').html();
	                $('.searchArea').html(getMobileSearc);
	                $('.hv-customer-search').html("");
	                var getFilterIndustry = $('#FilterIndustry .filters-list').html();
	                $('.FilterAreaIndustry').html(getFilterIndustry);
	                $('#FilterIndustry .filters-list').html("");
	                var getFilterCountry = $('#FilterCountry .filters-list').html();
	                $('.FilterAreaCountry').html(getFilterCountry);
	                $('#FilterCountry .filters-list').html("");
	                var getFilterProduct = $('#FilterProduct .filters-list').html();
	                $('.FilterAreaProduct').html(getFilterProduct);
					$('#FilterProduct .filters-list').html("");
					var getFilterService = $('#FilterService .filters-list').html();
	                $('.FilterAreaService').html(getFilterService);
	                $('#FilterService .filters-list').html("");
	                var getResFilters = $('.hv-customer-filters.dtop').html();
	                $('.topFilter .resource-filters').html(getResFilters);
	                $('.hv-customer-filters.dtop').html("");
	            } else {
	                if (!hds.customerFilterList.isEmpty($('.hv-customer-search'))) {
	                    $('.hv-customer-search').html($('.searchArea').html());
	                    $('.searchArea').html("");
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaIndustry'))) {
	                    $('#FilterIndustry .filters-list').html($('.FilterAreaIndustry').html());
	                    $('.FilterAreaIndustry').html("")
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaCountry'))) {
	                    $('#FilterCountry .filters-list').html($('.FilterAreaCountry').html());
	                    $('.FilterAreaCountry').html("")
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaProduct'))) {
	                    $('#FilterProduct .filters-list').html($('.FilterAreaProduct').html());
	                    $('.FilterAreaProduct').html("")
					}
					if (!hds.customerFilterList.isEmpty($('.FilterAreaService'))) {
	                    $('#FilterService .filters-list').html($('.FilterAreaService').html());
	                    $('.FilterAreaService').html("")
	                }	                
	                if (!hds.customerFilterList.isEmpty($('.topFilter .resource-filters'))) {
	                    $('.hv-customer-filters.dtop').html($('.topFilter .resource-filters').html());
	                    $('.topFilter .resource-filters').html("")
	                }
	            }
	            hds.customerFilterList._retainFilters();
	        },
	        isEmpty: function(el) {
	            return !$.trim(el.html())
	        },
			showMobileOverlay: function() {
	            hds.customerFilterList.buildMobileNavigation();
	            $('.overlayBox').css({
	                display: 'block',
	                left: 0,
	                top: 0,
	                position: 'absolute'
	            });
	            $('.bgCover').css({
	                display: 'block',
	                width: $(window).width(),
	                height: ' 100%',
	            });
	            $('.bgCover').css({
	                opacity: 0
	            }).animate({
	                opacity: 1
	            });                        
	            hds.customerFilterList.adjustOverlayHeight();
	        },
	        adjustOverlayHeight:function(){
	            var pgHeight = $(window).outerHeight(),
	                otHeight = $('.overlayTop').outerHeight(),
	                omHeight = $('.filtrSideBar').outerHeight(),
	                obHeight = $('.FilterAreaBtnPop').outerHeight();

	                omHeight = pgHeight - (otHeight + obHeight);
	                $('.filtrSideBar').css({'height': omHeight - 48});
	                $('.filter-mob-list').css({'height': omHeight - 48});
	        },
	        closeOverLayPopup: function() {
	            var actualWidth = $(window).width() + 17;                
	            if (actualWidth > 991) {
	                if (!hds.customerFilterList.isEmpty($('.searchArea'))) {
	                    $('.hv-customer-search').html($('.searchArea').html());
	                    $('.searchArea').html("");
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaIndustry'))) {
	                    $('#FilterIndustry .filters-list').html($('.FilterAreaIndustry').html());
	                    $('.FilterAreaIndustry').html("")
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaCountry'))) {
	                    $('#FilterCountry .filters-list').html($('.FilterAreaCountry').html());
	                    $('.FilterAreaCountry').html("")
	                }
	                if (!hds.customerFilterList.isEmpty($('.FilterAreaProduct'))) {
	                    $('#FilterProduct .filters-list').html($('.FilterAreaProduct').html());
	                    $('.FilterAreaProduct').html("")
					}
					if (!hds.customerFilterList.isEmpty($('.FilterAreaService'))) {
	                    $('#FilterService .filters-list').html($('.FilterAreaService').html());
	                    $('.FilterAreaService').html("")
	                }
	                if (!hds.customerFilterList.isEmpty($('.topFilter .resource-filters'))) {
	                    $('.hv-customer-filters.dtop').html($('.topFilter .resource-filters').html());
	                    $('.topFilter .resource-filters').html("")
	                }
	                $('.bgCover').hide();
	                hds.customerFilterList._retainFilters();
	                //$('.resource-filters.dtop').show();
	            }else{
	                $('.bgCover').hide();
	                //$('.resource-filters.dtop').hide();
	            }
	        },
	        _retainFilters:function(){
	            $('input[name="ctyFunction"],input[name="ctyCountry"],input[name="proFunction"],input[name="serFunction"]').each(function(){
	                if($(this).hasClass('filter-retain')){
	                    $(this).prop('checked', true);
	                }
	            })
	            /*if($('#resSearch').hasClass('filter-retain')){
	                $('#resSearch').val(searchVal);
	            }*/
	        },
	        addRemoveFilters:function(){
	            var arrVal = [];
	            $('input[name="ctyFunction"],input[name="ctyCountry"],input[name="proFunction"],input[name="ctyFunction"],input[name="serFunction"]').removeClass('filter-retain');
	            $('input[name="ctyFunction"]:checked,input[name="ctyCountry"]:checked,input[name="proFunction"]:checked,input[name="ctyFunction"]:checked,input[name="serFunction"]:checked').each(function() {
	                $(this).addClass('filter-retain');
	                arrVal.push($(this).attr('id'));
	            });
	            hds.customerFilterList.getCheckboxValue(arrVal);
	        },
	        addKeywordSearchTag: function(checkBoxValue, tag) {
	            $('#searchTag .keyword').html('');
	            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeKeyword'>&nbsp;</span></span>");
	            /* store the value in elment data so we can reference back to checkbox */
	            $newTag.data('value', checkBoxValue);
	            $(tag).append($newTag);
	        },
	        getCheckboxValue: function(arg1) {
	            if (arg1 != 0) {
	                var newHTML = $.map(arg1, function(value) {
	                    var checkBoxVal = $("#" + value).val();
	                    var checkBoxText = $("#" + value).siblings('label').text();
	                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closeFilter'>&nbsp;</span></span>");
	                });
	                $('#filterTag .label').css({
	                    'display': 'inline'
	                });
	                $('#filterTag .keyword-filter').html(newHTML);
	            } else {	                
                    $('#filterTag .keyword-filter').html('');
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
	            }
	        },
	        returnCheckStatus:function(){
	            var $indFilters = $('.FilterIndustryList input.filters').filter(':checked'),
					$countryFilters = $('.FilterCountryList input.filters').filter(':checked'),
					$prodFilters = $('.FilterProductList input.filters').filter(':checked'),
					$serviceFilters = $('.FilterServiceList input.filters').filter(':checked');

	                return ($indFilters.length + $countryFilters.length + $prodFilters.length + $serviceFilters.length);
	        },
	        showHideFilters:function(){
                var clearSwitch = this.options.clearSwitch;
                if ($(window).width() > 991) {
                    var deviceAgent = navigator.userAgent.toLowerCase();
                    var agentID = deviceAgent.match(/(ipad)/);      
                    if (agentID) {
                        if($('.sfheight').height() > 22){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.show-all-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});                            
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show')); 
                            $('.sfilter').css({'display':'inline-block'});
                            var $checkStatus = hds.customerFilterList.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                                if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }else{
                        if($('.sfheight').height() > 22){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            var $checkStatus = hds.customerFilterList.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                                if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }
                }else{
                    $(clearSwitch).css({'display':'none'});
                    $('.sfilter').removeClass('add-filters');
                    var $checkStatus = hds.customerFilterList.returnCheckStatus();
                    if($checkStatus != 0){
                        if(mFilterCheck == false){
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});
                            mFilterCheck = true;
                        }else{
                            if($('.sfheight').height() > 22){
                                $('.show-all-filters').text($('#cta-filters').data('hide'));
                                $('#cta-filters').css({'display':'inline-block'});
                                $('.sfilter').css({'display':'inline-block'});
                            }
                        }                        
                    }else{
                        if($('#searchTag .keyword').html()!=''){              
                            $('.show-all-filters').text($('#cta-filters').data('show'));              
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});
                        }
                    }
                }
        	},
        	aContainsB: function(a, b) {
			    return a.indexOf(b) >= 0;
			},
			bindEventSelector: function(){
				$('input[name="ctyFunction"], input[name="ctyCountry"], input[name="proFunction"], input[name="serFunction"]').prop('checked', false);
				resultNotFound = $('#hv-customer-error').html();
				hvInputPlaceHolder = $('#resSearch').attr('placeholder');
				hvsearchpholder = $('#hv-search-pholder').text();
				var deviceAgent = navigator.userAgent.toLowerCase();
            	var nDevices = deviceAgent.match(/(iphone|ipad|android)/);
				if (!nDevices) {
                	$(window).resize(function() {
                		$('.cust-scroll').each(function(){
                			var element = $(this).jScrollPane(); 
	                    	var api = element.data('jsp');
	                    	api.destroy();
                		})                		
	                    $('.filters-section').hide();	                    
	                    $('body').find('.mobFiltersBG').remove();
	                    $('body').removeClass('overflow-mobile');
	                    var actualWidth = $(window).width() + 17;                
	                    if (actualWidth > 991) {
	                        hds.customerFilterList.closeOverLayPopup();
	                    }else{
	                        $('.bgCover').hide();
	                    }
	                    $('.hv-customer-filters .filterby').removeClass('active');
                    	$('.resource-filters.dtop .filterby').removeClass('active');
	                });
	            }
	            $( window ).on( "orientationchange", function( event ) {
	                $('.bgCover').hide();
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                hds.customerFilterList.closeOverLayPopup();               
	                
	                var deviceAgent = navigator.userAgent.toLowerCase();
	                var agentID = deviceAgent.match(/(ipad)/);      
	                if (agentID) {
	                    var $checkStatus = hds.customerFilterList.returnCheckStatus();
	                    if (window.matchMedia("(orientation: landscape)").matches) {
	                        setTimeout(function(){
	                            $('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                        }, 1000);
	                    }else{
	                        if($checkStatus != 0){
	                            $('.show-all-filters').text($('#cta-filters').data('show'));
	                            $('#cta-filters').css({'display':'inline-block'});
	                            $('.sfilter').css({'display':'none'});   
	                        }
	                    }
	                    var element = $('.cust-scroll').jScrollPane(); 
                    	var api = element.data('jsp');
                    	api.destroy();
	                }                    
	            });

			    /* Customer Landing Page */
			    if(pentos == 'Mac'){
			    	$('.hv-our-customers').addClass('mac-os')
			    }
			    if($('.hv-filters-box ').length == 0){
			    	$('.hvc-load-more .lmore').css({'display':'none'});
			    }else{
			    	var qURL = window.location.href;
					var parms = hds.careerPassionList.getParmsFromURLHash(qURL);
					var p = parms["cust"];
					if(parms["cust"] == 'all'){
						$('.hvc-load-more .lmore').hide();
	                	$('.hvc-load-more .vall').hide();
					}else{
						var size_li = $(".customer").size();
					    hvdc=parseInt($('#hv-customer-rcount').text());
					    $('.customer:visible').hide();
					    $('.customer:lt('+hvdc+')').show();
					}
			    }
                $(document).on('click','.hvc-load-more .lmore', function() {
            		if($('.cfilter').length > 0){
            			var size_li = $(".customer.cfilter").size();
            			var t = $(".customer.cfilter:visible").size();
            			hvdc= (t+15 <= size_li) ? t+15 : size_li;
			        	$('.customer.cfilter:lt('+hvdc+')').slideDown('fast','linear');
			        	setTimeout(function(){
			        		var cust_vi = $(".customer:visible").size();
				        	if(size_li == cust_vi){
				        		$('.hvc-load-more .lmore').hide();
		                    	$('.hvc-load-more .vall').hide();
				        	}
			        	},300);
			        	if (size_li <= hvdc  ) {
		                    $('.hvc-load-more .lmore').hide();
		                    $('.hvc-load-more .vall').hide();
		                }else{
		                	if(size_li != $(".customer:visible").size()){
		                		$('.hvc-load-more .vall').show();
		                	}else{
		                		$('.hvc-load-more .vall').hide();
		                	}
		                    $('.hvc-load-more .lmore').show();		                    
		                }
            		}else{
            			var size_li = $(".customer").size();            			
            			hvdc= (hvdc+15 <= size_li) ? hvdc+15 : size_li;
			        	$('.customer:lt('+hvdc+')').slideDown('fast','linear');
			        	setTimeout(function(){
			        		var cust_vi = $(".customer:visible").size();
				        	if(size_li == cust_vi){
				        		$('.hvc-load-more .lmore').hide();
		                    	$('.hvc-load-more .vall').hide();
				        	}
			        	},300);
			        	if (size_li <= hvdc  ) {
		                    $('.hvc-load-more .lmore').hide();
		                    $('.hvc-load-more .vall').show();
		                }else{
		                    $('.hvc-load-more .lmore').show();
		                    $('.hvc-load-more .vall').show();
		                }
            		}			        
	            });
	            $(document).on('click','.hvc-load-more .vall', function() {
	            	$('.customer').removeClass('cfilter').css({'display':'inline-block'});
	            	$('.hvc-load-more .lmore').hide();
	                $('.hvc-load-more .vall').hide();
	            })
	            $(document).on('click','.icon.overlay', function() {
	            	$('.icon.overlay').removeClass('active');
	            	$(this).addClass('active');
	            	$('.cust-detail').removeAttr('style');
	            	$(this).parents('.customer').find('.cust-detail').css({'display':'block'});
	            	$('body').scrollTo($(this).parents('.customer'),{duration:'slow', offsetTop : '50'});
	            });
	            $(document).on('click', '.cust-detail .close', function() {
	                $(this).parent().hide();
	                $(this).parents('.customer').find('.icon.overlay').removeClass('active');
	            })
                /* Mobile DOM elements events binding */
                $(document).on('click', '#showInd, #showCountry, #showProd, #showService', function(event) {
					hds.customerFilterList.addRemoveFilters();
	                hds.customerFilterList.showHideFilters();
	                var $indFilters = $('.FilterIndustryList input.filters').filter(':checked'),
	                    $countryFilters = $('.FilterCountryList input.filters').filter(':checked'),
						$prodFilters = $('.FilterProductList input.filters').filter(':checked'),
						$solFilters = $('.FilterProductList input.filters').filter(':checked'),
						$serviceFilters = $('.FilterServiceList input.filters').filter(':checked');
	                var txtVal = $.trim($('#resSearch').val());
	                	txtVal = txtVal.toLowerCase();
	                if(txtVal == undefined){
	                	txtVal = '';
	                }

	                if ($indFilters.length > 0) {
	                    var checkIndVal = $.map($indFilters, function(el) {
	                        return el.value
	                    });
	                }
	                if ($countryFilters.length > 0) {
	                    var checkCountryVal = $.map($countryFilters, function(el) {
	                        return el.value
	                    });
	                }
	                if ($prodFilters.length > 0) {
	                    var checkProdVals = $.map($prodFilters, function(el) {
	                        return el.value
	                    });
					}
					if ($solFilters.length > 0) {
	                    var checkSolVals = $.map($solFilters, function(el) {
	                        return el.value
	                    });
					}
					if ($serviceFilters.length > 0) {
	                    var checkServiceVals = $.map($serviceFilters, function(el) {
	                        return el.value
	                    });
	                }

	                $('.filters-section').hide();
	                $('.hv-customer-filters.dtop a.filterby').removeClass('active');
	                $('#filterTag .keyword-filter').show();                   
	                
	                hds.customerFilterList.getSelectedFilters(checkIndVal, checkCountryVal, checkProdVals, checkSolVals, checkServiceVals, txtVal);	                
					hds.customerFilterList.lmSecondAttempt();
					event.preventDefault();
				})
				$(document).on('click', '.hv-filters-box .filter-toggle', function() {
					$('.hv-customer-filters' ).slideToggle();
					if(!$(this).find('.arrow-right').hasClass('arrow-down')){
						$(this).find('.arrow-right').addClass('arrow-down');
					}else{
						$(this).find('.arrow-right').removeClass('arrow-down');
					}
				});

				/* Filters By Industry/Country/Product */
	            var a = $('.hv-customer-filters.dtop').find('a');
	            $(document).on('click', '.hv-customer-filters.dtop .filterby', function(e) {
	                e.preventDefault();
	                if ($(window).width() > 768) {
	                    var filterId = $(this).data('refilter');
	                    var $this = $(this),
	                        speed = 500;
	                    if ($this.hasClass('active') === true) {
	                        $this.removeClass('active');
	                        $('.filters-section').hide();
	                        $('.hv-customer-filters.dtop .filterby').removeClass('active');

	                    } else if (a.hasClass('active') === false) {
	                        $('.filters-section').hide();
	                        $('.hv-customer-filters.dtop .filterby').removeClass('active');
	                        $this.addClass('active');
	                        $('#' + filterId).show();
	                    } else {
	                        a.removeClass('active');
	                        $('.filters-section').hide();
	                        $('.hv-customer-filters.dtop .filterby').removeClass('active');
	                        $this.addClass('active');
	                        $('#' + filterId).show();
	                    }                  
					}
					
					var actualWidth = $(window).width() + 17;
					if($(window).width() > 736){
						var osleft = $(this).find('span.caret-arrow').offset().left;
						var fos = (osleft - 480) + 295;
						$('#' + filterId).css({'left': fos});
					}

	                $('.cust-scroll').jScrollPane();
                    $('body').scrollTo('.hv-filters-box',{duration:'slow', offsetTop : '50'});
	                e.stopPropagation();
	            });

	            $(document).on('click', '.topFilter .filterby', function(e) {
	                e.preventDefault();
	                if(!$(this).hasClass('active')){
	                	var filterIdMob = $(this).index();
	                    filterIdMob = filterIdMob - 1;
	                    if ($(this).hasClass('active')){
	                        $(this).removeClass('active');
	                        $('.filter-mob-list').hide();
	                    }else{
	                        $('.topFilter .filterby').removeClass('active');
	                        $('.filter-mob-list').hide();
	                        $(this).addClass('active');
	                        $('.filter-mob-list').eq(filterIdMob).show();
	                    }
	                }
	                e.stopPropagation();
	            })

	            $(document).on('click', '.launchLink a', function(event) {
	                $('body').append('<div class="mobFiltersBG"></div>');
	                $('body').addClass('overflow-mobile');
	                setTimeout(function(){
	                    if ($(window).width() <= 991) {                   
	                        if($('.searchArea').html() == ""){
	                            hds.customerFilterList.showMobileOverlay();
	                        }else{
	                            $('.bgCover').css({
	                                display: 'block',
	                                width: $(window).width(),
	                                height: ' 100%',
	                            });
	                        }
	                    }
	                    $('.filters-section').hide();
	                    $('.topFilter .resource-filters').removeAttr('style');
	                    var h1 = $('.topFilter .resource-filters').outerHeight();
		                $('.topFilter .resource-filters').css({'min-height': h1 + 3});
	                    $('.topFilter .resource-filters .filterby').removeClass('active');
	                    $('.topFilter .resource-filters .filterby').eq(0).addClass('active');
						$('.filter-mob-list').css({'display':'none'});
						$('.filter-mob-list').eq(0).css({'display':'block'});
	                }, 1000);
	                event.preventDefault();
	            });
	            $(document).on('click', '.closeOverlay', function(event) {
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if(($('#filterTag .keyword-filter').html() == '') && ($('#searchTag .keyword').html() == '')){
	                    $('.clear-results').trigger('click');
	                    $('.bgCover').hide();                    
	                }else{
	                    $('.bgCover').hide();
	                }                                
	                event.preventDefault();
	            });

	            $(document).on('click', '.clear-results', function() {
	                $('#filterTag .keyword-filter').html('');
	                $('.customers-list .row-centered').find('.no-matched-result').remove();
	                $("input[name='ctyFunction'],input[name='ctyCountry'],input[name='proFunction'],input[name='serFunction']").removeAttr('checked').removeClass('filter-retain');
	                $("#resSearch").val('');
	                $('#filterTag .label').css({
	                    'display': 'none'
	                });
	                $('#searchTag .keyword').html('');
	                $('#searchTag .label').css({'display': 'none'});
	                $('.clearSearchIcon').css({'display': 'none'});	                
	                $('#cta-filters').css({'display':'none'});
	                $('.tagList .sfheight a.clear-results').css({'display':'none'});
	                mFilterCheck = false;
	                $('body').scrollTo('.hv-our-customers',{duration:'slow', offsetTop : '50'});
	                $('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                $('.hvc-load-more .vall').show();
	            });

	            $(document).on('click', '#mobShowFilters', function() {
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if ($(window).width() < 991) {
	                    if ($('.overlayBox').is(':visible')) {
	                        var txtVal = $.trim($('#resSearch').val().toLowerCase()),
	                            searchVal = txtVal;
	                            if(txtVal.length > 0){
                                    $('#searchTag .label').css({
                                        'display': 'inline'
                                    });
                                    $('#resSearch').addClass('filter-retain');
                                    hds.customerFilterList.addKeywordSearchTag(txtVal, '#searchTag .keyword');
                                    $('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                                $('.bgCover').hide();                    
	                            }else {
	                                $('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                                $('.bgCover').hide();
	                            }
	                    }
	                    $('body').scrollTo('.hv-our-customers',{duration:'slow', offsetTop : '50'});
	                }
	            })

	            $(document).on('click', '.closeFilter', function() {               
	                var dataMatch = $(this).parent().data('match');
	                if (dataMatch) {
	                    $('input[name="ctyFunction"]:checked, input[name="ctyCountry"]:checked, input[name="proFunction"]:checked, input[name="serFunction"]:checked').each(function() {
	                        if ($(this).val() == dataMatch) {
	                            $(this).removeAttr('checked').removeClass('filter-retain');
	                        }
	                    })
	                    $(this).parent().fadeOut('slow');
	                    $(this).parent().remove();
	                    if($('#filterTag .keyword-filter').html() == ""){
	                        $('#filterTag .label').css({'display': 'none'});
	                    }
	                    $('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                    if($('#filterTag .keyword-filter').html() == "" && $('#searchTag .keyword').html() == ""){
	                        $('#filterTag .label').css({'display': 'none'});
	                        $('.hvc-load-more .vall').show();
	                    }else{
	                    	$('.hvc-load-more .vall').hide();
	                    }
	                }
	                var $checkStatus = hds.customerFilterList.returnCheckStatus();
	                if($checkStatus == 0){
	                    if($('#searchTag .keyword').html()==''){
	                        $(".customer").removeClass('cfilter');
	                    }
	                }              
	            })

	            $(document).on('click', '.closeKeyword', function() {
	                searchVal = '';
                    $("#resSearch").val('');                    
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#searchTag .label').css({
                        'display': 'none'
                    });
                    $('#searchTag .keyword').html('');
                    $('.clearSearchIcon').hide();                    
                    if($('#resSearch').val() == ""){
                        var $checkStatus = hds.customerFilterList.returnCheckStatus();
                        $('#showInd, #showCountry, #showProd, #showService').trigger('click');
                        if($checkStatus == 0){                            
                            $('.tagList .sfheight a.clear-results').css({'display':'none'});
                            $('.hvc-load-more .vall').show();
                        }else{
                        	if($checkStatus == 0){
                        		$('.hvc-load-more .vall').show();
                        	}else{
                        		$('.hvc-load-more .vall').hide();
                        	}
                        }
                    }
	            })

	            $(document).on('click','.show-all-filters', function(){
	                var showText = $('#cta-filters').data('show'),
	                    hideText = $('#cta-filters').data('hide');
	                var $this = $(this);
	                if ($this.text() === hideText) {
	                    $this.text(showText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 22 , 'display':'inline-block'});
	                    }else{
	                        $('.sfilter').css({'display':'none'});
	                    }                    
	                    $('#cta-filters').removeClass('rem-style');
	                } else {
	                    $this.text(hideText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 'auto', 'display':'inline'});    
	                    }else{                        
	                        if ($(window).width() < 480) {
	                            $('.sfilter').css({'display':'block'});
	                        }else{
	                            $('.sfilter').css({'display':'inline'});
	                        }                        
	                    }
	                    $('.tagList .sfheight a.clear-results').css({'display':'none'});                      
	                    $('#cta-filters').addClass('rem-style');
	                }
	            })

	            $(document).on('click', '.searchResource', function(event) {
	            	var actualWidth = $(window).width() + 17;                
            		if (actualWidth > 991) {
	                    var txtVal = $.trim($('#resSearch').val().toLowerCase());
	                    if(txtVal.length > 0){
	                    	$('#searchTag .label').css({
                                'display': 'inline'
                            });
                            hds.customerFilterList.addKeywordSearchTag(txtVal, '#searchTag .keyword');
							$('#showInd, #showCountry, #showProd, #showService').trigger('click');
	                    }else{
	                    	$('#resSearch').attr('placeholder',hvsearchpholder);
	                    }	                    
	                }
	                event.preventDefault();
	            });

	            $(document).on('keyup', '#resSearch', function(event) {
	                var value = $.trim($(this).val());
	                if (value.length > 0) {
	                    $('.clearSearchIcon').show();
	                } else {
	                    $('.clearSearchIcon').trigger('click');
	                    $('.clearSearchIcon').hide();
	                }
	                event.preventDefault();
	            });
	            $(document).on('keypress', '#resSearch', function(event) {                
	                var keycode = (event.keyCode ? event.keyCode : event.which);
	                if (keycode == 13) {
	                    event.preventDefault();                 
	                    $('.searchResource').trigger('click');
	                }                              
	            });
	            $(document).on('click', '.clearSearchIcon', function(event) {
	                $(this).hide();
                    $("#resSearch").val('');
	            });
	            $(document).click(function(e) {
	                
	                if (!$(e.target).is('.resource-search, .resource-search *')) {
	                    $('#resSearch').attr('placeholder',hvInputPlaceHolder);
	                }
	                if (!$(e.target).is('.filters-section, .filters-section *, .filter-mob-list, .filter-mob-list *')) {
	                    $(".filters-section").hide();
	                    if ($(window).width() > 991) {
	                    	$(".filter-mob-list").hide();
	                    }
	                    $('.filterby').removeClass('active');
	                }              
	            });
			}
		}
		/******** Career - Passion / Location Components ************/
		hds.careerPassLoc = {
			init: function(options) {
				hds.careerPassLoc.bindCareerSelector();
			},
			processJSON: function(json){
				var jData = '['+ json + ']';
				var jo = $.parseJSON(jData);
				$('.hv-career-section .hv-box').removeClass('hv-box-linked');
				$('.hv-career-section .hv-box').each(function(){
				    var did = $(this).data('deptid').toString();
				    var dar = did.split(',');
				    var len = 0;
				    $.each(dar,function(i){
				        $.each(jo, function(j, val){
				            $.each(jo[j].departments, function(k, val){
				                if(val.id == dar[i]){
									len += val.jobs.length;
				                }
				            })
				        });
				    })
				    $(this).find('.hv-career-desc .desc span.count').text(len);
				    if(len > 0){
				    	dhref = $(this).data('href');
				    	href = "location.href='" + dhref + "'";
				    	$(this).find('.hv-career-box').attr("onclick",href);
				    	$(this).addClass('hv-box-linked');
				    }
				})
				$('.hv-career-section .pass-loc-loader .career-loading').delay(100).fadeOut(100);
			},
			listAllDepartments: function(){
				var jDept = sessionStorage.getItem('jDept');
				var jData = '';
				if(jDept == null){
					$.ajax({
				        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/departments',
				        type: 'GET',
				        contentType: "application/json",
						dataType: "json",
				        success: function( response, textStatus, xhr ) {
							try{
				        		sessionStorage.setItem("jDept", xhr.responseText);
                            }catch(err) {
                            	console.log(err);
                            }
				        	jData = xhr.responseText;	
				        	hds.careerPassLoc.processJSON(jData);			        	
				        }
				    });
				}else{
					jData = jDept;
					hds.careerPassLoc.processJSON(jData);
				}				
			},
			processOfficeJSON: function(json){
				var jData = '['+ json + ']';
			    var jo = $.parseJSON(jData);
			    
			    $('.location-resource-item').each(function(){
			        var oid = $.trim($(this).data('officeid'));
			        var jcount = 0;
			        $.each(jo, function(j, val1){
			            $.each(jo[j].offices, function(k, val2){
			                if(val2.id == oid){
			                    $.each(val2.departments, function(l, val3){
			                        jcount += val3.jobs.length
			                    })
			                }
			            })
			        });
			        $(this).find('.job-pos span.count').text(jcount);
			        if(jcount == 0){
			        	$(this).parent('div').remove();
			        }
			    })
			},
			listAllOfficeJobCount: function(){
				var jOffice = sessionStorage.getItem('jOffice');
				var jData = '';
				if(jOffice == null){
				    $.ajax({
				        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/offices',
				        type: 'GET',
				        contentType: "application/json",
				        dataType: "json",
				        success: function( response, textStatus, xhr ) {
                            try{
				            	sessionStorage.setItem("jOffice", xhr.responseText);
							}catch(err) {
								console.log(err);
							}
				            jData = xhr.responseText;
				            hds.careerPassLoc.processOfficeJSON(jData);
				        }
				    });
				}else{
				    jData = jOffice;
				    hds.careerPassLoc.processOfficeJSON(jData);
				}
			},
			featuredLocCarousel: function(){
				$('.location-resources-column').each(function(){			    
					$(this).find(".location-resources-inner-col").slick({
						dots: true, arrows: false, infinite: true, slidesToShow: 3, slidesToScroll: 3, draggable: true, autoplay: false,
						responsive: [{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true
							}
						},
						{
							breakpoint: 650,
							settings: {
								slidesToShow: 2, slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}]
					});					
				})
			},
			initMap: function(){
			    var map;
			    var myLatLng;
			    var zoomLevel;
			    if($('.mLatitude').text() == '' && $('.mLongitude').text() == ''){
			    	myLatLng = {lat: 0, lng: 0};
			    	zoomLevel = 2;
			    }else{
			    	myLatLng = {lat: Number($('.mLatitude').text()), lng: Number($('.mLongitude').text())};
			    	zoomLevel = 10;
			    }
				var mapOptions = {
				    mapTypeId: 'roadmap',
					center: myLatLng,
					zoom: zoomLevel
				};
			    var infoWindowContent=[];
			                    
			    // Display a map on the page
			    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			    map.setTilt(45);
			    $.ajax({
			        url: '/bin/services/careerlocationservlet?onlymap=true',
			        type: 'GET',
			        contentType: "application/json",
					dataType: "json",
			        success: function( response, textStatus, xhr ) {
			        	var jData = xhr.responseText;
			        	var jo = $.parseJSON(jData);
			        	var openpostxt = $('.openpos-txt').text();
			        	// Info Window Content
					    $.each(jo, function(j, val){
					    	var ctUrl = '';
					    	if(val.template !== undefined){
					    		ctUrl = val.template + '#office=';
					    	}else{
					    		ctUrl = clUrl;
					    	}
					    	infoWindowContent.push('<div class="info_content"><h3><a href="'+ ctUrl + $.trim(val.id) +'">' + val.location + '<br><span>'+ val.jobs +' '+ openpostxt +'</span></a></h3></div>');
					    });

					    // Display multiple markers on a map
					    var infoWindow = new google.maps.InfoWindow(), marker, i;
					    
					    // Loop through our array of markers & place each one on the map  
					    $.each(jo, function(j, val){
					    	if(val.location !== 'Remote'){
						        var position = new google.maps.LatLng(val.latitude, val.longitude);
						        marker = new google.maps.Marker({
						            position: position,
						            map: map,
						            title: val.location
						        });
						        // Allow each marker to have an info window    
						        google.maps.event.addListener(marker, 'click', (function(marker, i) {
						            return function() {
						                infoWindow.setContent(infoWindowContent[j]);
						                infoWindow.open(map, marker);
						            }
						        })(marker, j));

						        // Automatically center the map fitting all markers on the screen
						        if(zoomLevel == 2){
						        	setTimeout(function(){
							        	map.setZoom(zoomLevel);
							        }, 2500);
						        }
					    	}
					    })
			        }
			    });

			    setTimeout(function(){
			    	$('#map_wrapper .career-loading').remove();
			    	var qURL = window.location.href;
					var parms = hds.careerPassionList.getParmsFromURLHash(qURL);
					if(parms["tab"] == 'location'){
						$('.career-tab #tlocli').trigger('click');
						$('body').scrollTo('.career-tab',{duration:'slow', offsetTop : '50'});
					}					
			    }, 1500);
			},
			bindCareerSelector: function(){				
				/* common on page load events */
				$(window).on('load', function(){
					hds.careerPassLoc.initMap();
					hds.careerPassLoc.listAllDepartments();
					
					/* Featured Location Functions */
					hds.careerPassLoc.listAllOfficeJobCount();
					hds.careerPassLoc.featuredLocCarousel();
				})				
				$(document).on('click', '.career-tab li', function(event){
	                event.preventDefault();
	                var active_tab_selector = $('.career-tab li.active a').attr('href');
	                var actived_nav = $('.career-tab li.active');
	                actived_nav.removeClass('active');                  
	                $(this).addClass('active');                   
	                $(active_tab_selector).removeClass('active');
	                $(active_tab_selector).addClass('hide');                    
	                var target_tab_selector = $(this).find('a').attr('href');
	                $(target_tab_selector).removeClass('hide');
	                $(target_tab_selector).addClass('active');
	            });
	            $(document).on('click', '.location-tab li a', function(event){
	                event.preventDefault();
	                var active_tab_selector = $('.location-tab li.active a').attr('href');
	                var actived_nav = $('.location-tab li.active');
	                actived_nav.removeClass('active');                  
	                $(this).parents('li').addClass('active');                   
	                $(active_tab_selector).removeClass('active');
	                $(active_tab_selector).addClass('hide');                    
	                var target_tab_selector = $(this).attr('href');
	                $(target_tab_selector).removeClass('hide');
	                $(target_tab_selector).addClass('active');
	            });
			}
		}
		/******** Career - Passion Job List Components ************/
		hds.careerPassionList = {
			init: function(options) {
				var defaults = {
	                paginationWrapper: '#loadJobsContent',
	                myPageName: "#page-",
	                itemsPerPage: Number($('.job-to-show').text()),
	                clearSwitch: '.tagList .sfheight a.clear-results'
	            }

	            this.options = $.extend(defaults, options);
				hds.careerPassionList.bindCareerSelector();
			},
			getParmsFromURLHash: function(url) {
	            var parms = {}, pieces, parts, i;
	            var hash = url.lastIndexOf("html");
	            if (hash !== -1) {
	                url = url.slice(hash + 1);
	            }
	            var filters = url.indexOf("#");
	            if (filters !== -1) {
	                url = url.slice(filters + 1);
	                pieces = url.split("#");
	                for (i = 0; i < pieces.length; i++) {
	                    parts = pieces[i].split("=");
	                    if (parts.length < 2) {
	                        parts.push("");
	                    }
	                    parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	                }
	            }
	            return parms;
	        },
	        returnFilterString: function(arg){
	        	var txt = arg;	        	
				var b = [];
				var c;
				if(Array.isArray(txt)){
				    $.each(txt, function(i, val){
				        b.push($.trim(val).split(' ').join('-').toLowerCase());
				    })
					var c = b.join();
				}else{
					var str = txt.split(',');
				    $.each(str, function(i, val){
				        b.push($.trim(val).split(' ').join('-').toLowerCase());
				    })
					var c = b.join();
				}
			    return c.replace(/,-/g, ',');
	        },
			processRowColors: function(){
				$(".job-table-row").removeClass('even').removeClass('odd');
				$(".job-table-row:visible:even").addClass('even');
				$(".job-table-row:visible:odd").addClass('odd');
	        },
	        processJobsList: function(jo, $ele, passion){
	        	var paginations = this.options.paginationWrapper;
            	var itemsPerPage = this.options.itemsPerPage;
	        	var $ele = $ele;
	        	var plabel = $('.job-table-head .plabel').text();
	        	var tlabel = $('.job-table-head .tlabel').text();
	        	var llabel = $('.job-table-head .llabel').text();

				$.each(jo, function(j, val1){	        		
			        $.each(jo[j].jobs, function(k, val2){
			        	var dname = [];
			        	var oname = [];
			        	var etype = [];
			        	var jtype = [];
			        	var floc = '';
			        	var $a = '';
			        	var tStatus = false, 
			        		dStatus = false, 
			        		lStatus = false,
			        		rStatus = false,
			        		rnStatus = false;

			        	var txtJs = $('#jobSearch').val();
			        	if($('.hv-job-filters.job-filters-search').length > 0){
			        		if(org == ''){
			            		if (hds.careerJobSearch.aContainsB(val2.title.toLowerCase(), txtJs.toLowerCase())) {
				                    tStatus = true;
			            		}
				        		if (hds.careerJobSearch.aContainsB(val2.requisition_id.toLowerCase(), txtJs.toLowerCase())) {
			                		rStatus = true;
			                	}
		                	}
	            		}

			        	$.each(val2.departments, function(l, val3){
			        		var filter = hds.careerPassionList.returnFilterString(val3.name);
			        		var filter1 = '';
							if(filter.indexOf('-&-') > 0){
								filter1 = $.trim(filter).split('-&-').join('-');
								filter = filter1;
							}														
			        		$.each(val2.offices, function(m, val4){
			        			var ol = val2.offices.length;
			        			if(ol == 1){
			        				floc = '<div style="display:inline;">' + val4.name + '</div>';
			        			}else{
			        				if(ol == (m+1)){
			        					floc += '<div style="display:inline;">' + val4.name + '</div>';
			        				}else{
			        					floc += '<div style="display:inline;">' + val4.name + ';</div> ';
			        				}
			        			}
				        		oname.push(val4.name);
				        		if($('.hv-job-filters.job-filters-search').length > 0){
				        			if(org == ''){
						        		if(val4.name != null){
					        				if (hds.careerJobSearch.aContainsB(val4.name.toLowerCase(), txtJs.toLowerCase())) {
						                		lStatus = true;
						                	}
					        			}
					        			if(val4.location != null){
					        				if (hds.careerJobSearch.aContainsB(val4.location.toLowerCase(), txtJs.toLowerCase())) {
						                		lStatus = true;
						                	}
					        			}
				        			}
				        		}
				        	})
				        	$.each(val2.metadata, function(n, val5){
			        			if(val5.name === 'Employment Type'){
									if(val5.value !== null){
										etype = val5.value.toLowerCase();
									}
								}
								if(val5.name === 'Job Code'){
									if(val5.value !== null){
										var val = val5.value.toLowerCase();
										jtype = val.substring(val.lastIndexOf("-")+1,val.length);
									}
								}
								if($('.hv-job-filters.job-filters-search').length > 0){
									if(val5.name === 'Oracle Organization'){
					        			if(val5.value !== null){
					        				if(org !== ''){
						        				if (hds.careerJobSearch.aContainsB(val5.value.toLowerCase(), org.toLowerCase())) {
								        			rnStatus = true;
								        		}
							        		}
					        			}
					        		}
				        		}
				        	})

				        	if($('.hv-job-filters.job-filters-search').length > 0){	
				        		if(org == ''){			        		
						        	if(val3.name != null){
			                			if (hds.careerJobSearch.aContainsB(val3.name.toLowerCase(), txtJs.toLowerCase())) {
						        			dStatus = true;
						        		}
			                		}
		                		}
	                		}

			        		if(passion == ""){
			        			dname.push(val3.name);
				            	if($('.hv-job-filters.job-filters-search').length > 0){
				            		var loc1 = hds.careerPassionList.returnFilterString(oname);
				            		var lPath = "location.href='" + cjdUrl + val2.id + "'";
				            		var waJobTitle = plabel + ': ' + val2.title + '-jobid=' + val2.id;
				            		
				            		var matchreg = sessionStorage.getItem('regMap');
				            		if(matchreg == null){
				            			matchreg = $.parseJSON(ghRegionMap);
				            		}else{
				            			matchreg = $.parseJSON(matchreg);
				            		}			            		

				            		var f1arr = loc1.split(',');
				    				var areg = [];
				            		$.grep(f1arr, function( a1, b1 ) {
								        $.each(matchreg, function(j, val1){
								        	var mloc = $.trim(val1.location);
								        	var ss = mloc.split(',')[0]
								        	mloc = ss.split(' ').join('-').toLowerCase();
								        	if(mloc === a1){
								        		var r1 = val1.region.split(',');
								        		$.grep(r1, function(i,ival){
								        			areg.push('careers-' + i.split(' ').join('-').toLowerCase())
								        		})								        		
											}
										})
								    })

				            		if(tStatus == true || dStatus == true || lStatus == true || rStatus == true || rnStatus == true){
				            			$a += '<div data-allfilters="'+ filter + ',' + loc1 + ',' + etype + ',' + jtype + ',' + areg +'" data-regidn="'+ loc1 +'" class="job-table-row visible clearfix" onclick="'+ lPath +'" data-mkt-id="panel" data-mkt-name="panel-job list" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><div class="col-sm-6 col-xs-6" data-mkt-cta-title="'+ waJobTitle +'"><span class="hidden-sm hidden-md hidden-lg"><strong>'+plabel+':</strong></span> '+ val2.title +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+tlabel+':</strong></span> '+ dname +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+llabel+':</strong></span>'+ floc +'</div></div>';
				            		}
				            	}			            	
				            }else{
				            	if(val3.id == passion){			        			
				        			dname.push(val3.name);
				                	var lPath = "location.href='" + cjdUrl + val2.id + "'";
				                	var waJobTitle = plabel + ': ' + val2.title + '-jobid=' + val2.id;
				                    $a += '<div class="job-table-row visible clearfix" onclick="'+ lPath +'" data-mkt-id="panel" data-mkt-name="panel-job list" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><div class="col-sm-6 col-xs-6" data-mkt-cta-title="'+ waJobTitle +'"><span class="hidden-sm hidden-md hidden-lg"><strong>'+plabel+':</strong></span> '+ val2.title +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+tlabel+':</strong></span> '+ dname +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+llabel+':</strong></span>'+ floc +'</div></div>';
				        		}
				            }
			        	})
			        	$ele.append($a);
				    })
			    })

			    $('.hv-job-details .open-jobs span.oloc').text($('.common-hero-short-banner h1').text());
			    $(paginations).pagination('destroy');
			    if ($('.job-table-body .job-table-row:visible').length > itemsPerPage) {
			    	hds.careerPassionList._setPagination();
			    }
			    setTimeout(function(){   		
					$('.hv-job-details .career-loading').hide();
				}, 500);    
	        },
	        _setPagination: function() {
	            var paginations = this.options.paginationWrapper;
	            var myPageName = this.options.myPageName;
	            var items = $('.job-table-body .job-table-row.visible');
	            var numItems = items.length;
	            var perPage = this.options.itemsPerPage;

	            if (numItems > perPage) {
	                $(paginations).pagination('destroy');
	                items.slice(perPage).hide();
	                $(paginations).pagination({
	                    items: numItems,
	                    itemsOnPage: perPage,
	                    cssStyle: "light-theme",
	                    onPageClick: function(pageNumber) {
	                        var showFrom = perPage * (pageNumber - 1);
	                        var showTo = showFrom + perPage;
	                        items.hide().slice(showFrom, showTo).show();
	                        $('body').scrollTo('.hv-job-details',{duration:'slow', offsetTop : '50'});
	                        hds.careerPassionList.processRowColors();
	                    }
	                });
	            }
	        },
	        processJSON: function(json, arg1){
	        	var jData = '[ '+ json + ']';
	        	var $ele = $('.hv-job-details .job-details-table .job-table-body');
				var jo = $.parseJSON(jData);;
				var p = $.trim($('.pass-dept-id').text());
				if(p == undefined || p == ''){
					p = '';
				}
				var passion = p.split(',');
				if(passion != ''){
					$.each(passion,function(i){
						hds.careerPassionList.processJobsList(jo, $ele, passion[i]);
					})
				}else{
					hds.careerPassionList.processJobsList(jo, $ele, passion);
					$('#showPassion, #showRegion, #showLocation, #showJtype, #showElevel').trigger('click');
				}

				if($('.hv-job-filters.job-filters-search').length == 0){
					if($.trim($ele.html()) == ''){
				    	$('.hv-job-details').css({'display':'none'});
				    	$('.job-error-panel').css({'display':'block'});
				    }
				}
				org = '';
	        },
			listDepartmentJobs: function(){
				var jJobs = sessionStorage.getItem('jJobs');
				var jData = '';
				if(jJobs == null){
					$.ajax({
				        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/jobs?content=true',
				        type: 'GET',
				        contentType: "application/json",
						dataType: "json",
				        success: function( response, textStatus, xhr ) {
                            try{
				        		sessionStorage.setItem("jJobs", xhr.responseText);
							}catch(err){
								console.log(err);
								ghJobData = xhr.responseText;
							}
				        	jData = xhr.responseText;
				        	hds.careerPassionList.processJSON(jData);				        	
				        },
				        complete:function(){
				        	
				        }
				    });
				}else{
					jData = jJobs;
					hds.careerPassionList.processJSON(jData);
				}
				setTimeout(function(){						
		    		setTimeout(function(){		    			
		    			hds.careerPassionList._setPagination();
		    		}, 1000);
		    		hds.careerPassionList.processRowColors();	
		    	}, 2000);		    	
			},
			showHideFilters:function(){
                var clearSwitch = this.options.clearSwitch;
                if ($(window).width() > 991) {
                    var deviceAgent = navigator.userAgent.toLowerCase();
                    var agentID = deviceAgent.match(/(ipad)/);      
                    if (agentID) {
                        if($('.sfheight').height() > 23){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.show-all-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});                            
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show')); 
                            $('.sfilter').css({'display':'inline-block'});
                            var $checkStatus = hds.careerPassionList.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                            	if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }else{
                        if($('.sfheight').height() > 23){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            var $checkStatus = hds.careerPassionList.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                                if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }
                }else{
                    $(clearSwitch).css({'display':'none'});
                    $('.sfilter').removeClass('add-filters');
                    var $checkStatus = hds.careerPassionList.returnCheckStatus();
                    if($checkStatus != 0){
                        if(mFilterCheck == false){
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});
                            mFilterCheck = true;
                        }else{
                            if($('.sfheight').height() > 23){
                                $('.show-all-filters').text($('#cta-filters').data('hide'));
                                $('#cta-filters').css({'display':'inline-block'});
                                $('.sfilter').css({'display':'inline-block'});
                            }
                        }                        
                    }else{                        
                        $('#cta-filters').css({'display':'none'});
                    }
                }
        	},
			returnCheckStatus:function(){
                var $allCheckedPFilters = $('.FilterByPassionList input.filters').filter(':checked'),
                	$allCheckedRFilters = $('.FilterByRegionList input.filters').filter(':checked'),
                	$allCheckedLFilters = $('.FilterByLocationList input.filters').filter(':checked')
                	$allCheckedJFilters = $('.FilterByJobTypeList input.filters').filter(':checked'),
                	$allCheckedEFilters = $('.FilterByExpLevelList input.filters').filter(':checked');
	                return ($allCheckedPFilters.length + $allCheckedRFilters.length + $allCheckedLFilters.length + $allCheckedJFilters.length + $allCheckedEFilters.length);
	        },
			processJobsFilter: function(arg1, arg2, arg3, arg4, arg5) {
				var errorMsg = $('.jl-error-msg').html();
	            var paginations = this.options.paginationWrapper;
	            var itemsPerPage = this.options.itemsPerPage;
	            var s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '';
	            var ff = [];   
	            var aa = [];   
	            var c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0; 
	            var count = 0;     

	            $('.job-table-row').removeAttr('style').removeClass('visible');
	            //$('#resLoading').css({'display':'none'});
	            $('.job-table-row').each(function(){
	                var pr = $(this).data('allfilters');
	                var pr1 = pr.split(',');                

	                if(arg1 == undefined && arg2 == undefined && arg3 == undefined && arg4 == undefined && arg5 == undefined){
	                    $(this).addClass('visible');
	                    $(this).removeClass('hidden');                  
	                } 
	                else if(arg1 != undefined && arg2 != undefined && arg3 != undefined && arg4 != undefined && arg5 != undefined){
	                    $.grep(arg1, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s1 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg2, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s2 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg3, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s3 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg4, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s4 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg5, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s5 = 'true';
	                            }
	                        })
	                    })

	                    if(s1 == 'true' && s2 == 'true' && s3 == 'true' && s4 == 'true' && s5 == 'true'){
	                        $(this).addClass('visible');
	                        $(this).removeClass('hidden');
	                        count = count + 1;
	                    }else{
	                        $(this).removeClass('visible');
	                        $(this).addClass('hidden');
	                    }
	                }else{
	                    if(arg1 != undefined){                        
	                        $.grep(arg1, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c1 = c1 + 1;
	                                }
	                            })
	                        })
	                        if(c1 == 0){
	                            j1 = 'false'; 
	                        }else{
	                            s1 = 'true';
	                        }
	                    }                    
	                    if(arg2 != undefined){
	                        $.grep(arg2, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c2 = c2 + 1;
	                                }
	                            })
	                        })
	                        if(c2 == 0){
	                            j2 = 'false'; 
	                        }else{
	                            s2 = 'true';
	                        }
	                    }
	                    if(arg3 != undefined){
	                        $.grep(arg3, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c3 = c3 + 1;
	                                }
	                            })
	                        })
	                        if(c3 == 0){
	                            j3 = 'false'; 
	                        }else{
	                            s3 = 'true';
	                        }
	                    }
	                    if(arg4 != undefined){
	                        $.grep(arg4, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c4 = c4 + 1;
	                                }
	                            })
	                        })
	                        if(c4 == 0){
	                            j4 = 'false'; 
	                        }else{
	                            s4 = 'true';
	                        }
	                    }
	                    if(arg5 != undefined){
	                        $.grep(arg5, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c5 = c5 + 1;
	                                }
	                            })
	                        })
	                        if(c5 == 0){
	                            j5 = 'false'; 
	                        }else{
	                            s5 = 'true';
	                        }
	                    }

	                    if(s1 != ''){
	                        ff.push('s1 = ' + s1);
	                    }
	                    if(s2 != ''){
	                        ff.push('s2 = ' + s2);
	                    }
	                    if(s3 != ''){
	                        ff.push('s3 = ' + s3);
	                    }
	                    if(s4 != ''){
	                        ff.push('s4 = ' + s4);
	                    }
	                    if(s5 != ''){
	                        ff.push('s5 = ' + s5);
	                    }

	                    var ffLen = ff.length;                
	                    $.each(ff , function(i, val) {
	                        if(ffLen == (i+1)){
	                            aa.push(ff [i] );
	                        }else{
	                            aa.push(ff [i] + ' && ');
	                        }   
	                    });
	                    var b = aa.toString();
	                    var c = b.replace (/,/g, "");
	                    if(c){
	                        $(this).addClass('visible');
	                        $(this).removeClass('hidden');
	                        count = count + 1;
	                    }

	                    if(j1 == 'false' || j2 == 'false' || j3 == 'false' || j4 == 'false' || j5 == 'false'){
	                        $(this).removeClass('visible');
	                        $(this).addClass('hidden');
	                    }
	                }

	                s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '', c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;
	                ff = [];                
	                a = [];
	            });

	            var resCount = $('.job-table-row.visible').length;
	            var resHCount = $('.job-table-row').length;
	            if(resHCount != 0){
	                var $checkStatus = hds.careerPassionList.returnCheckStatus();
	                if($checkStatus == 0){
	                    $('.job-details-table .content-container').find('.no-matched-result').remove();
	                }else{
	                    $('.res-count').css({'display':'inline-block'}).find('span.count').text(resCount);
	                    if ($(".job-table-row:visible").length === 0) {
	                        
	                        if ($(".job-table-row:visible").length === 0 && $(".job-table-row").length > 0) {
	                            $('.job-details-table .content-container').find('.no-matched-result').remove();
	                            $('.job-details-table .content-container').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ errorMsg +'</div>');
	                            $('.job-details-table .job-table-head').hide();
	                        }else{
	                            $('.job-details-table .content-container').find('.no-matched-result').remove();                            
	                        }
	                    }else{
	                        $('.job-details-table .content-container').find('.no-matched-result').remove();
	                        $('.job-details-table .job-table-head').show();
	                    }               
	                }
	            }else{
	                $('.job-details-table .content-container').find('.no-matched-result').remove();
	                $('.job-details-table .content-container').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ errorMsg +'</div>');
	                $('.job-details-table .job-table-head').hide();
	            }

	            $(paginations).pagination('destroy');
	            $('#loadJobsContent').empty();
	            if ($('.job-details-table .job-table-body .visible').length >= itemsPerPage) {
	                hds.careerPassionList._setPagination();
	            }
	            if ($('.job-details-table .job-table-body .visible').length > 0) {
	            	$('.job-details-table .job-table-head').show();
	            }
	            hds.careerPassionList.processRowColors();
	        },
	        addRemoveFilters:function(){
	            var arrVal = [];
	            $('input[name="csFunction"]').removeClass('filter-retain');
	            $('input[name="csFunction"]:checked').each(function() {
	                $(this).addClass('filter-retain');
	                arrVal.push($(this).attr('id'));
	            });
	            hds.careerPassionList.getCheckboxValue(arrVal);
	        },
	        getCheckboxValue: function(arg1) {
	            if (arg1 != 0) {
	                var newHTML = $.map(arg1, function(value) {
	                    var checkBoxVal = $("#" + value).attr('id');
	                    var checkBoxText = $("#" + value).siblings('label').text();
	                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closeFilter'>&nbsp;</span></span>");
	                });
	                $('#filterTag .label').css({
	                    'display': 'inline'
	                });
	                $('#filterTag .keyword-passloc').html(newHTML);
	            } else {
	            	$('#filterTag .keyword-passloc').html('');
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
	            }
	        },
	        removeDuplicateList: function(html){
	        	var $ele = $(html);
	        	var inner = [];
				$ele.each( function(index, Element){
				    if (jQuery.inArray(this.innerHTML, inner) == -1){
				      inner.push(this.innerHTML);
				    }
				    else {
				      $(this).remove();
				    }
				});
	        },
	        sortListAlphabetical: function(id){
				var list, i, switching, b, shouldSwitch;
				list = document.getElementById(id);
				switching = true;
				while (switching) {
					switching = false;
					b = list.getElementsByTagName("LI");
					for (i = 0; i < (b.length - 1); i++) {
						shouldSwitch = false;
						if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
							shouldSwitch = true;
							break;
						}
					}
					if (shouldSwitch) {
						b[i].parentNode.insertBefore(b[i + 1], b[i]);
						switching = true;
					}
				}
	        },
	        insertRegionLocation: function(){
	        	var matchreg = sessionStorage.getItem('regMap');
        		if(matchreg == null){
        			matchreg = $.parseJSON(ghRegionMap);
        		}else{
        			matchreg = $.parseJSON(matchreg);
        		}
            	var mid = $(this).attr('id');
            	var $allCheckedPFilters = $('.FilterByRegionList input.filters').filter(':checked');
            	var $loc = '';
            	$('.FilterByLocationList').html('');
                if ($allCheckedPFilters.length > 0) {	                	
                    var checkedPVals = $.map($allCheckedPFilters, function(el) {
                        return el.id
                    });
                    $.grep(checkedPVals, function(m1,mval){
                    	$.each(matchreg, function(j, val1){
                    		var mloc = $.trim(val1.location);
							var ss = mloc.split(',')[0];
							mloc = ss.split(' ').join('-').toLowerCase();

							var r1 = val1.region.split(',');
							var rm = '';
							$.grep(r1, function(i,ival){								
								rm = 'careers-' + i.split(' ').join('-').toLowerCase();
								if(rm === m1){
									$loc = '<li class="col-xs-12"><div class="checkbox"><input data-wa="location" class="filters" type="checkbox" name="csFunction" id="' + mloc + '"><label for="'+ mloc + '" class="hds-icon"><span>' + val1.location + '</span></label></div></li>'
									$('.FilterByLocationList').append($loc);
								}
							})
						})
						hds.careerPassionList.removeDuplicateList('.FilterByLocationList li');
						//hds.careerPassionList.sortListAlphabetical('jLocList');
	                })
                }else{
                	var matchreg = sessionStorage.getItem('regMap');
					if(matchreg == null){
	        			matchreg = $.parseJSON(ghRegionMap);
	        		}else{
	        			matchreg = $.parseJSON(matchreg);
	        		}
					$.each(matchreg, function(j, val1){
						var mloc = $.trim(val1.location);
						var ss = mloc.split(',')[0]
						mloc = ss.split(' ').join('-').toLowerCase();
						$loc = '<li class="col-xs-12"><div class="checkbox"><input data-wa="location" class="filters" type="checkbox" name="csFunction" id="' + mloc + '"><label for="' + mloc + '" class="hds-icon"><span>' + val1.location + '</span></label></div></li>'
						$('.FilterByLocationList').append($loc);
					})
                }
                $('label[for="remote"]').text('Remote');
	        },
	        testFunction: function(){
				var af = [];
                $('#filterTag .keyword-passloc .filterKeyword').each(function(){
                	af.push($(this).data('match'));
                })
                $('input[name="csFunction"]').prop('checked', false);
                if(af == ''){
                	hds.careerPassionList.insertRegionLocation();
                }else{
	                $.grep(af, function(m1,mval){
	                	$('input[name="csFunction"]').each(function(){
	                		if($(this).attr('id') == m1){
	                			$(this).prop('checked', true);
	                			if($(this).attr('id') == 'careers-apac' || $(this).attr('id') == 'careers-emea' || $(this).attr('id') == 'careers-amer'){
	                				hds.careerPassionList.insertRegionLocation();
	                			}
	                		}
	                	})		                	
	                })
            	}
			},
	        buildMobileNavigation: function(arg) {
	            if ($(window).width() <= 991) {
	                var getFilterPassion = $('#jPassion .filters-list').html();
	                $('.FilterAreaPassion').html(getFilterPassion);
	                $('#jPassion .filters-list').html("");
	                var getFilterRegion = $('#jRegion .filters-list').html();
	                $('.FilterAreaRegion').html(getFilterRegion);
	                $('#jRegion .filters-list').html("");
	                var getFilterLocation = $('#jLocation .filters-list').html();
	                $('.FilterAreaLocation').html(getFilterLocation);
	                $('#jLocation .filters-list').html("");
	                var getFilterJobType = $('#jType .filters-list').html();
	                $('.FilterAreaJobType').html(getFilterJobType);
	                $('#jType .filters-list').html("");
	                var getFilterElevel = $('#jElevel .filters-list').html();
	                $('.FilterAreaElevel').html(getFilterElevel);
	                $('#jElevel .filters-list').html("");

	                var getResFilters = $('.job-filters-search .job-filters.dtop').html();
	                $('.topFilter .job-filters').html(getResFilters);
	                $('.job-filters-search .job-filters.dtop').html("");
	            } else {
	                if (!hds.resourceLib._isEmpty($('.FilterAreaPassion'))) {
	                    $('#jPassion .filters-list').html($('.FilterAreaPassion').html());
	                    $('.FilterAreaPassion').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaRegion'))) {
	                    $('#jRegion .filters-list').html($('.FilterAreaRegion').html());
	                    $('.FilterAreaRegion').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaLocation'))) {
	                    $('#jLocation .filters-list').html($('.FilterAreaLocation').html());
	                    $('.FilterAreaLocation').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaJobType'))) {
	                    $('#jType .filters-list').html($('.FilterAreaJobType').html());
	                    $('.FilterAreaJobType').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaElevel'))) {
	                    $('#jElevel .filters-list').html($('.FilterAreaElevel').html());
	                    $('.FilterAreaElevel').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.topFilter .job-filters'))) {
	                    $('.job-filters-search .job-filters.dtop').html($('.topFilter .job-filters').html());
	                    $('.topFilter .job-filters').html("")
	                }
	            }
	            hds.careerPassionList.initializeFilterSearch();
	            hds.careerPassionList.retainFilters();
	        },
	        adjustOverlayHeight:function(){
	            var pgHeight = $(window).outerHeight(),
	                otHeight = $('.overlayTop').outerHeight(),
	                omHeight = $('.filtrSideBar').outerHeight(),
	                obHeight = $('.FilterAreaBtnPop').outerHeight();

	                omHeight = pgHeight - (otHeight + obHeight);
	                $('.filtrSideBar').css({'height': omHeight - 48});
	                $('.filter-mob-list').css({'height': omHeight - 48});
	        },
	        closeOverLayPopup: function() {
	            var actualWidth = $(window).width() + 17;                
	            if (actualWidth > 991) {
	                if (!hds.resourceLib._isEmpty($('.FilterAreaPassion'))) {
	                    $('#jPassion .filters-list').html($('.FilterAreaPassion').html());
	                    $('.FilterAreaPassion').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaRegion'))) {
	                    $('#jRegion .filters-list').html($('.FilterAreaRegion').html());
	                    $('.FilterAreaRegion').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaLocation'))) {
	                    $('#jLocation .filters-list').html($('.FilterAreaLocation').html());
	                    $('.FilterAreaLocation').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaJobType'))) {
	                    $('#jType .filters-list').html($('.FilterAreaJobType').html());
	                    $('.FilterAreaJobType').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.FilterAreaElevel'))) {
	                    $('#jElevel .filters-list').html($('.FilterAreaElevel').html());
	                    $('.FilterAreaElevel').html("")
	                }
	                if (!hds.resourceLib._isEmpty($('.topFilter .job-filters'))) {
	                    $('.job-filters.dtop').html($('.topFilter .job-filters').html());
	                    $('.topFilter .job-filters').html("")
	                }
	                $('.bgCover').hide();
	                hds.careerPassionList.initializeFilterSearch();
	                hds.careerPassionList.retainFilters();
	            }else{
	                $('.bgCover').hide();
	            }
	        },
	        showMobileOverlay: function() {
	            hds.careerPassionList.buildMobileNavigation();
	            $('.overlayBox').css({
	                display: 'block',
	                left: 0,
	                top: 0,
	                position: 'absolute'
	            });
	            $('.bgCover').css({
	                display: 'block',
	                width: $(window).width(),
	                height: ' 100%',
	            });
	            $('.bgCover').css({
	                opacity: 0
	            }).animate({
	                opacity: 1
	            });                        
	            hds.careerPassionList.adjustOverlayHeight();
	        },	        
	        retainFilters:function(){
	        	$('input[name="csFunction"]').each(function(){
	                if($(this).hasClass('filter-retain')){
	                    $(this).prop('checked', true);
	                }
	            })
	        },
	        initializeFilterSearch: function(){
				$('input[type="text"].filterLocation').change(function(){
				    $('.FilterByLocationList li, #jLocation .job-scroll').removeAttr('style');
				    $('#jLocation .job-scroll, #jLocation .show-results').show();
				    var searchText = $.trim($(this).val().toLowerCase());
				    $('.FilterByLocationList li:visible').each(function(){
				      var litxt = $.trim($(this).text().toLowerCase());
				      if(litxt.indexOf(searchText) === -1){
				        $(this).css({'display':'none'});
				      }else{
				        $(this).css({'display':'block'});
				      }
				    })
				    if($('.FilterByLocationList li:visible').length < 10){				    	
	                    if ($(window).width() > 991) { 
				    		var element = $('#jLocation .job-scroll').jScrollPane(); 
		                    var api = element.data('jsp');
		                    api.destroy();
				    	}
	                    $('#jLocation .job-scroll').css({'height':'initial'});
	                    $('.locsearch-error').hide();
	                    if($('.FilterByLocationList li:visible').length == 0){
	                    	$('.locsearch-error').show();
				    		$('#jLocation .job-scroll, #jLocation .show-results').hide();
	                    }				    	
				    }else{
				    	$('.locsearch-error').hide();
				    	$('#jLocation .job-scroll, #jLocation .show-results').show();
				    	$('#jLocation .job-scroll').jScrollPane();
				    }
				}).keyup(function(){
				    $(this).change();
				})

				$('input[type="text"].filterPassion').change(function(){
				    $('.FilterByPassionList li, #jPassion .job-scroll').removeAttr('style');
				    $('#jPassion .job-scroll, #jPassion .show-results').show();
				    var searchText = $.trim($(this).val().toLowerCase());
				    $('.FilterByPassionList li:visible').each(function(){
				      var litxt = $.trim($(this).text().toLowerCase());
				      if(litxt.indexOf(searchText) === -1){
				        $(this).css({'display':'none'});
				      }else{
				        $(this).css({'display':'block'});
				      }
				    })

				    if($('.FilterByPassionList li:visible').length < 10){
				    	if ($(window).width() > 991) { 
				    		var element = $('#jPassion .job-scroll').jScrollPane(); 
		                    var api = element.data('jsp');
		                    api.destroy();
				    	}				    	
	                    $('#jPassion .job-scroll').css({'height':'initial'});
	                    $('.passearch-error').hide();
	                    if($('.FilterByPassionList li:visible').length == 0){
	                    	$('.passearch-error').show();
				    		$('#jPassion .job-scroll, #jPassion .show-results').hide();
	                    }				    	
				    }else{
				    	$('.passearch-error').hide();
				    	$('#jPassion .job-scroll, #jPassion .show-results').show();
				    	$('#jPassion .job-scroll').jScrollPane();
				    }
				}).keyup(function(){
				    $(this).change();
				})
			},
			checkParameter: function(){
				var qURL = window.location.href;
                qURL=qURL.replace("%23","#");
	            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
                pparms = parms["passion"];
	            if(pparms == undefined){
	            	pparms = '';
	            }
	            pparms = pparms.toLowerCase();
	            var pArray;
	            if(pparms != undefined){
	                pArray = pparms.split(',');
	                $.each(pArray,function(i){
	                    $('.FilterByPassionList input[name="csFunction"]').each(function(){
	                        var inputId = $(this).attr('id');
	                        var pa = pArray[i].split(' ').join('-').toLowerCase();
	                        if(inputId == pa){
	                            $(this).trigger('click');
	                        }
	                    })
	                })
	            }
	            $('#showPassion, #showRegion, #showLocation, #showJtype, #showElevel').trigger('click');
			},
			bindCareerSelector: function(){				
				/* common on page load events */
				$(window).on('load', function(){
					var qURL = window.location.href;
                    qURL=qURL.replace("%23","#");
		            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
		            org = parms["org"];
                    keyword = parms["keyword"];
		            if(org == undefined){
		            	org = '';
		            }
		            org = org.toLowerCase();
                    if(keyword == undefined){
		            	keyword = '';
		            }
		            keyword = keyword.toLowerCase();

		            var mstr = $('.org-parms').text();
					mstr = mstr.split(',');

					var jregMap = sessionStorage.getItem('regMap');
					if(jregMap == null && ghRegionMap == ''){
						$.ajax({
						    url: '/bin/services/careerlocationservlet',
						    type: 'GET',
						    contentType: "application/json",
							dataType: "json",
						    success: function( response, textStatus, xhr ) {
						    	var jData = xhr.responseText;
						    	try{
					        		sessionStorage.setItem("regMap", jData);
	                            }catch(err) {
	                            	console.log(err);
	                            	ghRegionMap = jData;
	                            }						    	
						    	if(mstr == ''){
									if(keyword!=''){
										$('#jobSearch').val(parms["keyword"]);
										$('.clearJsIcon').show();
                                        $('.searchJob').trigger('click');
                                    }else{
                                    	org = '';
                                        hds.careerPassionList.listDepartmentJobs();
                                    }
						    	}else{
						    		$(mstr).each(function(i, j){
										if(org == $.trim($(mstr)[i])){
							            	$('#jobSearch').val(org);
											$('.searchJob').trigger('click');
											$('#jobSearch').val('');
							            }else{
							            	if(keyword!=''){
												$('#jobSearch').val(parms["keyword"]);
												$('.clearJsIcon').show();
                                                $('.searchJob').trigger('click');
                                            }else{
                                             	org = '';
                                                hds.careerPassionList.listDepartmentJobs();
                                            }
							            }
									})
						    	}
						    },
						    complete: function(){
						    	hds.careerPassionList.checkParameter();
						    }
						});
					}else{
						if(mstr == ''){
				    		if(keyword!=''){
								$('#jobSearch').val(parms["keyword"]);
								$('.clearJsIcon').show();
                                $('.searchJob').trigger('click');
                            }else{
                             	org = '';
                                hds.careerPassionList.listDepartmentJobs();
                            }
				    	}else{
				    		$(mstr).each(function(i, j){
								if(org == $.trim($(mstr)[i])){
					            	$('#jobSearch').val(org);
									$('.searchJob').trigger('click');
									$('#jobSearch').val('');
					            }else{
					            	if(keyword!=''){
										$('#jobSearch').val(parms["keyword"]);
										$('.clearJsIcon').show();
                                        $('.searchJob').trigger('click');
                                    }else{
                                     	org = '';
                                        hds.careerPassionList.listDepartmentJobs();
                                    }
					            }
							})
				    	}
				    	if(jregMap != null){
							hds.careerPassionList.checkParameter();
						}
					}					
				})
				if (window.location.href.indexOf("/company/careers/") > 0) {
					$('.common-hero-short-banner').addClass('career-passion-banner');
				}
				if($('.hv-job-filters.job-filters-search').length == 0){
					$('.hv-job-details.passion-jlist .search-overlay').hide();
				}

				$(document).on('click', '#showPassion, #showRegion, #showLocation, #showJtype, #showElevel', function(event) {
					hds.careerPassionList.addRemoveFilters();
					hds.careerPassionList.showHideFilters();
	                var $allCheckedPFilters = $('.FilterByPassionList input.filters').filter(':checked'),
	                	$allCheckedRFilters = $('.FilterByRegionList input.filters').filter(':checked'),
	                	$allCheckedLFilters = $('.FilterByLocationList input.filters').filter(':checked'),
	                	$allCheckedJFilters = $('.FilterByJobTypeList input.filters').filter(':checked'),
	                	$allCheckedEFilters = $('.FilterByExpLevelList input.filters').filter(':checked');

	                if ($allCheckedPFilters.length > 0) {
	                    var checkedPVals = $.map($allCheckedPFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if ($allCheckedRFilters.length > 0) {
	                    var checkedRVals = $.map($allCheckedRFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if ($allCheckedLFilters.length > 0) {
	                    var checkedLVals = $.map($allCheckedLFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if ($allCheckedJFilters.length > 0) {
	                    var checkedJVals = $.map($allCheckedJFilters, function(el) {
	                        return el.value
	                    });
	                    var jt = checkedJVals.join();
	                    checkedJVals = jt.split(',');
	                }
	                if ($allCheckedEFilters.length > 0) {
	                    var checkedEVals = $.map($allCheckedEFilters, function(el) {
	                        return el.value
	                    });
	                    var jt = checkedEVals.join();
	                    checkedEVals = jt.split(',');
	                }

	                $('.filters-section').hide();
	                $('.filterby').removeClass('active');
	                //$('#filterTag .keyword-filter').show();

	                
	                hds.careerPassionList.processJobsFilter(checkedPVals, checkedRVals, checkedLVals, checkedJVals, checkedEVals);
	                event.preventDefault();
	            });
				$(document).on('click', '#mobShowFilters', function() {
	                var mTxtVal = '';
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if ($(window).width() < 991) {
	                    if ($('.overlayBox').is(':visible')) {
	                    	 $('#showPassion, #showRegion, #showLocation, #showJtype, #showElevel').trigger('click');
	                    	 $('.bgCover').hide();               
	                    }
	                    $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
	                }
	            })

				$(document).on('click', '.launchLink a', function(event) {
					$('body').append('<div class="mobFiltersBG"></div>');
	                $('body').addClass('overflow-mobile');
	                setTimeout(function(){
	                    if ($(window).width() <= 991) {                   
	                        if($('.topFilter .job-filters').html() == ""){
	                            hds.careerPassionList.showMobileOverlay();
	                        }else{
	                            $('.bgCover').css({
	                                display: 'block',
	                                width: $(window).width(),
	                                height: ' 100%',
	                            });
	                        }
	                    }
	                    $('.filters-section').hide();
	                    $('.topFilter .job-filters').removeAttr('style');
	                    var h1 = $('.topFilter .job-filters').outerHeight();
		                $('.topFilter .job-filters').css({'min-height': h1 + 3});
	                    $('.topFilter .job-filters .filterby').removeClass('active');
	                    $('.topFilter .job-filters .filterby').eq(0).addClass('active');
						$('.filter-mob-list').css({'display':'none'});
						$('.filter-mob-list').eq(0).css({'display':'block'});
	                }, 1000);
	                event.preventDefault();
	            });

	            $(document).on('click', '.closeJobOverlay', function(event) {
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if(($('#filterTag .keyword-passloc').html() == '')){
	                    $('.clear-results').trigger('click');
	                    $('.bgCover').hide();                    
	                }else{
	                    $('.bgCover').hide();
	                }                                
	                event.preventDefault();
	            });

	            $(document).on('click', '.clear-results', function() {
	            	$('.job-details-table .job-table-body').html('');
	                $('#filterTag .keyword-passloc').html('');
	                $('.job-details-table .content-container').find('.no-matched-result').remove();
	                $("input[name='csFunction']").removeAttr('checked').removeClass('filter-retain');
	                $('.FilterByLocationList li').removeAttr('style');
	                $("#jobSearch").val('');
	                $('#filterTag .label').css({
	                    'display': 'none'
	                });
	                $('#searchTag .keyword').html('');
                	$('#searchTag .label').css({'display': 'none'});                	
	                $('.clearJsIcon').css({'display': 'none'});
	                $('.res-count').css({'display':'none'});
	                $('#cta-filters').css({'display':'none'});
	                $('.tagList .sfheight a.clear-results').css({'display':'none'});
	                $('.passearch-error,.locsearch-error').hide();	                
	                hds.careerPassionList.listDepartmentJobs();
	                hds.careerPassionList.testFunction();
	                mFilterCheck = false;
	            });

	            $(document).on('click', '.closeFilter', function() {	            	
	                var dataMatch = $(this).parent().data('match');
	                if (dataMatch) {
	                    $('input[name="csFunction"]').each(function() {
	                        if ($(this).attr('id') == dataMatch) {
	                            $(this).removeAttr('checked').removeClass('filter-retain');
	                        }
	                    })
	                    $(this).parent().fadeOut('slow');
	                    $(this).parent().remove();
	                    if($('#filterTag .keyword-passloc').html() == ""){
	                        $('#filterTag .label').css({'display': 'none'});
	                    }
	                    hds.careerPassionList.testFunction();
	                    $('#showPassion, #showRegion, #showLocation, #showJtype, #showElevel').trigger('click');
	                }
	            })

	            $(document).on('click','.show-all-filters', function(){
	                var showText = $('#cta-filters').data('show'),
	                    hideText = $('#cta-filters').data('hide');
	                var $this = $(this);
	                if ($this.text() === hideText) {
	                    $this.text(showText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 22 , 'display':'inline-block'});
	                    }else{
	                        $('.sfilter').css({'display':'none'});
	                    }                    
	                    $('#cta-filters').removeClass('rem-style');
	                } else {
	                    $this.text(hideText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 'auto', 'display':'inline'});    
	                    }else{                        
	                        if ($(window).width() < 480) {
	                            $('.sfilter').css({'display':'block'});
	                        }else{
	                            $('.sfilter').css({'display':'inline'});
	                        }                        
	                    }
	                    $('.tagList .sfheight a.clear-results').css({'display':'none'});                      
	                    $('#cta-filters').addClass('rem-style');
	                }
	            })

	            /* Filters By Industry/Content Type */
	            var a = $('.hv-job-filters .job-filters').find('a');
	            $(document).on('click', '.hv-job-filters .job-filters.dtop .filterby', function(e) {
	                e.preventDefault();
	                hds.careerPassionList.testFunction();
	                $('.job-filters-search .filters-section').removeAttr('style');
	                $('.FilterByLocationList li, #jLocation .job-scroll, .FilterByPassionList li, #jPassion .job-scroll').removeAttr('style');	                
                    var filterId = $(this).data('refilter');
                    var $this = $(this),
                        speed = 500;
                    if ($this.hasClass('active') === true) {
                        $this.removeClass('active');
                        $('.hv-job-filters .job-filters .filters-section').hide();
                        $('.hv-job-filters .job-filters .filterby').removeClass('active');
                    } else if (a.hasClass('active') === false) {
                        $('.hv-job-filters .job-filters .filters-section').hide();
                        $('.hv-job-filters .job-filters .filterby').removeClass('active');
                        $this.addClass('active');
                        $('#' + filterId).show();
                    } else {
                        a.removeClass('active');
                        $('.hv-job-filters .job-filters .filters-section').hide();
                        $('.hv-job-filters .job-filters .filterby').removeClass('active');
                        $this.addClass('active');
                        $('#' + filterId).show();
                    }

                    if(filterId == 'jPassion' || filterId == 'jLocation'){
                    	$('#' + filterId + ' .job-scroll').jScrollPane();
                    	$('.passearch-error,.locsearch-error').hide();
                    	$('.filterPassion, .filterLocation').val('');
	                	$('.filterPassion, .filterLocation').trigger('change');
	                	//$('input[type="text"].filterPassion, input[type="text"].filterLocation').focus();
                    }

                    $(".FilterByPassionList li, .FilterByLocationList li").hover(function() {
						$('.filterPassion, .filterLocation').blur();
					})

                    /* new code */
                    var actualWidth = $(window).width() + 17;
					if($(window).width() > 736){
						var osleft = $(this).find('span.caret-arrow').offset().left;
						var fos = (osleft - 370) + 185;
						$('#' + filterId).css({'left': fos});
					}
					if($(window).width() <= 736){
						var h1 = $(this).closest('.job-filters').outerHeight();
						h1 = h1 + 60;
						$('.job-filters-search .filters-section:visible').css({'top': h1});
					}               
					/* new code */

                    $('body').scrollTo('.job-filters-search',{duration:'slow', offsetTop : '50'});                    
	                e.stopPropagation();
	            });

	            $(document).on('click', '.topFilter .filterby', function(e) {
	                e.preventDefault();
	                if(!$(this).hasClass('active')){
	                	$('.filterPassion, .filterLocation').val('');
	                	$('.filterPassion, .filterLocation').trigger('change');
	                	$('.passearch-error,.locsearch-error').hide();
	                }                	
	                var filterIdMob = $(this).index();
	                    filterIdMob = filterIdMob;
	                    if ($(this).hasClass('active')){
	                        //$(this).removeClass('active');
	                        //$('.filter-mob-list').hide();
	                    }else{
	                        $('.topFilter .filterby').removeClass('active');
	                        $('.filter-mob-list').hide();
	                        $(this).addClass('active');
	                        $('.filter-mob-list').eq(filterIdMob).show();
	                    }
	                    e.stopPropagation();
	            })

	            $(document).on('click', '.FilterByRegionList input[name="csFunction"]', function() {
	            	if($(window).width() <= 991){
	            		hds.careerPassionList.insertRegionLocation();
	            	}
				})

	            $(".FilterByPassionList li, .FilterByLocationList li").hover(function() {
					$('.filterPassion, .filterLocation').blur();
				})				

				hds.careerPassionList.initializeFilterSearch();

	            var deviceAgent = navigator.userAgent.toLowerCase();
            	var nDevices = deviceAgent.match(/(iphone|ipad|android)/);
				if (!nDevices) {
                	$(window).resize(function() {
                		$('.FilterByLocationList li, #jLocation .job-scroll, .FilterByPassionList li, #jPassion .job-scroll').removeAttr('style');
                		$('.passearch-error, .locsearch-error').hide();
                		$('.job-scroll').each(function(){
                			if($(this).closest('.filters-section').attr('id') == 'jPassion' || $(this).closest('.filters-section').attr('id') == 'jLocation'){
                				var element = $(this).jScrollPane(); 
		                    	var api = element.data('jsp');
		                    	api.destroy();
                			}                			
                		})                		
	                    $('.filters-section').hide();	                    
	                    $('body').find('.mobFiltersBG').remove();
	                    $('body').removeClass('overflow-mobile');
	                    var actualWidth = $(window).width() + 17;                
	                    if (actualWidth > 991) {
	                        setTimeout(function(){
			                	hds.careerPassionList.closeOverLayPopup();               
			            	}, 500);
	                    }else{
	                        $('.bgCover').hide();
	                    }
	                    $('.filterby').removeClass('active');
                    	$('.filters-section').hide();
	            		$('.filterby').removeClass('active');
	                });
	            }
	            $( window ).on( "orientationchange", function( event ) {
	            	$('.FilterByLocationList li, #jLocation .job-scroll, .FilterByPassionList li, #jPassion .job-scroll').removeAttr('style');
	            	$('.passearch-error, .locsearch-error').hide();
	                $('.bgCover').hide();
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                setTimeout(function(){
	                	hds.careerPassionList.closeOverLayPopup();               
	            	}, 500);
	                
	                var deviceAgent = navigator.userAgent.toLowerCase();
	                var agentID = deviceAgent.match(/(ipad)/);      
	                if (agentID) {
	                    var $checkStatus = hds.careerPassionList.returnCheckStatus();
	                    if (window.matchMedia("(orientation: landscape)").matches) {
	                        setTimeout(function(){
	                            $('#showPassion, #showRegion, #showLocation, #showJtype, #showElevel').trigger('click');
	                        }, 1000);
	                    }else{
	                        if($checkStatus != 0){
	                            $('.show-all-filters').text($('#cta-filters').data('show'));
	                            $('#cta-filters').css({'display':'inline-block'});
	                            $('.sfilter').css({'display':'none'});   
	                        }
	                    }
	                    $('.job-scroll').each(function(){
                			if($(this).closest('.filters-section').attr('id') == 'jPassion' || $(this).closest('.filters-section').attr('id') == 'jLocation'){
                				var element = $(this).jScrollPane(); 
		                    	var api = element.data('jsp');
		                    	api.destroy();
                			}                			
                		})
	                }
	                $('.filters-section').hide();
	            	$('.filterby').removeClass('active');                    
	            });

	            $(document).click(function(e) {
	                if (!$(e.target).is('.hv-job-filters .filters-section, .hv-job-filters .filters-section *')) {
	                    $(".hv-job-filters .filters-section").hide();
	                    $('.hv-job-filters .job-filters .filterby').removeClass('active');
	                }               
	            });
			}
		}

		/******** Career - Location Job List Components ************/
		hds.careerLocationList = {
			init: function(options) {
				var defaults = {
	                paginationWrapper: '#loadJobsContent',
	                myPageName: "#page-",
	                itemsPerPage: Number($('.job-to-show').text())
	            }
	            this.options = $.extend(defaults, options);
				hds.careerLocationList.bindCareerSelector();
			},
	        processJobsList: function(jo, $ele, office){
	        	var $ele = $ele;
	        	var oloc = '';
	        	var oid = office;	        	
	        	var notxt = '';
	        	var plabel = $('.job-table-head .plabel').text();
	        	var tlabel = $('.job-table-head .tlabel').text();
	        	var llabel = $('.job-table-head .llabel').text();
	        	var $a = '';
	        	if(oid != ''){
	        		var jLen = 0;
		        	$.each(jo, function(j, val1){	        		
				        $.each(jo[j].jobs, function(k, val2){
				        	var dname = [];
				        	var oname = '';
				        	$.each(val2.departments, function(l, val3){
				        		dname.push(val3.name);
				        	})

				        	$.each(val2.offices, function(m, val5){
			        			var ol = val2.offices.length;
			        			if(ol == 1){
			        				oname = '<div style="display:inline;">' + val5.name + '</div>';
			        			}else{
			        				if(ol == (m+1)){
			        					oname += '<div style="display:inline;">' + val5.name + '</div>';
			        				}else{
			        					oname += '<div style="display:inline;">' + val5.name + ';</div> ';
			        				}
			        			}
				        	})
			        		$.each(val2.offices, function(n, val4){	
				        		if(val4.id == oid){
	        						oloc = val4.name;
	        						jLen = jLen + 1;
	        						var lPath = "location.href='" + cjdUrl + jo[j].jobs[k].id + "'";
									var waJobTitle = plabel + ': ' + jo[j].jobs[k].title + '-jobid=' + jo[j].jobs[k].id;
									var dfilter = dname[0].split(' ').join('-').toLowerCase();
		                    		$a += '<div class="job-table-row visible clearfix" onclick="'+ lPath +'" data-filter="'+ dfilter +'" data-mkt-id="panel" data-mkt-name="panel-job list" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><div class="col-sm-6 col-xs-6" data-mkt-cta-title="'+ waJobTitle +'"><span class="hidden-sm hidden-md hidden-lg"><strong>'+ plabel +':</strong></span> '+ jo[j].jobs[k].title +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+ tlabel +':</strong></span> '+ dname +'</div><div class="col-sm-3 col-xs-6"><span class="hidden-sm hidden-md hidden-lg"><strong>'+ llabel +':</strong></span> '+ oname +'</div></div>';
	        					}
				        	})
				        })
				    });

				    /* Get Office Name - when 0 jobs in location */
		        	var ofjson = sessionStorage.getItem('jOffice');
					var jData = '';
                    var ofJdata = '';
					var ofjo = '';
                    if(ofjson == null){
					    $.ajax({
					        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/offices',
					        type: 'GET',
					        contentType: "application/json",
					        dataType: "json",
					        success: function( response, textStatus, xhr ) {	
	                            try{
					            	sessionStorage.setItem("jOffice", xhr.responseText);
								}catch(err) {
									console.log(err);
								}
					            ofjson = xhr.responseText;
					            hds.careerPassLoc.processOfficeJSON(ofjson);
	                            ofJdata = '[ '+ ofjson + ']';
						 		ofjo = $.parseJSON(ofJdata);
								$.each(ofjo, function(j, office1){
			    					$.each(ofjo[j].offices, function(k, office2){
			    						if(office2.id == oid){
			    							oloc = office2.name;
			    						}
			    					})
			    				})
					        }
					    });
					}else{
						ofJdata = '[ '+ ofjson + ']';
						ofjo = $.parseJSON(ofJdata);

						$.each(ofjo, function(j, office1){
	    					$.each(ofjo[j].offices, function(k, office2){
	    						if(office2.id == oid){
	    							oloc = office2.name;




	    						}
	    					})
	    				})
                    }
				    $ele.append($a);
				    if(jLen == 0){
				    	$('.hv-job-details.office-jlist').css({'display':'none'});
				    	$('.job-error-panel').css({'display':'block'});
				    	if(oloc == ''){
				    		$('.common-hero-short-banner h1').text('').text('No Office');
				    	}else{
				    		$('.hv-job-details .open-jobs span.oloc, .common-hero-short-banner h1').text('').text(oloc);
				    	}
				    }else{
						if(oid != '4004686002'){
							$('.hv-job-details .open-jobs span.oloc, .common-hero-short-banner h1').text('').text(oloc);
						}
				    }
	        	}else{
	        		$('.hv-job-details.office-jlist').css({'display':'none'});
				    $('.job-error-panel').css({'display':'block'});
				    $('.common-hero-short-banner h1').text('').text('No Office');
	        	}
	        	setTimeout(function(){
	        		$('.hv-job-details .career-loading').hide();
	        	}, 500);
	        },
	        processJSON: function(json, office){
	        	var office = office;
	        	var jData = '[ '+ json + ']';
	        	var $ele = $('.hv-job-details .job-details-table .job-table-body');
				var jo = $.parseJSON(jData);
				hds.careerLocationList.processJobsList(jo, $ele, office);
	        },
			listLocationJobs: function(){	
				var jJobs = sessionStorage.getItem('jJobs');
				var jData = '';
				var qURL = window.location.href;
				var parms = hds.careerPassionList.getParmsFromURLHash(qURL);
				var p = parms["office"];
				if(p == undefined || p == ''){
					p = '';
				}
				var office = p.split(',');
				if(jJobs == null){
					$.ajax({
				        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/jobs?content=true',
				        type: 'GET',
				        contentType: "application/json",
						dataType: "json",
				        success: function( response, textStatus, xhr ) {
							try{
				        		sessionStorage.setItem("jJobs", xhr.responseText);
                            }catch(err) {
                            	console.log(err);
                            }
				        	jData = xhr.responseText;
				        	hds.careerLocationList.processJSON(jData, office);			        	
				        }
				    });
				}else{
					jData = jJobs;
					hds.careerLocationList.processJSON(jData, office);
				}
				setTimeout(function(){
		    		setTimeout(function(){
		    			hds.careerLocationList._setPagination();
		    		}, 1000);
		    		hds.careerPassionList.processRowColors();
		    	}, 2000);
			},
			_setPagination: function() {
	            var paginations = this.options.paginationWrapper;
	            var myPageName = this.options.myPageName;
	            var items = $('.job-table-body .job-table-row.visible:visible');
	            var numItems = items.length;
	            var perPage = this.options.itemsPerPage;

	            if (numItems > perPage) {
	                $(paginations).pagination('destroy');
	                items.slice(perPage).hide();
	                $(paginations).pagination({
	                    items: numItems,
	                    itemsOnPage: perPage,
	                    cssStyle: "light-theme",
	                    onPageClick: function(pageNumber) {
	                        var showFrom = perPage * (pageNumber - 1);
	                        var showTo = showFrom + perPage;
	                        items.hide().slice(showFrom, showTo).show();
	                        $('body').scrollTo('.hv-job-details',{duration:'slow', offsetTop : '50'});
	                        hds.careerPassionList.processRowColors();
	                    }
	                });
	            }
	        },
			bindCareerSelector: function(){				
				/* common on page load events */
				$(window).on('load', function(){
					var jOffice = sessionStorage.getItem('jOffice');
					var jData = '';
					if(jOffice == null){
						$.ajax({
					        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/offices',
					        type: 'GET',
					        contentType: "application/json",
					        dataType: "json",
					        success: function( response, textStatus, xhr ) {
                                try{
					            	sessionStorage.setItem("jOffice", xhr.responseText);
                                }catch(err) {
                                	console.log(err);
                                }
					            hds.careerLocationList.listLocationJobs();
					        }
					    });
					}else{
						hds.careerLocationList.listLocationJobs();
					}

					/* Add hash parameter in breadcrumb */					
					if (window.location.href.indexOf("/careers/location") > 0) {
						var lhref = $('.breadcrumb-container .breadcrumb li:nth-last-child(2)').find('a').attr('href');
						$('.breadcrumb-container .breadcrumb li:nth-last-child(2)').find('a').attr('href',lhref+'#tab=location');
					}
				})
				$(document).on('click', '.career-custom-location .career-custom-filter-navbar .filter-list a', function(event){
					if(!$(this).parent().hasClass('active')){
						$('#loadJobsContent').pagination('destroy');
						$('.career-custom-location .career-custom-filter-navbar .filter-list').removeClass('active');
						$(this).parent().addClass('active');

						var match = $(this).data('match');
						match = match.split(',');
						if(match == 'all'){
							$('.job-table-row').addClass('visible').removeAttr('style');
						}else{
							$('.job-table-row').each(function(){
								var $this = $(this);
								var filter = $(this).data('filter');
								$.each(match, function(i, val){
									if(filter == val){
										$this.addClass('visible').removeAttr('style');
									}else{
										$this.hide();
									}
								})
							})
						}						
						hds.careerLocationList._setPagination();
						hds.careerPassionList.processRowColors();
						if($('.job-table-row:visible').length == 0){
							$('.job-details-table .job-table-body').find('.no-matched-result').remove();
							$('.job-details-table .job-table-body').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ $('.jl-error-msg').html() +'</div>');
						}else{
							$('.job-details-table .job-table-body').find('.no-matched-result').remove();
						}
					}
					event.preventDefault();
				})
			}
		}
		/******** Career - Job Description Components ************/
		hds.careerJobDescription = {
			init: function(options) {
				hds.careerJobDescription.bindEventSelector();
			},
			processJobDetails: function(arg1, arg2){
				var jData = '['+ arg1 + ']';
				var jobid = arg2;
				var jo = $.parseJSON(jData);
				var len = 0;
				var txt1 = $('title').text();

				$.each(jo, function(j, val1){	        		
			        $.each(jo[j].jobs, function(k, val2){
			        	if(val2.id == jobid){
			        		len += 1;
			        		var jdesc = $.parseHTML(val2.content);
			        		var nVal = jdesc[0].nodeValue;
			        		var dname = [];
			        		var oname = '';
			        		var reqid = val2.requisition_id;

				        	$.each(val2.departments, function(l, val3){
				        		dname.push(val3.name);
				        	})

				        	$.each(val2.offices, function(m, val4){
			        			var ol = val2.offices.length;
			        			if(ol == 1){
			        				oname = '<div style="display:inline;">' + val4.name + '</div>';
			        			}else{
			        				if(ol == (m+1)){
			        					oname += '<div style="display:inline;">' + val4.name + '</div>';
			        				}else{
			        					oname += '<div style="display:inline;">' + val4.name + ';</div> ';
			        				}
			        			}
				        	})

				        	$('.career-job-description h1 span.title').text(val2.title);
					    	if(jobid == Number($('.talent-network-id').text())){
					    		$('.career-job-description h1 span.dept').html(oname);
					    		$('.career-job-description .jloc.jdep').text('');
					    		$('.career-job-description .jloc.jdep').prev('h4').hide();
					    	}else{
					    		$('.career-job-description h1 span.dept').html(dname + ', ' + oname);
					    		$('.career-job-description .jloc.jdep').text(dname);
					    	}								    	
					    	$('.career-job-description .job-desc-location .job-desc').append(nVal);
					    	$('.career-job-description .jloc.jcat').html(oname);
					    	$('.career-job-description .jloc.jrid').html(reqid);

					    	var ttxt1 = val2.title + ' - ' + txt1;
					    	$('head title').text(ttxt1);
					    	$('.breadcrumb-container .breadcrumb li').last().find('span').text(val2.title);
							$('.breadcrumb-container .breadcrumb li').last().find('span').attr('itemtitle',val2.title);

					    	var curl = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
					    	var twturl = 'http://twitter.com/share?url=' + curl + '%23jobid=' + val2.id + '&amp;text=' + encodeURIComponent(val2.title);
					    	var fburl = 'http://www.facebook.com/share.php?u=' + curl + '%23jobid=' + val2.id + '&amp;title=' + encodeURIComponent(val2.title);
					    	var liurl = 'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + curl + '%23jobid=' + val2.id + '&amp;title=' + encodeURIComponent(val2.title);
					    	$('.share-icon').find('a.job-share-twitter').attr('href',twturl);
					    	$('.share-icon').find('a.job-share-facebook').attr('href',fburl);
					    	$('.share-icon').find('a.job-share-linkedin').attr('href',liurl);

			        	}				        	
			        })
			    });

			    if(jobid == '' || jobid == undefined || len == 0){
			    	var ttxt1 = $('.job-error-panel h2').text() + ' | Hitachi Vantara';
					$('head title').text(ttxt1);
			    	$(".job-error-panel").css({'display':'block'});
                    $(".career-job-description").css({'display':'none'});
			    }

			    var jappurl;
			    if (window.location.href.indexOf("gh_src") > 0 || window.location.href.indexOf("gh_jid") > 0) {
					var qparam = hds.careerJobApplication.getUrlParameter(window.location.href);
					if(qparam['gh_src']){
						var ghsrc = qparam['gh_src'].split('#');
						jappurl = cjaUrl + jobid + '&gh_src='+ghsrc[0];
					}else{
						jappurl = cjaUrl + jobid;
					}
			    }else{
			    	jappurl = cjaUrl + jobid;
			    }		    
			    
			    $('.career-job-description .apply-now').find('a').attr('href', jappurl);
			    setTimeout(function(){
			    	$('.career-job-description .career-loading').delay(100).fadeOut(100);
			    }, 1000)
			},
			listDepartmentJobs: function(){
				var qURL = window.location.href;
				var parms = hds.careerPassionList.getParmsFromURLHash(qURL);
				var jobid = parms["jobid"];
				var jJobs = sessionStorage.getItem('jJobs');
				var jData = '';
				if(jJobs == null){
					$.ajax({
				        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/jobs?content=true',
				        type: 'GET',
				        contentType: "application/json",
						dataType: "json",
				        success: function( response, textStatus, xhr ) {
                            try{
				        		sessionStorage.setItem("jJobs", xhr.responseText);
							}catch(err) {
								console.log(err);
							}
				        	jData = xhr.responseText;
				        	hds.careerJobDescription.processJobDetails(jData, jobid);
				        }
				    });
				}else{
					jData = jJobs;
					hds.careerJobDescription.processJobDetails(jData, jobid);
				}
			},
			bindEventSelector: function(){				
				/* common on page load events */
				$(window).on('load', function(){
					hds.careerJobDescription.listDepartmentJobs();
				})
			}
		}

		/******** Career - Job Application Components ************/
		hds.careerJobApplication = {
			init: function(options) {
				hds.careerJobApplication.bindEventSelector();
			},
			getUrlParameter: function(qURL) {
				var url = qURL;
				var vars = {};
				var hashes = url.split("?")[1];
				var hash = hashes.split('&');

				for (var i = 0; i < hash.length; i++) {
					params=hash[i].split("=");
					vars[params[0]] = params[1];
				}
				return vars;
			},
			processDeptJSON: function(json){
				var qURL = window.location.href;
				var qparam = hds.careerJobApplication.getUrlParameter(qURL);
				var jobid = qparam['gh_jid'];
				var jData = '['+ json + ']';
				var jo = $.parseJSON(jData);
				var len = 0;
				var txt1 = $('title').text();

				$.each(jo, function(j, val1){	        		
			        $.each(jo[j].jobs, function(k, val2){
			        	if(val2.id == jobid){
			        		len += 1;
			        		var dname = [];

				        	$.each(val2.departments, function(l, val3){
				        		dname.push(val3.name);
				        	})
				        	$('.job-application-form h1 span.title').text(val2.title);
					    	$('.job-application-form h1 span.dtitle').text(dname);
					    	var ttxt1 = val2.title + ' - ' + txt1;
							$('head title').text(ttxt1);
					    	$('.breadcrumb-container .breadcrumb li:nth-last-child(2)').find('span').text(val2.title);
							$('.breadcrumb-container .breadcrumb li:nth-last-child(2)').find('span').attr('itemtitle',val2.title);
							$('.breadcrumb-container .breadcrumb li:nth-last-child(2)').find('a').attr('href',cjdUrl+jobid);
				        }
				    })
			    })

		        if(jobid == '' || jobid == undefined || len == 0){
		        	var ttxt1 = $('.job-error-panel h2').text() + ' | Hitachi Vantara';
					$('head title').text(ttxt1);
			    	$(".job-error-panel").css({'display':'block'});
                    $(".job-application-form").css({'display':'none'});
			    }
		        $('.job-application-form .career-loading').hide();
			},
			careerFrameRedirect: function(){
			    var jaurl = $('.japp-tyurl').text();
			    window.location.href = jaurl;
			},
			bindEventSelector: function(){				
				$(window).on('load', function(){									
					setTimeout(function(){
						$('.sIframe iframe#grnhse_iframe').attr('onload','hds.careerJobApplication.careerFrameRedirect();');
					}, 40000);

					var jJobs = sessionStorage.getItem('jJobs');
					var jData = '';
					if(jJobs == null){
						$.ajax({
					        url: 'https://api.greenhouse.io/v1/boards/hitachivantaracorporation/jobs?content=true',
					        type: 'GET',
					        contentType: "application/json",
							dataType: "json",
					        success: function( response, textStatus, xhr ) {
                                try{
					        		sessionStorage.setItem("jJobs", xhr.responseText);					        		
								}catch(err) {
									console.log(err);
								}
					        	jData = xhr.responseText;	
					        	hds.careerJobApplication.processDeptJSON(jData);			        	
					        }
					    });
					}else{
						jData = jJobs;
						hds.careerJobApplication.processDeptJSON(jData);
					}
				})
			}
		}

		/******** Career - Job Search Components ************/
		hds.careerJobSearch = {
			init: function(options) {
				hds.careerJobSearch.bindEventSelector();
			},
			aContainsB: function(a, b) {
			    return a.indexOf(b) >= 0;
			},
			processJobSearchList: function(json, value){
				var errorMsg = $('.js-error-msg').html();
				var $ele = $('.suggested-job-list .job-list');
				var str = value.toLowerCase();
				var jData = '['+ json + ']';				
				var jo = $.parseJSON(jData);
				var jshtml = '';

				$.each(jo, function(j, val1){
			        $.each(jo[j].jobs, function(k, val2){
			        	var oname = '';
			        	var tStatus = false, 
			        		dStatus = false, 
			        		lStatus = false,
			        		rStatus = false;
			        	var mstr = val2.title.toLowerCase();
	                	var lPath = cjdUrl + val2.id;
			        	
						if (hds.careerJobSearch.aContainsB(val2.requisition_id.toLowerCase(), str)) {
	                		rStatus = true;
	                	}

			        	if (hds.careerJobSearch.aContainsB(val2.title.toLowerCase(), str)) {
	                		tStatus = true;
	                	}

	                	$.each(val2.departments, function(d, val4){
	                		if(val4.name != null){
	                			if (hds.careerJobSearch.aContainsB(val4.name.toLowerCase(), str)) {
				        			dStatus = true;
				        		}
	                		}			        		
			        	})

			        	$.each(val2.offices, function(m, val3){
		        			var ol = val2.offices.length;
		        			if(ol == 1){
		        				oname = '<div style="display:inline;">' + val3.name + '</div>';
		        			}else{
								if(ol == (m+1)){
		        					oname += '<div style="display:inline;">' + val3.name + '</div>';
		        				}else{
		        					oname += '<div style="display:inline;">' + val3.name + ';</div> ';
		        				}
		        			}
		        			if(val3.name != null){
		        				if (hds.careerJobSearch.aContainsB(val3.name.toLowerCase(), str)) {
			                		lStatus = true;
			                	}
		        			}
		        			if(val3.location != null){
		        				if (hds.careerJobSearch.aContainsB(val3.location.toLowerCase(), str)) {
			                		lStatus = true;
			                	}
		        			}		        			
			        	})

			        	if(tStatus == true || dStatus == true || lStatus == true || rStatus == true){
			        		jshtml += '<a href="'+ lPath +'" target="_self"><span class="title">'+ val2.title +'</span><span class="location">'+ oname +'</span></a>';
			        	}			        	
				    })
			    })

		        $ele.html('').append(jshtml)
		        jshtml = '';
		        
		        if($ele.html() == ''){
		        	$ele.find('.no-matched-result').remove();
	                $ele.append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ errorMsg +'</div>');
	                $('.suggested-job-list').show();
		        }else{
		        	$('.suggested-job-list').show();
		        }
		        $('.job-search-input .job-scroll').jScrollPane();
			},
			addKeywordSearchTag: function(checkBoxValue, tag) {
	            $('#searchTag .keyword').html('');
	            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeKeyword'>&nbsp;</span></span>");
	            /* store the value in elment data so we can reference back to checkbox */
	            $newTag.data('value', checkBoxValue);
	            $(tag).append($newTag);
	        },
			bindEventSelector: function(){
				$("#jobSearch").val('');
				$('input[name="csFunction"]').prop('checked', false);

				$(window).bind("load", function() {
	                
	            })

				$(window).resize(function() {
                    var element = $('.job-search-input .job-scroll').jScrollPane(); 
                    var api = element.data('jsp');
                    api.destroy();
                    $('.suggested-job-list').hide();
                })

                $( window ).on( "orientationchange", function( event ) {
	                var deviceAgent = navigator.userAgent.toLowerCase();
	                var agentID = deviceAgent.match(/(ipad)/);      
	                if (agentID) {
	                    var element = $('.job-search-input .job-scroll').jScrollPane(); 
	                    var api = element.data('jsp');
	                    api.destroy();
	                    $('.suggested-job-list').hide();
	                }                    
	            });

				$(document).on('keyup', '#jobSearch', function(event) {
					var value = $.trim($(this).val());
					if (value.length > 0) {
						$('.clearJsIcon').show();						
						var jJobs = sessionStorage.getItem('jJobs');
						if(jJobs == null){
							jJobs = ghJobData;
						}
						hds.careerJobSearch.processJobSearchList(jJobs, value);
					}else{
						$('.clearJsIcon').hide();
						$('.suggested-job-list').hide();
					}
				})
				$(document).on('focus', '#jobSearch', function(event) {
					$('#jobSearch').trigger('keyup');
				})
				$(document).on('click', '.searchJob', function(event) {
					hds.careerPassionList.testFunction();
					var txtVal = $.trim($('#jobSearch').val());
                    if(txtVal.length > 0){
                    	$('.job-details-table .job-table-body').html('');
                    	$('#searchTag .label').css({
                            'display': 'inline'
                        });
                        hds.careerJobSearch.addKeywordSearchTag(txtVal, '#searchTag .keyword');
                        hds.careerPassionList.listDepartmentJobs();
                        $('body').scrollTo('.job-filters-search',{duration:'slow', offsetTop : '50'});
                    }else{
                    	$('#jobSearch').attr('placeholder','Enter Search Keyword');
                    }
                    $('.suggested-job-list').hide();                    
	                event.preventDefault();
	            });
	            $(document).on('keypress', '#jobSearch', function(event) {                
	                var keycode = (event.keyCode ? event.keyCode : event.which);
	                if (keycode == 13) {
	                    event.preventDefault();   
	                    $('#jobSearch').blur();              
	                    $('.searchJob').trigger('click');
	                }                              
	            });	             

				$(document).on('click', '.closeKeyword', function() {
					$('.job-details-table .job-table-body').html('');
                    $("#jobSearch").val('');                    
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#searchTag .label').css({
                        'display': 'none'
                    });
                    $('#searchTag .keyword').html('');
                    $('.clearJsIcon').hide();
                    hds.careerPassionList.testFunction();
                    if($('#jobSearch').val() == ""){
                        var $checkStatus = hds.careerPassionList.returnCheckStatus();
                        if($checkStatus == 0){                            
                            $('.tagList .sfheight a.clear-results').css({'display':'none'});
                        }
                        hds.careerPassionList.listDepartmentJobs();
                    }
	            })

				$(document).click(function(e) {	                
	                if (!$(e.target).is('.suggested-job-list, .suggested-job-list *, .job-search-input, .job-search-input *')) {
	                    $(".suggested-job-list").hide();
	                }              
	            });
	            $(document).on('click', '.clearJsIcon', function(event) {
	                $(this).hide();
	                $("#jobSearch").val('');
	                $('.suggested-job-list').hide();
	                event.preventDefault();
	            });

			}
		}

		/******** Common JS code function ************/
		hds.commonFunctions = {
			init: function(options) {
				hds.commonFunctions.bindCommonSelector();
			},
			heroBannerImageChanger: function(){
				if((navigator.userAgent.indexOf("MSIE") != -1 ) || (navigator.userAgent.indexOf("Edge") != -1 ) || navigator.appVersion.indexOf('Trident/') > -1){
			        var deskImageUrl = $(".hv-ps-new-hero-banner").attr('data-jpg-desktop');
					var mobImageUrl = $(".hv-ps-new-hero-banner").attr('data-jpg-mobile');
					if(deskImageUrl !== undefined && mobImageUrl !== undefined){
						if($(window).width()>=500){
							$(".hv-ps-new-hero-banner").css("background-image", "url(" + deskImageUrl + ")");
						}            
						else{
							$(".hv-ps-new-hero-banner").css("background-image", "url(" + mobImageUrl + ")");
						}
					}			                                      
			    }
			    else {                
			        var deskImageUrl = $(".hv-ps-new-hero-banner").attr('data-webp-desktop');
					var mobImageUrl = $(".hv-ps-new-hero-banner").attr('data-webp-mobile');
					if(deskImageUrl !== undefined && mobImageUrl !== undefined){
						if($(window).width()>=500){
							$(".hv-ps-new-hero-banner").css("background-image", "url(" + deskImageUrl + ")");
						}            
						else{
							$(".hv-ps-new-hero-banner").css("background-image", "url(" + mobImageUrl + ")");
						}
					}
			    }
			},
			tealiumImplicitPopHeight:function(){
				var pch = $.cookie("implicitBarCount");				
				if(pch < 5){
					if ( $('.hv_privacy_prompt').css('display') != 'none' ){
						var footerHeight = $('.hv_privacy_prompt').height();	  
						$('button.cta-scroll-top').css('bottom', (footerHeight + 30) + 'px');
					}
				}else{
					$('button.cta-scroll-top').removeAttr('style');
				}
			},
			tealiumExplicitPopHeight:function(){
				var footerHeight = $('#__tealiumGDPRecModal .privacy_prompt.explicit_consent').height();	  
				$('button.cta-scroll-top').css('bottom', (footerHeight + 30) + 'px');
				$(document).on('click', '#privacy_pref_optin, #privacy_pref_optout, #advanced_consent_options, .close_btn_thick', function(){
					$('button.cta-scroll-top').removeAttr('style');
				})
			},
			contactBannerCards: function(){
				$('.details-box').each(function(){
					var h1 = $(this).height();
					var h2 = $(this).find('.card-link1').outerHeight();
					var h3 = h1 - h2;
					var $cl = $(this).find('.contact-link');
					$cl.each(function(){
						var $a = $(this).find('a');
						var aLen = $(this).find('a').length;
						if(aLen == 1){
							$a.innerHeight(h3);
						}
						if(aLen == 2){
							var l1 = $(this).find('a:first-child').innerHeight();
							var l2 = h3 - l1;
							$(this).find('a:last-child').innerHeight(l2);
						}
						if(aLen == 3){
							var l1 = $(this).find('a:first-child').innerHeight();
							var l2 = $(this).find('a:nth-child(2)').innerHeight();
							var l3 = h3 - (l1 + l2);
							$(this).find('a:last-child').innerHeight(l3);
						}
					})
				})
			},
			centerVideoIcon: function(html){
			    $html = $(html);
			    $html.each(function(){
			        if($(this).find('div').hasClass('card-video-icon')){
			            var actualWidth = '';
			            if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
			                actualWidth = $(window).width();
			            }else{
			                actualWidth = $(window).width() + 17;
			            }
			            if (actualWidth > 991) {
			                var h1 = $(this).find('.spotlight-content .card-link1 .card-link1-content .spotlight-title').outerHeight();
			                var h2 = $(this).find('.spotlight-content .card-link1 .card-link1-content p, .spotlight-content .card-link1 .card-link1-content .spotlight-description').outerHeight();
			                var h3 = h1 + h2;
			                var h4 = $(this).find('.spotlight-content .card-link1').outerHeight() - h3;
							if ($('.hv-training-resources').length > 0) {
								$(this).find('.spotlight-content div.card-video-icon').css({'padding-top': (h4 - $('.hv-training-resources .card-video-icon .centered').height())/2});
							}
							else{
								$(this).find('.spotlight-content div.card-video-icon').css({'padding-top': (h4 - $('.card-video-icon .centered').height())/2});
							}
			            }else{
			                var h1 = $(this).find('.card-link1 .spotlight-mobile').outerHeight();
			                var h2 = h1 - $(this).find('div.card-video-icon').height();
			                $(this).find('.card-link1 .spotlight-mobile .card-video-icon').css({'padding-top': (h2/2)});
			                $(this).find('.spotlight-content div.card-video-icon').css({'padding-top':'initial'});
			            }
			        }
			    })
			},
			cardSample1: function(){
			    var actualWidth = '';
			    if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
			        actualWidth = $(window).width();
			    }else{
			        actualWidth = $(window).width() + 17;
			    }
			    if (actualWidth > 991) {
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1').css({'height':'auto'});
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a').css({'height':'auto'});
			        var h1 = $('.hds-news-resources .news-insight-explore-spotlight').height();
			        equalColumns('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1');
			        var h2 = $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1').outerHeight();
			        var h3 = h1 - h2;
			        //$('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a').height(h3);
			    }else if(actualWidth > 767 && actualWidth < 992){
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1').css({'height':'auto'});
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a').css({'height':'auto'});
			        var h1 = $('.hds-news-resources .news-insight-explore-spotlight').height();
			        equalColumns('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1');
			        var h2 = $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1').outerHeight();
			        var h4 = $('.hds-news-resources .news-insight-explore-spotlight .card-link1 .spotlight-mobile').outerHeight();
			        var h5 = h2 + h4;
			        var h3 = h1 - h5;
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a').height(h3);
					equalColumns('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a');
			    }else{
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .card-link1').css({'height':'initial'});
			        $('.hds-news-resources .news-insight-explore-spotlight .spotlight-content .read-more a').css({'height':'initial'});
			    }
			},
			cardSample2: function(){
			    var actualWidth = '';
			    if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
			        actualWidth = $(window).width();
			    }else{
			        actualWidth = $(window).width() + 17;
			    }
			    if (actualWidth > 991) {
			        $('.about-hds-articles .spotlight1 .spotlight-content .card-link1').css({'height':'auto'});
			        $('.about-hds-articles .about-hds-articles-spotlight .spotlight-content .spotlight-more a').css({'height':'auto'});
			        var h1 = $('.about-hds-articles .spotlight1').height();
			        equalColumns('.about-hds-articles .spotlight1 .spotlight-content .card-link1');
			        var h2 = $('.about-hds-articles .spotlight1 .spotlight-content .card-link1').outerHeight();
			        var h3 = h1 - h2;
			        $('.about-hds-articles .about-hds-articles-spotlight .spotlight-content .spotlight-more a').height(h3);
			    }else{
			        $('.about-hds-articles .spotlight1 .spotlight-content .card-link1').css({'height':'initial'});
			        $('.about-hds-articles .about-hds-articles-spotlight .spotlight-content .spotlight-more a').css({'height':'initial'});
			    }
			},
			contactUsOverlay: function(){
	            var a = $('.contact-main-nav a.hds-default-nav-anchor').offset().left,
	                b = $('.contact-main-nav a.hds-default-nav-anchor').outerWidth(),
	                c = $('.contact-main-box').outerWidth();
	                d = (a + b) - c;
	                $('.contact-main-box').css({'left': d});
	        },
	        contactUsClick: function(){
	        	hds.commonFunctions.contactUsOverlay();
	            if($('.contact-main-box').is(':visible')){
	                $(this).removeClass('active');
	                $(this).parent().removeClass('open');
	                $('.contact-main-box').css({'display': 'none'});
	            }else{
	                $(this).addClass('active');
	                $(this).parent().addClass('open');
	                $('.contact-main-box').css({'display': 'block'});
	            }	            
			},
			trimTitle: function(ele1, ele2, wcount){
				var wcount = Number(wcount);
	        	$(ele1).each(function(){
					var tTxt = $(this).find(ele2).text();
					var wLen = countWords(tTxt);
					var trimTxt = tTxt.split(/\s+/).slice(0,wcount).join(" ");
					if(wLen > wcount){
						trimTxt = trimTxt + '...';	
					}
					$(this).find(ele2).text(trimTxt);
				})
	        },
			bindCommonSelector: function(){
				/* On Page Ready */
				hds.commonFunctions.heroBannerImageChanger();
				$(window).on('resize', function() {
					hds.commonFunctions.heroBannerImageChanger();
				})
				/* Common variables for career section  */
				cjdUrl = '/en-us/company/careers/job-details.html#jobid=';
				cjaUrl = '/en-us/company/careers/job-details/job-application.html?gh_jid=';
				clUrl = '/en-us/company/careers/location.html#office=';
				/* Open Accordion Based on Hash Parameter */
				var sURL = window.location.href;
				var hparms = hds.resourceLib._getParmsFromURLHash(sURL);
				var pval = hparms['tab'];
				$('.spec-section .vsp-soft-products > .accordion-level').each(function(){
					var id = $(this).attr('id');
					if(id == pval){
						$('.accordion-menu-container, .accordion-content').removeClass('open');
						$(this).find('.accordion-menu-container').addClass('open');
						$(this).find('.accordion-content').addClass('open');
						$('body').scrollTo('#' + pval,{duration:'slow', offsetTop : '50'});
					}
				})

				/* HV Contact Nav */
				$(document).on('click', '.contact-main-nav a.hds-default-nav-anchor', function(){
					hds.commonFunctions.contactUsOverlay();
		            if($('.contact-main-box').is(':visible')){
		                $(this).removeClass('active');
		                //$(this).parent().removeClass('open');
		                if ($(window).width() > 991) {
		                	$('.contact-main-box').css({'display': 'none'});
		            	}
		            }else{
		                $(this).addClass('active');
		                //$(this).parent().addClass('open');
		                if ($(window).width() > 991) {
			                $('.contact-main-box').css({'display': 'block'});
			            }
		            }

		            if ($(window).width() <= 991) {
						var offsetFirst=$($('.hds-MobileMenu .globalNavWrapper > li:eq(0)')).offset().top;
	                    var clickedIndexHeight= $(this).parent().outerHeight();
	                    var clickedIndex= $(this).parent().index();
	                    var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);

	                    if($(this).parent().hasClass('open')){
	                        $(this).parent().removeClass('open');
	                        $(this).parent().find('.hds-megaMenuWrapper,.hds_globalNav_geo').slideUp(300);
	                    }else{
	                        $('.hds-MobileMenu .globalNavWrapper > li').removeClass('open');
	                        $(this).parent().addClass('open');
	                        $('.hds-megaMenuWrapper,.hds_globalNav_geo').slideUp(300);
	                        $(this).parent().find('.hds-megaMenuWrapper,.hds_globalNav_geo').slideDown(500);
	                    }

			            setTimeout(function(){
	                        if(!$('.hds-MobileMenu .globalNavWrapper > li').hasClass('open')){
	                            $("body, html").animate({scrollTop: 0}, 100);    
	                        }else{
	                            $("body, html").animate({scrollTop: finalIndex}, 600);
	                        }
	                    }, 500);
                	}
					$('.contact-sales-box, #hdseducationAccordion .training-dropdown .training-dropdown-select').hide();
					$(".contact-sales-tab, #hdseducationAccordion .training-dropdown a.leftdroptext").removeClass("active");
					$('#hdseducationAccordion .training-dropdown span.glyphicon').addClass('glyphicon-triangle-bottom');
					$('#hdseducationAccordion .training-dropdown span.glyphicon').removeClass('glyphicon-triangle-top');					
					return false;
		        });
			
		         $(window).on('resize', function() {
			        $(".contact-main-nav a.hds-default-nav-anchor").removeClass("active");			        
			        if ($(window).width() > 991) {
			        	$(".contact-main-nav").removeClass("open");
			        	$(".contact-main-box").hide();
			        }else{
			        	if(!$('.hds-MobileMenu').is(':visible')){
			        		$(".contact-main-nav").removeClass("open");
			        		$(".contact-main-box").removeAttr('style');
			        	}			        	
			        }
			    })

			    $(document).on('click', function(e) {
			        if (!$(e.target).is('.contact-main-nav a.hds-default-nav-anchor, .contact-main-box')) {
			            $(".contact-main-nav a.hds-default-nav-anchor").removeClass("active");
			            $(".contact-main-box").hide();
			        }               
			    });

				/* common on page load events */
				$(window).on('load', function(){
					/* Return to top with implicit popup */
					if($('#hvimplicit').is(":visible")){
						hds.commonFunctions.tealiumImplicitPopHeight();
						$(window).resize(function() {
							hds.commonFunctions.tealiumImplicitPopHeight();
						});
					}
					/* Return to top with explicit popup */
					if($('#hvexplicit').is(":visible")){
						hds.commonFunctions.tealiumExplicitPopHeight();
						$(window).resize(function() {
							hds.commonFunctions.tealiumExplicitPopHeight();
						});
					}
					/* Life at Hitachi Vantara */
					setTimeout(function(){
						var hparam = window.location.hash.substr(1);
						$('.accordion-level').each(function(){
						    var id = $(this).attr('id');
						    if(id == hparam){
						    	if ($(window).width() < 991) {
						    		$(this).find('.accordion-menu-container, .accordion-content').addClass('open');
									setTimeout(function(){$('body').scrollTo('#' + hparam,{duration:'slow', offsetTop : '50'});}, 100);
						    	}								
						    }
						})
					}, 1000);
					/* Teal panel height */
					$(window).resize(function() {
						if($('.hv-promo-actions').length > 0){
							var heights = $('.hv-promo-actions .hv-footer-contactus').height();
							$('.hv-promo-actions .hv-promos').css("height", heights);
						}
					});
					if($('.hv-promo-actions').length > 0){
						var heights = $('.hv-promo-actions .hv-footer-contactus').height();
						$('.hv-promo-actions .hv-promos').css("height", heights);
					}
				})								
			}
		}

		/* English Content Indicator */
		hds.hdsLocale = {
			init: function(options){
				var defaults = {
					gLinks: 'a[href*="en-us"],a[href*="en_us"]',
					gExtLinks: 'a[href*="/ext/"]',
					gRLVideo: 'a[class*="l-overlay"]',
					gGLVideo: 'a[onclick*="openvideooverlayById"]',
					gLinkHtml: hds.hdsLocale._getGeoIndicator(),
					gIcons:'span.glyphicon',
					gMenuLeft: 'glyphicon-menu-left',
					gMenuRight: 'glyphicon-menu-right',
					gLock: 'glyphicon-lock',
					gNewWindow: 'glyphicon-new-window',
					gsalinkAnimate: 'linkAnimate'
				}
				this.options = $.extend(defaults, options);
				$(document).ajaxStop(function(){
					hds.hdsLocale._engContentIndicator();
				})
				hds.hdsLocale._engContentIndicator();
			},
			_getGeoIndicator: function(){
				var ccode = getCountry();
				var eHtml = '';
				if(ccode == 'de' || ccode == 'at' || ccode == 'ch' || ccode == 'kr' || ccode == 'br'){
					eHtml = ' <i class="engInd">(en)</i>';
					return eHtml;
				}else if(ccode == 'cn' || ccode == 'tw'){
					eHtml = ' <i class="engInd">(英文)</i>';
					return eHtml;
				}else if(ccode == 'latam'){
					eHtml = ' <i class="engInd">(Inglés)</i>';
					return eHtml;
				}else if(ccode == 'ru'){
					eHtml = ' <i class="engInd">(англ)</i>';
					return eHtml;
				}
			},
			_isCountryGeo: function(country_code){
				var euCountries = ["latam","cn","tw","ru","kr","br","de","at","ch"];
			    var eu = false;
			    for(i=0;i< euCountries.length; i++){
			       if(country_code == euCountries[i]){
			           eu = true;
			           break;
			       }
			    }
			    return eu;
			},
			_engContentLinks: function(element){
				var $this = $(element),
					gLinkHtml = this.options.gLinkHtml,
				    gIcons = this.options.gIcons,
					gMenuLeft = this.options.gMenuLeft,
					gMenuRight = this.options.gMenuRight,
					gLock = this.options.gLock,
					gNewWindow = this.options.gNewWindow,
					gsalinkAnimate = this.options.gsalinkAnimate;

				var gLockRight = gLock + ' ' + gMenuRight;
				if($this.find('img').length > 0 || !$this.text().trim().length){
					if($this.hasClass('sol-click') || $this.hasClass('card-link1') || $this.hasClass('cl-ind')){
			            if($this.find(gIcons).length > 0){
			                if($this.find(gIcons).hasClass(gMenuLeft)){                         
			                    $this.append(gLinkHtml);
			                }else{
			                    if($this.find(gIcons).hasClass(gLock + ' ' + gMenuRight) || $this.find(gIcons).hasClass(gMenuRight) || $this.find(gIcons).hasClass(gNewWindow) || $this.find(gIcons).hasClass(gsalinkAnimate)){
			                        $this.find(gIcons + ':last-child').before(gLinkHtml);
			                    }else{
			                        $this.append(gLinkHtml);
			                    }
			                }
			            }else{
			                $this.append(gLinkHtml);
			            }
			            if($this.find('.btn-square-red').length > 0 || $this.find('.btn-square-black').length > 0 || $this.find('.btn-square-white').length > 0){
			            	$this.find('.btn-square-red .animateLink').append(gLinkHtml);
			            }
			        }
				}
				else if($this.find(gIcons).length > 0){
					if($this.find(gIcons).hasClass(gMenuLeft)){							
						$this.append(gLinkHtml);
					}else{
						if($this.find(gIcons).hasClass(gLock + ' ' + gMenuRight) || $this.find(gIcons).hasClass(gMenuRight) || $this.find(gIcons).hasClass(gNewWindow) || $this.find(gIcons).hasClass(gsalinkAnimate)){
							$this.find(gIcons + ':last-child').before(gLinkHtml);
						}else{
							$this.append(gLinkHtml);
						}
					}
				}else if($this.find('*').hasClass('cl-ind')){
					$this.find('.cl-ind').append(gLinkHtml);
				}else{
					$this.append(gLinkHtml);
				}
			},
			_engContentIndicator: function(){
				var gLinks = this.options.gLinks,
					gExtLinks = this.options.gExtLinks,
					gRLVideo = this.options.gRLVideo,
					gGLVideo = this.options.gGLVideo,
					gLinkHtml = this.options.gLinkHtml;		

				$(gRLVideo).each(function() {
					if(!$(this).find('.engInd').length > 0){
						$(this).find('.engInd').remove();
						hds.hdsLocale._engContentLinks(this);
					}
				})

				$(gGLVideo).each(function() {
					if(!$(this).find('.engInd').length > 0){
						$(this).find('.engInd').remove();
						hds.hdsLocale._engContentLinks(this);
					}
				})
				
				$(gExtLinks).each(function() {
					if(!$(this).find('.engInd').length > 0){
						$(this).find('.engInd').remove();
						hds.hdsLocale._engContentLinks(this);
					}				
					$(this).attr('target','_blank');		
				});
				
				$(gLinks).each(function() {
					var hrefVal = $(this).attr('href');
					if (!(hrefVal.indexOf('www.hitachiinsightgroup.com') > -1)){
						if(!$(this).find('.engInd').length > 0){
							$(this).find('.engInd').remove();
							hds.hdsLocale._engContentLinks(this);
						}				
						$(this).attr('target','_blank');
					}				
				});
			}
		}
		
		/* HDS Brand DT */
		hds.hdsBranddt = {
			init: function(options){
				if ($('.animatable').length > 0) {
					hds.hdsBranddt._scrollAnimation();
				}
				hds.hdsBranddt._loadMore();
				hds.hdsBranddt._bindEventSelectors();
			},
			_scrollAnimation: function(){
				// Function which adds the 'animated' class to any '.animatable' in view
				var doAnimations = function() {    
				// Calc current offset and get all animatables
				var offset = $(window).scrollTop() + $(window).height(),
					$animatables = $('.animatable');   
				// Unbind scroll handler if we have no animatables
				if ($animatables.length == 0) {
				  $(window).off('scroll', doAnimations);
				}   
				// Check all animatables and animate them if necessary
				$animatables.each(function(i) {
					var $animatable = $(this);
					if (($animatable.offset().top + $animatable.height() - 20) < offset) {
					$animatable.removeClass('animatable').addClass('animated');
					}
				});
				};
			  
			  // Hook doAnimations on scroll, and trigger a scroll
				$(window).on('scroll', doAnimations);
				$(window).trigger('scroll');
			},	
			_loadMore: function(){	
				var size_div = $(".dt-feat-tile").size();
				hvdt=parseInt($('#hv-ftiles-rcount').text());
				$('.dt-feat-tile:visible').hide();
				$('.dt-feat-tile:lt('+hvdt+')').css({'display':'inline-block'});

				$(document).on('click','.load-more .btn-square-red', function() {
					var size_div = $(".dt-feat-tile").size();            			
					hvdt= (hvdt+15 <= size_div) ? hvdt+15 : size_div;
					$('.dt-feat-tile:lt('+hvdt+')').slideDown('fast','linear').css('display', 'inline-block');
					setTimeout(function(){
						var cust_vi = $(".dt-feat-tile:visible").size();
						if(size_div == cust_vi){
							$('.load-more .btn-square-red').hide();
						}
					},300);
					equalColumns('.dt-featured-tiles .dt-feat-tile .dt-feat-content');
        			equalColumns('.dt-featured-tiles .dt-feat-tile .card-link1');
				});
			},
			_bindEventSelectors: function(){
				$(window).bind("load", function() {
					if($('.dt-inner-page-banner').length > 0){
						$('.dt-inner-page-banner').find('.dt-inner-video-panel').addClass('fadeIn');
					}
					var heights = $('.featured-customers .resources-column .resource-item .pop').height();
					$('.featured-customers .resources-column .resource-item a.card-link1 .card-video-icon').css("height", heights);
					var cardheights = $('.dt-featured-tiles .dt-feat-tile .pop').height();
					$('.dt-featured-tiles .dt-feat-tile .card-link1 .card-video-icon').css("height", cardheights);
				})
				$(window).on('resize', function() {
					setTimeout(function(){
						var heights = $('.featured-customers .resources-column .resource-item .pop').height();
						$('.featured-customers .resources-column .resource-item a.card-link1 .card-video-icon').css("height", heights);
						var cardheights = $('.dt-featured-tiles .dt-feat-tile .pop').height();
						$('.dt-featured-tiles .dt-feat-tile .card-link1 .card-video-icon').css("height", cardheights);
					}, 500)
				});

				/* DT Parallax - Caching of gray scale hover images */
			    var dtGallery = [];
			    var dtImgObj = [];
			    if($('.new-dt-parallax-panel').length > 0 || $('.dt-inner-page-banner').length > 0){
				    $('.new-dt-parallax-panel').each(function(){
				    	if ($(window).width() <= 500) {
				        	dtGallery.push($(this).attr('data-image-mobile'));
				    	}else{
				    		dtGallery.push($(this).attr('data-image-desktop'));
				    	}
				    })
				    $('.dt-inner-page-banner').each(function(){
				    	if ($(window).width() <= 500) {
				        	dtGallery.push($(this).attr('data-image-mobile'));
				        }else{
				        	dtGallery.push($(this).attr('data-image-desktop'));
				        }
				    })
				    for (i = 0; i < dtGallery.length; i++) {
				        dtImgObj[i] = new Image();
				        dtImgObj[i].src = dtGallery[i];
				        $(dtImgObj[i]).attr('style','display:none');
				        $('body').append(dtImgObj[i]);
				    }
				}			    
			}	
		}
		/* Homepage logo component*/
		hds.hdshomelogoTab = {
			init: function(options){				
				hds.hdshomelogoTab._bindEventSelectors();
			},
			_bindEventSelectors: function(){
				$(".dt-item").hide();
				$(".dt-item:first").show();
				$('.dt-nav-img:first').addClass('active');
				$('.dt-nav-img').on( "click", function(e) {
					e.preventDefault();
					var width = $(window).width() + 17;
					var ntarget = $('.dt-content-section');
					var dId = $(this).parent().data('id');
					$("div.dt-item").hide();
					$("div.dt-item").each(function(){
						if($(this).attr('id') == dId) {
							$(this).show();
						}
					});
					if(ntarget.length){
						if(width > 991){
							$('html, body').animate({ scrollTop : $('.dt-logo-tab h2.title').offset().top - 10});
						}else{
							$('html, body').animate({ scrollTop : $('.dt-logo-tab h2.title').offset().top});
						}
					}

					$('.dt-nav-img').removeClass('active');
					$(this).addClass("active");
					equalColumns('.dt-logo-tab .dt-content-section .box');
					equalColumns('.hv-home-featured-listing .hv-home-resources-column .hv-home-resource-item .hv-home-resource-content');

				});
				
				window.addEventListener("resize", function() {
					// Get screen size (inner/outerWidth, inner/outerHeight)
					setTimeout(function(){
						equalColumns('.dt-logo-tab .dt-content-section .box');
						equalColumns('.hv-home-featured-listing .hv-home-resources-column .hv-home-resource-item .hv-home-resource-content');
					 }, 500);
					  }, false);
					  setTimeout(function(){
						equalColumns('.dt-logo-tab .dt-content-section .box');
						equalColumns('.hv-home-featured-listing .hv-home-resources-column .hv-home-resource-item .hv-home-resource-content');
					 }, 500);
					dtlogoSlider();
						function dtlogoSlider(){
							$('.dt-logo-tab').each(function(){
							var carTime = $(this).find('.carousel-time').text(),
								carAuto = $(this).find('.carousel-auto').text();
							if(carAuto == 'true'){
								carAuto = true;
							}else{
								carAuto = false;
							}
							$(this).find(".dt-logo-carousal").slick({
								dots: true,
								arrows: false,
								infinite: true,
								slidesToShow: 4,
								slidesToScroll: 4,
								centerMode: false,
								autoplay: carAuto,
								autoplaySpeed: carTime,
								responsive: [ {
										breakpoint: 480,
										settings: {
											slidesToShow: 3,
											slidesToScroll: 3,

										}
									}
								]
							});
						})     
					}			    
			}	
		}	
		/* Training & Certification */
		hds.hdstraining = {
			init: function(options){	
				hds.hdstraining.featuredTrainingCarousel();			
				hds.hdstraining.bindEventSelectors();				
			},
			featuredTrainingCarousel: function(){
				$('.courses-column').each(function(){			    
					$(this).find(".courses-inner-col").slick({
						dots: true, arrows: false, infinite: true, slidesToShow: 4, slidesToScroll: 4, draggable: true, autoplay: false,
						responsive: [{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true
							}
						},
						{
							breakpoint: 650,
							settings: {
								slidesToShow: 2, slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}]
					});					
				})
			},
			bindEventSelectors: function(){
				$(window).on('load', function(){
					tSearchPHolder = $('.training-cs-banner #jobSearch').attr('placeholder');
					/* Hide explore tab*/
					$('#hdseducationAccordion .training-dropdown .training-dropdown-select').css({'display': 'none'});					
				});
				/* Courses Tab */
				$(document).on('click', '.courses-tab li a', function(event){
	                event.preventDefault();
	                var active_tab_selector = $('.courses-tab li.active a').attr('href');
	                var actived_nav = $('.courses-tab li.active');
	                actived_nav.removeClass('active');                  
	                $(this).parents('li').addClass('active');                   
	                $(active_tab_selector).removeClass('active');
	                $(active_tab_selector).addClass('hide');                    
	                var target_tab_selector = $(this).attr('href');
	                $(target_tab_selector).removeClass('hide');
	                $(target_tab_selector).addClass('active');
	            });
				/* Country training Tab */
				$(document).on('click', '.edu-country-tab li a', function(event){
	                event.preventDefault();
	                var active_tab_selector = $('.edu-country-tab li.active a').attr('href');
	                var actived_nav = $('.edu-country-tab li.active');
	                actived_nav.removeClass('active');                  
	                $(this).parents('li').addClass('active');                   
	                $(active_tab_selector).removeClass('active');
	                $(active_tab_selector).addClass('hide');                    
	                var target_tab_selector = $(this).attr('href');
	                $(target_tab_selector).removeClass('hide');
	                $(target_tab_selector).addClass('active');
	            });				
				/* Explore All tab*/
				$(document).on('click', '#hdseducationAccordion .training-dropdown a.leftdroptext', function(event){
					if($('#hdseducationAccordion .training-dropdown .training-dropdown-select').is(':visible')){
						$(this).removeClass('active');
						$('#hdseducationAccordion .training-dropdown .training-dropdown-select').css({'display': 'none'});
						$('#hdseducationAccordion .training-dropdown span.glyphicon').addClass('glyphicon-triangle-bottom');
						$('#hdseducationAccordion .training-dropdown span.glyphicon').removeClass('glyphicon-triangle-top');
					}else{
						$(this).addClass('active');
						$('#hdseducationAccordion .training-dropdown .training-dropdown-select').css({'display': 'block'});
						$('#hdseducationAccordion .training-dropdown span.glyphicon').addClass('glyphicon-triangle-top');
						$('#hdseducationAccordion .training-dropdown span.glyphicon').removeClass('glyphicon-triangle-bottom');
					}
					$('.contact-sales-box,.contact-main-box').hide();
					$('.contact-main-nav > a, .contact-sales-tab').removeClass('active');
					return false;
	            });
	            /* Training LP Banner Search */
	            $(document).on('click', '.training-cs-banner .searchJob', function(event){
					var txtVal = $.trim($('.training-cs-banner #jobSearch').val().toLowerCase());
                    if(txtVal.length > 0){
                    	var sPath = $.trim($('.fcourse-path').text()) + txtVal;
						location.href = sPath;
                    }else{
                    	$('.training-cs-banner #jobSearch').attr('placeholder',$.trim($('.error-pholder').text()));
                    }
	                event.preventDefault();
	            })
				$(document).on('keyup', '.training-cs-banner #jobSearch', function(event) {
					var value = $.trim($(this).val());
					if (value.length > 0) {
						$('.training-cs-banner .clearJsIcon').show();
					}else{
						$('.training-cs-banner .clearJsIcon').hide();
					}
				})
				$(document).on('keypress', '.training-cs-banner #jobSearch', function(event) {                
				    var keycode = (event.keyCode ? event.keyCode : event.which);
				    if (keycode == 13) {
				        event.preventDefault();   
				        $('.training-cs-banner #jobSearch').blur();              
				        $('.training-cs-banner .searchJob').trigger('click');
				    }                              
				});	             
				$(document).on('click', '.training-cs-banner .clearJsIcon', function(event) {
				    $(this).hide();
				    $(".training-cs-banner #jobSearch").val('').focus();
				    event.preventDefault();
				});
				/* Training FAQ */
				$(".hv-training-faq .accordion-level .accordion-menu-container").click(function(){
					var $currentContent = $(this).closest('div').next('div.accordion-content', this);
					if (!$(this).hasClass("open") && $(this).next().queue().length === 0) {
						$(this).parent().removeClass("remove-margin");
					} else if ($(this).hasClass("open") && $(this).next().queue().length === 0) {
						$(this).parent().addClass("remove-margin");
					}
					return false;
				});
				$(window).on('resize', function() {
					$("#hdseducationAccordion .training-dropdown a.leftdroptext").removeClass("active");
					$("#hdseducationAccordion .training-dropdown .training-dropdown-select").hide();
					$('#hdseducationAccordion .training-dropdown span.glyphicon').addClass('glyphicon-triangle-bottom');
					$('#hdseducationAccordion .training-dropdown span.glyphicon').removeClass('glyphicon-triangle-top');					
				});
				$(document).on('click', function(e) {
					if (!$(e.target).is('#hdseducationAccordion .training-dropdown a.leftdroptext, #hdseducationAccordion .training-dropdown .training-dropdown-select, #hdseducationAccordion .training-dropdown .training-dropdown-select *')) {
						 $("#hdseducationAccordion .training-dropdown a.leftdroptext").removeClass("active");
						$("#hdseducationAccordion .training-dropdown .training-dropdown-select").hide();
						$('#hdseducationAccordion .training-dropdown span.glyphicon').addClass('glyphicon-triangle-bottom');
						$('#hdseducationAccordion .training-dropdown span.glyphicon').removeClass('glyphicon-triangle-top');
					}

					if (!$(e.target).is('.training-cs-banner .job-search-input, .training-cs-banner .job-search-input *')) {
	                    $('.training-cs-banner #jobSearch').attr('placeholder',tSearchPHolder);
	                }
				});
			}			
		}

		/* HV Training Courses Search */
		hds.trainingSearch = {
			init: function(options){
				var defaults = {
	                paginationWrapper: '#pagesContainer',
	                myPageName: "#page-",
	                itemsPerPage: Number($('#hv-course-count').text()),
	                clearSwitch: '.tagList .sfheight a.clear-results',	                
	                filterTopLeft: '.filters-section',
	                filterTarget: '.course-box'
	            }
	            this.options = $.extend(defaults, options);
				hds.trainingSearch.bindEventSelectors();				
			},
			searchCoursesList: function(){
				var paginations = this.options.paginationWrapper;
            	var itemsPerPage = this.options.itemsPerPage;
	        	var $ele = $ele;
				var durl = '';
				var ctaLabel = $.trim($('.fview-detail').text());
				var imgPath = $.trim($('.fcourse-img-path').text());				

				/* Random Images Collection */
				var catList = $('.fcourse-allcat').text().toLowerCase();
				var catListArr = catList.split('~');
				var catarr = [];
				$.each(catListArr, function(i, j){
					a = catListArr[i].split(' ').join('-');
					catarr.push(a.replace(/,/g, ""));
				});

				var catListCt = $('.fcourse-cat-count').text().toLowerCase();
					catListCt = catListCt.split('~');

				var catImg1 = parseInt(catListCt[0]), 
					catImg2 = parseInt(catListCt[1]),
					catImg3 = parseInt(catListCt[2]),
					catImg4 = parseInt(catListCt[3]),
					catImg5 = parseInt(catListCt[4]),
					catImg6 = parseInt(catListCt[5]),
					catImg7 = parseInt(catListCt[6]);
				var catCount1 = 0, catCount2 = 0, catCount3 = 0, catCount4 = 0, catCount5 = 0, catCount6 = 0, catCount7 = 0;
				/* Random Images Collection */

				$.ajax({
				    url: '/bin/services/courses?r='+Math.random(),
				    type: 'GET',
				    contentType: "application/json",
				    dataType: "json",
				    success: function( response, textStatus, xhr ) {
				        var jData = xhr.responseText;
				        var jo = $.parseJSON(jData);
				        $('.hv-search-courses .courses-list .row-centered').html('')
				        $.each(jo.courses, function(j, val){
							if(val.searchable != 'false'){
								var cTypeLabel = '';
								if(val.courseType == 'ilt-vilt'){
									durl = $.trim($('.fcourse-url').text()) + val.objectId;
									cTypeLabel = $('.fcoursetype1').text();
								}
								if(val.courseType == 'self-paced'){
									durl = $.trim($('.fcourse-url').text()) + val.objectId;
									cTypeLabel = $('.fcoursetype2').text();
								}
								if(val.courseType == 'library'){
									durl = $.trim($('.fcourse-url').text()) + val.objectId;
									cTypeLabel = $('.fcoursetype3').text();
								}

								/* Re-Filter this code */
								var ft1 = val.trainingType;
								ft1 = $.trim(ft1).split('~').join(',').toLowerCase();
								if(ft1 == "event"){
									ft1 = $('.FilterTypeList input[name="csFunction"]').eq(0).attr('id');
								}
								if(ft1 == "video" || ft1 == "material" || ft1 == "course" || ft1 == "curriculum"){
									ft1 = $('.FilterTypeList input[name="csFunction"]').eq(1).attr('id');
								}
								if(ft1 == "library"){
									ft1 = $('.FilterTypeList input[name="csFunction"]').eq(2).attr('id');
								}
								var ft2 = val.region;
								ft2 = $.trim(ft2).split('~').join(',').toLowerCase();
								var ft3 = val.country;
								ft3 = $.trim(ft3).split('~').join(',').toLowerCase();
								ft3.replace(/ {2,}/g, ' ');
								ft3 = $.trim(ft3).split(' ').join('-');
								var allfilters = ft1 + ',' + ft2 + ',' + ft3;
								allfilters =  allfilters.replace(/,,/g, '');
								/* Refilter */

								/* Get Child Object Category */			            	
								var jcat = val.category;
								var fcat = [];
								var catimg = '';
								if(jcat != undefined && jcat != '' && jcat.toLowerCase() != 'select'){
									var catimg;
									if(jcat.indexOf('~') != -1){
										var catlist1 = jcat.split('~');
										catimg = $.trim(catlist1[0].substr(0, catlist1[0].indexOf('>')).toLowerCase());
									}else{
										catimg = jcat.toLowerCase();
									}								
									catimg = catimg.split(' ').join('-');

									$.each(catarr, function(j1, val1){
										if(catarr[j1] == catimg && j1 == 0){
											catCount1 = catCount1 + 1;
											if(catCount1 == (catImg1 + 1)){
												catCount1 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount1 + '.jpg';
										}
										if(catarr[j1] == catimg && j1 == 1){
											catCount2 = catCount2 + 1;
											if(catCount2 == (catImg2 + 1)){
												catCount2 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount2 + '.jpg';
										}
										if(catarr[j1] == catimg && j1 == 2){
											catCount3 = catCount3 + 1;
											if(catCount3 == (catImg3 + 1)){
												catCount3 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount3 + '.jpg';								        
										}
										if(catarr[j1] == catimg && j1 == 3){
											catCount4 = catCount4 + 1;
											if(catCount4 == (catImg4 + 1)){
												catCount4 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount4 + '.jpg';
										}
										if(catarr[j1] == catimg && j1 == 4){
											catCount5 = catCount5 + 1;
											if(catCount5 == (catImg5 + 1)){
												catCount5 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount5 + '.jpg';
										}
										if(catarr[j1] == catimg && j1 == 5){
											catCount6 = catCount6 + 1;
											if(catCount6 == (catImg6 + 1)){
												catCount6 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount6 + '.jpg';
										}
										if(catarr[j1] == catimg && j1 == 6){
											catCount7 = catCount7 + 1;
											if(catCount7 == (catImg7 + 1)){
												catCount7 = 1;
											}
											catimg = imgPath + catimg + '-' + catCount7 + '.jpg';
										}
									})							
								}else{
									catimg = imgPath + 'default-category-img.jpg';
								}
								/* Get Child Object Category */

								var html = '<div class="course-box col-centered tile-scale-shadow" data-mkt-id="panel" data-mkt-name="panel-search result" data-allfilter="'+ allfilters +'"><a href="'+ durl +'" target="_self" class="card-link1" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><div class="pop"><img src="'+ catimg +'" alt="'+ val.title +'"></div><h3 data-mkt-cta-title="'+ val.title +'">'+ val.title +'</h3><p>'+ cTypeLabel +'</p><div class="cdesc hidden">'+ val.description +'</div><div class="view-details"><div class="animateLink ctbox card-click-cta">' + ctaLabel + '<span class="glyphicon glyphicon-menu-right animateIcon"></span></div></div></a></div>';
								$('.hv-search-courses .courses-list .row-centered').append(html);
							}
				        });
				        equalColumns('.hv-search-courses .courses-list .row-centered .course-box h3');

				        $(paginations).pagination('destroy');
					    if ($('.hv-search-courses .courses-list .row-centered .course-box').length > itemsPerPage) {
					    	//hds.trainingSearch.setPagination();
					    }
				    },
				    complete: function(){
					    var size_li = $(".course-box").size();
				    	if(size_li > 0){
						    hvc=parseInt($('#hv-course-count').text());
						    $('.course-box:visible').hide();
						    $('.course-box:lt('+hvc+')').show();
					    	if(size_li > hvc){
					    		$('.hv-search-courses .courses-list .hvc-load-more').show();
					    	}else{
					    		$('.hv-search-courses .courses-list .hvc-load-more').hide();
					    	}
				    	}
				    	setTimeout(function(){
							hds.trainingSearch.checkSelectedNav();
						}, 1000);
				    }
				})
			},
			getSelectedFilters: function(arg1, arg2, arg3, arg4){
				var s1 = '', s2 = '', s3 = '', s4 = '', j1 = '', j2 = '', j3 = '', j4 = '';
	            var ff = [];   
	            var aa = [];   
	            var c1 = 0, c2 = 0, c3 = 0, c4 = 0; 
	            var count = 0;	            
	            $('.courses-list .row-centered').append('<div id="loading"></div>');		        
		        $('.course-box').each(function(){
		        	var pr = $(this).data('allfilter');
		        	var pr1 = pr.split(',');

		        	var ps = $(this).data('allfilter');
		        	var dsearch = $(this).find('h3').text().toLowerCase();
		        	dsearch = dsearch.replace(/ {2,}/g, ' ');
		        	var cdesc = $(this).find('.cdesc').text().toLowerCase();

		        	if(arg1 == undefined && arg2 == undefined && arg3 == undefined && arg4 == ''){
	                    $(this).css({'display':'inline-block'});
	                    $(this).addClass('cfilter');
	                } 
	                else if(arg1 != undefined && arg2 != undefined && arg3 != undefined && arg4 != ''){
	                    $.grep(arg1, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s1 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg2, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s2 = 'true';
	                            }
	                        })
	                    })

	                    $.grep(arg3, function( a1, b1 ) {
	                        $.grep(pr1, function( a2, b2 ) {
	                            if(a1 == a2){
	                                s3 = 'true';
	                            }
	                        })
	                    })

	                    if (hds.trainingSearch.aContainsB(dsearch, arg4) || hds.trainingSearch.aContainsB(cdesc, arg4)) {
	                    	s4 = 'true';
	                    }

	                    if(s1 == 'true' && s2 == 'true' && s3 == 'true' && s4 == 'true'){
	                        $(this).css({'display':'inline-block'});
	                        $(this).addClass('cfilter');
	                        count = count + 1;
	                    }else{
	                        $(this).css({'display':'none'});
	                        $(this).removeClass('cfilter');
	                    }
	                }else{
	                    if(arg1 != undefined){                        
	                        $.grep(arg1, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c1 = c1 + 1;
	                                }
	                            })
	                        })
	                        if(c1 == 0){
	                            j1 = 'false'; 
	                        }else{
	                            s1 = 'true';
	                        }
	                    }                    
	                    if(arg2 != undefined){
	                        $.grep(arg2, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c2 = c2 + 1;
	                                }
	                            })
	                        })
	                        if(c2 == 0){
	                            j2 = 'false'; 
	                        }else{
	                            s2 = 'true';
	                        }
	                    }

	                    if(arg3 != undefined){
	                        $.grep(arg3, function( a1, b1 ) {
	                            $.grep(pr1, function( a2, b2 ) {
	                                if(a1 == a2){
	                                    c3 = c3 + 1;
	                                }
	                            })
	                        })
	                        if(c3 == 0){
	                            j3 = 'false'; 
	                        }else{
	                            s3 = 'true';
	                        }
	                    }
	                    if(arg4 != ''){
	                    	if (hds.trainingSearch.aContainsB(dsearch, arg4) || hds.trainingSearch.aContainsB(cdesc, arg4)) {
		                    	c4 = c4 + 1;
		                    }
		                    if(c4 == 0){
	                            j4 = 'false'; 
	                        }else{
	                            s4 = 'true';
	                        }
	                    }

	                    if(s1 != ''){
	                        ff.push('s1 = ' + s1);
	                    }
	                    if(s2 != ''){
	                        ff.push('s2 = ' + s2);
	                    }
	                    if(s3 != ''){
	                        ff.push('s3 = ' + s3);
	                    }
	                    if(s4 != ''){
	                        ff.push('s4 = ' + s4);
	                    }

	                    var ffLen = ff.length;                
	                    $.each(ff , function(i, val) {
	                        if(ffLen == (i+1)){
	                            aa.push(ff [i] );
	                        }else{
	                            aa.push(ff [i] + ' && ');
	                        }   
	                    });
	                    var b = aa.toString();
	                    var c = b.replace (/,/g, "");
	                    if(c){
	                        $(this).css({'display':'inline-block'});
	                        $(this).addClass('cfilter');
	                        count = count + 1;
	                    }

	                    if(j1 == 'false' || j2 == 'false' || j3 == 'false' || j4 == 'false'){
	                        $(this).css({'display':'none'});
	                        $(this).removeClass('cfilter');
	                    }
	                }

	                s1 = '', s2 = '', s3 = '', s4 = '', j1 = '', j2 = '', j3 = '', j4 = '', c1 = 0, c2 = 0, c3 = 0, c4 = 0;
	                ff = [];                
	                a = [];
		        });				
				$('#loading').remove();
				var resCount = $('.course-box:visible').length;
				if(resCount == 0){
					$('.courses-list .row-centered').find('.no-matched-result').remove();
					$('.courses-list .row-centered').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ resultNotFound +'</div>');
					$('.hvc-load-more .vall').hide();
					$('.res-count span').text(resCount).show();
				}else{
					$('.courses-list .row-centered').find('.no-matched-result').remove();
					$('.res-count span').text(resCount).show();					
				}
				if($('#searchTag .keyword').html()=='' && $('#filterTag .keyword-filter').html()==''){
					$('.res-count').hide();
				}else{
					$('.res-count').show();
				}
			},
			lmSecondAttempt: function(){
				var size_li = $(".course-box.cfilter").size();
				var y=parseInt($('#hv-course-count').text());
				$('.course-box.cfilter:visible').hide();
				$('.course-box.cfilter:lt('+y+')').show();
				if (size_li <= y) {
					$('.hvc-load-more .lmore, .hvc-load-more .vall').hide();
					/*if($('.no-matched-result').length > 0){
						$('.hvc-load-more .vall').hide();	
					}else{
						$('.hvc-load-more .vall').show();
					}*/	                    
				}else{
					$('.hvc-load-more .lmore').show();
					$('.hvc-load-more .vall').show();
				}
			},
	        buildMobileNavigation: function(arg) {
	            if ($(window).width() < 991) {
	                var getMobileSearc = $('.hv-course-search').html();
	                $('.searchArea').html(getMobileSearc);
	                $('.hv-course-search').html("");
	                var getFilterIndustry = $('#FilterType .filters-list').html();
	                $('.FilterAreaType').html(getFilterIndustry);
	                $('#FilterType .filters-list').html("");
	                var getFilterCountry = $('#FilterRegion .filters-list').html();
	                $('.FilterAreaRegion').html(getFilterCountry);
	                $('#FilterRegion .filters-list').html("");
	                var getFilterProduct = $('#FilterCountry .filters-list').html();
	                $('.FilterAreaLocation').html(getFilterProduct);
	                $('#FilterCountry .filters-list').html("");
	                var getResFilters = $('.hv-course-filters.dtop').html();
	                $('.topFilter .resource-filters').html(getResFilters);
	                $('.hv-course-filters.dtop').html("");
	            } else {
	                if (!hds.trainingSearch.isEmpty($('.hv-course-search'))) {
	                    $('.hv-course-search').html($('.searchArea').html());
	                    $('.searchArea').html("");
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaType'))) {
	                    $('#FilterType .filters-list').html($('.FilterAreaType').html());
	                    $('.FilterAreaType').html("")
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaRegion'))) {
	                    $('#FilterRegion .filters-list').html($('.FilterAreaRegion').html());
	                    $('.FilterAreaRegion').html("")
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaLocation'))) {
	                    $('#FilterCountry .filters-list').html($('.FilterAreaLocation').html());
	                    $('.FilterAreaLocation').html("")
	                }	                
	                if (!hds.trainingSearch.isEmpty($('.topFilter .resource-filters'))) {
	                    $('.hv-course-filters.dtop').html($('.topFilter .resource-filters').html());
	                    $('.topFilter .resource-filters').html("")
	                }
	            }
	            hds.trainingSearch._retainFilters();
	        },
	        isEmpty: function(el) {
	            return !$.trim(el.html())
	        },
			showMobileOverlay: function() {
	            hds.trainingSearch.buildMobileNavigation();
	            $('.overlayBox').css({
	                display: 'block',
	                left: 0,
	                top: 0,
	                position: 'absolute'
	            });
	            $('.bgCover').css({
	                display: 'block',
	                width: $(window).width(),
	                height: ' 100%',
	            });
	            $('.bgCover').css({
	                opacity: 0
	            }).animate({
	                opacity: 1
	            });                        
	            hds.trainingSearch.adjustOverlayHeight();
	        },
	        adjustOverlayHeight:function(){
	            var pgHeight = $(window).outerHeight(),
	                otHeight = $('.overlayTop').outerHeight(),
	                omHeight = $('.filtrSideBar').outerHeight(),
	                obHeight = $('.FilterAreaBtnPop').outerHeight();

	                omHeight = pgHeight - (otHeight + obHeight);
	                $('.filtrSideBar').css({'height': omHeight - 48});
	                $('.filter-mob-list').css({'height': omHeight - 48});
	        },
	        closeOverLayPopup: function() {
	            var actualWidth = $(window).width() + 17;                
	            if (actualWidth > 991) {
	                if (!hds.trainingSearch.isEmpty($('.searchArea'))) {
	                    $('.hv-course-search').html($('.searchArea').html());
	                    $('.searchArea').html("");
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaType'))) {
	                    $('#FilterType .filters-list').html($('.FilterAreaType').html());
	                    $('.FilterAreaType').html("")
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaRegion'))) {
	                    $('#FilterRegion .filters-list').html($('.FilterAreaRegion').html());
	                    $('.FilterAreaRegion').html("")
	                }
	                if (!hds.trainingSearch.isEmpty($('.FilterAreaLocation'))) {
	                    $('#FilterCountry .filters-list').html($('.FilterAreaLocation').html());
	                    $('.FilterAreaLocation').html("")
	                }
	                if (!hds.trainingSearch.isEmpty($('.topFilter .resource-filters'))) {
	                    $('.hv-course-filters.dtop').html($('.topFilter .resource-filters').html());
	                    $('.topFilter .resource-filters').html("")
	                }
	                $('.bgCover').hide();
	                hds.trainingSearch._retainFilters();
	                //$('.resource-filters.dtop').show();
	            }else{
	                $('.bgCover').hide();
	                //$('.resource-filters.dtop').hide();
	            }
	        },
	        _retainFilters:function(){
	            $('input[name="csFunction"]').each(function(){
	                if($(this).hasClass('filter-retain')){
	                    $(this).prop('checked', true);
	                }
	            })
	        },
	        addRemoveFilters:function(){
	            var arrVal = [];
	            $('input[name="csFunction"]').removeClass('filter-retain');
	            $('input[name="csFunction"]:checked').each(function() {
	                $(this).addClass('filter-retain');
	                arrVal.push($(this).attr('id'));
	            });
	            hds.trainingSearch.getCheckboxValue(arrVal);
	        },
	        addKeywordSearchTag: function(checkBoxValue, tag) {
	            $('#searchTag .keyword').html('');
	            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeKeyword'>&nbsp;</span></span>");
	            /* store the value in elment data so we can reference back to checkbox */
	            $newTag.data('value', checkBoxValue);
	            $(tag).append($newTag);
	        },
	        getCheckboxValue: function(arg1) {
	            if (arg1 != 0) {
	                var newHTML = $.map(arg1, function(value) {
	                    var checkBoxVal = $("#" + value).attr('id');
	                    var checkBoxText = $("#" + value).siblings('label').text();
	                    return $("<span class='filterKeyword' data-match=" + checkBoxVal + ">" + checkBoxText + "<span class='closeFilter'>&nbsp;</span></span>");
	                });
	                $('#filterTag .label').css({
	                    'display': 'inline'
	                });
	                $('#filterTag .keyword-filter').html(newHTML);
	            } else {	                
                    $('#filterTag .keyword-filter').html('');
                    $('#filterTag .label').css({
                        'display': 'none'
                    });
	            }
	        },
	        returnCheckStatus:function(){
	            var $typeFilters = $('.FilterTypeList input.filters').filter(':checked'),
                    $regionFilters = $('.FilterRegionList input.filters').filter(':checked'),
                    $locFilters = $('.FilterLocationList input.filters').filter(':checked');

	                return ($typeFilters.length + $regionFilters.length + $locFilters.length);
	        },
	        showHideFilters:function(){
                var clearSwitch = this.options.clearSwitch;
                if ($(window).width() > 991) {
                    var deviceAgent = navigator.userAgent.toLowerCase();
                    var agentID = deviceAgent.match(/(ipad)/);      
                    if (agentID) {
                        if($('.sfheight').height() > 22){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.show-all-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});                            
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show')); 
                            $('.sfilter').css({'display':'inline-block'});
                            var $checkStatus = hds.trainingSearch.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                                if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }else{
                        if($('.sfheight').height() > 22){        
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').addClass('add-filters');
                            $(clearSwitch).css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});
                            $('.sfilter').removeClass('add-filters').removeAttr('style');
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            var $checkStatus = hds.trainingSearch.returnCheckStatus();
                            if($checkStatus != 0){
                                $(clearSwitch).css({'display':'inline'});
                            }else{
                                if($('#searchTag .keyword').html()!=''){
                                    $(clearSwitch).css({'display':'inline'});
                                }else{
                                    $(clearSwitch).css({'display':'none'});
                                }
                            }
                        }
                    }
                }else{
                    $(clearSwitch).css({'display':'none'});
                    $('.sfilter').removeClass('add-filters');
                    var $checkStatus = hds.trainingSearch.returnCheckStatus();
                    if($checkStatus != 0){
                        if(mFilterCheck == false){
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});
                            mFilterCheck = true;
                        }else{
                            if($('.sfheight').height() > 22){
                                $('.show-all-filters').text($('#cta-filters').data('hide'));
                                $('#cta-filters').css({'display':'inline-block'});
                                $('.sfilter').css({'display':'inline-block'});
                            }
                        }                        
                    }else{
                        if($('#searchTag .keyword').html()!=''){              
                            $('.show-all-filters').text($('#cta-filters').data('show'));              
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});
                        }else{
                            $('#cta-filters').css({'display':'none'});
                        }
                    }
                }
        	},
        	aContainsB: function(a, b) {
			    return a.indexOf(b) >= 0;
			},
			checkSelectedNav: function(){
				var qURL = window.location.href;
	            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
	            var kword = parms["keyword"];
	            var loc = parms["location"];
	            var type = parms["type"];

	            var lcArray,
	            	tcArray;

	            if(kword == undefined){
	            	kword = '';
	            }
	            kword = kword.toLowerCase();
	            if(kword != ''){
	            	$('#resSearch').val(kword);
	            	$('.clearSearchIcon').show();
	            	$('.searchResource').trigger('click');
	            }

	            if(loc != undefined){
	                lcArray = loc.split(',');
	                $.each(lcArray,function(i){
	                    $('.FilterLocationList input[name="csFunction"]').each(function(){
	                        var inputId = $(this).attr('id');
	                        if(inputId == lcArray[i]){
	                            $(this).trigger('click');
	                        }
	                    })
	                })
	                $('#showType, #showRegion, #showLocation').trigger('click');
	            }

	            if(type != undefined){
	                tcArray = type.split(',');
	                $.each(tcArray,function(i){
	                    $('.FilterTypeList input[name="csFunction"]').each(function(){
	                        var inputId = $(this).attr('id');
	                        if(inputId == tcArray[i]){
	                            $(this).trigger('click');
	                        }
	                    })
	                })
	                $('#showType, #showRegion, #showLocation').trigger('click');
	            }

	            $('.career-loading').remove();
			},
			insertRegionSessionLocation: function(){
				var $allCheckedPFilters = $('.FilterRegionList input.filters').filter(':checked');
				if ($allCheckedPFilters.length > 0) {
				    $('.FilterLocationList li').hide();
				    var checkedPVals = $.map($allCheckedPFilters, function(el) {
				        return el.id
				    });
				    $.grep(checkedPVals, function(m1,mval){
				        $('.FilterLocationList li').each(function(){
				            var reg = $(this).find('input[name="csFunction"]').data('region');
				            reg = 'training-' + reg;
				            if(reg === m1){
				                $(this).css({'display':'block'});
				            }
				        })
				    })
				    hds.careerPassionList.removeDuplicateList('.FilterLocationList li');
				    $('.FilterLocationList li').find('input#virtual').closest('li').show();
                }else{
                	$('.FilterLocationList li').show();
                }
	        },
			checkSelectBox: function(){
				var $allCheckedPFilters = $('.FilterRegionList input.filters').filter(':checked');
				if ($allCheckedPFilters.length == 0) {
					$('.FilterLocationList li').show();
				}
				var af = [];
                $('#filterTag .keyword-filter .filterKeyword').each(function(){
                	af.push($(this).data('match'));
                })
                $('input[name="csFunction"]').prop('checked', false);
                if(af == ''){
                	hds.trainingSearch.insertRegionSessionLocation();
                }else{
	                $.grep(af, function(m1,mval){
	                	$('input[name="csFunction"]').each(function(){
	                		if($(this).attr('id') == m1){
	                			$(this).prop('checked', true);
	                			if($(this).attr('id') == 'training-apac' || $(this).attr('id') == 'training-emea' || $(this).attr('id') == 'training-amer' || $(this).attr('id') == 'training-virtual'){
	                				hds.trainingSearch.insertRegionSessionLocation();
	                			}
	                		}
	                	})		                	
	                })
            	}
			},
			bindEventSelectors: function(){
				$(window).on('load', function(){					
					hds.trainingSearch.searchCoursesList();					
				});

				$('input[name="csFunction"]').prop('checked', false);
				resultNotFound = $('#hv-course-error').html();
				hvInputPlaceHolder = $('#resSearch').attr('placeholder');
				hvsearchpholder = $('#hv-search-pholder').text();
				var deviceAgent = navigator.userAgent.toLowerCase();
            	var nDevices = deviceAgent.match(/(iphone|ipad|android)/);
				if (!nDevices) {
                	$(window).resize(function() {
                		$('.course-scroll').each(function(){
                			var element = $(this).jScrollPane(); 
	                    	var api = element.data('jsp');
	                    	api.destroy();
                		})                		
	                    $('.filters-section').hide();	                    
	                    $('body').find('.mobFiltersBG').remove();
	                    $('body').removeClass('overflow-mobile');
	                    var actualWidth = $(window).width() + 17;                
	                    if (actualWidth > 991) {
	                        hds.trainingSearch.closeOverLayPopup();
	                    }else{
	                        $('.bgCover').hide();
	                    }
	                    $('.hv-course-filters .filterby').removeClass('active');
                    	$('.resource-filters.dtop .filterby').removeClass('active');
	                });
	            }
	            $( window ).on( "orientationchange", function( event ) {
	                $('.bgCover').hide();
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                hds.trainingSearch.closeOverLayPopup();               
	                
	                var deviceAgent = navigator.userAgent.toLowerCase();
	                var agentID = deviceAgent.match(/(ipad)/);      
	                if (agentID) {
	                    var $checkStatus = hds.trainingSearch.returnCheckStatus();
	                    if (window.matchMedia("(orientation: landscape)").matches) {
	                        setTimeout(function(){
	                            $('#showType, #showRegion, #showLocation').trigger('click');
	                        }, 1000);
	                    }else{
	                        if($checkStatus != 0){
	                            $('.show-all-filters').text($('#cta-filters').data('show'));
	                            $('#cta-filters').css({'display':'inline-block'});
	                            $('.sfilter').css({'display':'none'});   
	                        }
	                    }
	                    var element = $('.course-scroll').jScrollPane(); 
                    	var api = element.data('jsp');
                    	api.destroy();
	                }                    
	            });
	            $(document).on('click','.hvc-load-more .lmore', function() {
					if($('.cfilter').length > 0){
						var size_li = $(".course-box.cfilter").size();
						var t = $(".course-box.cfilter:visible").size();
						hvc= (t+15 <= size_li) ? t+15 : size_li;
						$('.course-box.cfilter:lt('+hvc+')').slideDown('fast','linear');
						setTimeout(function(){
							var cust_vi = $(".course-box:visible").size();
							if(size_li == cust_vi){
								$('.hvc-load-more .lmore').hide();
								$('.hvc-load-more .vall').hide();
							}
						},300);
						if (size_li <= hvc  ) {
							$('.hvc-load-more .lmore').hide();
							$('.hvc-load-more .vall').hide();
						}else{
							if(size_li != $(".course-box:visible").size()){
								$('.hvc-load-more .vall').show();
							}else{
								$('.hvc-load-more .vall').hide();
							}
							$('.hvc-load-more .lmore').show();		                    
						}
					}else{
						var size_li = $(".course-box").size();            			
						hvc= (hvc+15 <= size_li) ? hvc+15 : size_li;
						$('.course-box:lt('+hvc+')').slideDown('fast','linear');
						setTimeout(function(){
							var cust_vi = $(".course-box:visible").size();
							if(size_li == cust_vi){
								$('.hvc-load-more .lmore').hide();
								$('.hvc-load-more .vall').hide();
							}
						},300);
						if (size_li <= hvc  ) {
							$('.hvc-load-more .lmore').hide();
							$('.hvc-load-more .vall').show();
						}else{
							$('.hvc-load-more .lmore').show();
							$('.hvc-load-more .vall').show();
						}
					}			        
				});
			    	            
                /* Mobile DOM elements events binding */
                $(document).on('click', '#showType, #showRegion, #showLocation', function(event) {
					hds.trainingSearch.addRemoveFilters();
	                hds.trainingSearch.showHideFilters();
	                var $typeFilters = $('.FilterTypeList input.filters').filter(':checked'),
	                    $regionFilters = $('.FilterRegionList input.filters').filter(':checked'),
	                    $locFilters = $('.FilterLocationList input.filters').filter(':checked');
	                var txtVal = $.trim($('#resSearch').val());
	                	txtVal = txtVal.toLowerCase();
	                if(txtVal == undefined){
	                	txtVal = '';
	                }

	                if ($typeFilters.length > 0) {
	                    var checkTypeVal = $.map($typeFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if ($regionFilters.length > 0) {
	                    var checkRegionVal = $.map($regionFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if ($locFilters.length > 0) {
	                    var checkLocVals = $.map($locFilters, function(el) {
	                        return el.id
	                    });
	                }
	                if(checkRegionVal != undefined || checkRegionVal != null){
	                	var regVal = [];
						$.each(checkRegionVal, function(i, val){
							var r =  checkRegionVal[i];
							regVal.push(r.substr(r.lastIndexOf('-')+1));
						})
						checkRegionVal = regVal;
	                }

	                $('.filters-section').hide();
	                $('.hv-course-filters.dtop a.filterby').removeClass('active');
	                $('#filterTag .keyword-filter').show();                   
	                
	                hds.trainingSearch.getSelectedFilters(checkTypeVal, checkRegionVal, checkLocVals, txtVal);
	                hds.trainingSearch.lmSecondAttempt();	                
					event.preventDefault();
				})
				$(document).on('click', '.hv-filters-box .filter-toggle', function() {
					$('.hv-course-filters' ).slideToggle();
					if(!$(this).find('.arrow-right').hasClass('arrow-down')){
						$(this).find('.arrow-right').addClass('arrow-down');
					}else{
						$(this).find('.arrow-right').removeClass('arrow-down');
					}
				});

				/* Filters By Industry/Country/Product */
	            var a = $('.hv-course-filters.dtop').find('a');
	            $(document).on('click', '.hv-course-filters.dtop .filterby', function(e) {
	                e.preventDefault();
	                hds.trainingSearch.checkSelectBox();
	                if ($(window).width() > 768) {
	                    var filterId = $(this).data('refilter');
	                    var $this = $(this),
	                        speed = 500;
	                    if ($this.hasClass('active') === true) {
	                        $this.removeClass('active');
	                        $('.filters-section').hide();
	                        $('.hv-course-filters.dtop .filterby').removeClass('active');

	                    } else if (a.hasClass('active') === false) {
	                        $('.filters-section').hide();
	                        $('.hv-course-filters.dtop .filterby').removeClass('active');
	                        $this.addClass('active');
	                        $('#' + filterId).show();
	                    } else {
	                        a.removeClass('active');
	                        $('.filters-section').hide();
	                        $('.hv-course-filters.dtop .filterby').removeClass('active');
	                        $this.addClass('active');
	                        $('#' + filterId).show();
	                    }                  
	                }
	                $('#'+ $(this).data('refilter') + ' .course-scroll').jScrollPane();
                    $('body').scrollTo('.hv-filters-box',{duration:'slow', offsetTop : '50'});
	                e.stopPropagation();
	            });

	            $(document).on('click', '.topFilter .filterby', function(e) {
	                e.preventDefault();
	                if(!$(this).hasClass('active')){
	                	var filterIdMob = $(this).index();
	                    filterIdMob = filterIdMob - 1;
	                    if ($(this).hasClass('active')){
	                        $(this).removeClass('active');
	                        $('.filter-mob-list').hide();
	                    }else{
	                        $('.topFilter .filterby').removeClass('active');
	                        $('.filter-mob-list').hide();
	                        $(this).addClass('active');
	                        $('.filter-mob-list').eq(filterIdMob).show();
	                    }
	                }
	                e.stopPropagation();
	            })

	            $(document).on('click', '.launchLink a', function(event) {
	                $('body').append('<div class="mobFiltersBG"></div>');
	                $('body').addClass('overflow-mobile');
	                setTimeout(function(){
	                    if ($(window).width() <= 991) {                   
	                        if($('.searchArea').html() == ""){
	                            hds.trainingSearch.showMobileOverlay();
	                        }else{
	                            $('.bgCover').css({
	                                display: 'block',
	                                width: $(window).width(),
	                                height: ' 100%',
	                            });
	                        }
	                        if($('#searchTag .keyword').html() != ""){
	                        	$('.searchArea .search-box #resSearch').val($.trim($('#searchTag .keyword').text()));
	                        }
	                    }
	                    $('.filters-section').hide();
	                    $('.topFilter .resource-filters').removeAttr('style');
	                    var h1 = $('.topFilter .resource-filters').outerHeight();
		                $('.topFilter .resource-filters').css({'min-height': h1 + 3});
	                    $('.topFilter .resource-filters .filterby').removeClass('active');
	                    $('.topFilter .resource-filters .filterby').eq(0).addClass('active');
						$('.filter-mob-list').css({'display':'none'});
						$('.filter-mob-list').eq(0).css({'display':'block'});
	                }, 1000);
	                event.preventDefault();
	            });
	            $(document).on('click', '.closeOverlay', function(event) {
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if(($('#filterTag .keyword-filter').html() == '') && ($('#searchTag .keyword').html() == '')){
	                    $('.clear-results').trigger('click');
	                    $('.bgCover').hide();                    
	                }else{
	                    $('.bgCover').hide();
	                }                                
	                event.preventDefault();
	            });

	            $(document).on('click', '.clear-results', function() {
	                $('#filterTag .keyword-filter').html('');
	                $('.courses-list .row-centered').find('.no-matched-result').remove();
	                $("input[name='csFunction']").removeAttr('checked').removeClass('filter-retain');
	                $("#resSearch").val('');
	                $('#filterTag .label').css({
	                    'display': 'none'
	                });
	                $('#searchTag .keyword').html('');
	                $('#searchTag .label').css({'display': 'none'});
	                $('.clearSearchIcon').css({'display': 'none'});	                
	                $('#cta-filters').css({'display':'none'});
	                $('.tagList .sfheight a.clear-results').css({'display':'none'});
	                hds.trainingSearch.checkSelectBox();
	                mFilterCheck = false;
	                $('body').scrollTo('.hv-our-courses',{duration:'slow', offsetTop : '50'});
	                $('#showType, #showRegion, #showLocation').trigger('click');
	                $('.hvc-load-more .vall').show();
	            });

	            $(document).on('click', '#mobShowFilters', function() {
	                $('body').find('.mobFiltersBG').remove();
	                $('body').removeClass('overflow-mobile');
	                if ($(window).width() < 991) {
	                    if ($('.overlayBox').is(':visible')) {
	                        var txtVal = $.trim($('#resSearch').val().toLowerCase()),
	                            searchVal = txtVal;
	                            if(txtVal.length > 0){
                                    $('#searchTag .label').css({
                                        'display': 'inline'
                                    });
                                    $('#resSearch').addClass('filter-retain');
                                    hds.trainingSearch.addKeywordSearchTag(txtVal, '#searchTag .keyword');
                                    $('#showType, #showRegion, #showLocation').trigger('click');
	                                $('.bgCover').hide();                    
	                            }else {
	                            	$('#searchTag .label').css({
                                        'display': 'none'
                                    });
	                            	$('#searchTag .keyword').html('');
	                                $('#showType, #showRegion, #showLocation').trigger('click');
	                                $('.bgCover').hide();
	                            }
	                    }
	                    $('body').scrollTo('.hv-search-courses',{duration:'slow', offsetTop : '50'});
	                }
	            })

	            $(document).on('click', '.closeFilter', function() {               
	                var dataMatch = $(this).parent().data('match');
	                if (dataMatch) {
	                    $('input[name="csFunction"]:checked').each(function() {
	                        if ($(this).attr('id') == dataMatch) {
	                            $(this).removeAttr('checked').removeClass('filter-retain');
	                        }
	                    })
	                    $(this).parent().fadeOut('slow');
	                    $(this).parent().remove();
	                    if($('#filterTag .keyword-filter').html() == ""){
	                        $('#filterTag .label').css({'display': 'none'});
	                    }
	                    $('#showType, #showRegion, #showLocation').trigger('click');
	                    if($('#filterTag .keyword-filter').html() == "" && $('#searchTag .keyword').html() == ""){
	                        $('#filterTag .label').css({'display': 'none'});
	                        $('.hvc-load-more .vall').show();
	                    }else{
	                    	$('.hvc-load-more .vall').hide();
	                    }
	                }
	                var $checkStatus = hds.trainingSearch.returnCheckStatus();
	                if($checkStatus == 0){
	                    if($('#searchTag .keyword').html()==''){
	                        $(".course-box").removeClass('cfilter');
	                    }
	                }
	                hds.trainingSearch.checkSelectBox();            
	            })

	            $(document).on('click', '.closeKeyword', function() {
	                searchVal = '';
                    $("#resSearch").val('');                    
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    $('#searchTag .label').css({
                        'display': 'none'
                    });
                    $('#searchTag .keyword').html('');
                    $('.clearSearchIcon').hide(); 
                    hds.trainingSearch.checkSelectBox();                   
                    if($('#resSearch').val() == ""){
                        var $checkStatus = hds.trainingSearch.returnCheckStatus();
                        $('#showType, #showRegion, #showLocation').trigger('click');
                        if($checkStatus == 0){                            
                            $('.tagList .sfheight a.clear-results').css({'display':'none'});
                            $('.hvc-load-more .vall').show();
                        }else{
                        	if($checkStatus == 0){
                        		$('.hvc-load-more .vall').show();
                        	}else{
                        		$('.hvc-load-more .vall').hide();
                        	}
                        }
                    }
	            })

	            $(document).on('click','.show-all-filters', function(){
	                var showText = $('#cta-filters').data('show'),
	                    hideText = $('#cta-filters').data('hide');
	                var $this = $(this);
	                if ($this.text() === hideText) {
	                    $this.text(showText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 22 , 'display':'inline-block'});
	                    }else{
	                        $('.sfilter').css({'display':'none'});
	                    }                    
	                    $('#cta-filters').removeClass('rem-style');
	                } else {
	                    $this.text(hideText);
	                    if ($(window).width() > 991) {
	                        $('.sfilter').css({'height': 'auto', 'display':'inline'});    
	                    }else{                        
	                        if ($(window).width() < 480) {
	                            $('.sfilter').css({'display':'block'});
	                        }else{
	                            $('.sfilter').css({'display':'inline'});
	                        }                        
	                    }
	                    $('.tagList .sfheight a.clear-results').css({'display':'none'});                      
	                    $('#cta-filters').addClass('rem-style');
	                }
	            })

	            $(document).on('click', '.searchResource', function(event) {
	            	var qURL = window.location.href;
					var parms = hds.resourceLib._getParmsFromURLHash(qURL);
					var kword = parms["keyword"];
	            	hds.trainingSearch.checkSelectBox();
	            	var actualWidth = $(window).width() + 17;                
            		if (actualWidth > 991 || kword) {
	                    var txtVal = $.trim($('#resSearch').val().toLowerCase());
	                    if(txtVal.length > 0){
	                    	$('#searchTag .label').css({
                                'display': 'inline'
                            });
                            hds.trainingSearch.addKeywordSearchTag(txtVal, '#searchTag .keyword');
							$('#showType, #showRegion, #showLocation').trigger('click');
	                    }else{
	                    	$('#resSearch').attr('placeholder',hvsearchpholder);
	                    }	                    
	                }
	                event.preventDefault();
	            });

	            $(document).on('keyup', '#resSearch', function(event) {
	                var value = $.trim($(this).val());
	                if (value.length > 0) {
	                    $('.clearSearchIcon').show();
	                } else {
	                    $('.clearSearchIcon').trigger('click');
	                    $('.clearSearchIcon').hide();
	                }
	                event.preventDefault();
	            });
	            $(document).on('keypress', '#resSearch', function(event) {                
	                var keycode = (event.keyCode ? event.keyCode : event.which);
	                if (keycode == 13) {
	                    event.preventDefault();                 
	                    $('.searchResource').trigger('click');
	                }                              
	            });
	            $(document).on('click', '.clearSearchIcon', function(event) {
	                $(this).hide();
                    $("#resSearch").val('').focus();
                    $(".closeKeyword").trigger('click');
	            });
	            $(document).on('click', '.FilterRegionList input[name="csFunction"]', function() {
	            	if($(window).width() <= 991){
	            		hds.trainingSearch.insertRegionSessionLocation();
	            	}
				})
				$(document).on('click', '.no-matched-result .vcourse', function(){
					var filter = $(this).data('filter');
					window.location = window.location.pathname + '#location=' + filter;
					setTimeout(function(){
						window.location.reload();
					}, 1000);    
				})
	            $(document).click(function(e) {	                
	                if (!$(e.target).is('.resource-search, .resource-search *')) {
	                    $('#resSearch').attr('placeholder',hvInputPlaceHolder);
	                }
	                if (!$(e.target).is('.filters-section, .filters-section *, .filter-mob-list, .filter-mob-list *')) {
	                    $(".filters-section").hide();
	                    if ($(window).width() > 991) {
	                    	$(".filter-mob-list").hide();
	                    }
	                    $('.filterby').removeClass('active');
	                }              
	            });				
			}
		}
		
		/* Courses Detail Page */
		hds.courseDetail = {
			init: function(options){
				var defaults = {
	                paginationWrapper: '#sessionContainer',
	                myPageName: "#page-",
	                itemsPerPage: 4
	            }
	            this.options = $.extend(defaults, options);
				hds.courseDetail.bindEventSelectors();				
			},
	        removeDuplicates: function(arr){
			    var unique_array = [];
			    for(var i = 0;i < arr.length; i++){
			        if(unique_array.indexOf(arr[i]) == -1){
			            unique_array.push(arr[i])
			        }
			    }
			    return unique_array
			},
			dateFormat: function(date){
			    var res = date.split("-"); // turn the date into a list format (Split by / if needed)
			    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];  
			    var days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
			    return months[res[1]-1] + ' ' + days[res[2]-1];
			},
			timeFormat: function(time){
				var hrs = time.substr(0, 5);
			    var n = time.lastIndexOf(' ');
			    var ampm = time.substring(n+1, time.length);
			    return hrs + ' ' + ampm;
			},
			setPagination: function() {
	            var paginations = this.options.paginationWrapper;
	            var myPageName = this.options.myPageName;
	            var items = $('.schedule-overlay .schedule-course-list .schedule-course-item.cfilter');
	            var numItems = items.length;
	            var perPage = this.options.itemsPerPage;

	            if (numItems > perPage) {
	                $(paginations).pagination('destroy');
	                items.slice(perPage).hide();
	                $(paginations).pagination({
	                    items: numItems,
	                    itemsOnPage: perPage,
	                    cssStyle: "light-theme",
	                    onPageClick: function(pageNumber) {
	                        var showFrom = perPage * (pageNumber - 1);
	                        var showTo = showFrom + perPage;
	                        items.hide().slice(showFrom, showTo).show();
	                        hds.courseDetail.processRowColors();
	                        hds.courseDetail.scheduleOverlayHeight();
	                        return false;
	                    }
	                });
	            }
	        },
	        processRowColors: function(){
				$(".schedule-course-item").removeClass('even').removeClass('odd');
				$(".schedule-course-item:visible:even").addClass('even');
				$(".schedule-course-item:visible:odd").addClass('odd');
	        },
			coursesDetailPage: function(){
				var cflag = false;
				var ctype = "";
				var cta1Label = "";
				var aRegion = [];
				var rHtml = [];
				var ht1 = '', ht2 = '', ht3 = '';
				var h1Count = 0, h2Count = 0, h3Count = 0;
				var qURL = window.location.href;
				var parms = hds.resourceLib._getParmsFromURLHash(qURL);
				var scount = 0;
				var lspFlag = false;
				var dMethod = '';
				var ctaLabel = $.trim($('.fview-detail').text());
				var imgPath = $.trim($('.fcourse-img-path').text());
				var course = parms["course"];
				ht1olay = '', ht2olay = '', ht3olay = '';
				if(course == undefined){
					course = '';
				}
				course = course.toLowerCase();

				/* Random Images Collection */
				var catList = $('.fcourse-allcat').text().toLowerCase();
				var catListArr = catList.split('~');
				var catarr = [];
				$.each(catListArr, function(i, j){
					a = catListArr[i].split(' ').join('-');
					catarr.push(a.replace(/,/g, ""));
				});
				var catListCt = $('.fcourse-cat-count').text().toLowerCase();
					catListCt = catListCt.split('~');

				var catImg1 = parseInt(catListCt[0]), 
					catImg2 = parseInt(catListCt[1]),
					catImg3 = parseInt(catListCt[2]),
					catImg4 = parseInt(catListCt[3]),
					catImg5 = parseInt(catListCt[4]),
					catImg6 = parseInt(catListCt[5]),
					catImg7 = parseInt(catListCt[6]);
				var catCount1 = 0, catCount2 = 0, catCount3 = 0, catCount4 = 0, catCount5 = 0, catCount6 = 0, catCount7 = 0;
				/* Random Images Collection */

				$.ajax({
				    url: '/bin/services/alldata?r='+Math.random()+'&cid=' + course,
				    type: 'GET',
				    contentType: "application/json",
				    dataType: "json",
				    success: function( response, textStatus, xhr ) {
				        var jData = xhr.responseText;
				        var jo = $.parseJSON(jData);				        
				    	$.each(jo.courses, function(k, val1){
				            if(course == val1.objectId){
				            	if(val1.courseType == "self-paced"){
									var fcflag = true;
									lspFlag = true;
			    					$.each(jo.courses, function(o, val13){
			    						var cobjId = val13.childObjectIds;
			    						if(cobjId != undefined && cobjId != ''){
						    				var str = cobjId.split('~');
							    			$.each(str, function(p, val14){
							    				if(str[p] == course && fcflag == true){
							    					/* Get Child Object Category */			            	
									            	var jcat = val13.category;
													var fcat = [];
													var catimg = '';
													if(jcat != undefined && jcat != ''){
														if(jcat.indexOf('~') != -1){
															var catlist1 = jcat.split('~');
															catimg = $.trim(catlist1[0].substr(0, catlist1[0].indexOf('>')).toLowerCase());
														}else{
															catimg = jcat.toLowerCase();
														}
														catimg = catimg.split(' ').join('-');
														catimg = catimg + '-1';
													}else{
														catimg = 'default-category-img';
													}
													/* Get Child Object Category */

							    					var cUrl = $.trim($('.fcourse-url').text()) + val13.objectId;
							    					$('.training-tile .train-unit-tile').css({'display':'block'});
							    					$('.training-tile .train-unit-tile .popular-item .pop-content h4').attr('data-mkt-cta-title',val13.title).text(val13.title);
													$('.training-tile .train-unit-tile .popular-item .pop-content .image-cite').text($('.fcoursetype3').text());
													$('.training-tile .train-unit-tile .popular-item a.card-link1').attr({'href':cUrl, 'data-id':val13.objectId});
													$('.training-tile .train-unit-tile .popular-item .pop img').attr({'src':imgPath + catimg + '.jpg'});
													fcflag = false;
							    				}
							    			})
							    		}
			    					})
			    				}
			    				if(val1.courseType == "library"){
									lspFlag = true;
			    					/* Child Object Courses */
			    					var cobjId = val1.childObjectIds;						    		
						    		if(cobjId != undefined && cobjId != ''){
						    			var str = cobjId.split('~');
						    			$.each(str, function(m, val11){

						    				/* Course Library Landing Page */
						    				var childHTML = '';
						    				$.each(jo.courses, function(n, val12){
						    					if(str[m] == val12.objectId){
						    						var jcat = val12.category;
													var fcat = [];
													var catimg = '';
													if(jcat != undefined && jcat != ''){
														if(jcat.indexOf('~') != -1){
															var catlist1 = jcat.split('~');
															catimg = $.trim(catlist1[0].substr(0, catlist1[0].indexOf('>')).toLowerCase());
														}else{
															catimg = jcat.toLowerCase();
														}								
														catimg = catimg.split(' ').join('-');

														$.each(catarr, function(j1, val1){
															if(catarr[j1] == catimg && j1 == 0){
														        catCount1 = catCount1 + 1;
														        if(catCount1 == (catImg1 + 1)){
														        	catCount1 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount1 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 1){
														        catCount2 = catCount2 + 1;
														        if(catCount2 == (catImg2 + 1)){
														        	catCount2 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount2 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 2){
														        catCount3 = catCount3 + 1;
														        if(catCount3 == (catImg3 + 1)){
														        	catCount3 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount3 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 3){
														        catCount4 = catCount4 + 1;
														        if(catCount4 == (catImg4 + 1)){
														        	catCount4 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount4 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 4){
														        catCount5 = catCount5 + 1;
														        if(catCount5 == (catImg5 + 1)){
														        	catCount5 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount5 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 5){
														        catCount6 = catCount6 + 1;
														        if(catCount6 == (catImg6 + 1)){
														        	catCount6 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount6 + '.jpg';
														    }
														    if(catarr[j1] == catimg && j1 == 6){
														        catCount7 = catCount7 + 1;
														        if(catCount7 == (catImg7 + 1)){
														        	catCount7 = 1;
														        }
														        catimg = imgPath + catimg + '-' + catCount7 + '.jpg';
														    }
														})

													}else{
														catimg = imgPath + 'default-category-img.jpg';
													}
													var cUrl = $.trim($('.fcourse-url').text()) + val12.objectId;
													var vdCta = $.trim($('.fview-detail').text());
													if(val12.searchable != 'false'){
														childHTML = '<div class="course-box col-centered" data-mkt-id="panel" data-mkt-name="panel-overview-library courses"><a href="'+ cUrl +'" target="_self" class="card-link1" data-id="'+ val12.objectId +'" data-mkt-cta="panel_cta" data-mkt-cta-type="link"><div class="pop"><img src="'+ catimg +'" alt="'+ val12.title +'"></div><h3 data-mkt-cta-title="'+ val12.title +'">'+ val12.title +'</h3></a></div>';
													}else{
														childHTML = '<div class="course-box col-centered" data-id="'+ val12.objectId +'" data-mkt-id="panel" data-mkt-name="panel-overview-library courses"><div class="card-link1"><div class="pop"><img src="'+ catimg +'" alt="'+ val12.title +'"></div><h3 data-mkt-cta-title="'+ val12.title +'">'+ val12.title +'</h3></div></div>';
													}						    						
						            				$('.course-library .description').append(childHTML);
						    					}
						    				})
						    				/* Course Library Landing Page */
						    			})
						    			if($('.hv-training-detail-self-paced .course-library .course-box').length > 0){
						    				$('.course-library').show();
						    				var size_li = $(".course-library .course-box").size();
									    	if(size_li > 0){
											    hvlc=parseInt($('.ffound-count').text());
											    $('.course-library .course-box:visible').hide();
											    $('.course-library .course-box:lt('+hvlc+')').show();
										    	if(size_li > 6){
										    		$('.course-library .hvc-load-more').show();
										    	}else{
										    		$('.course-library .hvc-load-more').hide();
										    	}
									    	}else{
									    		$('.course-library .hvc-load-more').hide();
									    	}	
						    			}
						    		}else{
						    			$('.training-tile .train-unit-tile').css({'display':'none'});
						    			$('.course-library').css({'display':'none'});
						    		}
						    		/* Child Object Courses */
			    				}				            	

				            	cflag = true;
				            	ctype = val1.courseType;
				            	/* Get Main Object Category */			            	
				            	var jcat = val1.category;
					    		var fcat = [];
								if(jcat != undefined && jcat != ''){
									if(jcat.indexOf('~') != -1){
										var catlist2 = jcat.split('~');
										$.each(catlist2, function(i, val){
											var a = $.trim(catlist2[i].substr(0, catlist2[i].indexOf('>')));
											fcat.push(" " + a);
										})
									}else{
										fcat = jcat;
									}									
								}
								/* Get Main Object Category */								
																
								/* Title and Breadcrumb */
								var ttxt1 = val1.title + ' | Hitachi Vantara';
					    		$('head title').text(ttxt1);
					    		$('.breadcrumb-container .breadcrumb li').last().find('span').text(val1.title);
								$('.breadcrumb-container .breadcrumb li').last().find('span').attr('itemtitle',val1.title);
				            	$('.common-hero-short-banner h1').text(val1.title);
								$('.common-hero-short-banner h1').attr('data-mkt-cta-title',val1.title);

				            	if(val1.agenda != undefined && val1.agenda != ''){
									$('.course-agenda .description').html(val1.agenda);	
									$('.course-agenda').show();	
								}
								if(val1.description != undefined && val1.description != ''){
									if(val1.description == '<br>'){
										$('.course-overview').hide();
									}else{
										$('.course-overview .description').html(val1.description);	
										$('.course-overview').show();
									}
								}
				            	if(val1.globalId != undefined && val1.globalId != ''){
									$('.course-desc .course-id').attr('data-mkt-title', $('.course-desc .course-id strong').text() + val1.globalId);
				            		$('.course-desc .course-id span').text(val1.globalId);
				            		$('.course-desc .course-id').show();
				            	}
				            	if(val1.level != undefined && val1.level != ''){
				            		$('.course-desc .course-level span').text(val1.level);
				            		$('.course-desc .course-level').show();
				            	}
				            	if(val1.audience != undefined && val1.audience != ''){
				            		$('.course-desc .course-audience span').text(val1.audience);
				            		$('.course-desc .course-audience').show();
				            	}
				            	if(val1.duration != undefined && val1.duration != ''){
				            		$('.course-desc .course-duration span, .course-enroll-bar .course-type .duration').text(val1.duration);
				            		$('.course-desc .course-duration, .course-enroll-bar .course-type .duration').show();
				            	}
				            	if(val1.deliverMethod != undefined && val1.deliverMethod != ''){
				            		$('.course-desc .course-delivery span').text(val1.deliverMethod);
				            		$('.course-desc .course-delivery').show();
				            	}
				            	if(val1.category != undefined && val1.category != ''){
				            		$('.course-desc .course-category span').text(fcat);
				            		$('.course-desc .course-category').show();
				            	}			            	

				            	if(val1.courseType == 'ilt-vilt'){
				            		$('.train-unit-tile, .course-enroll-bar').css({'display':'none'});	
				        		}
				        		if(val1.courseType == 'self-paced'){


				        			//$('.train-unit-tile').css({'display':'none'});

				        			$('.hv-train-schedule').css({'display':'none'});
				        			$('.course-enroll-bar .course-type .type').text($.trim($('.fcoursetype2').text()));
				        			$('.course-enroll-bar .enroll-cta a').attr('href', val1.enrollNowLink);
				        		}
				        		if(val1.courseType == 'library'){
				        			$('.hv-train-schedule').css({'display':'none'});
				        			$('.train-unit-tile').css({'display':'none'});
				        			$('.course-enroll-bar .course-type .type').text($.trim($('.fcoursetype3').text()));
				        			$('.course-enroll-bar .enroll-cta a').attr('href', val1.enrollNowLink);
				        		}
								if(val1.bcVideoId != undefined && val1.bcVideoId != ''){
									var videoId = val1.bcVideoId;
									var videohtml = '<div  data-mkt-id="panel" data-mkt-name="hero" class="col-lg-4 col-md-4 col-xs-12 hidden-xs hidden-xs hidden-sm video-section"><div class="video-play-desktop text-center"><a data-mkt-cta="panel_cta" data-mkt-cta-type="play icon" href="javascript:void(0);" onclick="hds.resourceLib._openvideooverlayById(' + videoId +');" target="_self" class="btn-play-video"><img src="/content/dam/public/en_us/images/common/icons/play-icon-hero-banner.png" alt=""></a></div></div>';
									$('.common-hero-short-banner .content-container').append(videohtml);
									var mvideohtml = '<div class="video-play hidden-lg hidden-md" data-mkt-id="panel" data-mkt-name="hero"><a data-mkt-cta="panel_cta" data-mkt-cta-type="play icon" href="javascript:void(0);" class="btn-play-video" onclick="hds.resourceLib._openvideooverlayById(' + videoId +');" target="_self"><span class="sprite video-play-small"></span></a></div>';
									$('.common-hero-short-banner .content-container .col-lg-8.col-md-8').append(mvideohtml);
											
								}
				            }
				        })
						if(cflag == true && ctype == "ilt-vilt"){
							if(jo.sessions !== undefined){
						        $.each(jo.sessions, function(l, val1){
						        	var cHtml = '';
						        	var cHtmlOlay = '';
						        	var dfilter = val1.sessionCountry;
						        	var dCity = val1.sessionCity;
						        	var dReg = val1.sessionRegion;
						        	var dCountry = '';
						        	if(dfilter != undefined || dfilter != null){
						        		dfilter = dfilter.split(' ').join('-').toLowerCase();
						        	}else{
						        		dfilter = '';
						        	}
						        	if(dCity != undefined || dCity != null){
						        		dCity = dCity.split(' ').join('-').toLowerCase();
						        	}else{
						        		dCity = '';
						        	}

						        	if(dCity == ''){
						        		dCountry = val1.sessionCountry + ' ';
						        	}else{
						        		dCountry = val1.sessionCity + ', ' + val1.sessionCountry + ' ';
						        	}
						        	if(val1.sessionRegion == undefined || val1.sessionRegion == ''){
						        		val1.sessionRegion = '';
						        	}

						        	if(course == val1.courseObjectId){
						        		scount = scount + 1;
						        		if(val1.sessionWaitList == 'false'){
						        			cta1Label = $.trim($('.fcourse-enroll-now').text());
						        		}else{
						        			cta1Label = $.trim($('.fcourse-join-waitlist').text());
						        		}
						        		aRegion.push(val1.sessionRegion.toLowerCase())
						        		aRegion = hds.courseDetail.removeDuplicates(aRegion);
						        		aRegion = aRegion.sort();
										aRegion = aRegion.filter(function(e){return e});
						        		var sdate = hds.courseDetail.dateFormat(val1.sesstionStartDate);
						                var edate = hds.courseDetail.dateFormat(val1.sessionEndDate);
						                var stime = hds.courseDetail.timeFormat(val1.sesstionStartTime);
						                var etime = hds.courseDetail.timeFormat(val1.sessionEndTime);
						                var tzone = val1.sessionTimeZone;
						                cHtml = '<div class="col-md-4 col-sm-6"><div class="schedule-item clearfix"><a href="' + val1.sessionDeepLink + '" target="_blank"><div class="sch-country">'+ dCountry + '<span class="sch-date">'+sdate + ' - ' + edate + '</span></div><div class="sch-link">' + cta1Label +'</div></a></div></div>';
						                cHtmlOlay = '<div class="schedule-course-item cfilter clearfix" data-filter="'+ dfilter +'"><div class="col-sm-9 col-no-pad"><div class="course-dates"><span class="sdate">'+ sdate + '</span> - <span class="edate">'+ edate +'</span></div><div style="display:table; width:100%;"><div class="course-detail"><strong>Location:</strong> <span>' + dCountry + '</span></div><div class="course-detail"><strong>Time:</strong> <span>' + stime + ' - ' + etime + ' ' + tzone + '</span></div></div></div><div class="col-sm-3 col-no-pad"><div data-mkt-id="panel" data-mkt-name="panel" class="btn-square-red enroll-button"><a data-mkt-cta="panel_cta" data-mkt-cta-type="button" class="animateLink" href="'+ val1.sessionDeepLink +'" target="_blank" onclick="">'+ cta1Label +'</a></div></div></div>';

						        		if(val1.sessionRegion.toLowerCase() == 'amer'){
						        			h1Count += 1;
						        			if(h1Count < 7){
						        				ht1 = ht1 + cHtml;
						        			}
											ht1olay = ht1olay + cHtmlOlay;
						        		}
						        		if(val1.sessionRegion.toLowerCase() == 'apac'){
						        			h2Count += 1;
						        			if(h2Count < 7){
						        				ht2 = ht2 + cHtml;
						        			}
											ht2olay = ht2olay + cHtmlOlay;
						        		}
						        		if(val1.sessionRegion.toLowerCase() == 'emea'){
						        			h3Count += 1;
						        			if(h3Count < 7){
						        				ht3 = ht3 + cHtml;
						        			}
						        			ht3olay = ht3olay + cHtmlOlay;
						        		}
						        	}
						        })

						        var holay = [];
						        if(ht1olay != ''){
						        	holay.push(ht1olay);
						        }
						        if(ht2olay != ''){
						        	holay.push(ht2olay);
						        }
						        if(ht3olay != ''){
						        	holay.push(ht3olay);
						        }

						        if(ht1 != ''){
						        	rHtml.push(ht1);
						        }
						        if(ht2 != ''){
						        	rHtml.push(ht2);
						        }
						        if(ht3 != ''){
						        	rHtml.push(ht3);
						        }						
						        $.each(rHtml , function(i, val) {
						        	if($.trim(rHtml[i]) != ''){
						        		var schedule = document.createElement('div');
						        		schedule.setAttribute('data-id','schedule' + i);
						        		schedule.className = 'tabcontent hide';
								  		schedule.innerHTML = '<div class="schedule-list clearfix">'+ rHtml[i] +'<div class="clearfix"></div><div class="all-schedule-link text-center"></div>';
										$('.hv-train-schedule .content-container').append(schedule);
										if($.trim(holay[i]) != ''){
											$('div.tabcontent').eq(i).find('.all-schedule-link').show();
										}
						        	}
						        })

						        $.each(aRegion , function(i, val) {
						        	if($.trim(aRegion[i]) != ''){
							        	var list = document.createElement('li');
							        		list.className = 'edu-tablist';
									  		list.innerHTML = '<a href="javascript:void(0)" data-rel="schedule'+ i +'" data-region='+ aRegion[i] +'>'+ aRegion[i] + '</a>';
											$('.hv-train-schedule .train-schedule-tab ul').append(list);
									}
						        })
							}
						}
						if(cflag == false){
							var nt = $.trim($('.fcourse-notfound').text());
							$('.hv-course-error').css({'display':'block'});
							$('.hv-course-detail').css({'display':'none'});
							$('.common-hero-short-banner h1').text(nt);
							$('head title').text(nt + ' | Hitachi Vantara');
					    	$('.breadcrumb-container .breadcrumb li').last().find('span').text(nt);
							$('.breadcrumb-container .breadcrumb li').last().find('span').attr('itemtitle',nt);
						}
				    },
				    complete: function(){
				    	$('.career-loading').remove();	
				    	$(".hv-train-schedule .train-schedule-tab li:first a").trigger('click');
				    	if(scount == 0){
							$('.hv-course-detail .hv-train-schedule, .hv-course-detail .hv-train-schedule .train-schedule-tab').css({'display':'none'});
							$('.hv-course-detail .hv-train-schedule.top, .hv-course-detail .hv-train-schedule.top .no-session-msg').css({'display':'block'});
						}
						if(scount == 0 && lspFlag == true){
							$('.hv-course-detail .hv-train-schedule').css({'display':'none'});
						}
				    	$('.hv-train-schedule.top .content-container .tabcontent').eq(0).removeClass('hide').addClass('active');
						$('.hv-train-schedule.bottom .content-container .tabcontent').eq(0).removeClass('hide').addClass('active');
						$('.hv-train-schedule.top .train-schedule-tab ul li:first-child, .hv-train-schedule.bottom .train-schedule-tab ul li:first-child').addClass('active');
						equalColumns('.hv-training-detail-self-paced .course-library .course-box h3');
						setTimeout(function(){
							equalColumns('.schedule-item');	
							equalColumns('.hv-training-detail-self-paced .course-library .course-box .card-link1');						
						}, 1000);
				    }
				})
	        },
	        scheduleOverlayHeight: function(){
	        	var actualWidth = '';
	            if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
	                actualWidth = $(window).width();
	            }else{
	                actualWidth = $(window).width() + 17;
	            }
	            var heights = $('.schedule-overlay .schedule-course-list .schedule-course-item .col-sm-9:visible').height();
				$('.schedule-overlay .schedule-course-list .schedule-course-item .col-sm-3').css("height", heights);

	            if(actualWidth > 767) {
	            	var h1 = $('.schedule-overlay h3').outerHeight();
					var h2 = $('.schedule-overlay .filter-location').outerHeight();
					var h3 = $('.schedule-overlay .schedule-course-list').outerHeight();
					var h4 = $('.schedule-overlay #sessionContainer').outerHeight();
					var th = h1 + h2 + h3 + h4;
					$('.schedule-overlay').height(th);
	            }
	        },
	        sOverlayCountryList: function(reg){
	        	var $option = '';
		    	var $ele = '';
		    	$ele = $ele + '<option selected="selected">Location</option>';
		    	$('.soverlay-location div').each(function(){				    		
		    		var filter = $(this).data('region');
		    		var dval = $(this).data('val');
		    		var ctxt = $(this).text();
		    		if(filter == reg){	
						$option = $option + '<option value="'+ dval +'" data-region="'+ filter +'">'+ ctxt +'</option>';
					}
		    	})
				$ele = $ele + '<option value="virtual" data-region="virtual">Virtual</option>' + $option;
		    	$('.select-style select').html('').append($ele);
			},	        
			bindEventSelectors: function(){
				$(window).on('load', function(){
					hds.courseDetail.coursesDetailPage();
				});
				$(window).on('resize', function(){
					/* Schedule Overlay Height Control */
					if (/Edge/.test(navigator.userAgent) || (navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)) {
		                actualWidth = $(window).width();
		            }else{
		                actualWidth = $(window).width() + 17;
		            }
		            if(actualWidth < 768) {
		            	$('.schedule-overlay').height('auto');
		            }else{
		            	hds.courseDetail.scheduleOverlayHeight();
		            }				
				});
				/* Schedule Tab */
				$(document).on('click', '.hv-train-schedule .train-schedule-tab li a', function(event){
				    event.preventDefault();
				    var seeAll = $.trim($('.fcoursetextall').text());
				    var rel = $(this).data('rel');
				    var reg = $(this).data('region');
				    $('.hv-train-schedule').each(function(){
				    	var $ele1 = $(this).find('.train-schedule-tab ul li');
				    	$ele1.each(function(){
				    		if($(this).find('a').data('region') == reg){
				    			$ele1.removeClass('active');
				    			$(this).addClass('active')
				    		}
				    	})

				    	var $ele2 = $(this).find('.tabcontent');
				    	$ele2.each(function(){
				    		if($(this).data('id') == rel){
				    			$ele2.addClass('hide');
				    			$(this).removeClass('hide').addClass('active');
				    		}
				    	})
				    })
				    $('.schedule-item').removeAttr('style');
				    equalColumns('.schedule-item');
				    $('.all-schedule-link').remove();
				    if(reg == 'amer'){
				    	if($(ht1olay).html('.schedule-course-item').length > 6){
				    		$("div[data-id="+ rel + "]").find('.schedule-list').append('<div class="all-schedule-link text-center"><a href="javascript:void(0);" class="animateLink" data-region="'+ reg +'">'+ seeAll +' <span class="glyphicon glyphicon-menu-right animateIcon"></span></a></div>');
				    	}
				    }
				    if(reg == 'apac'){
				    	if($(ht2olay).html('.schedule-course-item').length > 6){
				    		$("div[data-id="+ rel + "]").find('.schedule-list').append('<div class="all-schedule-link text-center"><a href="javascript:void(0);" class="animateLink" data-region="'+ reg +'">'+ seeAll +' <span class="glyphicon glyphicon-menu-right animateIcon"></span></a><div>');
				    	}
				    }
				    if(reg == 'emea'){
				    	if($(ht3olay).html('.schedule-course-item').length > 6){
				    		$("div[data-id="+ rel + "]").find('.schedule-list').append('<div class="all-schedule-link text-center"><a href="javascript:void(0);" class="animateLink" data-region="'+ reg +'">'+ seeAll +' <span class="glyphicon glyphicon-menu-right animateIcon"></span></a></div>');
				    	}
				    }

				});
				$(document).on('click', '.all-schedule-link a', function(event){
					var reg = $(this).data('region');
				    $('.schedule-overlay').show();
				    $('.schedule-overlay h3 span').text(reg);
				    $('.schedule-overlay #sessionContainer').show();
				    $('.schedule-overlay .filter-location select option').not(':first').css({'display':'none'});
				    if(reg == 'amer'){
				    	$('.schedule-course-list').html('').html(ht1olay);
				    	hds.courseDetail.sOverlayCountryList(reg);				    	
				    }				    
				    if(reg == 'apac'){
				    	$('.schedule-course-list').html('').html(ht2olay);
				    	hds.courseDetail.sOverlayCountryList(reg);
				    }
				    if(reg == 'emea'){
				    	$('.schedule-course-list').html('').html(ht3olay);
				    	hds.courseDetail.sOverlayCountryList(reg);
				    }

				    if($('.schedule-overlay .schedule-course-list .schedule-course-item.cfilter').length != 0){
						$('.schedule-overlay .schedule-course-list').find('.no-matched-result').remove();
						if($('.schedule-overlay .schedule-course-list .schedule-course-item.cfilter').length > 4){
							$('.schedule-overlay #sessionContainer').show();
						}else{
							$('.schedule-overlay #sessionContainer').hide();
						}						
					}

				    hds.courseDetail.setPagination();
				    hds.courseDetail.processRowColors();
				    hds.courseDetail.scheduleOverlayHeight();
				})
				$(document).on('click', '.closeJobOverlay', function(event) {
	                event.preventDefault();
	                $('.schedule-overlay').hide().removeAttr('style');
	                $('.schedule-overlay .filter-location select option').prop('selected', function() {
				        return this.defaultSelected;
				    });
	            });
				$(document).on('click', '.course-library .description .card-link1, .train-unit-tile .popular-item .card-link1', function(){
					var oid = $(this).data('id');
					window.location = window.location.pathname + '#course=' + oid;
					setTimeout(function(){
						window.location.reload();
					}, 1000);    
				})
				$(document).on('click','.hvc-load-more .lmore', function() {
					var size_li = $(".course-library .course-box").size();            			
					hvlc= (hvlc+6 <= size_li) ? hvlc+6 : size_li;
					$('.course-library .course-box:lt('+hvlc+')').slideDown('fast','linear');
					setTimeout(function(){
						var cust_vi = $(".course-library .course-box:visible").size();
						if(size_li == cust_vi){
							$('.hvc-load-more .lmore').hide();
						}
					},300);
					if (size_li <= hvlc  ) {
						$('.hvc-load-more .lmore').hide();
					}else{
						$('.hvc-load-more .lmore').show();
					}
				});
				$(document).on('click', function(e) {	                
	                if (!$(e.target).is('.schedule-overlay, .schedule-overlay *,.all-schedule-link *')) {
	                    $(".schedule-overlay").hide();
	                    $(".schedule-overlay #sessionContainer").hide().html('');

	                    $('.schedule-overlay .filter-location select option').prop('selected', function() {
					        return this.defaultSelected;
					    });
	                }
	            });

	            $('.schedule-overlay .filter-location select').on('change', function() {
	            	var errorMessage  = $('.fcourses-error').html();
	            	if($(this).find('option:selected').attr('value') != '' && $(this).find('option:selected').attr('value') != undefined){
						var val = $(this).find('option:selected').val();
						var reg = $(this).find('option:selected').data('region');
						$('.schedule-overlay .schedule-course-list .schedule-course-item').removeClass('cfilter').hide();
						$('.schedule-overlay .schedule-course-list .schedule-course-item').each(function(){
							var filter = $(this).data('filter');
							if(filter == val){
								$(this).addClass('cfilter').css({'display':'block'});
							}
						})						
					}else{
						$('.schedule-overlay .schedule-course-list .schedule-course-item').addClass('cfilter').show();
					}
					if($('.schedule-overlay .schedule-course-list .schedule-course-item.cfilter').length != 0){
						$('.schedule-overlay .schedule-course-list').find('.no-matched-result').remove();
						if($('.schedule-overlay .schedule-course-list .schedule-course-item.cfilter').length > 4){
							$('.schedule-overlay #sessionContainer').show();
						}else{
							$(".schedule-overlay #sessionContainer").hide().html('');
							$('.schedule-overlay #sessionContainer').hide();
						}						
					}else{
						$('.schedule-overlay .schedule-course-list').find('.no-matched-result').remove();
						$('.schedule-overlay .schedule-course-list').append('<div class="no-matched-result">'+ errorMessage +'</div>');
						$('.schedule-overlay #sessionContainer').hide();
					}
					hds.courseDetail.setPagination();
					hds.courseDetail.processRowColors();
					hds.courseDetail.scheduleOverlayHeight();
				});
			}
		}

		/* Course Category Landing Page */
		hds.foundationCourses = {
			init: function(options){
				var defaults = {
	                
	            }
	            this.options = $.extend(defaults, options);
				hds.foundationCourses.bindEventSelectors();				
			},
	        removeDuplicates: function(arr){
			    var unique_array = [];
			    for(var i = 0;i < arr.length; i++){
			        if(unique_array.indexOf(arr[i]) == -1){
			            unique_array.push(arr[i])
			        }
			    }
			    return unique_array
			},
			categoryCoursesList: function(){
				var cta1Label = $.trim($('.fview-detail').text());
				var dMethod = '';
				var cat = $.trim($('.fcourses-catname').text().toLowerCase());
					cat = cat.split(' ').join('-');
					cat = cat.replace(/,/g, "");
				var imgPath = $.trim($('.fcourse-img-path').text());
				var timg = parseInt($('.fcourse-cat-count').text()), 
					rimg=1;

				$.ajax({
				    url: '/bin/services/courses?r='+Math.random(),
				    type: 'GET',
				    contentType: "application/json",
				    dataType: "json",
				    success: function( response, textStatus, xhr ) {
				        var jData = xhr.responseText;
				        var jo = $.parseJSON(jData);
				    	$.each(jo.courses, function(k, val1){
				    		var cUrl = $.trim($('.fcourse-url').text()) + val1.objectId;
				    		if(val1.courseType == 'ilt-vilt'){
			        			dMethod = $.trim($('.fcoursetype1').text());
			        		}
			        		if(val1.courseType == 'self-paced'){
			        			dMethod = $.trim($('.fcoursetype2').text());
			        		}
			        		if(val1.courseType == 'library'){
			        			dMethod = $.trim($('.fcoursetype3').text());
			        		}
				    		var mcat = '';
				    		var catimg = '';

				    		if(rimg == timg + 1){
				    			rimg = 1;
				    		}				    		
				    		if(val1.category != undefined || val1.category != null){
								if(val1.category.indexOf('~') != -1){
									mcat = $.trim(val1.category.substr(0, val1.category.indexOf('>')).toLowerCase());
								}else{
									mcat = val1.category.toLowerCase();
								}								
								mcat = mcat.split(' ').join('-');

				    			if(cat == mcat){
				    				var catimg = imgPath + cat + '-' + rimg + '.jpg';
					    			var $ele = '<div class="foundation-tile" data-mkt-id="panel" data-mkt-name="panel-list"><a href="'+ cUrl +'" target="_self" data-mkt-cta="panel_cta" data-mkt-cta-type="button" class="card-link1 tile-click clearfix"><div class="col-md-10 col-sm-9"><div class="foundation-img-block"><img src="'+ catimg +'" alt="'+ val1.title +'" class="img-responsive" /></div><div class="foundation-description"><h4 class="title" data-mkt-cta-title="'+ val1.title +'">'+ val1.title +'</h4><div class="desc">'+ val1.description +'</div><div class="cite">'+ dMethod +'</div></div></div><div class="col-md-2 col-sm-3"><div class="btn-square-red f-button"><div class="card-click-cta">'+ cta1Label +'</div></div></div></a></div>';
					    			$('.hv-foundation-courses .foundation-list').append($ele);

					    			rimg = rimg + 1;
					    		}
				    		}
				        })			            
				    },
				    complete: function(){				    	
				    	var size_li = $(".foundation-tile").size();
				    	if(size_li > 0){
				    		$('.hv-foundation-courses .foundation-list').find('.no-matched-result').remove();
						    hvfc=parseInt($('.ffound-count').text());
						    $('.foundation-tile:visible').hide();
						    $('.foundation-tile:lt('+hvfc+')').show();
					    	hds.foundationCourses.trimParagraph('.foundation-tile .desc');
					    	hds.foundationCourses.trimTitle();
					    	if(size_li > 4){
					    		$('.hv-foundation-courses .hvc-load-more').show();
					    	}else{
					    		$('.hv-foundation-courses .hvc-load-more').hide();
					    	}
				    	}else{
				    		$('.hv-foundation-courses .hvc-load-more').hide();
				    		$('.hv-foundation-courses .foundation-list').append('<div class="no-matched-result" style="padding: 50px 15px; text-align: center;">'+ $('.fcourses-error').html() +'</div>');
				    	}
				    	setTimeout(function(){
				    		$('.career-loading').remove();
				    		hds.foundationCourses.tileVerticalAlign();
				    	}, 800);
				    }
				})
	        },
	        trimTitle: function(){
	        	$('.foundation-tile').each(function(){
					var tTxt = $(this).find('h4.title').text();
					var wLen = countWords(tTxt);
					var trimTxt = tTxt.split(/\s+/).slice(0,9).join(" ");
					if(wLen > 9){
						trimTxt = trimTxt + '...';	
					}
					$(this).find('h4.title').text(trimTxt);
				})
	        },
	        trimParagraph: function(ele){
	        	var $ele = $(ele);
		        $ele.each(function(){
		            var t = $(this).text();        
		            if(t.length < 180) {
		                return;
		            }
		            $(this).html(t.slice(0, 180)+'...');        
		        }); 
	        },
	        tileVerticalAlign: function(){
	        	setTimeout(function(){	        	
		        	$('.hv-foundation-courses .foundation-tile').find('.foundation-img-block, .btn-square-red.f-button').removeAttr('style');
					$('.hv-foundation-courses .foundation-tile').each(function(){
						var h1 = $(this).height();
						var h2 = $(this).find('.foundation-img-block').height();
						var h3 = $(this).find('.btn-square-red.f-button').height();
						$(this).find('.foundation-img-block').css('margin-top',((h1-h2)/2) - 15);
						$(this).find('.btn-square-red.f-button').css('margin-top',((h1-h3)/2) - 15);
					})
				}, 300);
	        },
			bindEventSelectors: function(){
				$(window).on('load', function(){
					hds.foundationCourses.categoryCoursesList();
				});
				$(window).on('resize', function(){
					hds.foundationCourses.tileVerticalAlign();
				});
				$(window).on("orientationchange", function(event){
					hds.foundationCourses.tileVerticalAlign();
				})
				$(document).on('click','.hvc-load-more .lmore', function() {
					var size_li = $(".foundation-tile").size();            			
					hvfc= (hvfc+4 <= size_li) ? hvfc+4 : size_li;
					$('.foundation-tile:lt('+hvfc+')').slideDown('fast','linear');
					setTimeout(function(){
						var cust_vi = $(".foundation-tile:visible").size();
						if(size_li == cust_vi){
							$('.hvc-load-more .lmore').hide();
						}
					},300);
					if (size_li <= hvfc  ) {
						$('.hvc-load-more .lmore').hide();
					}else{
						$('.hvc-load-more .lmore').show();
					}
					hds.foundationCourses.tileVerticalAlign();
				});
			}
		}
}(window, document, jQuery, hds));

$(function() {
    if ($('.iot-lumada-ecosystem').length > 0) {
        hds.iotlumada.init();
    }
    if ($('.iot-lumada-carousal, .iot-lumada-platform-carousal').length > 0) {
        hds.iotlumadaCarousel.init();
    }
    if ($('.iot-lumada-categories').length > 0) {
        hds.iotlumadaCategories.init();
    }
    if ($('.customer-quote-carousal').length > 0) {
        hds.customerTestimonials.init();
    }
    if ($('.featured-customers').length > 0) {
        hds.featuredCustomers.init();
    }
    if ($('.customer-hero-short-banner').length > 0) {
        hds.customerHbCarousal.init();
    }
    if ($('.hv-our-customers').length > 0) {
        hds.customerFilterList.init();
    }
    if ($('.hv-job-details.passion-jlist').length > 0) {
        hds.careerPassionList.init();
    }
    if ($('.hv-job-details.office-jlist').length > 0) {
        hds.careerLocationList.init();
    }
    if ($('.job-application-form').length > 0) {
        hds.careerJobApplication.init();
    }
    if ($('.career-job-description').length > 0) {
        hds.careerJobDescription.init();
    }
    if ($('.hv-career-section').length > 0) {
        hds.careerPassLoc.init();
    }
    if ($('.career-js-banner').length > 0) {
        hds.careerJobSearch.init();       
    }
	if ($('.hv-home-featured-listing').length > 0) {
        hds.homefeaturedCustomers.init();
    }
    hds.pentahoEvents.init();
    hds.commonFunctions.init();
	hds.hdsBranddt.init();
	hds.hdstraining.init();
	if ($('.dt-logo-tab').length > 0) {
		hds.hdshomelogoTab.init();
	}
	if ($('.hv-search-courses').length > 0) {
		hds.trainingSearch.init();
	}
	if ($('.hv-course-detail').length > 0) {
		hds.courseDetail.init();
	}
	if ($('.hv-foundation-courses').length > 0) {
		hds.foundationCourses.init();
	}
    $(window).bind("load", function() {
    	var ccGEO = getCountry();
    	if(hds.hdsLocale._isCountryGeo(ccGEO)){
    		hds.hdsLocale.init();
    	}
    })
})