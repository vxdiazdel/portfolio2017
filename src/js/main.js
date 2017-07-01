const home = require('./home'),
      $body = $('body');

if($body.hasClass('page-home')) {
    home.init();
}
