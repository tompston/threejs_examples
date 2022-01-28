import * as THREE from "three";

const vert_shader = `

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

// define a uniform variable that you will be able to call from three.js
// time variable
uniform float u_time;

// 
uniform vec2 u_resolution;

void main(){
    // change only one value example
    // gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
    
    // change two values with time 
    // gl_FragColor = vec4(abs(sin(u_time)),abs(cos(u_time)),0.0,1.0);

    // change two values with time + do some more stuff
    gl_FragColor = vec4(abs(sin(u_time * 0.5)),0.01,0.0,1.0);
   
}
`;
export const shader_03 = new THREE.ShaderMaterial({
  uniforms: {
    // key is the exact copy of the var that you defined in fragment shaders
    u_time: { type: "f", value: 0 },
  },
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
});
