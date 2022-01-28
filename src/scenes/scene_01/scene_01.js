import * as THREE from "three"
import * as init_world from "../../reusable/init_world"

const [container_name, canvas_name] = [".threejs_parent", ".scene_01"]
const container = document.querySelector(container_name)

// renderer and camera
const renderer = init_world.init_renderer(canvas_name)
const camera = init_world.init_camera(container.clientWidth, container.clientHeight)

// clock, controls, loeader and scene
const clock = new THREE.Clock()
const controls = init_world.init_controls(camera, renderer.domElement)
const loader = init_world.glb_loader()
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

// add temporary grid, cube and light
let temp_grid = init_world.world_grid(scene, 20, 20)
let temp_cube = init_world.init_cube(scene)
let temp_light = init_world.init_lighsource(scene)

function init() {}

function render() {
  // console.log(clock.getElapsedTime())  // get the time
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  init_world.resizeCanvasToDisplaySize(camera, renderer)
  controls.update()
  render()
}

init()
animate()
