var easyWai = function(options) {
  this._options = options;

  $body = $('body');
  $this = this;

  this._options = $.extend(true, {
    position: {
      side: 'right',
      top: '20px',
    },
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
    skipContent: false
  }, options);

  this._template = '';
  this._element;
  this._btn;

  this._settings = {
    fontSize: 100
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

    this._template += '</div>';
    $body.prepend(this._template);
    $body.addClass('easyWai-body');

    this.setStyling();
    this.attachEvents();
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

    $body.find('.easywai_feature button').removeClass('easywai_feature--active');

    $this._settings.fontSize = 100;
    document.body.style.fontSize = $this._settings.fontSize + '%';
  },
  increaseFont: function(){
    if ($this._settings.fontSize >= 200) {
      return
    }

    $body.removeClass('easywai-font-size-' + $this._settings.fontSize);
    $this._settings.fontSize += 10;
    $body.addClass('easywai-font-size-' + $this._settings.fontSize);

    document.body.style.fontSize = $this._settings.fontSize + '%';

  },
  decreaseFont: function(){
    if ($this._settings.fontSize <= 100) {
      return
    }

    $body.removeClass('easywai-font-size-' + $this._settings.fontSize);
    $this._settings.fontSize -= 10;
    $body.addClass('easywai-font-size-' + $this._settings.fontSize);

    document.body.style.fontSize = $this._settings.fontSize + '%';
  },
  readableFont: function(){
    if( $body.hasClass('easywai-readable-font') ){
      $body.removeClass('easywai-readable-font');
    } else{
      $body.addClass('easywai-readable-font');
    }
    $(this).toggleClass('easywai_feature--active');
  },
  monochrome: function(){
    if ($body.hasClass('easywai-monochrome')) {
      $body.removeClass('easywai-monochrome');
    } else {
      $body.addClass('easywai-monochrome');
    }
    $(this).toggleClass('easywai_feature--active');
  },
  highContrast: function(){
    if ($body.hasClass('easywai-high-contrast')) {
      $body.removeClass('easywai-high-contrast');
    } else {
      $body.addClass('easywai-high-contrast');
    }
    $(this).toggleClass('easywai_feature--active');
  },
  lowContrast: function(){
    if ($body.hasClass('easywai-low-contrast')) {
      $body.removeClass('easywai-low-contrast');
    } else {
      $body.addClass('easywai-low-contrast');
    }
    $(this).toggleClass('easywai_feature--active');
  },
  lightBG: function(){
    if ($body.hasClass('easywai-light-background')) {
      $body.removeClass('easywai-light-background');
    } else {
      $body.addClass('easywai-light-background');
    }
    $(this).toggleClass('easywai_feature--active');
  },
  highlightLinks: function(){
    if ($body.hasClass('easywai-highlight-links')) {
      $body.removeClass('easywai-highlight-links');
    } else {
      $body.addClass('easywai-highlight-links');
    }
    $(this).toggleClass('easywai_feature--active');
  }
}

$.easyWai = function(opt) {
  return new easyWai(opt);
}