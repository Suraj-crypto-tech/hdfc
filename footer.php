<footer>

</footer>

<script src="assets/js/common.js"></script>

<script>
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register("sw.js")
            .then( function(reg){
                console.log('Service worker registration', reg);
            })
            .catch( function(err){
                console.error('Service Worker Error', err);
            });

        window.addEventListener('beforeinstallprompt', function (event) {
            var e = event;

            e.preventDefault();

            /*
                document.getElementById('some_id').onclick = function (e) {
                    e.prompt().then(function (result) {
                        if ( result.outcome === 'accepted' ) {
                            // do something
                        }
                    });
                }
            */
        });
    }
</script>
<script>
!function () {
    var baseName = '<?php echo basename($_SERVER['PHP_SELF']); ?>',
        assets = 'assets',
        libs = [assets + '/build/common.js'],
        scripts = [],
        loadScript = function (i) {
            var script = scripts[i];

            if (script) {
                script = document.createElement('script');
                script.async = true;
                script.crossorigin = 'anonymous';
                script.src = scripts[i];
                document.head.appendChild(script);

                script.onload = function (e) {
                    script = undefined;
                    loadScript(i+1);
                };

                script.onerror = function (e) {
                    console.error('No more scripts will be loaded because "' + script.src + '" failed to load!');
                };
            } else {
                loadScript = script_file = scripts = undefined;
            }
        };

    // insert any dependencies (if required) here according to each page and then load scripts
    if ( baseName === 'index.php' ) {
        scripts.push(assets + '/build/front.js');
    } else {
        scripts.push(assets + '/build/inner.js');

        switch (baseName) {
            case '':
            break;
        }
    }

    // concat all scripts
    scripts = libs.concat(scripts);

    // start loading scripts
    loadScript(0);
}();
</script>