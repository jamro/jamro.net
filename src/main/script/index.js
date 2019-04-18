import '../style/init.scss';
import '@babel/polyfill';

async function loadLibs(loadingStep) {
    loadingStep('../style/fontawesome.scss');         await import('../style/fontawesome.scss');
    loadingStep('../style/bootstrap.scss');           await import('../style/bootstrap.scss');
    loadingStep('../style/index.scss');               await import('../style/index.scss');
    loadingStep('jquery');                            await import('jquery');
    loadingStep('popper.js');                         await import('popper.js');
    loadingStep('bootstrap');                         await import('bootstrap');
    loadingStep('./app.js');                          await import('./app.js');
    loadingStep('../../section/headline/index.js');   await import('../../section/headline/index.js');
    loadingStep('../../section/timeline/index.js');   await import('../../section/timeline/index.js');
}
let modulesLoaded = 0;
let totalModules = 9;
let progress = 0;
let pointer = 0;

let loop = setInterval(() => {
  pointer += (progress - pointer)/6;
  document.getElementById('jmr-loading-bar').style.width = pointer.toFixed(1) + "%";
}, 30);

function updateProgress(name, index, total) {
  progress = 100*(index / total);
  progress = Math.max(progress, 1);
  console.log(`Loading ${name}... ${progress.toFixed(1)}`);

  if(index < total) {
    document.getElementById('jmr-loader').style.display = 'block';
    document.getElementById('jmr-content').style.display = 'none';
  } else {
    document.getElementById('jmr-loader').style.display = 'none';
    document.getElementById('jmr-content').style.display = 'block';
    clearInterval(loop);
  }
}


loadLibs((moduleName) => {
  updateProgress(moduleName, modulesLoaded, totalModules);
  modulesLoaded++;
})
.then(() => {
  console.log("All modules loaded");
  updateProgress('All', totalModules, totalModules);
  if (module.hot) {
    module.hot.accept();
    module.hot.addStatusHandler(status => {
      if(status == 'apply') {
        location.reload();
      }
    });
  }
  window.dispatchEvent(new Event('appReady'));
})
.catch((err) => {
  document.getElementById('jmr-loading-msg').innerHTML = "ERROR: " + err;
});
