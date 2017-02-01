; (function ($) {

    // *********************************************
    //              Infrastructure
    // *********************************************
    var defaults = {
        width: "24px",
        height: "24px",
        clickStart: function(){},
        clickStop: function(){},
        changeValue: function(newValue, oldValue){},
        isStop: true
    };

    function BtnStartStop(element, options) {
        this.config = $.extend({}, defaults, options);
        this.element = element;
        element.btnStartStop = this;
        this.init();
    }

    $.fn.btnStartStop = function (options) {
        var btn = new BtnStartStop(this.first(), options);
        return btn;
    }

    BtnStartStop.prototype.init = function () {
        this.element.addClass('btnStartStop');
        this._updateBackground();
        this.element.css({
            'width': this.config.width,
            'height': this.config.height
        });
        this.element.click($.proxy(function () {
            this.changeBtnValue();
        }, this));
    }

    // *********************************************
    //                Interface
    // *********************************************
    BtnStartStop.prototype.getValue = function () {
        return this.config.isStop;
    }

    BtnStartStop.prototype.setValue = function (value) {
        if(this.config.changeValue) this.config.changeValue(value, this.config.isStop);
        this.config.isStop = value;
        this._updateBackground();
    }

    BtnStartStop.prototype.changeBtnValue = function () {
        this.setValue(!this.config.isStop);
        this._updateBackground();
        var behavior = this._getClickBehavior();
        if (behavior) behavior();
    }

    // *********************************************
    //                Encapsulation
    // *********************************************
    BtnStartStop.prototype.STOP_CLASS = 'btnStartStop-imgStop';
    BtnStartStop.prototype.START_CLASS = 'btnStartStop-imgStart';

    BtnStartStop.prototype._getImgClass = function() {
        return this.config.isStop ?  this.START_CLASS: this.STOP_CLASS;
    }

    BtnStartStop.prototype._updateBackground = function () {
        this.element.removeClass(this.STOP_CLASS);
        this.element.removeClass(this.START_CLASS);
        var imgClass = this._getImgClass();
        this.element.addClass(imgClass);
    }

    BtnStartStop.prototype._getClickBehavior = function () {
        return this.config.isStop ? this.config.clickStart : this.config.clickStop;
    }

})(jQuery);