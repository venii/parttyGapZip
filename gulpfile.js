var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');

var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var shell = require('gulp-shell');
var zip = require('gulp-zip');

var fs = require('fs');

var paths = {
  sass: ['./scss/**/*.scss']
};


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


var appID = "1959698";
var usr   = "parttyapp@gmail.com";
var passwordUSR = "210289aA";
var packgeName = "com.ionicframework.partty754126";
var appApk = "app-debug.apk";
var zipName = 'www.zip';


gulp.task('watch', function() {
  var watcher = gulp.watch('www/**');
  watcher.on('change', function(event) {
     
    if(event.type == "changed"){ 
      
        
        gulp.start('zipSource',function(done){
          gulp.start('uploadSource',function(done){

          });
        });
      
    }
       
  });
  
 
});

gulp.task('installAPK',shell.task([
    'adb install -r '+appApk,'adb shell monkey -p '+packgeName+' -c android.intent.category.LAUNCHER 1'
  ]));
 

gulp.task('zipSource',shell.task(['jar -cMf '+zipName+' www']));

gulp.task('uploadSource',function(done){
    var client = require('phonegap-build-api');
    console.log("AUTH");
    
    client.auth({ username: usr, password: passwordUSR }, function(e, api) {
        console.log(e);
        console.log(api);
        
        var options = {
            form: {
                data: {
                    debug: true
                },
                file: zipName
            }
        };

        console.log("UPLOADING");
        api.put('/apps/'+appID, options, function(e, data) {



          console.log('error:', e);
          console.log('data:', data);
          console.log("UPLOAD INTO SERVER");

          console.log("BUILDING");
          api.post('/apps/'+appID+'/build/android', function(e, data) {
              console.log('error:', e);
              console.log('data:', data);

              done();
          });
          
        });

        

    });

});

gulp.task('apkDownload',function(done){
   
   var client = require('phonegap-build-api');
   console.log("AUTH");

   client.auth({ username: usr, password: passwordUSR }, function(e, api) {
     
     console.log(e);
     console.log("DOWNLOADING...");

     var fs = require('fs');
     var download = api.get('/apps/'+appID+'/android');
     var writeStream = fs.createWriteStream(appApk);

     download.on('data', function(data) {
        writeStream.write(data);
        console.log(data);
     });

     download.on('end', function() {
        
        console.log(writeStream);
        writeStream.end();

        console.log("DOWNLOADED..."+writeStream.bytesWritten);

          gulp.start('installAPK',function(done){
            done();    
          });
        
       
     });
     /*
     download.on('finish', function () { 
      gulp.start('installAPK',function(done){
        done();   
      });
     });*/
     
   });
});