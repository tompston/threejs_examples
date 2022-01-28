import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "/node_modules/three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "/node_modules/three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

// set the styles
const style = document.createElement("style");
style.innerHTML = `
canvas {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.threejs_parent {
  display: grid;
  grid-template-columns: 0.5fr 1fr;

  /* min-height: 500px; */
  gap: 20px;
}
/* baseline for the canvas */
.threejs_canvas {
  height: 100%;
  height: 300px;
}

@media screen and (max-width: 600px) {
  .threejs_parent {
    grid-template-columns:auto;
    grid-template-rows: auto 300px;
    gap: 20px;
  }
}
`;
// uncomment to add
// document.head.appendChild(style)

// --- init_renderer
export function init_renderer(canvas_name) {
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
    canvas: document.querySelector(canvas_name),
  });

  renderer.physicallyCorrectLights = true;
  renderer.shadowMap = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio); // antialias for mobile

  return renderer;
}

// --- init_controls
export function init_controls(camera, renderer_dom_element) {
  const controls = new OrbitControls(camera, renderer_dom_element);
  controls.target.set(1, 1, 1); // controls.update();
  controls.enablePan = true;
  controls.minDistance = 5;
  controls.maxDistance = 40;
  controls.enableDamping = true;
  controls.dampingFactor = 0.025;

  return controls;
}

// --- init_camera
export function init_camera(container_width, container_height) {
  const aspect = container_width / container_height; // the canvas default
  const camera = new THREE.PerspectiveCamera(34, aspect, 1, 100);
  camera.position.set(12, 18, 12);
  return camera;
}

// placeholder cube used for an init scene
export function init_cube(scene) {
  const cube_geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const cube_material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const cube = new THREE.Mesh(cube_geometry, cube_material);
  return scene.add(cube);
}

export function init_lighsource(scene) {
  const lightsource = new THREE.SpotLight(0xffffff, 19, 14);
  lightsource.position.set(-2, 5, 0);
  lightsource.angle = 3.1;
  lightsource.castShadow = true;
  return scene.add(lightsource);
}

export function glb_loader() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("js/libs/draco/gltf/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  return loader;
}

export function world_grid(scene, size, divisions) {
  return scene.add(new THREE.GridHelper(size, divisions));
}

export function resizeCanvasToDisplaySize(camera, renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

// -- add a mesh in fewer lines
export function add_mesh(scene, geometry, shader, x, y, z) {
  const mesh = new THREE.Mesh(geometry, shader);
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex) =>
  hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

// helpers for tweakpane
export function pane_axis(pane, PARAMS, label, mesh, min, max, step) {
  pane
    .addInput(PARAMS, label.concat("_x"), { min: min, max: max, step: step })
    .on("change", function (new_val) {
      mesh.position.x = new_val.value;
    });
  pane
    .addInput(PARAMS, label.concat("_y"), { min: min, max: max, step: step })
    .on("change", function (new_val) {
      mesh.position.y = new_val.value;
    });
  pane
    .addInput(PARAMS, label.concat("_z"), { min: min, max: max, step: step })
    .on("change", function (new_val) {
      mesh.position.z = new_val.value;
    });
}

// add tweakable color palette to the mesh
// the passed in label needs to have this form -> "#ffffff"
export function pane_color(pane, PARAMS, label, mesh) {
  pane.addInput(PARAMS, label, { picker: "inline" }).on("change", function (new_val) {
    let rgb = hexToRgb(new_val.value);

    mesh.color.r = rgb[0] / 255;
    mesh.color.g = rgb[1] / 255;
    mesh.color.b = rgb[2] / 255;
  });
}
