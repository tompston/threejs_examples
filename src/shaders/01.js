import * as THREE from "three";

const vert_shader = `
void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const frag_shader = `
void main(){
  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`;

export const shader_01 = new THREE.ShaderMaterial({
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
});
