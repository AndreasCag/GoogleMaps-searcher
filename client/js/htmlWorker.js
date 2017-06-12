/**
 * Created by andre on 06.06.2017.
 */
var removeEl = function (el) {
    let beginDate = Date.now();
    const durationMillisec = 500;

    let tick = () => {
        let curDate = Date.now();
        let delta = curDate - beginDate;
        if (delta < durationMillisec) {
            let opacity = (durationMillisec - delta) / durationMillisec;
            el.style.opacity = opacity;
            requestAnimationFrame(tick);
        } else {
            el.remove();
        }
    }
    requestAnimationFrame(tick);
};



module.exports = {
    removeEl
};