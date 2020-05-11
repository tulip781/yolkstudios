import * as THREE from 'three';
import * as OrbitControls  from 'three-orbit-controls';

import { initThree } from './module/threee.js';
import { initThree2 } from './module/three2.js';
import { blurInit } from './module/blur.js';


import * as PointerLockControls from 'three-pointer-lock-controls';



let page = window.location.pathname

if (page === '/pagetwo.html') {
  blurInit();

}
if (page === '/') {
  initThree2();
  blurInit();
}





