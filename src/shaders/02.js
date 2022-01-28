import * as THREE from "three";

const vert_shader = `

// define a new variable and call it in main()
varying vec3 v_Normal;

void main(){

    // multiply the scale * position to transform the object
    vec3 scale = vec3(4.0, 1.0, 1.0);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    v_Normal = normal;
}
`;

const frag_shader = `

// define a new variable and call it in main()
// has to be the same name that you defined in the vert shader
varying vec3 v_Normal;

void main(){
    //   gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    gl_FragColor = vec4(v_Normal, 1.0);
}
`;

export const shader_02 = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
});
