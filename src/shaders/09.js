import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`

const fragmentShader = `
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(vUv, 1.0, 1.0);
}
`

export const shader_09 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
})
