var hds = window.hds || {};
var pstag;
var subcat;
var psname;
var searchVal;
var inputPlaceHolder;
var resErrorMessage;
var inputSearchLabel;
var showSearchResult;
var historyTmp, searchText;
var sCatMob = false;
var sErrorPHolder;
var mFilterCheck = false;
var featuredTxt = '';

/* New RL Variable List */
roData = [];
roTemp = [];
roFeaturedData = [];
roPromoData = [];
pStatus = false;
fStatus = false;
tasset1 = 16;
tasset2 = 19;
var roDataSource = "/bin/services/resourcelibrarymaster";

(function(window, document, $, hds) {
    hds.resourceLib = {
        init: function(options) {
            var defaults = {
                filterleftSide: '.newsEvents',
                paginationWrapper: '#loadResourceContent',
                myPageName: "#page-",
                itemsPerPage: tasset1,
                filterTopLeft: '.filters-section',
                filterTarget: '.resource',
                featuredGatedIcon: '/etc/clientlibs/hdscorp/main/images/gated-icon-white.png',
                clearSwitch: '.tagList .sfheight a.clear-results',
                searchUrl: roDataSource                
            }
            
            if (localStorage) {
                localStorage.setItem('resStatus', 'false');
            }
            this.options = $.extend(defaults, options);            
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._setSortByRelPosition();
            hds.resourceLib._getRecentSearchVal();
        },
        _getRecentSearchVal:function(){            
            if (sessionStorage.getItem("history") != null) {
                historyTmp = sessionStorage.getItem("history");
                var oldhistoryarray = historyTmp.split('~');
                oldhistoryarray = hds.resourceLib._uniqueArray(oldhistoryarray);
                if (oldhistoryarray.length > 3) {
                    var newHistory="";
                    oldhistoryarray = oldhistoryarray.slice(Math.max(oldhistoryarray.length - 3, 1));
                    sessionStorage.setItem("history", '');
                    for (var i = 0; i < oldhistoryarray.length; i++) {
                        if (sessionStorage.getItem("history") == null) {                            
                            sessionStorage.setItem("history", oldhistoryarray[i]);
                        }else{
                            var addSearchText = "~" + oldhistoryarray[i];
                            newHistory += addSearchText;
                        }                        
                    }
                    sessionStorage.setItem("history", newHistory);
                } else {
                    oldhistoryarray;
                }
                $('#recent-search .rs-list ul').empty();
                for (var i = 0; i < oldhistoryarray.length; i++) {
                    $('#recent-search .rs-list ul').prepend('<li>' + oldhistoryarray[i] + '</li>');
                }
            }
        },
        _postRecentSearchVal:function(){
            searchText = $('#resSearch').val();
            if (searchText != "") {
                if (sessionStorage.getItem("history") != null) {
                    historyTmp = sessionStorage.getItem("history");
                    if (historyTmp.toLowerCase() !== searchText.toLowerCase()) {
                        var addSearchText = "~" + searchText;
                        historyTmp += addSearchText;
                        sessionStorage.setItem("history", historyTmp);
                    }

                } else {
                    sessionStorage.setItem("history", searchText);
                }
            }
        },
        _openvideooverlay: function() {
            var qURL = window.location.href;
            var indexOfQueryStart = qURL.indexOf("?") ;
            /*if(indexOfQueryStart > 0){
                qURL = qURL.substring(0,indexOfQueryStart); 
            }*/
            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
            var videoID = parms["vid"];
            hds.resourceLib._openvideooverlayById(videoID);
        },        
        _openvideooverlayById: function(videoID) {            
            var videoID = videoID;
            var pPageName = window.location.href;
            var videoGUID = "video"+videoID;
            var gblPlayingVideo;
            if($.trim(videoID).length > 0){
               var myPlayer,
                  playerHTML,
                  playerData = {
                    'accountId': '3971130171001',
                    'playerId': 'H1AuzxZlx',
                    'videoId': videoID
                  };
                playerHTML = '<div style="display: block; position: relative; max-width: 100%;"><div style="padding-top: 56.25%;"><video id=\"myPlayer\" data-video-id=\"' + playerData.videoId + '\"  data-account=\"' + playerData.accountId + '\" data-player=\"' + playerData.playerId + '\" data-embed=\"default\" class=\"video-js\" controls style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"></video></div></div>';

                videobox = new HDS.Lightbox();
                gblPlayingVideo = undefined;
                videobox.setContent('');
                videobox.setContent(playerHTML);
                videobox.show();
                $('.hds-overlay').css({'opacity':0});
                bc(document.getElementById('myPlayer'));
                videojs('myPlayer').ready(function(){
                    myPlayer = this;
                    var bcgs = '';
                    if (window.location.href.indexOf("/go/digital-transformation") > 0 || window.location.href.indexOf("hitachisharedservices") > 0 || window.location.href.indexOf("wsca") > 0) {
                        bcgs = _satellite.getVar('bcgs_adobe_config');
                    }else{
                        bcgs = utag_data.bcgs_adobe_config;
                    }
                    this.BCGSAdobeAnalyticsPlugin({
                        options: bcgs
                    });
                    myPlayer.on('loadedmetadata',function(){
                        if(myPlayer.mediainfo.customFields['hypid']){
                            var pId = myPlayer.mediainfo.customFields['hypid'];
                            hapyak.viewer({
                                apiKey: "04007a19854c4c759126",
                                projectId: pId,
                                plugins: {
                                  annotationSources: {"brightcove.cuepoints": true}
                                },
                                resetVariables: true,
                                player: myPlayer,
                                playerType: "brightcove-v2",
                                autoplay: false
                            });
                        }
                        if(myPlayer.mediainfo != undefined){
                            $('.hds-overlay').css({'opacity':1});
                        }                      
                    });                    
                    myPlayer.on("ended", function() {
                        $('div.hds-overlay .vjs-social-direct-link input').val(bcProto + '//' + bcHost + '/en-us/news-resources/resources.html' + '#vid='+videoID);
                        $('div.hds-overlay .vjs-social-share-links a').each(function(){
                            var str = $(this).attr('href');
                            var res = str.replace("videoID", videoID);
                            $(this).attr('href',res);
                        })
                    });
                    myPlayer.on('error', function() {
                        var error = myPlayer.error();
                        if(error.code == 'VIDEO_CLOUD_ERR_NOT_PLAYABLE'){
                            $('.hds-overlay').css({'display':'none'});
                            $('.FilterByContentList input[name="ctyFunction"]#video').prop('checked', true);
                            hds.resourceLib._r2019filtersButton();
                        }else{
                            $('.hds-overlay').css({'opacity':1});
                        }
                    });
                });

                /* WA Video Tracking Code */
                var vidId = 'Video Id: ' + videoID;
                if(window.location.href.indexOf("/go/digital-transformation") > -1) {                    
                    var geoCode = hds.resourceLib._getGeoCode();
                    vidId = 'dt-' + geoCode +'>Video Id: ' + videoID;
                }else if(window.location.href.indexOf("hitachiinsightgroup") > -1){
                    vidId = 'iot>Video Id: ' + videoID;
                }else{
                    var geoCode = getCountry();
                    vidId = 'hv-' + geoCode +'>Video Id: ' + videoID;
                }
                setTimeout(function(){
                    videoTracking(vidId, pPageName);
                },3000);                
                $('div.hds-overlay .innerContent').bind('contextmenu',function() { return false; });
            }
        },
        _getGeoCode:function(){
            /*Get Country and language*/
            var pathLoc= window.location.pathname;
            var n= pathLoc.split("/");
            var countLoc="";
            var getCountry="";
            var check="";
            for(var i=0;i<n.length;i++){
                if(n[i].match("go")){
                    countLoc=check=  n[i-1];
                    break;
                }
            }
            if(countLoc.match("_")){    
                check= countLoc.split("_")
            }else{
                check= countLoc.split("-")
            }
            if(check.length<2){
                getCountry=check;
                if(getCountry==""){
                    getCountry=  "us";
                }
            }else{
                getCountry=check[1];
            }
            return getCountry;
        },
        _getParmsFromURLHash: function(url) {
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
        _urlParam:function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
               return null;
            }
            else{
               return results[1] || 0;
            }
        },
        _getUrlParameter:function(sParam){
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('#'),
                sParameterName,
                i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },
        _checkSelectedNav: function() {
            var qURL = window.location.href;
            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
            var filter1 = parms["ind"]; 
            var filter2 = parms["content"]; 
            var filter3 = parms["subcat"];
            var filter4 = parms["topic"];
            var filter5 = parms["etag"];
            subcat=filter3;
            psname =  parms["psname"];
            pstag =  parms["pstag"];
            sltag = parms["sltag"];

            var scArray,
                ctArray,
                inArray,
                prArray,
                tlArray,
                slArray,
                etArray;

            if(filter5 != undefined){
                etArray = filter5.split(',');
                $.each(etArray,function(i){
                    $('.FilterByEventList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        if(inputId == etArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
            }
            if(filter4 != undefined){
                var tlArray = filter4.split(',');
                $.each(tlArray,function(i){
                    $('.FilteByTopicList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        var inputVal = $(this).attr('value');
                        var mTag = inputVal.substring(inputVal.lastIndexOf('/') + 1);
                        if(inputId == tlArray[i] || mTag == tlArray[i]){
                            $(this).trigger('click');
                        }
                    });
                })
            }
            if(filter3 != undefined){
                var scArray = filter3.split(',');
                $.each(scArray,function(i){
                    $('.FilteByObjectiveList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        var inputVal = $(this).attr('value');
                        var mTag = inputVal.substring(inputVal.lastIndexOf('/') + 1);
                        if(inputId == scArray[i] || mTag == scArray[i]){
                            $(this).trigger('click');
                        }
                    });
                })               
            }
            if(filter2 != undefined){
                ctArray = filter2.split(',');
                $.each(ctArray,function(i){
                    $('.FilterByContentList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        if(inputId == ctArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
            }
            if(filter1 != undefined){
                inArray = filter1.split(',');
                $.each(inArray,function(i){
                    $('.FilterByIndustryList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        if(inputId == inArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
            }            
            if(pstag != undefined){
                prArray = pstag.split(',');
                $.each(prArray,function(i){
                    $('.FilterByProductList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        if(inputId == prArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
                /* PS tag filtering for video LP taggin */
                $.each(prArray,function(i){
                    $('.FilterByProductList input[name="filterRadio"]').each(function(){
                        var inputVal = $(this).attr('value');
                        var mTag = inputVal.substring(inputVal.lastIndexOf('/') + 1);
                        if(mTag == prArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
            }
            if(sltag != undefined){
                slArray = sltag.split(',');
                $.each(slArray,function(i){
                    $('.FilterBySolutionList input[name="filterRadio"]').each(function(){
                        var inputId = $(this).attr('id');
                        if(inputId == slArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
                /* SL tag filtering for video LP taggin */
                $.each(slArray,function(i){
                    $('.FilterBySolutionList input[name="filterRadio"]').each(function(){
                        var inputVal = $(this).attr('value');
                        var mTag = inputVal.substring(inputVal.lastIndexOf('/') + 1);
                        if(mTag == slArray[i]){
                            $(this).trigger('click');
                        }
                    })
                })
            }
            hds.resourceLib._r2019filtersButton();

            var stringUrl = qURL;
            var n=stringUrl.lastIndexOf("/");
            stringUrl=stringUrl.substring(n+1, 1000);
            n=stringUrl.lastIndexOf(".");
            if(n>0){
                stringUrl=stringUrl.substring(0, n);
                n=stringUrl.lastIndexOf(".");
                if(n>0 || filter3 !== undefined){
                    $('body').scrollTo('.res-filters-search',{duration:'slow', offsetTop : '50'});
                }
            }
        },
        _showFilterDropDown: function(arg) {
            var optionSelected = this.options.filterTopLeft;
            $(optionSelected).hide();
            $(optionSelected).each(function(index, el) {
                if ($(this).attr('id') === arg) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
                return
            });
        },
        _processSlingIncludedContent: function() {
            $('#prodnsolcategorycontent a.isGatedLock').each(function(index, el) {
                $(this).find("span.gated-pdf").remove();
                $(this).prepend("<span class='glyphicon gated-pdf' aria-hidden='true'></span>");
            });
            $('.slingcontent a.isGatedLock').each(function(index, el) {
                $(this).find("span.gated-pdf").remove();
            });
        },
        _getSelectedURLPath: function() {
            var $url;
            $('#asideLinks-product  li').each(function(index, el) {
                if ($(this).hasClass('active') && $(this).index() > 0) {
                    $url = $(this).find('a').attr('data-href');
                }
            });
            return $url
        },
        _isEmptySearcURL: function() {
            var $searchUrl = this.options.searchUrl;
            return (hds.resourceLib._getSelectedURLPath() === undefined || hds.resourceLib._getSelectedURLPath() == null || hds.resourceLib._getSelectedURLPath().length <= 0) ? $searchUrl : hds.resourceLib._getSelectedURLPath();
        },
        _uniqueArray:function(list){
            var result = [];
            $.each(list, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        },
        _addRemoveFilters:function(){
            var arrVal = [];
            $('input[name="filterRadio"]').removeClass('filter-retain');
            $('input[name="filterRadio"]:checked').each(function() {
                $(this).addClass('filter-retain');
                arrVal.push($(this).attr('id'));
            });
            hds.resourceLib._getCheckboxValue(arrVal);
        },
        _getCheckboxValue: function(arg1) {
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
        _returnCheckStatus:function(){
            var $allCheckedFilters = $('.resources-listing .rescat-list input.filters').filter(':checked'),
                $allCheckedTLFilters = $('.resources-listing .restopics-list input.filters').filter(':checked'),
                $allCheckedIndFilters = $('.FilterByIndustryList input.filters').filter(':checked'),
                $allCheckedContFilters = $('.FilterByContentList input.filters').filter(':checked'),
                $allCheckedProdFilters = $('.FilterByProductList input.filters').filter(':checked'),
                $allCheckedSolFilters = $('.FilterBySolutionList input.filters').filter(':checked'),
                $allCheckedEvtFilters = $('.FilterByEventList input.filters').filter(':checked');

                return ($allCheckedFilters.length + $allCheckedTLFilters.length + $allCheckedIndFilters.length + $allCheckedContFilters.length + $allCheckedProdFilters.length + $allCheckedSolFilters.length + $allCheckedEvtFilters.length);
        },
        _buildMobileNavigation: function(arg) {
            if ($(window).width() < 991) {
                var getMobileSearc = $('#resource-search').html();
                $('.searchArea').html(getMobileSearc);
                $('#resource-search').html("");
                var getRightMenu = $('#mobilerightMenu').html();
                $('.filtrSideBar').html(getRightMenu);
                $('#mobilerightMenu').html("");
                var getFilterIndustry = $('#FilterByIndustry .filters-list').html();
                $('.FilterAreaIndustry').html(getFilterIndustry);
                $('#FilterByIndustry .filters-list').html("");
                var getFilterCpntent = $('#FilteyContentType .filters-list').html();
                $('.FilterAreaContent').html(getFilterCpntent);
                $('#FilteyContentType .filters-list').html("");
                var getFilterEvent = $('#FilteByEventType .filters-list').html();
                $('.FilterAreaEvent').html(getFilterEvent);
                $('#FilteByEventType .filters-list').html("");
                var getFilterProduct = $('#FilteyProductType .filters-list').html();
                $('.FilterAreaProduct').html(getFilterProduct);
                $('#FilteyProductType .filters-list').html("");
                var getResFilters = $('.res-filters-search .resource-filters.dtop').html();
                $('.topFilter .resource-filters').html(getResFilters);
                $('.res-filters-search .resource-filters.dtop').html("");
            } else {
                if (!hds.resourceLib._isEmpty($('.searchArea'))) {
                    $('#resource-search').html($('.searchArea').html());
                    $('.searchArea').html("");
                }

                if (!hds.resourceLib._isEmpty($('.filtrSideBar'))) {
                    $('#mobilerightMenu').html($('.filtrSideBar').html());
                    $('.filtrSideBar').html("");
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaIndustry'))) {
                    $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                    $('.FilterAreaIndustry').html("")
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaContent'))) {
                    $('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                    $('.FilterAreaContent').html("")
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaEvent'))) {
                    $('#FilteByEventType .filters-list').html($('.FilterAreaEvent').html());
                    $('.FilterAreaEvent').html("")
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaProduct'))) {
                    $('#FilteyProductType .filters-list').html($('.FilterAreaProduct').html());
                    $('.FilterAreaProduct').html("")
                }
                if (!hds.resourceLib._isEmpty($('.topFilter .resource-filters'))) {
                    $('.res-filters-search .resource-filters.dtop').html($('.topFilter .resource-filters').html());
                    $('.topFilter .resource-filters').html("")
                }
            }
            hds.resourceLib._retainFilters();
        },
        _isEmpty: function(el) {
            return !$.trim(el.html())
        },
        _showMobileOverlay: function() {
            hds.resourceLib._buildMobileNavigation();
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
            hds.resourceLib._adjustOverlayHeight();
        },
        _closeOverLayPopup: function() {
            var actualWidth = $(window).width() + 17;                
            if (actualWidth > 991) {
                if (!hds.resourceLib._isEmpty($('.searchArea'))) {
                    $('#resource-search').html($('.searchArea').html());
                    $('.searchArea').html('');
                }
                if (!hds.resourceLib._isEmpty($('.filtrSideBar'))) {
                    $('#mobilerightMenu').html($('.filtrSideBar').html());
                    $('.filtrSideBar').html('');
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaIndustry'))) {
                    $('#FilterByIndustry .filters-list').html($('.FilterAreaIndustry').html());
                    $('.FilterAreaIndustry').html('')
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaContent'))) {
                    $('#FilteyContentType .filters-list').html($('.FilterAreaContent').html());
                    $('.FilterAreaContent').html('')
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaEvent'))) {
                    $('#FilteyEventType .filters-list').html($('.FilterAreaEvent').html());
                    $('.FilterAreaEvent').html('')
                }
                if (!hds.resourceLib._isEmpty($('.FilterAreaProduct'))) {
                    $('#FilteyProductType .filters-list').html($('.FilterAreaProduct').html());
                    $('.FilterAreaProduct').html('')
                }
                if (!hds.resourceLib._isEmpty($('.topFilter .resource-filters'))) {
                    $('.res-filters-search .resource-filters.dtop').html($('.topFilter .resource-filters').html());
                    $('.topFilter .resource-filters').html('')
                }
                $('.bgCover').hide();
                hds.resourceLib._retainFilters();
                //$('.resource-filters.dtop').show();
            }else{
                $('.bgCover').hide();
                //$('.resource-filters.dtop').hide();
            }
        },        
        _addKeywordSearchTag: function(checkBoxValue, tag) {
            $('#searchTag .keyword').html('');
            $newTag = $("<span class='filterKeyword'>" + checkBoxValue + "<span class='closeKeyword'>&nbsp;</span></span>");
            /* store the value in elment data so we can reference back to checkbox */
            $newTag.data('value', checkBoxValue);
            $(tag).append($newTag);
        },        
        _setSortByRelPosition:function(){
            if ($(window).width() < 991) {
                $('.sortResources').css({'top':$('.result-resources .resource-heading').innerHeight() + 20});
            }else{
                $('.sortResources').css({'top':'0px'});
            }
        },
        _sortByLabelText:function(){
            $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
            $('.sort-by-list li').removeClass('selected');
            $('.sort-by-list li:eq(0)').addClass('selected');
        },
        _hideFilterProductLabel:function(){
            $('#filterTag .label').css({'display':'none'});
            $('#filterTag .filter-product').html('');
            psname="";
            pstag="";
        },
        _retainFilters:function(){
            $('.rescat-list input[name="cbxFunction"]').each(function(){
                if($(this).hasClass('filter-retain')){
                    $(this).prop('checked', true);
                }
            })

            $('.restopics-list input[name="ctlFunction"]').each(function(){
                if($(this).hasClass('filter-retain')){
                    $(this).prop('checked', true);
                }
            })

            $('input[name="ctyFunction"]').each(function(){
                if($(this).hasClass('filter-retain')){
                    $(this).prop('checked', true);
                }
            })

            $('input[name="proFunction"]').each(function(){
                if($(this).hasClass('filter-retain')){
                    $(this).prop('checked', true);
                }
            })

            if($('#resSearch').hasClass('filter-retain')){
                $('#resSearch').val(searchVal);
            }
        },
        _adjustOverlayHeight:function(){
            var pgHeight = $(window).outerHeight(),
                otHeight = $('.overlayTop').outerHeight(),
                omHeight = $('.filtrSideBar').outerHeight(),
                obHeight = $('.FilterAreaBtnPop').outerHeight();

                omHeight = pgHeight - (otHeight + obHeight);
                $('.filtrSideBar').css({'height': omHeight - 48});
                $('.filter-mob-list').css({'height': omHeight - 48});
        },
        _showHideFilters:function(){
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
                            var $checkStatus = hds.resourceLib._returnCheckStatus();
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
                            var $checkStatus = hds.resourceLib._returnCheckStatus();
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
                    var $checkStatus = hds.resourceLib._returnCheckStatus();
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
        _defaultSortedParameter: function(){
            var qSort = hds.resourceLib._getUrlParameter('sorted');
            if(qSort=='date'){
                var a, b;
                $('.sort-by-list ul li').each(function(){
                    a = $(this).attr('id');
                    if(a == qSort){
                        b = $(this).attr('value');
                    }
                })
                $('.sort-by-button').find('.stitle').html(b);
                $('#' + qSort).addClass('selected');
            }
            if(qSort=='alpha'){
                var a, b;
                $('.sort-by-list ul li').each(function(){
                    a = $(this).attr('id');
                    if(a == qSort){
                        b = $(this).attr('value');
                    }
                })
                $('.sort-by-button').find('.stitle').html(b);
                $('#' + qSort).addClass('selected');
            }
            if(qSort=='relevance'){
                var a, b;
                $('.sort-by-list ul li').each(function(){
                    a = $(this).attr('id');
                    if(a == qSort){
                        b = $(this).attr('value');
                    }
                })
                $('.sort-by-button').find('.stitle').html(b);
                $('#' + qSort).addClass('selected');
            }
        },
        _r2019loadResourceObject: function(roDataSource){
            var count = 0;
            var start = 0;
            var end = '';
            if($('#searchTag .keyword').html()===''){
                var $checkStatus = hds.resourceLib._returnCheckStatus();
                if($checkStatus != 0){
                    end = tasset2;
                }else{
                    end = tasset1;
                }
            }
            $.ajax({
                url: roDataSource,
                type: 'GET',
                contentType: "application/json",
                dataType: "json",
                success: function( response, textStatus, xhr ) {
                    var jData = xhr.responseText;
                    roData = $.parseJSON(jData);

                    roPromoData = roData.promos.concat(roData.promos);
                    roFeaturedData = roData.featured.concat(roData.featured).concat(roData.featured);

                    count = roData.resources.length;                    				
                    hds.resourceLib._r2019renderResHtml(roData,start,end);
                },
                complete: function(){
                    $('#resLoading').css({'display':'none'});
                    if($('#filterTag .keyword-filter').html() === "" && $('#searchTag .keyword').html()===''){
                        $('#resLoading').css({'display':'none'});
                        //hds.resourceLib._sortByLabelText();
                        $('#loadResourceContent').empty(); 
                        $('.res-count').css({'display':'none'}); 
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        hds.resourceLib._setPagination(roData.resources.length, tasset1);
                    }else{
                        hds.resourceLib._r2019filtersButton();
                        hds.resourceLib._setSortByRelPosition();
                        if ($(window).width() < 991) {
                            $('.topFilter').show();
                        }else{
                            $('.resource-filters.dtop').show();
                        }                        
                    }                    
                }
            })
        },
        _r2019renderResHtml: function(jo,start,end){
            $('.resource-interaction-list').html('');
            var ss = jo.resources.slice(start,end);	
            var $a = '';
            var $b = '';
            $.each(ss, function(j, val){
                var lockHTML = '';
                if(val.assetGated == true){
                    lockHTML = '<span class="glyphicon glyphicon-lock" style="background: #fff;top: 1px;"></span>';
                }
                $a = $a + '<div class="col-centered col-md-3 resource-tile" data-subfilter="'+ val.assetTags +'"><div class="res-int-item"><a href="'+ val.assetLink +'" target="_blank" class="card-link1 clearfix"><div class="pop"><img src="/content/dam/public/en_us/images/products/data-protection/data-protection-as-service/dpaas-asset-image.jpg" alt="" class="img-responsive"></div><div class="res-int-title"><div class="res-int-cat">'+ val.assetContentType +'</div><h3>'+ val.assetTitle +'</h3></div><div class="animateLink card-click-cta ctbox">'+ lockHTML +'Learn More<span class="glyphicon glyphicon-menu-right animateIcon"></span></div></a></div></div>';
            });
            $('.resource-interaction-list').append($a);            
            if(pStatus == false){
                if(roPromoData.length != 0){
                    console.log('jj');
                    pstart = 0,
                    pend = 2;
                    hds.resourceLib._r2019renderPromoHtml(roPromoData,pstart,pend);
                    pStatus = true;
                }
            }

            if(fStatus == false){
                if(roFeaturedData.length != 0){
                    console.log('gg');
                    fstart = 0,
                    fend = 3;
                    hds.resourceLib._r2019renderFeaturedHtml(roFeaturedData,fstart,fend);
                    fStatus = true;
                }
            }
            hds.commonFunctions.trimTitle('.resource-tile', '.res-int-title h3', 9);
        },
        _r2019renderPromoHtml: function(po,pstart,pend){
            var ss = po.slice(pstart,pend);	
            var $pHtml = [];
            var pBgImg = '/content/dam/public/en_us/images/news-and-insights/resources/promo-default-image.jpg';
            $.each(ss, function(j, val){
                $pHtml.push('<div class="col-centered col-md-3 resource-tile promo"><div class="res-int-item" style="background-image:url('+ pBgImg +');"><a href="'+ val.pUrl +'" target="_blank" class="card-link1 clearfix"><div class="pop"></div><div class="res-int-title"><h3>'+ val.pTitle +'</h3><p>'+ val.pDesc +'</p></div><div class="btn-square-red learn-more-promo"><div class="animateLink card-click-cta ctbox">'+ val.pCta + '</div></div></a></div></div>');
            });
            $('.resource-interaction-list').append($pHtml);
        },
        _r2019renderFeaturedHtml: function(fo,fstart,fend){
            var ss = fo.slice(fstart,fend);	
            var $fHtml = [];
            $.each(ss, function(j, val){
                var lockHTML = '';                
                if(val.assetGated == true){
                    lockHTML = '<span class="glyphicon glyphicon-lock" style="background: #fff;top: 1px;"></span>';
                }

                if($('#filterTag .keyword-filter').html() === "" && $('#searchTag .keyword').html()===''){
                    $fHtml.push('<div class="col-centered col-md-6 resource-tile featured"  data-subfilter="'+ val.assetTags +'"><div class="res-int-item featured "><a href="'+ val.assetLink +'" target="_blank" class="card-link1 clearfix"><div class="col-md-6 col-no-pad"><div class="pop"><img src="/content/dam/public/en_us/images/products/storage/storage-as-service/staas-featured-asset.jpg" alt="" class="img-responsive"></div></div><div class="col-md-6 col-no-pad"><div class="res-featured">FEATURED</div><div class="res-int-title"><div class="res-int-cat">'+ val.assetContentType +'</div><h3>'+ val.assetTitle +'</h3></div><div class="animateLink card-click-cta ctbox">'+ lockHTML +' Learn More<span class="glyphicon glyphicon-menu-right animateIcon"></span></div></div></a></div></div>');
                }else{
                    $fHtml.push('<div class="col-centered col-md-3 resource-tile" data-subfilter="'+ val.assetTags +'"><div class="res-int-item"><a href="'+ val.assetLink +'" target="_blank" class="card-link1 clearfix"><div class="pop"><div class="res-featured" style="position:absolute; z-index: 9999;">FEATURED</div><img src="/content/dam/public/en_us/images/products/data-protection/data-protection-as-service/dpaas-asset-image.jpg" alt="" class="img-responsive"></div><div class="res-int-title"><div class="res-int-cat">'+ val.assetContentType +'</div><h3>'+ val.assetTitle +'</h3></div><div class="animateLink card-click-cta ctbox">'+ lockHTML +'Learn More<span class="glyphicon glyphicon-menu-right animateIcon"></span></div></a></div></div>');
                }
            });
            $('.resource-interaction-list').append($fHtml);
        },
        _setPagination: function(count, tasset) {
            var objectData = [];
            var paginations = this.options.paginationWrapper;
            var myPageName = this.options.myPageName;
            var items = count
            var numItems = items;
            var perPage = Number(tasset);

            if(tasset == tasset2){
                $('.hv-resource-interaction.rlnew .resource-interaction-list').addClass('rl-fsearch-order');
            }else{
                $('.hv-resource-interaction.rlnew .resource-interaction-list').removeClass('rl-fsearch-order');
            }

            if(roTemp != ''){
                objectData = {resources: roTemp};
            }else{
                objectData = roData;
            }            

            if (numItems > perPage) {
                $(paginations).pagination('destroy');
                $(paginations).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: "light-theme",
                    onPageClick: function(pageNumber) {                        
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        if($('.resource-tile.promo').length != 0){
                            pstart = pstart + 2;
                            pend = pend + 2;						
                        }
                        if(roFeaturedData.length != 0){
                            fstart = fstart + 3;
                            fend = fend + 3;						
                        }                            
                        hds.resourceLib._r2019renderResHtml(objectData,showFrom,showTo);

                        if(pend > roPromoData.length){
                            pstart = 0;
                            pend = 2;
                            hds.resourceLib._r2019renderPromoHtml(roPromoData, pstart, pend)
                        }else{
                            hds.resourceLib._r2019renderPromoHtml(roPromoData, pstart, pend)
                        }
                        
                        if(fend >= roFeaturedData.length){
                            fstart = 0;
                            fend = 3;
                            hds.resourceLib._r2019renderFeaturedHtml(roFeaturedData, fstart, fend)
                        }else{
                            hds.resourceLib._r2019renderFeaturedHtml(roFeaturedData, fstart, fend)
                        }                   
                    }
                });
            }           
        },
        _processResourceFilters: function(arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            var fjo = [];
            if(arg1 != ''){
                fjo.push('s1');
            }
            if(arg2 != ''){
                fjo.push('s2');
            }
            if(arg3 != ''){
                fjo.push('s3');
            }
            if(arg4 != ''){
                fjo.push('s4');
            }
            if(arg5 != ''){
                fjo.push('s5');
            }
            if(arg6 != ''){
                fjo.push('s6');
            }
            if(arg7 != ''){
                fjo.push('s7');
            }
            
            var paginations = this.options.paginationWrapper;
            var itemsPerPage = this.options.itemsPerPage;
            roTemp = [];
            $.each(roData.resources, function(i, val){
                var s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', s6 = '', s7 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '', j6 = '', j7 = '';
                var ff = [];   
                var aa = [];   
                var c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0; 
                var count = 0;

                var gg = val.assetTags.split(',');
                if(arg1 == '' && arg2 == '' && arg3 == '' && arg4 == '' && arg5 == '' && arg6 == '' && arg7 == ''){
                    roTemp.push(roData.resources[i]);
                } else if(arg1 != '' && arg2 != '' && arg3 != '' && arg4 != '' && arg5 != '' && arg6 != '' && arg7 != ''){                       
                    $.grep(arg1, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s1 = 'true';
                            }
                        })
                    })
                    $.grep(arg2, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s2 = 'true';
                            }
                        })
                    })
                    $.grep(arg3, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s3 = 'true';
                            }
                        })
                    })
                    $.grep(arg4, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s4 = 'true';
                            }
                        })
                    })
                    $.grep(arg5, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s5 = 'true';
                            }
                        })
                    })
                    $.grep(arg6, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s6 = 'true';
                            }
                        })
                    })
                    $.grep(arg7, function( a1, b1 ) {
                        $.each(gg, function( a2, b2 ) {
                            if(a1 == b2){
                                s7 = 'true';
                            }
                        })
                    })
                    if(s1 == 'true' && s2 == 'true' && s3 == 'true' && s4 == 'true' && s5 == 'true' && s6 == 'true' && s7 == 'true'){
                        roTemp.push(roData.resources[i]);
                    }
                }else{
                    if(arg1 != ''){                        
                        $.grep(arg1, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c1 = c1 + 1;
                                }
                            })
                        })
                        if(c1 != 0){
                            s2 = 's1'; 
                        }
                    }                    
                    if(arg2 != ''){
                        $.grep(arg2, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c2 = c2 + 1;
                                }
                            })
                        })
                        if(c2 != 0){
                            s2 = 's2'; 
                        }
                    }
                    if(arg3 != ''){
                        $.grep(arg3, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c3 = c3 + 1;
                                }
                            })
                        })
                        if(c3 != 0){
                            s3 = 's3'; 
                        }
                    }
                    if(arg4 != ''){
                        $.grep(arg4, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c4 = c4 + 1;
                                }
                            })
                        })
                        if(c4 != 0){
                            s4 = 's4'; 
                        }
                    }
                    if(arg5 != ''){
                        $.grep(arg5, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c5 = c5 + 1;
                                }
                            })
                        })
                        if(c5 != 0){
                            s5 = 's5'; 
                        }
                    }
                    if(arg6 != ''){
                        $.grep(arg6, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c6 = c6 + 1;
                                }
                            })
                        })
                        if(c6 != 0){
                            s6 = 's6'; 
                        }
                    }
                    if(arg7 != ''){
                        $.grep(arg7, function( a1, b1 ) {
                            $.each(gg, function( a2, b2 ) {
                                if(a1 == b2){
                                    c7 = c7 + 1;
                                }
                            })
                        })
                        if(c7 != 0){
                            s7 = 's7'; 
                        }
                    }

                    if(s1 != ''){
                        ff.push(s1);
                    }
                    if(s2 != ''){
                        ff.push(s2);
                    }
                    if(s3 != ''){
                        ff.push(s3);
                    }
                    if(s4 != ''){
                        ff.push(s4);
                    }
                    if(s5 != ''){
                        ff.push(s5);
                    }
                    if(s6 != ''){
                        ff.push(s6);
                    }
                    if(s7 != ''){
                        ff.push(s7);
                    }
                    var cd = 0;
                    $.each(ff , function(i, val) {
                        $.each(fjo , function(j, jval) {
                            if(jval == val){
                                cd = cd + 1;
                            }
                        })
                    })
                    if(cd == fjo.length){
                        roTemp.push(roData.resources[i]);
                    }
                }

                s1 = '', s2 = '', s3 = '', s4 = '', s5 = '', s6 = '', s7 = '', j1 = '', j2 = '', j3 = '', j4 = '', j5 = '', j6 = '', j7 = '', c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0;
                ff = [];                
                a = [];
            })
            console.log('Assets = ' + roTemp.length);
            var newArray = roTemp.filter(function (value) {
                return Object.keys(value).length !== 0;
            });
            var objectData = {resources: newArray};
                    
            hds.resourceLib._r2019renderResHtml(objectData, 0, tasset2);
            if($('#searchTag .keyword').html() != '' || $('#filterTag .keyword-filter').html() != ''){
                pstart = 0, pend = 2, fstart = 0, fend = 3;
                hds.resourceLib._r2019renderPromoHtml(roPromoData, pstart, pend);
                hds.resourceLib._r2019renderFeaturedHtml(roFeaturedData, fstart, fend)
            }
            $(paginations).pagination('destroy');
            $('#loadResourceContent').empty();
            hds.resourceLib._setPagination(objectData.resources.length, tasset2);
        },
        _r2019filtersButton: function(){
            console.log('In Filter');            
            hds.resourceLib._addRemoveFilters();
            hds.resourceLib._showHideFilters();
            var $allCheckedFilters = $('.resources-listing .rescat-list input.filters').filter(':checked'),
                $allCheckedTLFilters = $('.resources-listing .restopics-list input.filters').filter(':checked'),
                $allCheckedIndFilters = $('.FilterByIndustryList input.filters').filter(':checked'),
                $allCheckedContFilters = $('.FilterByContentList input.filters').filter(':checked'),
                $allCheckedProdFilters = $('.FilterByProductList input.filters').filter(':checked'),
                $allCheckedSolFilters = $('.FilterBySolutionList input.filters').filter(':checked'),
                $allCheckedEvtFilters = $('.FilterByEventList input.filters').filter(':checked');

            if ($allCheckedIndFilters.length > 0) {
                var checkedIndVals = $.map($allCheckedIndFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedContFilters.length > 0) {
                var checkedContVals = $.map($allCheckedContFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedProdFilters.length > 0) {
                var checkedProdVals = $.map($allCheckedProdFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedSolFilters.length > 0) {
                var checkedSolVals = $.map($allCheckedSolFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedEvtFilters.length > 0) {
                var checkedEvtVals = $.map($allCheckedEvtFilters, function(el) {
                    return el.value
                });
            }

            if ($allCheckedFilters.length > 0) {
                var checkedSubVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedTLFilters.length > 0) {
                var checkedTLVals = $.map($allCheckedTLFilters, function(el) {
                    return el.value
                });
            }
            if ($allCheckedFilters.length < 0) {
                haveFilters = null;
            }
            $('.filters-section').hide();
            $('.resource-filters.dtop > a').removeClass('active');
            $('#filterTag .keyword-filter').show();

            if(checkedSubVals == undefined){
                checkedSubVals = '';
            }
            if(checkedTLVals == undefined){
                checkedTLVals = '';
            }
            if(checkedProdVals == undefined){
                checkedProdVals = '';
            }
            if(checkedIndVals == undefined){
                checkedIndVals = '';
            }
            if(checkedContVals == undefined){
                checkedContVals = '';
            }
            if(checkedSolVals == undefined){
                checkedSolVals = '';
            }
            if(checkedEvtVals == undefined){
                checkedEvtVals = '';
            }

            hds.resourceLib._processSlingIncludedContent();
            hds.resourceLib._processResourceFilters(checkedSubVals, checkedTLVals, checkedProdVals, checkedIndVals, checkedContVals, checkedSolVals, checkedEvtVals);
        },
        _bindEventsSelectors: function() {
            sErrorPHolder = $('.errorSearchField').text();
            inputPlaceHolder = $('#resSearch').attr('placeholder');
            resErrorMessage = $('.resLibError').html();
            inputSearchLabel = $('.overlayBox .heading h3').text();
            showSearchResult = $('.resSearchResults').text();
            featuredTxt = $.trim($('.rescat-list > li.hidden:first-child').text());
            
            $(window).bind("load", function() {
                hds.resourceLib._r2019loadResourceObject(roDataSource);
                $('body').find('.disable-click').remove();
                $('.rescat-list > li.hidden:first-child').remove();
                $('ul#asideLinks-product li:first-child').removeClass('active');
                hds.resourceLib._checkSelectedNav();
                hds.resourceLib._defaultSortedParameter();
                setTimeout(function(){
                    hds.resourceLib._openvideooverlay();
                }, 500);
            })

            $(document).on('click', '.rl2019-all-filters', function(event){
                $('.res-filters-search').addClass('rlfactive');
                $('.res-filters-search').addClass('filterpop');
                $('.res-filters-search .resource-filters .rl2019-filters-box').addClass('col-sm-8');
                
                event.preventDefault();
            })
            $(document).on('click', '.rl2019-apply', function(event){
                $('.res-filters-search').removeClass('rlfactive');
                $('.res-filters-search').removeClass('filterpop');
                $('.res-filters-search .resource-filters .rl2019-filters-box').removeClass('col-sm-8');
                hds.resourceLib._r2019filtersButton();
                event.preventDefault();
            })
            $(document).on('click', '.rl2019-clear', function(event){
                $('.res-filters-search').removeClass('rlfactive');
                $('.res-filters-search').removeClass('filterpop');
                $('.res-filters-search .resource-filters .rl2019-filters-box').removeClass('col-sm-8');
                event.preventDefault();
            })
            $(document).on('click', '.rl2019-cancel', function(event){
                $('.res-filters-search').removeClass('rlfactive');
                $('.res-filters-search').removeClass('filterpop');
                $('.res-filters-search .resource-filters .rl2019-filters-box').removeClass('col-sm-8');
                event.preventDefault();
            })

            var deviceAgent = navigator.userAgent.toLowerCase();
            var nDevices = deviceAgent.match(/(iphone|ipad|android)/);
            if (!nDevices) {

                $(window).resize(function() {
                    var element = $('.product-scroll').jScrollPane(); 
                    var api = element.data('jsp');
                    api.destroy();
                    $('.filters-section').hide();
                    $('.resource-filters .filterby').removeClass('active');
                    $('.resource-filters.dtop .filterby').removeClass('active');
                    $('body').find('.mobFiltersBG').remove();
                    $('body').removeClass('overflow-mobile');
                    var actualWidth = $(window).width() + 17;                
                    if (actualWidth > 991) {
                        hds.resourceLib._closeOverLayPopup();                        

                    }else{                        
                        $('.bgCover').hide();
                    }
                    hds.resourceLib._setSortByRelPosition();
                });
            }
            $(document).on('click', '.sort-by-button', function(event) {
                $('.sort-by-list').toggle();
                $(this).toggleClass('border');
            })
            $(document).on('click', '.sort-by-list li a', function(event) {           
                event.preventDefault;
                if(!$(this).parent().hasClass('selected')){
                    var sortId = $(this).parent().attr('id'),
                        sortLabel = $(this).text(),
                        $defaultURL = roDataSource,
                        $keyword = $.trim($("#resSearch").val()),            
                        queryURL = '';
                        //queryURL = $defaultURL.replace(".html", "." + sortId + ".html");
                        $('#resLoading').css({'display':'block'});
                        $('.hv-resource-interaction.rlnew .resource-interaction-list').html('');
                        pStatus = false;
                        fStatus = false;
                        roTemp = [];

                        $('.sort-by-list li a').parent().removeClass('selected');                    
                        $(this).parent().addClass('selected');
                        $('.sort-by-button').find('.stitle').html(sortLabel);
                        if($keyword == ""){
                            queryURL = $defaultURL + '?sort=' + sortId;
                            hds.resourceLib._r2019loadResourceObject(queryURL);
                        }else{
                            queryURL = $defaultURL + '?fulltext=' + encodeURIComponent($keyword) + '&sort=' + sortId;
                            hds.resourceLib._r2019loadResourceObject(queryURL);
                        }
                }
                $('.sort-by-button').removeClass('border');
                $('.sort-by-list').hide();              
            })

            $(document).on('keyup', '#resSearch', function(event) {
                var value = $.trim($(this).val());
                var scArr = [],
                    tlArr = [],
                    sctArr = [],
                    siArr = [],
                    spArr = [],
                    ssArr = [],
                    searchCat, topicCat, searchContent, searchIndustry, searchProduct, searchSolution;

                /* Sub Category Value */
                $('input[name="cbxFunction"]:checked').each(function() {
                    scArr.push($(this).val());
                });                
                decodeURIComponent(scArr);
                searchCat = scArr.join("~");

                /* Topic List Value */
                $('input[name="ctlFunction"]:checked').each(function() {
                    tlArr.push($(this).val());
                });                
                decodeURIComponent(tlArr);
                topicCat = tlArr.join("~");

                /* Content Type Value */
                $('.FilterByContentList input.filters:checked').each(function() {
                    sctArr.push($(this).val());
                });                
                decodeURIComponent(sctArr);
                searchContent = sctArr.join("~");

                /* Industry Value */
                $('.FilterByIndustryList input.filters:checked').each(function() {
                    siArr.push($(this).val());
                });                
                decodeURIComponent(siArr);
                searchIndustry = siArr.join("~");

                /* Product Value */
                $('input[name="proFunction"]:checked').each(function() {
                    spArr.push($(this).val());
                });                
                decodeURIComponent(spArr);
                searchProduct = spArr.join("~");

                /* Solution Value */
                $('input[name="solFunction"]:checked').each(function() {
                    ssArr.push($(this).val());
                });                
                decodeURIComponent(ssArr);
                searchSolution = ssArr.join("~");

                if (value.length > 0) {
                    $('.clearSearchIcon').show();
                    $.ajax({
                       url: '/bin/services/resourcelibrary/searchsuggestions',
                       type: 'GET',
                       dataType: 'json',
                       data:{
                            'searchKeyword':value,
                            'searchCat':searchCat,
                            'topicCat':topicCat,
                            'searchContent':searchContent,
                            'searchIndustry':searchIndustry,
                            'searchProduct':searchProduct,
                            'searchSolution':searchSolution
                       },
                       success: function(data) {
                            $("#recent-search .rs-plist ul").html('');
                            $.each(data, function(i, field){
                                $("#recent-search .rs-plist ul").append('<li>' + field + '</li>');
                            });
                            if($("#recent-search .rs-plist ul").html() != ""){
                                $("#recent-search").css({'display':'block'});
                                $("#recent-search .rs-plist").css({'display':'block'});
                            }else{
                                if ($('#recent-search .rs-list ul').html() != "") {                                    
                                    $('#recent-search').show();
                                    $("#recent-search .rs-plist").css({'display':'none'});
                                    $('#recent-search .rs-list').css({'display':'block'});
                                }else{
                                    $("#recent-search").hide();
                                    $("#recent-search .rs-plist").css({'display':'none'});
                                }                                
                            }
                       }
                    });
                } else {
                    $('.clearSearchIcon').hide();
                    if ($('#recent-search .rs-list ul').html() != "") {
                        $('#recent-search').show();
                        $('#recent-search .rs-list').css({'display':'block'});
                        $("#recent-search .rs-plist").css({'display':'none'});
                    }else{
                        $("#recent-search").hide();
                        $("#recent-search .rs-plist").css({'display':'none'});
                        $("#recent-search .rs-plist ul").html('');
                    }
                }
                event.preventDefault();
            });
            
            $(document).on('click', '.searchResource', function(event) {
                if ($(window).width() > 991) {
                    $('#resLoading').css({'display':'block'});
                    $('.hv-resource-interaction.rlnew .resource-interaction-list').html('');
                    var txtVal = $.trim($('#resSearch').val()),
                        resStatus = localStorage.getItem('resStatus'),
                        paginations = '#loadResourceContent',
                        $defaultURL = roDataSource,
                        flag = false;

                    $('input[name="proFunction"]').each(function() {
                        var pText = $(this).next('label').text();
                        if(pText.toLowerCase() == txtVal.toLowerCase()){
                            $(this).trigger('click');
                            $(this).prop('checked', true);
                            flag = true;
                        }
                    });

                    $('input[name="solFunction"]').each(function() {
                        var pText = $(this).next('label').text();
                        if(pText.toLowerCase() == txtVal.toLowerCase()){
                            $(this).trigger('click');
                            $(this).prop('checked', true);
                            flag = true;
                        }
                    });

                    if(flag == false){
                        //if(resStatus == 'false'){
                            localStorage.setItem('resStatus', 'true');                        
                            searchVal = txtVal;
                            if(txtVal.length > 0){
                                $('.slingcontent').css({'display': 'none'});
                                $('#searchTag .label').css({
                                    'display': 'inline'
                                });
                                hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');
                                $('#loadResourceContent').empty();
                                $(paginations).pagination('destroy');
                                $('#resSearch').attr('placeholder',inputPlaceHolder);
                                hds.resourceLib._r2019loadResourceObject(roDataSource + '?fulltext=' + encodeURIComponent(searchVal));     
                                hds.resourceLib._postRecentSearchVal();

                                $('.sort-by-button').find('.stitle').html($('.sort-by-button .stitle').data('dtitle'));
                                $('.sort-by-list li').removeClass('selected');
                                $('.sort-by-list li:eq(0)').addClass('selected');                             
                            }else {
                                $('#resSearch').attr('placeholder',sErrorPHolder);
                                localStorage.setItem('resStatus', 'false');
                            }                        
                        //}
                    }else{
                        hds.resourceLib._r2019filtersButton();
                        hds.resourceLib._postRecentSearchVal();
                    }                   
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

            $(document).on('click', '.launchLink a', function(event) {
                $('body').append('<div class="mobFiltersBG"></div>');
                $('body').addClass('overflow-mobile');
                setTimeout(function(){
                    if ($(window).width() <= 991) {                   
                        if($('.searchArea').html() == ""){
                            hds.resourceLib._showMobileOverlay();
                        }else{
                            $('.bgCover').css({
                                display: 'block',
                                width: $(window).width(),
                                height: ' 100%',
                            });
                        }
                    }
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

            /* Filters By Industry/Content Type */
            var open = $('.filterby'),
                a = $('.resource-filters.dtop').find('a');
            //open.click(function(e) {
            $(document).on('click', '.resource-filters.dtop .filterby', function(e) {
                e.preventDefault();
                $(".sort-by-list").hide();
                $('.sort-by-button').removeClass('border');
                $("#recent-search").hide();
                if ($(window).width() > 768) {
                    var filterId = $(this).data('refilter');
                    var $this = $(this),
                        speed = 500;
                    if ($this.hasClass('active') === true) {
                        $this.removeClass('active');
                        $('.filters-section').hide();
                        $('.resource-filters.dtop .filterby').removeClass('active');

                    } else if (a.hasClass('active') === false) {
                        $('.filters-section').hide();
                        $('.resource-filters.dtop .filterby').removeClass('active');
                        $this.addClass('active');
                        $('#' + filterId).show();
                    } else {
                        a.removeClass('active');
                        $('.filters-section').hide();
                        $('.resource-filters.dtop .filterby').removeClass('active');
                        $this.addClass('active');
                        $('#' + filterId).show();
                    }

                    var element = $('.product-scroll').jScrollPane(); 
                    var api = element.data('jsp');
                    api.destroy();
                    $('.product-scroll').jScrollPane();
                    // if($('.rlfactive').length > 0){
                    //     if($(window).width() > 736){
                    //         var osleft = $(this).find('span.caret-arrow').offset().left;
                    //         var fos = (osleft - $('#' + filterId).width()) + (($('#' + filterId).width())/2);
                    //         $('#' + filterId).css({'left': fos});
                    //     }
                    // }                                        
                    $('body').scrollTo('.res-filters-search',{duration:'slow', offsetTop : '50'});                    
                }
                e.stopPropagation();
            });

            $(document).on('click', '.topFilter .filterby', function(e) {
                e.preventDefault();
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
                    e.stopPropagation();
            })

            // Fade out specialty tags when x is clicked
            $(document).on('click', '.closeFilter', function() {                
                var dataMatch = $(this).parent().data('match');
                if (dataMatch) {
                    $('input[name="filterRadio"]').each(function() {
                        if ($(this).val() == dataMatch) {
                            $(this).removeAttr('checked').removeClass('filter-retain');
                        }
                    })
                    $(this).parent().fadeOut('slow');
                    $(this).parent().remove();
                    if($('#filterTag .keyword-filter').html() == ""){
                        $('#filterTag .label').css({'display': 'none'});
                    }
                    hds.resourceLib._r2019filtersButton();
                }
                var $checkStatus = hds.resourceLib._returnCheckStatus();
                if($checkStatus == 0){
                    if($('#searchTag .keyword').html()==''){
                        pStatus = false;
                        fStatus = false;
                        roTemp = [];                        
                        $('#loadResourceContent').empty();
                        $('.category-resources-listing').find('.no-matched-result').remove();
                        hds.resourceLib._r2019renderResHtml(roData,0,tasset1); 
                        hds.resourceLib._setPagination(roData.resources.length, tasset1);                       
                    }                   
                }              
            })
            $(document).on('click', '.closeKeyword', function() {
                pstag='';
                searchVal = '';
                $('#resLoading').css({'display':'block'});
                $('.hv-resource-interaction.rlnew .resource-interaction-list').html('');
                $("#resSearch").val('');                    
                $(this).parent().fadeOut('slow');
                $(this).parent().remove();
                $('#searchTag .label').css({
                    'display': 'none'
                });
                $('#searchTag .keyword').html('');
                $('.clearSearchIcon').hide();                    
                if($('#resSearch').val() == ""){
                    var $checkStatus = hds.resourceLib._returnCheckStatus();
                    if($checkStatus == 0){
                        pStatus = false;
                        fStatus = false;
                        roTemp = [];
                        $('.tagList .sfheight a.clear-results').css({'display':'none'});
                    }
                    hds.resourceLib._r2019loadResourceObject(roDataSource);                    
                }
            })

            $(document).on('click', '.clearSearchIcon', function(event) {
                $(this).hide();
                $("#resSearch").val('');            
                event.preventDefault();
            });
            $(document).on('click', '.clear-results', function() {
                $('#resLoading').css({'display':'block'});
                $('.hv-resource-interaction.rlnew .resource-interaction-list').html('');
                $('#filterTag .keyword-filter, #searchTag .keyword').html('');
                $('.category-resources-listing').find('.no-matched-result').remove();
                $("input[name='filterRadio']").removeAttr('checked').removeClass('filter-retain');
                $("#resSearch").val('');
                $('#filterTag .label').css({
                    'display': 'none'
                });
                $('#searchTag .label').css({'display': 'none'});
                $('.clearSearchIcon').css({'display': 'none'});
                hds.resourceLib._hideFilterProductLabel();
                hds.resourceLib._sortByLabelText();
                $('#cta-filters').css({'display':'none'});
                $('.tagList .sfheight a.clear-results').css({'display':'none'});
                mFilterCheck = false;
                pStatus = false;
                fStatus = false;
                roTemp = [];
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                hds.resourceLib._r2019loadResourceObject(roDataSource);
            });

            $(document).on('click', '#mobShowFilters', function() {
                var mTxtVal = '';
                $('body').find('.mobFiltersBG').remove();
                $('body').removeClass('overflow-mobile');
                if ($(window).width() < 991) {
                    if ($('.overlayBox').is(':visible')) {
                        var txtVal = $.trim($('#resSearch').val()),
                            resStatus = localStorage.getItem('resStatus'),
                            paginations = '#loadResourceContent',
                            $defaultURL = roDataSource;
                        if(resStatus == 'false'){                                                    
                            searchVal = txtVal;
                            if(txtVal.length > 0){
                                $('input[name="proFunction"]').each(function() {
                                    var pText = $(this).next('label').text();
                                    if(pText == txtVal){
                                        $(this).trigger('click');
                                        $(this).prop('checked', true);
                                        mTxtVal = txtVal;
                                    }
                                });
                                if(mTxtVal == txtVal){
                                    hds.resourceLib._r2019filtersButton();
                                }else{
                                    $('.slingcontent').css({'display': 'none'});
                                    localStorage.setItem('resStatus', 'true');
                                    $('#searchTag .label').css({
                                        'display': 'inline'
                                    });
                                    $('#resSearch').addClass('filter-retain');
                                    hds.resourceLib._addKeywordSearchTag(txtVal, '#searchTag .keyword');
                                    $('#loadResourceContent').empty();
                                    $(paginations).pagination('destroy');
                                    hds.resourceLib._r2019loadResourceObject($defaultURL + '?fulltext=' + encodeURIComponent(searchVal));
                                }                                     
                                hds.resourceLib._postRecentSearchVal(); 
                                $('.bgCover').hide();                    
                            }else {
                                hds.resourceLib._r2019filtersButton();
                                $('.bgCover').hide();
                            }                            
                        }                  
                    }
                    $('body').scrollTo('#sectionResourceLib',{duration:'slow', offsetTop : '50'});
                }
            })
            $(document).on('click', '#showIndustry, #showContentType, #showProduct, #showEventType', function(event) {
                hds.resourceLib._r2019filtersButton();
                event.preventDefault();
            });

            /* Recent Search Starts */
            $(document).on('focus', '#resSearch', function() {
                $('#recent-search .rs-plist ul').html() == "";
                $('#recent-search .rs-plist').css({'display':'none'});
                hds.resourceLib._getRecentSearchVal(); 
                if($('#resSearch').val() != ""){
                    if ($('#recent-search .rs-list ul').html() == ""){
                        $('#recent-search .rs-list').css({'display':'none'});
                    }else{
                        $('#recent-search').show();
                        $('#recent-search .rs-list').css({'display':'block'});
                    }

                    if ($('#recent-search .rs-plist ul').html() == "") {
                        $('#recent-search .rs-plist').css({'display':'none'});
                    }else{
                        $('#recent-search').show();
                        $('#recent-search .rs-plist').css({'display':'block'});
                    }
                }else{
                    if ($('#recent-search .rs-list ul').html() != "") {
                        $('#recent-search').show();
                        $('#recent-search .rs-list').css({'display':'block'});
                    }                   
                }
            });
            $(document).on("click", "#recent-search .rs-list ul li", function() {
                var flag = false;
                var rsText = $.trim($(this).text());
                $("#resSearch").val($(this).text());
                $('.clearSearchIcon').show();
                $('#recent-search').hide();
                if ($(window).width() > 991) {
                    $('input[name="proFunction"]').each(function() {
                        var pText = $(this).next('label').text();
                        if(pText == rsText){
                            $(this).trigger('click');
                            $(this).prop('checked', true);
                            flag = true;
                        }
                    });
                    if(flag == false){
                        $('.searchResource').trigger('click');
                    }else{
                        hds.resourceLib._r2019filtersButton();
                    }
                }                
            });
            $(document).on("click", "#recent-search .rs-plist ul li", function() {
                $('#recent-search').hide();
                var pLabel = $(this).text();
                $('#resSearch').val(pLabel);
                $('.clearSearchIcon').show();
                $('#recent-search').hide();
                if ($(window).width() > 991) {
                    $('input[name="proFunction"]').each(function() {
                        var pText = $(this).next('label').text();
                        if(pText == pLabel){
                            $(this).trigger('click');
                            $(this).prop('checked', true);
                        }
                    });
                    hds.resourceLib._postRecentSearchVal();
                    hds.resourceLib._r2019filtersButton();
                }
            });
            $(document).on('click','#recent-search .rs-close a', function(){
                $('#recent-search').css({'display':'none'});
            })
            /* Recent Search Ends */
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

            $( window ).on( "orientationchange", function( event ) {
                $('.bgCover').hide();
                $('body').find('.mobFiltersBG').remove();
                $('body').removeClass('overflow-mobile');
                hds.resourceLib._closeOverLayPopup();
                hds.resourceLib._setSortByRelPosition();                
                
                var deviceAgent = navigator.userAgent.toLowerCase();
                var agentID = deviceAgent.match(/(ipad)/);      
                if (agentID) {
                    var $checkStatus = hds.resourceLib._returnCheckStatus();
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        setTimeout(function(){
                        hds.resourceLib._r2019filtersButton();
                        }, 1000);
                    }else{
                        if($checkStatus != 0){
                            $('.show-all-filters').text($('#cta-filters').data('show'));
                            $('#cta-filters').css({'display':'inline-block'});
                            $('.sfilter').css({'display':'none'});   
                        }
                    }
                    var element = $('.product-scroll').jScrollPane(); 
                    var api = element.data('jsp');
                    api.destroy();
                }                    
            });

            $(document).click(function(e) {
                if (!$(e.target).is('#resSearch, #recent-search, #recent-search *')) {
                    $("#recent-search").hide();
                }
                if (!$(e.target).is('.resource-search, .resource-search *')) {
                    $('#resSearch').attr('placeholder',inputPlaceHolder);
                }
                if (!$(e.target).is('.filters-section, .filters-section *, .filter-mob-list, .filter-mob-list *')) {
                    $(".filters-section").hide();
                    $(".filter-mob-list").hide();
                    $('.filterby').removeClass('active');
                }
                if (!$(e.target).is('.sortResources, .sortResources *')) {
                    $(".sort-by-list").hide();
                    $('.sort-by-button').removeClass('border');
                }                
            });
        }
    }
}(window, document, jQuery, hds));

$(function() {
    if ($('#sectionResourceLib').length > 0) {
        hds.resourceLib.init();
    }
})