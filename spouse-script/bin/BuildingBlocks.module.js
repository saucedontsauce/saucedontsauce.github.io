import { log, logStyle, $create } from './Overides.module';
log("%BuildingBlocks module loaded", logStyle);


function hr() {
    const hr0 = $create("hr");
    hr0.id = "hr0";
    hr0.style.borderTopLeftRadius = "5px !important";
    hr0.style.borderBottomLeftRadius = "5px !important";
    hr0.className = "page-head-delimiter border-round m-top10 m-bottom10";
    return hr0;
};

//leave this here
log("%BuildingBlocks.module.js loaded", logStyle);

