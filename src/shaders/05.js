import * as THREE from "three";

const vert_shader = `

varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

const frag_shader = `

varying vec2 vUv;
void main() {
  float strength = vUv.x;

  gl_FragColor = vec4(vec3(strength), 0.01);
}
`;

export const shader_05 = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
});
