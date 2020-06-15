import * as THREE from 'three';
import * as OrbitControls  from 'three-orbit-controls';

import { initThree2 } from './module/three2.js';
import { blurInit } from './module/blur.js';


import * as PointerLockControls from 'three-pointer-lock-controls';



let page = window.location.pathname


initThree2();
blurInit();



console.log("YO");


