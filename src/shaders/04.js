import * as THREE from "three";

const vertexShader = `

// define a new variable and call it in main()
varying vec3 v_Normal;

void main(){

    // multiply the scale * position to transform the object
    vec3 scale = vec3(4.0, 1.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_Normal = normal;
}
`;

const frag_shader = `

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}
`;

export const shader_04 = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { type: "f", value: 0 },
  },
  vertexShader,
  fragmentShader: frag_shader,
});
