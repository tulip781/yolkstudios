import * as THREE from 'three';
import * as Refractor from 'refractor';

const initThree3 = () => {

  var scene, camera, clock, renderer, refractor;

      init();

      function init() {

        // scene

        scene = new THREE.Scene();

        // camera

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
        camera.position.set( - 10, 0, 15 );
        camera.lookAt( scene.position );

        // clock

        clock = new THREE.Clock();

        // mesh

        var geometry = new THREE.TorusKnotBufferGeometry( 3, 1, 256, 32 );
        var material = new THREE.MeshStandardMaterial( { color: 0x6083c2 } );

        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        // refractor

        var refractorGeometry = new THREE.PlaneBufferGeometry( 10, 10 );

        refractor = new Refractor( refractorGeometry, {
          color: 0x999999,
          textureWidth: 1024,
          textureHeight: 1024,
          shader: WaterRefractionShader
        } );

        refractor.position.set( 0, 0, 5 );

        scene.add( refractor );

        // load dudv map for distortion effect

        var dudvMap = new THREE.TextureLoader().load( '../../assets/img/waterdudv.jpg', function () {

          animate();

        } );

        dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;
        refractor.material.uniforms[ "tDudv" ].value = dudvMap;

        // light

        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        scene.add( ambientLight );

        var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add( pointLight );
        scene.add( camera );

        // renderer

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x20252f );
        renderer.setPixelRatio( window.devicePixelRatio );
        document.body.appendChild( renderer.domElement );

        //

        var controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 10;
        controls.maxDistance = 100;

        //

        window.addEventListener( 'resize', onResize, false );

      }

      function onResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {

        refractor.material.uniforms[ "time" ].value += clock.getDelta();

        renderer.render( scene, camera );

      }

}

export { initThree3 }
