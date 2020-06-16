import * as THREE from 'three';
import * as OrbitControls  from 'three-orbit-controls';

import { initThree2 } from './module/three2.js';
import { blurInit } from './module/blur.js';


import * as PointerLockControls from 'three-pointer-lock-controls';



let page = window.location.pathname


initThree2();
blurInit();



console.log("YO");


const main = document.querySelector('.main-title');
const maintwo = document.querySelector('.main-title-2');




const yo = () => {
  main.classList.add('fade-in');
  maintwo.classList.add('fade-in');
}


setTimeout(yo(), 3000);
