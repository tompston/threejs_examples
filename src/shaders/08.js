import * as THREE from "three";

const shared = `
varying vec2 vUv;
`;

const vertexShader = `

${shared}

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv; 

}
`;

const fragmentShader = `

${shared}

void main() {

  vec2 rg = fract(vUv / 2. );
  float b = 0.1;

  gl_FragColor = vec4(rg, b, 1.0);
}
`;

export const shader_08 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
