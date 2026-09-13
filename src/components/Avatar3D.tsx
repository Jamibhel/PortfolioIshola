import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

interface Avatar3DProps {
  lookAtTarget?: { x: number; y: number } | null;
}

export const Avatar3D: React.FC<Avatar3DProps> = ({ lookAtTarget }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isZBMode } = useApp();
  const avatarGroupRef = useRef<THREE.Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Look-at reaction when post-it appears
  useEffect(() => {
    if (!avatarGroupRef.current || isZBMode) return;
    if (lookAtTarget) {
      const normalizedX = (lookAtTarget.x / 100 - 0.5) * 0.45;
      const normalizedY = (lookAtTarget.y / 600 - 0.5) * 0.3;
      avatarGroupRef.current.rotation.y = normalizedX;
      avatarGroupRef.current.rotation.x = normalizedY;
    }
  }, [lookAtTarget, isZBMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 420;
    let height = container.clientHeight || 700;

    // 1. Scene & Setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 15.5);
    camera.lookAt(0, 0.2, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Studio Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambientLight);

    // Golden Sunlight matching Jamiu's photo
    const sunLight = new THREE.DirectionalLight(0xffedd5, 3.2);
    sunLight.position.set(4, 5, 6);
    scene.add(sunLight);

    // Cool Cyan Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Moving Interactive Cursor Light
    const cursorLight = new THREE.PointLight(isZBMode ? 0xf97316 : 0x38bdf8, 2.5, 20);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);

    // 5. Main 3D Avatar Root Group
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0.2, -0.4, 0);
    scene.add(avatarGroup);
    avatarGroupRef.current = avatarGroup;

    // --- A. 3D GLASSSMORPHIC PORTRAIT MONOLITH OF BELLO JAMIU ISHOLA ---
    const textureLoader = new THREE.TextureLoader();
    const portraitTexture = textureLoader.load('/profile.jpg');
    portraitTexture.colorSpace = THREE.SRGBColorSpace;
    portraitTexture.generateMipmaps = true;
    portraitTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Curved Volumetric 3D Portrait Geometry (with physical depth curvature)
    const portraitGeo = new THREE.PlaneGeometry(5.4, 7.2, 48, 48);

    // Displace vertices subtly to give real 3D volumetric face & body curvature
    const pos = portraitGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Soft cylindrical & radial curve
      const rX = x / 2.7;
      const rY = y / 3.6;
      const depth = Math.max(0, 1.0 - (rX * rX + rY * rY * 0.75)) * 0.35;
      pos.setZ(i, depth);
    }
    portraitGeo.computeVertexNormals();

    // High-End Shader Material for Volumetric Depth & Dynamic Light Glint
    const portraitMat = new THREE.MeshStandardMaterial({
      map: portraitTexture,
      roughness: 0.38,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const portraitMesh = new THREE.Mesh(portraitGeo, portraitMat);
    portraitMesh.position.set(0, 0.4, 0.1);
    avatarGroup.add(portraitMesh);

    // --- B. 3D FROSTED GLASS FRAME & REFRACTIVE BEVEL ---
    const frameGeo = new THREE.BoxGeometry(5.75, 7.55, 0.28);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: isZBMode ? 0xffedd5 : 0x0f172a,
      transmission: 0.65,
      opacity: 0.88,
      transparent: true,
      roughness: 0.25,
      metalness: 0.15,
      ior: 1.5,
      thickness: 0.5,
      reflectivity: 0.8,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(0, 0.4, -0.05);
    avatarGroup.add(frameMesh);

    // Outer Neon Border Trim
    const borderGeo = new THREE.EdgesGeometry(frameGeo);
    const borderMat = new THREE.LineBasicMaterial({
      color: isZBMode ? 0xf97316 : 0x38bdf8,
      linewidth: 2,
    });
    const borderLines = new THREE.LineSegments(borderGeo, borderMat);
    borderLines.position.copy(frameMesh.position);
    avatarGroup.add(borderLines);

    // --- C. HOLOGRAPHIC FLOATING TECH RINGS ---
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.04, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isZBMode ? 0xfbbf24 : 0x06b6d4,
      transparent: true,
      opacity: 0.55,
    });
    const haloRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    haloRing1.rotation.x = Math.PI * 0.42;
    avatarGroup.add(haloRing1);

    const ringGeo2 = new THREE.TorusGeometry(5.2, 0.03, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isZBMode ? 0xf97316 : 0x6366f1,
      transparent: true,
      opacity: 0.4,
    });
    const haloRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    haloRing2.rotation.y = Math.PI * 0.35;
    haloRing2.rotation.x = Math.PI * 0.15;
    avatarGroup.add(haloRing2);

    // --- D. 3D INTERACTIVE ORBITING TECH BADGES ---
    const badgeGroup = new THREE.Group();
    avatarGroup.add(badgeGroup);

    const badgeData = [
      { text: '✦ UI/UX Designer', color: '#f59e0b', pos: [-3.4, 3.4, 1.2] },
      { text: '⚡ Full-Stack Developer', color: '#06b6d4', pos: [3.4, 2.6, 1.0] },
      { text: '📱 Flutter & Mobile', color: '#3b82f6', pos: [-3.2, -1.8, 1.4] },
      { text: '🌐 IoT & Networks', color: '#10b981', pos: [3.2, -2.4, 1.2] },
    ];

    const badgeMeshes: THREE.Mesh[] = [];

    badgeData.forEach((b) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 320;
      bCanvas.height = 96;
      const bCtx = bCanvas.getContext('2d')!;

      // Glassmorphic pill container
      bCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      bCtx.roundRect(6, 6, 308, 84, 42);
      bCtx.fill();

      // Border glow
      bCtx.lineWidth = 4;
      bCtx.strokeStyle = b.color;
      bCtx.roundRect(6, 6, 308, 84, 42);
      bCtx.stroke();

      // Typography
      bCtx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      bCtx.fillStyle = '#ffffff';
      bCtx.textAlign = 'center';
      bCtx.textBaseline = 'middle';
      bCtx.fillText(b.text, 160, 48);

      const bTexture = new THREE.CanvasTexture(bCanvas);
      bTexture.colorSpace = THREE.SRGBColorSpace;

      const pillGeo = new THREE.PlaneGeometry(2.1, 0.63);
      const pillMat = new THREE.MeshBasicMaterial({
        map: bTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const pillMesh = new THREE.Mesh(pillGeo, pillMat);
      pillMesh.position.set(b.pos[0], b.pos[1], b.pos[2]);
      badgeGroup.add(pillMesh);
      badgeMeshes.push(pillMesh);
    });

    // --- E. 3D FLOATING GOLDEN PARTICLES (Atmosphere) ---
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = (Math.random() - 0.5) * 16;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isZBMode ? 0xf97316 : 0xfef08a,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    avatarGroup.add(particles);

    // --- F. MOUSE TRACKING & PROCEDURAL ANIMATION LOOP ---
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x;
      targetMouseY = y;

      // Update cursor light in 3D
      cursorLight.position.x = x * 8;
      cursorLight.position.y = -y * 8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // 1. Organic 3D Floating & Breathing
      const floatY = Math.sin(time * 1.8) * 0.12;
      avatarGroup.position.y = -0.4 + floatY;

      // 2. Smooth 3D Tilting (Spring-Damped Mouse Parallax)
      avatarGroup.rotation.y = THREE.MathUtils.lerp(
        avatarGroup.rotation.y,
        targetMouseX * 0.42,
        0.06
      );
      avatarGroup.rotation.x = THREE.MathUtils.lerp(
        avatarGroup.rotation.x,
        -targetMouseY * 0.32,
        0.06
      );

      // 3. Rotating Halo Rings
      haloRing1.rotation.z = time * 0.25;
      haloRing2.rotation.z = -time * 0.18;

      // 4. Orbiting Tech Badges bobbing
      badgeMeshes.forEach((mesh, idx) => {
        const offset = idx * 1.5;
        mesh.position.y = badgeData[idx].pos[1] + Math.sin(time * 2.0 + offset) * 0.15;
      });

      // 5. Drifting Atmosphere Particles
      particles.rotation.y = time * 0.04;
      particles.rotation.x = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 420;
      height = container.clientHeight || 700;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      portraitTexture.dispose();
      portraitGeo.dispose();
      portraitMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      borderGeo.dispose();
      borderMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isZBMode]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[580px] lg:h-[720px] flex items-center justify-center relative pointer-events-auto cursor-pointer transition-transform duration-500 ease-out"
      style={{
        transform: isHovered ? 'scale(1.035) translateY(-6px)' : 'scale(1) translateY(0px)',
      }}
      aria-label="Interactive 3D Holographic Stage of Bello Jamiu Ishola"
    />
  );
};
