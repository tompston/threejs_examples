import * as THREE from "three";

// https://github.com/marioecg/p5jsShaderExamples/tree/gh-pages/6_3d/6-2_vertexDisplacement

// -------
let img = "/assets/img/text.png";
const texture = new THREE.TextureLoader().load(img, (texture) => {
  texture.minFilter = THREE.NearestFilter;
});
// console.log(texture)
// -------

const shared = `
// varying
varying vec2 vUv;

// uniform
uniform float u_time;
uniform sampler2D uTexture;

`;

const vertexShader = `

${shared}

void main() {
    vUv = uv;   // this needs to be called, if mentioned in the frag_shader varying

    float time = u_time * 1.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `

${shared}

void main() {
    float time = u_time;

    vec2 uv = vUv;
    uv = fract(uv * 4.0 + vec2(0.0, u_time * 0.2 ));

    // uv.x += (uv.y * 0.2);
    uv.x += sin(uv.y) * 0.2;

    // vec4 color = texture2D(uTexture, uv);

    gl_FragColor = texture2D(uTexture, uv);;
}
`;

export const shader_03 = new THREE.ShaderMaterial({
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
});
