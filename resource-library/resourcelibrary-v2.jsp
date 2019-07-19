
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
    uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>

<c:set var="featuredlabelsearch" value="${properties.filterbylabelsearch}" scope="request"/>
<c:set var="defaultitle" value="${properties.sortByLabel}" />
<c:set var="defaulval" value="${properties.sortByLabel}" />
<c:set var="defaultitle" value="${fn:substringBefore(defaultitle, '|')}" />
<c:set var="defaulval" value="${fn:substringAfter(defaulval, '|')}" />
<script type="text/javascript">
var pageSize = <%=properties.get("pagesize","10")%>;
</script>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ResourceLibraryModel" var="model" />

<div class="resLibError">${properties.errormessage}</div>
<div class="resSearchResults">${properties.searchresultsmessage}</div>

<div class="" id="sectionResourceLib">
    <div class="disable-click"></div>

    <!-- Filters Launch Link and Mobile Placeholder -->
    <div class="hidden-md hidden-lg col-xs-12 search-overlay">
        <div class="launchLink">
            <a href="javascript:void(0);">${properties.searchboxmessagetext} <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>
        </div>
    </div>
    <div class="bgCover">
        <div class="overlayBox hidden-md hidden-lg">
            <div class="overlayTop clearfix">
                <div class="heading">
                    <h3>${properties.searchlabel}</h3>
                    <div class="close-search"> <a href="javascript:void(0);" title="Close" class="closeOverlay">close</a>
                    </div>
                </div>
                <div class="searchArea"></div>
                <div class="topFilter">
                    <div class="resource-filters"></div>
                    <div class="FilterAreaContent filter-mob-list"></div>
                    <div class="FilterAreaProduct filter-mob-list"></div>
                    <div class="FilterAreaIndustry filter-mob-list"></div>
                    <div class="FilterAreaEvent filter-mob-list"></div>
                </div>
            </div>
            <div class="filtrSideBar" id="scrollMe"></div>
            <div class="FilterAreaBtnPop">
                <div class="clearfix"></div>
                <div class="show-results">
                    <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="mobShowFilters">${properties.showresultslabel}</a>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="clear-results">
                    <div class="btn-square-red"> <a href="#" target="_self">${properties.clearallfilterslabel}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Filters Section -->
    <div class="res-filters-search clearfix">
        <div class="content-container clearfix" style="position: relative;">
            <div class="col-sm-4 hidden-xs hidden-sm" id="resource-search">
                <div class="resource-search">
                    <input type="text" name="resSearch" id="resSearch" placeholder="${properties.searchboxmessagetext}"> <span class="remove glyphicon glyphicon-remove glyphicon-white clearSearchIcon"></span>
                    <span class="glyphicon glyphicon-search searchResource" aria-hidden="true"></span>
                </div>
                <div class="errorSearchField alert alert-danger fade in">${properties.searchalert}</div>
                <div id="recent-search">
                    <div class="rs-close"> <a href="javascript:void(0);" title="Close"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>
                    <div class="rs-list">
                        <div class="rs-title">${properties.recentsearcheslabel}</div>
                        <ul></ul>
                    </div>
                    <div class="rs-plist">
                        <div class="rs-title">${properties.productsandsolutionslabel}</div>
                        <ul></ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 resource-filters dtop hidden-xs hidden-sm">
                <div class="rl-all-filters-label">${properties.filterbylabel}</div>
                <div class="rl2019-filters-box">
                    <div class="fbox1" style="display:inline-block; float: left;">
                        <a class="filterby" href="javascript:void(0);" data-refilter="FilteyContentType"> <span class="title">${properties.filterbycontentlabel}</span>
                            <span class="caret-arrow"></span>
                        </a>
                        <c:if test="${properties.hidefilterbyproduct}">
                            <a class="filterby" href="javascript:void(0);" data-refilter="FilteyProductType"> <span class="title">${properties.filterbyproductlabel}</span>
                                <span class="caret-arrow"></span>
                            </a>
                        </c:if>
                        <a class="filterby" href="javascript:void(0);" data-refilter="FilterByIndustry"> <span class="title">${properties.filterbyindustrylabel}</span>
                            <span class="caret-arrow"></span>
                        </a>
                        <c:if test="${!properties.hidefilterbyevent}">
                            <a class="filterby rl2019-pop-on" href="javascript:void(0);" data-refilter="FilteByEventType"> <span class="title">${properties.filterbyeventlabel}</span>
                                <span class="caret-arrow"></span>
                            </a>
                        </c:if>
                        <c:if test="${not empty properties.objectivesttitle}">
                            <a class="filterby rl2019-pop-on" href="javascript:void(0);" data-refilter="FilteByObjectiveType">	<span class="title">${properties.objectivesttitle}</span>
                                <span class="caret-arrow"></span>
                            </a>
                        </c:if>
                        <c:if test="${not empty properties.topicstitle}">
                            <a class="filterby rl2019-pop-on" href="javascript:void(0);" data-refilter="FilteByTopicType">	<span class="title">${properties.topicstitle}</span>
                                <span class="caret-arrow"></span>
                            </a>
                        </c:if>
                        <c:if test="${not empty properties.servicettitle}">
                            <a class="filterby rl2019-pop-on" href="javascript:void(0);" data-refilter="FilteByServiceType">	<span class="title">${properties.servicettitle}</span>
                                <span class="caret-arrow"></span>
                            </a>
                        </c:if> 
                    </div>
                    <div class="fbox2" style="display:inline-block; float: right;">
                        <a href="javascript:void(0);" class="rl2019-all-filters">All Filters <span class="glyphicon glyphicon-filter"></span></a>
                        <c:if test="${empty properties.hidesortbyfunct}">
                            <div class="sortResources rl2019-pop-off" id="sortResources">
                                <div class="sort-by-button">
                                    <div class="slabel">${defaultitle}</div>
                                    <div class="stitle" data-dtitle="${defaulval}">${defaulval}</div>
                                    <div class="caret-arrow"></div>
                                </div>
                                <div class="sort-by-list">
                                    <ul>
                                        <c:forEach items="${model.sortByType}" var="data" varStatus="status">
                                            <c:set var="sortCriterialabel" value="${hdscorp:encodeForHTML(xssAPI, data['sortCriterialabel'])}" />
                                            <c:set var="sortCriterialabel" value="${hdscorp:removeDoubleQuotes(sortCriterialabel)}" />
                                            <c:set var="sortCriteriavalue" value="${hdscorp:filterHTML(xssAPI,data['sortCriteriavalue'])}" />
                                            <li id="${fn:toLowerCase(sortCriteriavalue)}" value="${fn:replace(fn:replace(sortCriterialabel,'[', ''),']', '')}"><a href="javascript:void(0);">${sortCriterialabel}</a>
                                            </li>
                                        </c:forEach>
                                    </ul>
                                </div>
                            </div>
                        </c:if>
                    </div>
                </div>
                <div class="rl2019-filters-box-cta col-sm-4"> 
                    <a href="javascript:void(0);" class="rl2019-clear">Clear</a> | 
                    <a href="javascript:void(0);" class="rl2019-cancel">Cancel</a> 
                    <div class="btn-square-red rl2019-apply"> 
                        <a href="javascript:void(0);" class="animateLink">Apply Filter</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="fcontainer">
        <div class="clearfix filters-section" id="FilterByIndustry" style="width:900px;">
            <div class="filters-list">
                <ul class="FilterByIndustryList col-sm-4">
                    <c:forEach items="${model.filterByIndustry}" var="data" varStatus="status">
                        <c:set var="industrytag" value="${hdscorp:encodeForHTML(xssAPI, data['industrytag'])}" />
                        <c:set var="industrytag" value="${hdscorp:removeDoubleQuotes(industrytag)}" />
                        <li class="col-xs-12">
                            <div class="checkbox">
                                <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['industryid'])}" value="${fn:replace(fn:replace(industrytag,'[', ''),']', '')}">
                                <label for="${hdscorp:filterHTML(xssAPI,data['industryid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['industrylabel'])}</span>
                                </label>
                            </div>
                        </li>
                        <c:if test="${status.count % 5 == 0}">
                </ul>
                <ul class="FilterByIndustryList col-sm-4">
                    </c:if>
                    </c:forEach>
                </ul>
                <div class="clearfix"></div>
                <div class="show-results hidden-sm hidden-xs">
                    <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showIndustry">${properties.showresultslabel}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix filters-section" id="FilteyProductType" style="width:600px;">
            <div class="filters-list">
                <div class="product-scroll ">
                    <c:if test="${not empty properties.innerlablesolution}">
                        <div class="ps-filters-label">${properties.innerlablesolution}</div>
                        <ul class="FilterBySolutionList clearfix">
                            <c:forEach items="${model.filterBySolution}" var="sdata" varStatus="status">
                                <c:set var="solutiontag" value="${hdscorp:encodeForHTML(xssAPI, sdata['solutiontag'])}" />
                                <c:set var="solutiontag" value="${hdscorp:removeDoubleQuotes(solutiontag)}" />
                                <li class="col-xs-12">
                                    <div class="checkbox">
                                        <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,sdata['solutionid'])}" value="${fn:replace(fn:replace(solutiontag,'[', ''),']', '')}">
                                        <label for="${hdscorp:filterHTML(xssAPI,sdata['solutionid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,sdata['solutionlable'])}</span>
                                        </label>
                                    </div>
                                </li>
                            </c:forEach>
                        </ul>
                    </c:if>
                    <c:if test="${not empty properties.innerlableproduct}">
                        <div class="ps-filters-label">${properties.innerlableproduct}</div>
                    </c:if>
                    <ul class="FilterByProductList clearfix">
                        <c:forEach items="${model.filterByProduct}" var="data" varStatus="status">
                            <c:set var="producttag" value="${hdscorp:encodeForHTML(xssAPI, data['producttag'])}" />
                            <c:set var="producttag" value="${hdscorp:removeDoubleQuotes(producttag)}" />
                            <li class="col-xs-12">
                                <div class="checkbox">
                                    <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['productid'])}" value="${fn:replace(fn:replace(producttag,'[', ''),']', '')}">
                                    <label for="${hdscorp:filterHTML(xssAPI,data['productid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['productlabel'])}</span>
                                    </label>
                                </div>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
                <div class="clearfix"></div>
                <div class="show-results hidden-sm hidden-xs">
                    <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showProduct">${properties.showresultslabel}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix filters-section" id="FilteyContentType" style="width:900px;">
            <div class="filters-list">
                <ul class="FilterByContentList col-sm-4">
                    <c:forEach items="${model.filterByContentType}" var="data" varStatus="status">
                        <c:set var="contenttag" value="${hdscorp:encodeForHTML(xssAPI, data['contenttag'])}" />
                        <c:set var="contenttag" value="${hdscorp:removeDoubleQuotes(contenttag)}" />
                        <li class="col-xs-12">
                            <div class="checkbox">
                                <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['contentid'])}" value="${fn:replace(fn:replace(contenttag,'[', ''),']', '')}">
                                <label for="${hdscorp:filterHTML(xssAPI,data['contentid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['contentlabel'])}</span>
                                </label>
                            </div>
                        </li>
                        <c:if test="${status.count % 7 == 0}">
                </ul>
                <ul class="FilterByContentList col-sm-4">
                    </c:if>
                    </c:forEach>
                </ul>
                <div class="clearfix"></div>
                <div class="show-results hidden-sm hidden-xs">
                    <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showContentType">${properties.showresultslabel}</a>
                    </div>
                </div>
            </div>
        </div>
        <c:if test="${!properties.hidefilterbyevent}">
            <div class="clearfix filters-section" id="FilteByEventType" style="width:500px;">
                <div class="filters-list">
                    <ul class="FilterByEventList col-sm-12">
                        <c:forEach items="${model.filterByEvent}" var="data" varStatus="status">
                            <c:set var="eventtag" value="${hdscorp:encodeForHTML(xssAPI, data['eventtag'])}" />
                            <c:set var="eventtag" value="${hdscorp:removeDoubleQuotes(eventtag)}" />
                            <li class="col-xs-12">
                                <div class="checkbox">
                                    <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['eventid'])}" value="${fn:replace(fn:replace(eventtag,'[', ''),']', '')}">
                                    <label for="${hdscorp:filterHTML(xssAPI,data['eventid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['eventlabel'])}</span>
                                    </label>
                                </div>
                            </li>
                            <c:if test="${status.count % 7 == 0}">
                    </ul>
                    <ul class="FilteByEventTypeList col-sm-4">
                        </c:if>
                        </c:forEach>
                    </ul>
                    <div class="clearfix"></div>
                    <div class="show-results hidden-sm hidden-xs">
                        <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showEventType">${properties.showresultslabel}</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:if>
        <c:if test="${not empty properties.servicettitle}">
            <div class="clearfix filters-section" id="FilteByServiceType" style="width:600px;">
                <div class="filters-list">
                    <ul class="FilteByServiceList col-sm-12">
                        <c:forEach items="${model.filterByServices}" var="data" varStatus="status">
                            <c:set var="sertag" value="${hdscorp:encodeForHTML(xssAPI, data['sertag'])}" />
                            <c:set var="sertag" value="${hdscorp:removeDoubleQuotes(sertag)}" />
                            <li class="col-xs-12">
                                <div class="checkbox">
                                    <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['serviceid'])}" value="${fn:replace(fn:replace(sertag,'[', ''),']', '')}">
                                    <label for="${hdscorp:filterHTML(xssAPI,data['serviceid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['servicelabel'])}</span>
                                    </label>
                                </div>
                            </li>
                            <c:if test="${status.count % 7 == 0}">
                    </ul>
                    <ul class="FilteByServiceList col-sm-4">
                        </c:if>
                        </c:forEach>
                    </ul>
                    <div class="clearfix"></div>
                    <div class="show-results hidden-sm hidden-xs">
                        <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showServiceType">${properties.showresultslabel}</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:if>
        <c:if test="${not empty properties.objectivesttitle}">
            <div class="clearfix filters-section" id="FilteByObjectiveType" style="width:600px;">
                <div class="filters-list">
                    <ul class="FilteByObjectiveList col-sm-12">
                        <c:forEach items="${model.filterByBobjectives}" var="data" varStatus="status">
                            <c:set var="objectivestag" value="${hdscorp:encodeForHTML(xssAPI, data['objectivestag'])}" />
                            <c:set var="objectivestag" value="${hdscorp:removeDoubleQuotes(objectivestag)}" />
                            <li class="col-xs-12">
                                <div class="checkbox">
                                    <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['objectivesid'])}" value="${fn:replace(fn:replace(objectivestag,'[', ''),']', '')}">
                                    <label for="${hdscorp:filterHTML(xssAPI,data['objectivesid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['objectiveslabel'])}</span>
                                    </label>
                                </div>
                            </li>
                            <c:if test="${status.count % 7 == 0}">
                    </ul>
                    <ul class="FilteByObjectiveList col-sm-4">
                        </c:if>
                        </c:forEach>
                    </ul>
                    <div class="clearfix"></div>
                    <div class="show-results hidden-sm hidden-xs">
                        <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showObjectiveType">${properties.showresultslabel}</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:if>
        <c:if test="${not empty properties.topicstitle}">
            <div class="clearfix filters-section" id="FilteByTopicType" style="width:600px;">
                <div class="filters-list">
                    <ul class="FilteByTopicList col-sm-12">
                        <c:forEach items="${model.filterByTopics}" var="data" varStatus="status">
                            <c:set var="topictag" value="${hdscorp:encodeForHTML(xssAPI, data['topictag'])}" />
                            <c:set var="topictag" value="${hdscorp:removeDoubleQuotes(topictag)}" />
                            <li class="col-xs-12">
                                <div class="checkbox">
                                    <input class="filters" type="checkbox" name="filterRadio" id="${hdscorp:filterHTML(xssAPI,data['topicid'])}" value="${fn:replace(fn:replace(topictag,'[', ''),']', '')}">
                                    <label for="${hdscorp:filterHTML(xssAPI,data['topicid'])}" class="hds-icon"><span>${hdscorp:filterHTML(xssAPI,data['topiclabel'])}</span>
                                    </label>
                                </div>
                            </li>
                            <c:if test="${status.count % 7 == 0}">
                    </ul>
                    <ul class="FilteByTopicList col-sm-4">
                        </c:if>
                        </c:forEach>
                    </ul>
                    <div class="clearfix"></div>
                    <div class="show-results hidden-sm hidden-xs">
                        <div class="btn-square-red"> <a href="javascript:void(0);" target="_self" id="showTopicType">${properties.showresultslabel}</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:if>
    </div>
    </div>

    <!-- Filtered Tag List -->
    <div class="content-container clearfix">
        <div class="col-md-12 col-xs-12 tagList">
            <div class="sfilter">
                <div class="sfheight">
                    <div class="groupedby" id="searchTag">
                        <div class="label">${properties.searchbylabel}</div>
                        <div class="keyword"></div>
                    </div>
                    <div class="groupedby" id="filterTag">
                        <div class="label">${featuredlabelsearch}</div>
                        <div class="keyword-filter"></div>
                    </div> <a class="clear-results" href="javascript:void(0);">${properties.clearallfilterslabel}</a>
                </div>
            </div> 
            <span id="cta-filters" data-hide="${properties.hideallfilterslabel}" data-show="${properties.showallfilterslabel}">
                <a class="show-all-filters" href="javascript:void(0);">${properties.showallfilterslabel}</a>
                <a class="clear-results" href="javascript:void(0);">${properties.clearallfilterslabel}</a>
            </span>
        </div>
    </div>


