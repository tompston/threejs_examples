import * as THREE from "three"

// https://github.com/marioecg/p5jsShaderExamples/tree/gh-pages/6_3d/6-2_vertexDisplacement

// -------
let img = "/assets/img/text.png"
const texture = new THREE.TextureLoader().load(img, (texture) => {
  texture.minFilter = THREE.NearestFilter
})
// console.log(texture)
// -------

const vertexShader = `
varying vec2 vUv;
uniform float u_time;

void main() {
  vUv = uv;

  float time = u_time * 1.0;

  vec3 transformed = position;
  transformed.z += sin(position.y + time);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform float u_time;
uniform sampler2D uTexture;

void main() {
  float time = u_time;

  vec2 uv = vUv;
  uv.x += sin(uv.y * 0.25);
  vec2 repeat = vec2(6.0, 12.0);
  uv = fract(uv * repeat + vec2(0.0, time));
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}
`

export const shader_02 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  //   wireframe: true,
  uniforms: {
    u_time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() },
    uTexture: { value: texture },
    transparent: true,
    side: THREE.DoubleSide,
  },
})
