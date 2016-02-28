var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var shell = require('gulp-shell');


var fs = require('fs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


gulp.task('watch', function() {
  
  var watcher = gulp.watch('www/**');
  watcher.on('change', function(event) {
      
      
      if(event.type == "changed"){
        
        //gulp.start('buildAndDownloadAPK',['gitADD','gitCommit','gitPush','updatePhoneGap']);
        gulp.start('gitADD',function(done){
            gulp.start('gitCommit',function(done){
            
          });
        });
        
       
        
      } 
       
    });

});


gulp.task('gitADD',shell.task([
    'git add . '
]));

gulp.task('gitCommit',shell.task([
    'git commit -am "enviado pelo gulp" '
]));

gulp.task('gitPush',shell.task([
    'git push '
]));

gulp.task('updatePhoneGap',shell.task([
    'curl https://build.phonegap.com/apps/1928227/push'
]));
   
gulp.task('buildAndDownloadAPK',function(done){
   var client = require('phonegap-build-api');
   client.auth({ username: 'parttyapp@gmail.com', password: '210289aA' }, function(e, api) {
        console.log("login into phonegap api success.");

        api.get('/apps/1928227/android').pipe(fs.createWriteStream('app-debug.apk'));
        
    });
});


/*
var watcher = gulp.watch('www/**', ['zip']);
watcher.on('change', function(event) {
  //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  

   console.log("###INICIANDO JSLINT###\n\n\n");
  //gulp.start('jslint');
  
  if(event.type == "changed"){
  	console.log("login into phonegap api");
  	
    client.auth({ username: 'parttyapp@gmail.com', password: '210289aA' }, function(e, api) {
	    // time to make requests
	    console.log(e);
	    console.log(api);
	});
    //gulp.start('buildAPK',['closeAPK','jslint']);
  }
  //shell.task(['phonegap build android']);

   
});
*/