</div>
<div id="hv-resource-interaction" class="hv-resource-interaction rlnew clearfix">
    <div id="resLoading"></div>
    <div class="content-container">
        <div class="resource-interaction-list clearfix row-centered"></div>
        <div id="loadResourceContent" class="light-theme simple-pagination"></div>
    </div>
</div>
<style type="text/css">
    .hv-resource-interaction.rlnew{
        padding-top: 0;
    }
    .hv-resource-interaction.rlnew .resource-interaction-list{
        min-height: 400px;
        display: flex;
        flex-wrap: wrap;
    }
    .hv-resource-interaction #resLoading{
        background: url("/etc/clientlibs/hdscorp/main/images/load-indicator.gif") no-repeat 50% 0 #fff;
        top:60px;
        height: 470px;
        left: 3px;
        z-index:8;
        position: absolute;
        width: 100%;
    }
    /*Updated CSS*/
    div.resource-tile:nth-last-child(3){order:0; display: flex;}
    div.resource-tile:nth-last-child(2){order:9; display: flex;}
    div.resource-tile:nth-last-child(1){order:14; display: flex;}
    div.resource-tile:nth-last-child(5){order:6; display: flex;}
    div.resource-tile:nth-last-child(4){order:10; display: flex;}
    /*Updated css END*/
    div.resource-tile:nth-child(1){order:1}
    div.resource-tile:nth-child(2){order:2}
    div.resource-tile:nth-child(3){order:3}
    div.resource-tile:nth-child(4){order:4}
    div.resource-tile:nth-child(5){order:5}
    div.resource-tile:nth-child(6){order:7}
    div.resource-tile:nth-child(7){order:8}
    div.resource-tile:nth-child(8){order:11}
    div.resource-tile:nth-child(9){order:12}
    div.resource-tile:nth-child(10){order:13}
    div.resource-tile:nth-child(11){order:15}
    div.resource-tile:nth-child(12){order:16}
    div.resource-tile:nth-child(13){order:17}
    div.resource-tile:nth-child(14){order:18}
    div.resource-tile:nth-child(15){order:19}
    div.resource-tile:nth-child(16){order:20}

    .rl-fsearch-order div.resource-tile:nth-last-child(3){order:0; display: flex;}
    .rl-fsearch-order div.resource-tile:nth-last-child(2){order:11; display: flex;}
    .rl-fsearch-order div.resource-tile:nth-last-child(1){order:16; display: flex;}
    .rl-fsearch-order div.resource-tile:nth-last-child(5){order:7; display: flex;}
    .rl-fsearch-order div.resource-tile:nth-last-child(4){order:12; display: flex;}

    .rl-fsearch-order div.resource-tile:nth-child(1){order:1}
    .rl-fsearch-order div.resource-tile:nth-child(2){order:2}
    .rl-fsearch-order div.resource-tile:nth-child(3){order:3}
    .rl-fsearch-order div.resource-tile:nth-child(4){order:4}
    .rl-fsearch-order div.resource-tile:nth-child(5){order:5}
    .rl-fsearch-order div.resource-tile:nth-child(6){order:6}
    .rl-fsearch-order div.resource-tile:nth-child(7){order:8}
    .rl-fsearch-order div.resource-tile:nth-child(8){order:9}
    .rl-fsearch-order div.resource-tile:nth-child(9){order:10}
    .rl-fsearch-order div.resource-tile:nth-child(10){order:13}
    .rl-fsearch-order div.resource-tile:nth-child(11){order:14}
    .rl-fsearch-order div.resource-tile:nth-child(12){order:15}
    .rl-fsearch-order div.resource-tile:nth-child(13){order:17}
    .rl-fsearch-order div.resource-tile:nth-child(14){order:18}
    .rl-fsearch-order div.resource-tile:nth-child(15){order:19}
    .rl-fsearch-order div.resource-tile:nth-child(16){order:20}
    .rl-fsearch-order div.resource-tile:nth-child(17){order:21}
    .rl-fsearch-order div.resource-tile:nth-child(18){order:22}
    .rl-fsearch-order div.resource-tile:nth-child(19){order:23}

    /*New CSS*/
    .hv-resource-interaction.rlnew .resource-interaction-list{display:flex; flex-wrap:wrap;}
    .hv-resource-interaction.rlnew .resource-tile{display:flex;}
    .hv-resource-interaction.rlnew .resource-tile.featured{margin-bottom:30px;}
    .hv-resource-interaction.rlnew .resource-tile .res-int-item{display:flex;}
    .hv-resource-interaction.rlnew .resource-tile .res-int-item a{display:flex; flex-direction:column;}
    .hv-resource-interaction.rlnew .resource-tile .res-int-item a:before, 
    .hv-resource-interaction.rlnew .resource-tile .res-int-item a:after{display:none;}
    .hv-resource-interaction.rlnew .resource-tile .res-int-item a .pop{display:flex; height:148px;}
    .hv-resource-interaction.rlnew .resource-tile .res-int-item a .res-int-title{display:flex; flex-grow:2; flex-direction:column;}
    .hv-resource-interaction.rlnew.incomplete_grid .resource-tile.featured, 
    .hv-resource-interaction.rlnew.incomplete_grid .resource-tile.promo {display:none!important;}
    
    .hv-resource-interaction.rlnew .resource-tile.col-centered{
        margin-right:0;
    }
    .hv-resource-interaction.rlnew .resource-tile.promo{
        text-align: center;
    }
    .hv-resource-interaction.rlnew .resource-tile.promo .res-int-item{
        background-position: center center;
        background-size: cover;
    }
    .hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a{
        color: #ffffff;
        font-weight: 300;
    }
    .hv-resource-interaction.rlnew .resource-tile.promo .animateLink{
        background-color: #ce0000;
        color: #fff;
        display: inline-block;
        padding: 8px 35px;
        border: 1px solid #ce0000;
        transition: all .3s ease-out;
        -webkit-transition: all .3s ease-out;
        text-decoration: none;
        position: relative;
        min-width: 200px;
        margin-bottom: 15px;
    }
    .hv-resource-interaction.rlnew .resource-tile.promo:hover .animateLink{
        background-color: transparent;
        color: #ffffff;
        border: 1px solid #ffffff;
    }
    .hv-resource-interaction.rlnew .resource-tile .res-int-item.featured a {
        display: block;
    }
    .hv-resource-interaction.rlnew .resource-tile .res-int-item.featured a .pop {
        display: block;
        height: initial;
    }
    .hv-resource-interaction .resource-tile .res-int-item .res-int-title h3 {
        font-size: 1.125rem;
        font-weight: 600;
        line-height: normal;
    }            
    .rl2019-filters-box{

    }
    .res-filters-search.rlfactive .resource-filters {
        position: absolute;
        background: #efefef;
        margin: 0;
        text-align: left;
        border: 1px solid #dedede;
        padding: 25px 15px;
        z-index: 999;
        width: 100%;
    }
    .res-filters-search .resource-filters .rl-all-filters-label,
    .res-filters-search .resource-filters .rl2019-filters-box-cta{
        display: none;
    }
    .res-filters-search .resource-filters .rl2019-pop-on{
        display: none;
    }.res-filters-search.rlfactive .resource-filters .rl2019-pop-on{
        display: inline-block;
    }
    .res-filters-search.rlfactive .resource-filters .rl-all-filters-label,
    .res-filters-search.rlfactive .resource-filters .rl2019-filters-box-cta{
        display: block;
    }            
    .res-filters-search.rlfactive .resource-filters .rl2019-all-filters{
        display: none;
    }
    .rl2019-filters-box .rl2019-pop-on{
        display: none;
    }
    .res-filters-search .resource-filters .rl2019-filters-box .rl2019-pop-off{
        display: block;
    }
    .res-filters-search.rlfactive .resource-filters .rl2019-filters-box .rl2019-pop-off{
        display: none;
    }
    .res-filters-search .resource-filters .rl2019-all-filters{
        font-size: 0.875rem;
        text-transform: uppercase;
        color: #cc0000;
        font-weight: 800;
        display: inline-block;
        margin-right: 6px;
        text-decoration: none;
    }
    .res-filters-search.rlfactive .resource-filters .rl-all-filters-label {
        padding: 0 15px 10px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .res-filters-search.rlfactive .resource-filters .rl2019-filters-box-cta .rl2019-clear,
    .res-filters-search.rlfactive .resource-filters .rl2019-filters-box-cta .rl2019-cancel{
        text-decoration: none;
        color: #333333;
        margin: 0 10px;
        font-size: 1.125rem;
    }
    .res-filters-search.rlfactive .resource-filters .rl2019-filters-box-cta .rl2019-apply{
        display: inline-block;
        margin-left: 10px;
    }
    .res-filters-search.rlfactive .resource-filters .filterby{
        margin: 5px 20px 5px 0px;
    }

    .res-filters-search.filterpop .filters-section .filters-list .show-results{
        display: none;
    }

    .res-filters-search .fcontainer{
        position: relative;
        max-width: 1280px;
        margin: 0 auto;
    }
    .res-filters-search .fcontainer .filters-section{
        position:absolute;
        right:0;
    }
    .res-filters-search.rlfactive .fcontainer .filters-section{
        position: absolute;
        left: 2px;
        top: 83px;
        margin: 0;
    }

    /* Overwrite CSS */
    .resourcelibrarynew .sortResources .sort-by-button{
        padding: 5px 15px;
    }
    .resourcelibrarynew .res-filters-search .filters-section{
        z-index: 999;
    }
    .resourcelibrarynew .sortResources .sort-by-list ul li{
        text-align: left;
    }
	@media screen and (max-width: 1280px){
	.hv-resource-interaction.rlnew .resource-tile .res-int-item a .pop{
			height: auto;
		}
	}
	@media screen and (max-width: 1200px){
		.hv-resource-interaction .resource-tile .res-int-item .res-int-title h3{
		    font-size: .9rem;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a{
			font-size:.9rem;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a .res-int-title {
			position: relative;
			top: 35%;
		}
	}
	@media screen and (max-width: 1070px){
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a .res-int-title {
			position: relative;
			top: 28%;
		}
		.hv-resource-interaction .resource-tile.promo .res-int-item .res-int-title h3{
			margin-bottom:0;
		}
	}
	@media screen and (max-width: 991px){
		.hv-resource-interaction.rlnew .resource-tile .res-int-item a .pop{
		    display: block;
			height: 148px
		}
		.hv-resource-interaction.rlnew .resource-tile .res-int-item.featured a .pop{
		    height: 148px;
		}
		.hv-resource-interaction.rlnew .res-int-item .res-featured{
		    top: -148px;
		}
		.hv-resource-interaction.rlnew .resource-tile,
		.hv-resource-interaction.rlnew .resource-tile .res-int-item{
			display:block;
			width:100%;
		}
		.hv-resource-interaction.rlnew .resource-tile .res-int-item a{
			height:auto !important;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item{
		    background-position: top center;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a .res-int-title{
		    position: inherit;
			top: 0;
		}
		.hv-resource-interaction.rlnew .resource-tile .res-int-item .res-int-title h3 {
			font-size: 1.125rem;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item a {
			font-size: 1rem;
		}
		.hv-resource-interaction.rlnew .resource-tile.promo .res-int-item .res-int-title h3 {
			margin-bottom: 11px;
		}
	}
</style>