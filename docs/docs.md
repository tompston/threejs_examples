## Notes

```
glsl has inbuilt variables, functions and types

-- variables
gl_FragColor

-- types

vec4
    four dimensional vector of floating point precision
    RED, GREEN, BLUE, ALPHA


-- functions

https://docs.gl/sl4/clamp#

 sin(), cos(), tan(), asin(), acos(), atan(), pow(), exp(), log(), sqrt(), abs(), sign(), floor(), ceil(), fract(), mod(), min(), max()


-- vert_shader
    modelMatrix         moves the vertex from local to world space
    viewMatrix          moves the vertex from the world space to the camera view
    projectionMatrix    moves the vertex to clip spaces screen coord.
    modelViewMatrix     combines the result of modelMatrix + viewMatrix

    uv = 2 values
    position = 3 values
```
