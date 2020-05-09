import * as THREE from 'three';
import {
  Color,
  LinearEncoding,
  LinearFilter,
  MathUtils,
  Matrix4,
  Mesh,
  PerspectiveCamera,
  Plane,
  Quaternion,
  RGBFormat,
  ShaderMaterial,
  UniformsUtils,
  Vector3,
  Vector4,
  WebGLRenderTarget
} from "three";
import * as OrbitControls  from 'three-orbit-controls';

import { initThree } from './module/threee.js';
import { initThree2 } from './module/three2.js';
import { initThree3 } from './module/three3.js';
// initThree();
import * as PointerLockControls from 'three-pointer-lock-controls';

initThree2();
