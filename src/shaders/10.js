import * as THREE from "three";

const shared = `

varying vec2  v_uv;

uniform float u_time;
uniform vec2  u_mouse;

float plot(vec2 st) {    
  return smoothstep(0.01, 0.0, abs(st.y - st.x));
}

`;

const vertexShader = `

${shared}

// void main() {
//   vUv = uv;
//   float time = u_time * 1.0;
//   vec3 transformed = position;
//   transformed.z += sin(position.y + time);
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
// }


void main() {

  vec3 transformed = position;
  // -- uncomment lower to move
  // transformed.z += sin(position.y + u_time * 0.2);
  // transformed.x += cos(position.y + u_time * 0.2);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  v_uv = uv; 
}

`;

const fragmentShader = `

${shared}

void main() {

  // float r = sin((u_time * 1.) + v_uv.x);
  // float r = sin(v_uv.x);
  // float r = step(0.3, v_uv.x);
  // float r = smoothstep(0.3, 0.1, v_uv.x);
  // float r = smoothstep(0., tan(0.1 * u_time) , v_uv.x);

  float r = step(sin(0.1 * u_time), v_uv.x);
  float g = step(sin(0.02 * u_time), v_uv.x);
  // float g = 0.;
  float b = 0.;
  gl_FragColor = vec4(r,g, b, 1.0);

}

`;

export const shader_10 = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { type: "f", value: 1.0 },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
