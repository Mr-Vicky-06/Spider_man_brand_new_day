import React, { useEffect, useRef, useState } from 'react';

const VS = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FS = `
precision highp float;
uniform sampler2D uTexture;
uniform float uIntensity;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    vec2 offset = uv - center;
    // Account for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectOffset = offset;
    aspectOffset.x *= aspect;
    float dist = length(aspectOffset);
    
    // 1. Subtle screen-space distortion (warp)
    float warp = (dist * dist) * uIntensity * 0.1;
    vec2 warpedUv = center + offset * (1.0 - warp);

    // 2. Radial chromatic separation
    float chromAmt = uIntensity * 0.03 * dist;
    vec4 texR = texture2D(uTexture, warpedUv + offset * chromAmt);
    vec4 texG = texture2D(uTexture, warpedUv);
    vec4 texB = texture2D(uTexture, warpedUv - offset * chromAmt);

    vec3 color = vec3(texR.r, texG.g, texB.b);
    
    // 3. Subtle tint / tension response (Electric Blue)
    // Project tokens: --color-electric-blue is approx cyan/blue
    vec3 tint = vec3(0.1, 0.5, 1.0);
    color = mix(color, color + tint * 0.5, uIntensity * 0.5);

    // 4. Restrained vignette pushing into darkness as tension rises
    float vignette = 1.0 - (dist * 1.5 * uIntensity * 0.6);
    vignette = clamp(vignette, 0.2, 1.0);
    
    gl_FragColor = vec4(color * vignette, 1.0);
}
`;

export default function SpiderSenseShader({
  imageSrc,
  intensity = 0,
  onError,
  onInfo
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const textureRef = useRef(null);
  const programRef = useRef(null);
  const uniformsRef = useRef({});
  
  // Track current animated intensity
  const targetIntensity = useRef(intensity);
  const currentIntensity = useRef(intensity);
  const rafRef = useRef(null);

  useEffect(() => {
    targetIntensity.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: false });
    
    if (!gl) {
      if (onError) onError(new Error("WebGL not supported"));
      return;
    }
    glRef.current = gl;

    let destroyed = false;

    // 1. Compile Shaders
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VS);
    const fs = createShader(gl.FRAGMENT_SHADER, FS);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (onError) onError(new Error("Shader link failed"));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // 2. Setup Geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // 3. Setup Uniforms
    uniformsRef.current = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uIntensity: gl.getUniformLocation(program, "uIntensity"),
      uResolution: gl.getUniformLocation(program, "uResolution")
    };
    gl.uniform1i(uniformsRef.current.uTexture, 0);

    // 4. Load Texture
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Respect CORS
    img.onload = () => {
      if (destroyed) return;

      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);

      // Handle MAX_TEXTURE_SIZE safely (Scale down if needed via canvas)
      let uploadCanvas = img;
      if (img.width > maxTextureSize || img.height > maxTextureSize) {
         const scale = Math.min(maxTextureSize / img.width, maxTextureSize / img.height);
         uploadCanvas = document.createElement('canvas');
         uploadCanvas.width = img.width * scale;
         uploadCanvas.height = img.height * scale;
         const ctx = uploadCanvas.getContext('2d');
         ctx.drawImage(img, 0, 0, uploadCanvas.width, uploadCanvas.height);
      }

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, uploadCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      
      textureRef.current = tex;

      if (onInfo) {
        onInfo({
          maxTextureSize,
          imageSize: `${img.width}x${img.height}`,
          uploadSize: `${uploadCanvas.width || img.width}x${uploadCanvas.height || img.height}`
        });
      }

      startRenderLoop();
    };
    img.onerror = () => {
      if (onError) onError(new Error("Texture load failed"));
    };
    img.src = imageSrc;

    // 5. Resize & Render Loop
    function resize() {
      if (!canvas || !gl) return;
      // Cap render resolution for performance while allowing CSS to scale it
      // High-end desktop: 1920x1080. Fallback gracefully.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); 
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.min(rect.width * dpr, 1920);
      const targetH = Math.min(rect.height * dpr, 1080);
      
      if (canvas.width !== targetW || canvas.height !== targetH) {
         canvas.width = targetW;
         canvas.height = targetH;
         gl.viewport(0, 0, canvas.width, canvas.height);
         gl.uniform2f(uniformsRef.current.uResolution, canvas.width, canvas.height);
         
         if (onInfo) {
             onInfo((prev) => ({ ...prev, canvasSize: `${canvas.width}x${canvas.height}` }));
         }
      }
    }

    function render() {
      if (destroyed || !gl || !programRef.current) return;
      
      resize();

      // Smooth intensity
      currentIntensity.current += (targetIntensity.current - currentIntensity.current) * 0.15;
      
      gl.uniform1f(uniformsRef.current.uIntensity, currentIntensity.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    }

    function startRenderLoop() {
      if (!rafRef.current) render();
    }

    window.addEventListener('resize', resize);

    return () => {
      destroyed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);

      if (gl) {
        if (textureRef.current) gl.deleteTexture(textureRef.current);
        if (buffer) gl.deleteBuffer(buffer);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (programRef.current) gl.deleteProgram(programRef.current);
        
        // Force context loss cleanup if extension is available
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      }
    };
  }, [imageSrc]); // Only re-run if image source strictly changes

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      aria-hidden="true"
    />
  );
}
