var easyWai = function(options) {
  this._options = options;

  $body = $('body');
  $this = this;

  this._options = $.extend(true, {
    position: {
      side: 'right',
      top: '20px',
    },
    fade: false,
    features: {
      increaseFont: 'הגדלת פונט',
      decreaseFont: 'הקטנת פונט',
      readableFont: 'פונט קריא',
      monochrome: 'גווני אפור',
      highContrast: 'ניגודיות גבוהה',
      lowContrast: 'ניגודיות נמוכה',
      lightBG: 'רקע בהיר',
      highlightLinks: 'הדגשת קישורים'
    },
    accStatement: {
      text: 'הצהרת נגישות',
      url: false
    },
    customIcon: false,
    saveSettings: false,
    skipContent: false
  }, options);

  this._template = '';
  this._element;
  this._btn;

  this._settings = {
    fontSize: 100,
    readableFont: false,
    monochrome: false,
    highContrast: false,
    lowContrast: false,
    lightBG: false,
    highlightLinks: false
  }

  this.init();
};

easyWai.prototype = {
  init: function () {

    if (!!this._options.skipContent){
      this.buildSkipContentBtn();
    }

    
    this._template += '<div id="easywai" aria-expanded="false" class="easywai--' + this._options.position.side + '">';
    this.buildBtn();
    
    this._template += '<div id="easywai__inner">';
    
    this.buildMenu();
    this.buildAccStatement();
    
    this._template += '</div>'; // end easywai__inner
    
    this._template += '</div>'; // end easywai
    
    $body.prepend(this._template);
    if(!!this._options.fade){
      $body.addClass('easyWai-body easyWai-fade');
    }
    $body.addClass('easyWai-body');
    
    
    this.setStyling();
    this.attachEvents();

    // is you choose to save the settings
    if (!!this._options.saveSettings){
      for ( setting in this._settings ){

        var _setting = this.helpers.getCookie(setting);

        if (!!_setting){
          this._settings[setting] = _setting;
          if (setting != "fontSize"){
            this.methods[setting]();
          }
          else{
            this.methods['setFontSize']();
          }
        }

      } // end for in
    }

    window.easyWai = this;

  },
  buildMenu: function() {
    this._template += '<ul id="easywai__features" aria-hidden="true" role="navigation">';

    // attach events
    for( var feature in this._options.features ){
      if( ! this._options.features[feature] )
        continue;
      this._template += '<li class="easywai_feature">';
      this._template += '<button tabindex="0" role="button" id="easywai__feature--' + feature + '">' + this._options.features[feature] + '</button>';
      this._template += '</li>';
    }

    this._template += '<li class="easywai_feature">';
    this._template += '<button tabindex="0" role="button" id="easywai__feature--reset">איפוס הגדרות</button>';
    this._template += '</li>';

    this._template += '</ul>';
  },
  buildBtn: function() {
    this._template += '<button tabindex="0" role="button" id="easywai__btn" aria-label="פתח תפריט נגישות" title="פתח תפריט נגישות">{{img}}</button>';

    if ( !! this._options.customIcon ){
      this._template = this._template.replace('{{img}}', '')
    } else{
      this._template = this._template.replace('{{img}}', '<i id="easywai__icon" class="fas fa-universal-access"></i>');
    }
  },
  buildAccStatement: function(){
    if( ! this._options.accStatement.url ){
      return;
    }

    this._template += '<a id="easywai-accStat-link" tabindex="0" role="link" href="' + this._options.accStatement.url + '">' + this._options.accStatement.text + '</a>'
  },
  buildSkipContentBtn: function () {
    this._template += '<a id="easywai-skip-content" tabindex="1" accesskey="s" href="' + this._options.skipContent + '" role="link">דלג לתוכן</a>'
  },
  setStyling: function(){
    this._btn = document.getElementById('easywai__btn');
    this._element = document.getElementById('easywai');
    var btnWidth = this._btn.offsetWidth;
    var swapedSide;

    this._element.style['top'] = this._options.position.top;
  },
  attachEvents: function(){
    document.getElementById('easywai__btn').addEventListener('click', this.methods['toggleMenu']);

    for (var feature in this._options.features) {
      if (!this._options.features[feature])
        continue;
      document.getElementById('easywai__feature--' + feature).addEventListener('click', this.methods[feature]);
    }
    document.getElementById('easywai__feature--reset').addEventListener('click', this.methods['reset']);
  }
}

