import * as THREE from "three";

const vert_shader = `

uniform float u_time;
uniform vec2 resolution;

void main()	{
  // this will gibe you only the plane
  // gl_Position = vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}
`;

const frag_shader = `

uniform float u_time;
uniform vec2 resolution;

void main()	{
  float x = mod(u_time + gl_FragCoord.x, 20.) < 3. ? 2. : 0.;
  float y = mod(u_time + gl_FragCoord.y, 20.) < 3. ? 2. : 0.;
  gl_FragColor = vec4(vec3(min(x, y)), 1.);
}
`;

export const shader_06 = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() },
  },
  vertexShader: vert_shader,
  fragmentShader: frag_shader,
});