easyWai.prototype.methods = {
  toggleMenu: function(){
    if ( $('#easywai').attr('aria-expanded') == 'false' ){
      $('#easywai').attr('aria-expanded', true);
      $('#easywai__inner').attr('aria-hidden', false);
    } else{
      $('#easywai').attr('aria-expanded', false);
      $('#easywai__inner').attr('aria-hidden', true);
    }
  },
  reset: function(){
    $body.removeClass(
      'easywai-font-size-' + $this._settings.fontSize +  ' ' +
      'easywai-readable-font' + ' ' +
      'easywai-monochrome' + ' ' +
      'easywai-low-contrast' + ' ' +
      'easywai-high-contrast' + ' ' +
      'easywai-light-background' +  ' ' +
      'easywai-highlight-links'
    );

    for (setting in $this._settings) {
      $this.helpers.eraseCookie(setting);
    }

    $body.find('.easywai_feature button').removeClass('easywai_feature--active');
  },
  setFontSize: function(){
    if ($this._settings.fontSize == 100) {
      return
    }

    $body.addClass('easywai-font-size-' + $this._settings.fontSize);
  },
  increaseFont: function(){
    if ($this._settings.fontSize >= 200) {
      return
    }

    $body.removeClass('easywai-font-size-' + $this._settings.fontSize);
    $this._settings.fontSize = parseInt($this._settings.fontSize) + 10;
    $this.helpers.setCookie('fontSize', $this._settings.fontSize, 30);
    $body.addClass('easywai-font-size-' + $this._settings.fontSize);
  },
  decreaseFont: function(){
    if ($this._settings.fontSize <= 100) {
      $this.helpers.eraseCookie('fontSize');
      return
    }

    $body.removeClass('easywai-font-size-' + $this._settings.fontSize);
    $this._settings.fontSize = parseInt($this._settings.fontSize) - 10;
    $this.helpers.setCookie('fontSize', $this._settings.fontSize, 30);
    $body.addClass('easywai-font-size-' + $this._settings.fontSize);
  },
  readableFont: function(){
    if( $body.hasClass('easywai-readable-font') ){
      $body.removeClass('easywai-readable-font');
      $this._settings.readableFont = false;
      $this.helpers.eraseCookie('readableFont');
    } else{
      $body.addClass('easywai-readable-font');
      $this._settings.readableFont = true;
      $this.helpers.setCookie('readableFont',true,30);
    }
    $(this).toggleClass('easywai_feature--active');
  },
  monochrome: function(){
    if ($body.hasClass('easywai-monochrome')) {
      $body.removeClass('easywai-monochrome');
      $this._settings.monochrome = false;
      $this.helpers.eraseCookie('monochrome');
    } else {
      $body.addClass('easywai-monochrome');
      $this._settings.monochrome = true;
      $this.helpers.setCookie('monochrome', true, 30);
    }
    $(this).toggleClass('easywai_feature--active');
  },
  highContrast: function(){
    if ($body.hasClass('easywai-high-contrast')) {
      $body.removeClass('easywai-high-contrast');
      $this._settings.highContrast = false;
      $this.helpers.eraseCookie('highContrast');
    } else {
      $body.addClass('easywai-high-contrast');
      $this._settings.highContrast = true;
      $this.helpers.setCookie('highContrast', true, 30);
    }
    $(this).toggleClass('easywai_feature--active');
  },
  lowContrast: function(){
    if ($body.hasClass('easywai-low-contrast')) {
      $body.removeClass('easywai-low-contrast');
      $this._settings.lowContrast = false;
      $this.helpers.eraseCookie('lowContrast');
    } else {
      $body.addClass('easywai-low-contrast');
      $this._settings.lowContrast = true;
      $this.helpers.setCookie('lowContrast', true, 30);
    }
    $(this).toggleClass('easywai_feature--active');
  },
  lightBG: function(){
    if ($body.hasClass('easywai-light-background')) {
      $body.removeClass('easywai-light-background');
      $this._settings.lightBG = false;
      $this.helpers.eraseCookie('lightBG');
    } else {
      $body.addClass('easywai-light-background');
      $this._settings.lightBG = true;
      $this.helpers.setCookie('lightBG', true, 30);
    }
    $(this).toggleClass('easywai_feature--active');
  },
  highlightLinks: function(){
    if ($body.hasClass('easywai-highlight-links')) {
      $body.removeClass('easywai-highlight-links');
      $this._settings.highlightLinks = false;
      $this.helpers.eraseCookie('highlightLinks');
    } else {
      $body.addClass('easywai-highlight-links');
      $this._settings.highlightLinks = true;
      $this.helpers.setCookie('highlightLinks', true, 30);
    }
    $(this).toggleClass('easywai_feature--active');
  }
}

easyWai.prototype.helpers = {
  setCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  },
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie(name) {
    $this.helpers.setCookie(name, "", -1);
  }
}

$.easyWai = function(opt) {
  return new easyWai(opt);
}