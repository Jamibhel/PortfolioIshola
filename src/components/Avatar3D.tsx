import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useApp } from '../context/AppContext';

interface Avatar3DProps {
  lookAtTarget?: { x: number; y: number } | null;
}

// Color Tokens for Olakunle Tairu 3D Avatar
const AFRICAN_DARK_BROWN_SKIN = new THREE.Color('#381e12');
const BLAZER_COLOR = new THREE.Color('#064e3b'); // Sleek deep forest emerald
const ZB_BLAZER_COLOR = new THREE.Color('#f97316'); // Vibrant amber orange
const PANTS_COLOR = new THREE.Color('#1e293b'); // Modern charcoal slate

export const Avatar3D: React.FC<Avatar3DProps> = ({ lookAtTarget }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isZBMode } = useApp();
  const avatarWrapperRef = useRef<THREE.Group | null>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);

  // Look-at reaction when post-it appears
  useEffect(() => {
    if (!avatarWrapperRef.current || isZBMode) return;
    if (lookAtTarget && headBoneRef.current) {
      const normalizedX = (lookAtTarget.x / 100 - 0.5) * 0.8;
      const normalizedY = (lookAtTarget.y / 600 - 0.5) * 0.5;
      headBoneRef.current.rotation.y = normalizedX;
      headBoneRef.current.rotation.x = normalizedY;
    }
  }, [lookAtTarget, isZBMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 420;
    let height = container.clientHeight || 700;

    // Scene
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
    camera.position.set(0, 0.45, 17.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.85);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.2);
    frontLight.position.set(0, 3, 5);
    scene.add(frontLight);

    const sideLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    sideLight.position.set(4, 2, 0);
    scene.add(sideLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Wrapper group
    const wrapper = new THREE.Group();
    wrapper.scale.set(0.23, 0.205, 0.23);
    wrapper.position.set(0.95, -2.1, 8.5);
    wrapper.rotation.y = 5.65;
    scene.add(wrapper);
    avatarWrapperRef.current = wrapper;

    // Stylized fallback with updated clothes colors
    const fallbackGroup = new THREE.Group();

    // Torso & Shoulders (Deep Emerald Blazer)
    const bodyGeo = new THREE.CylinderGeometry(2.0, 2.2, 4.8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: isZBMode ? ZB_BLAZER_COLOR : BLAZER_COLOR,
      roughness: 0.7
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 2.5;
    fallbackGroup.add(bodyMesh);

    // Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.85, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeo, bodyMat);
    leftShoulder.position.set(-1.9, 4.4, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeo, bodyMat);
    rightShoulder.position.set(1.9, 4.4, 0);
    fallbackGroup.add(leftShoulder);
    fallbackGroup.add(rightShoulder);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.5, 0.45, 3.8, 12);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-2.0, 2.6, 0.2);
    leftArm.rotation.z = 0.15;
    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(2.0, 2.6, 0.2);
    rightArm.rotation.z = -0.15;
    fallbackGroup.add(leftArm);
    fallbackGroup.add(rightArm);

    // Head (African Dark Brown)
    const headGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const skinMat = new THREE.MeshStandardMaterial({
      color: AFRICAN_DARK_BROWN_SKIN,
      roughness: 0.5
    });
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 5.7;
    fallbackGroup.add(headMesh);

    // Glasses
    const glassesGeo = new THREE.TorusGeometry(0.35, 0.045, 8, 24);
    const glassesMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8
    });
    const leftGlass = new THREE.Mesh(glassesGeo, glassesMat);
    leftGlass.position.set(-0.4, 5.7, 1.2);
    const rightGlass = new THREE.Mesh(glassesGeo, glassesMat);
    rightGlass.position.set(0.4, 5.7, 1.2);
    fallbackGroup.add(leftGlass);
    fallbackGroup.add(rightGlass);

    // Pants / Legs (Charcoal Slate)
    const legsGeo = new THREE.CylinderGeometry(0.8, 0.7, 5, 16);
    const pantsMat = new THREE.MeshStandardMaterial({
      color: PANTS_COLOR,
      roughness: 0.85
    });
    const leftLeg = new THREE.Mesh(legsGeo, pantsMat);
    leftLeg.position.set(-0.8, -1.8, 0);
    const rightLeg = new THREE.Mesh(legsGeo, pantsMat);
    rightLeg.position.set(0.8, -1.8, 0);
    fallbackGroup.add(leftLeg);
    fallbackGroup.add(rightLeg);

    wrapper.add(fallbackGroup);

    let mixer: THREE.AnimationMixer | null = null;

    // Setup DRACOLoader & GLTFLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const modelPath = isZBMode ? '/models/carlton_dance.glb' : '/models/thinking.glb';

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        wrapper.remove(fallbackGroup);

        model.scale.set(1.12, 1.0, 1.12);

        model.traverse((child) => {
          if ((child as THREE.Bone).isBone && child.name.toLowerCase().includes('head')) {
            headBoneRef.current = child as THREE.Bone;
          }
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = (mesh.name || '').toLowerCase();
            const matName = (Array.isArray(mesh.material)
              ? mesh.material[0]?.name
              : mesh.material?.name || ''
            ).toLowerCase();

            // 1. Skin Material Tinting
            if (
              name.includes('head') ||
              name.includes('skin') ||
              name.includes('face') ||
              name.includes('hand') ||
              matName.includes('skin') ||
              matName.includes('head')
            ) {
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => {
                    if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshBasicMaterial) {
                      m.color.set(AFRICAN_DARK_BROWN_SKIN);
                    }
                  });
                } else if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
                  mesh.material.color.set(AFRICAN_DARK_BROWN_SKIN);
                }
              }
            }

            // 2. Jacket / Blazer Material Tinting
            if (
              name.includes('jacket') ||
              name.includes('blazer') ||
              name.includes('suit') ||
              name.includes('coat') ||
              name.includes('top') ||
              matName.includes('jacket') ||
              matName.includes('blazer') ||
              matName.includes('suit') ||
              matName.includes('coat')
            ) {
              const targetColor = isZBMode ? ZB_BLAZER_COLOR : BLAZER_COLOR;
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => {
                    if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshBasicMaterial) {
                      m.color.set(targetColor);
                    }
                  });
                } else if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
                  mesh.material.color.set(targetColor);
                }
              }
            }

            // 3. Pants / Jeans Material Tinting
            if (
              name.includes('pant') ||
              name.includes('jean') ||
              name.includes('trouser') ||
              name.includes('bottom') ||
              name.includes('leg') ||
              matName.includes('pant') ||
              matName.includes('jean')
            ) {
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => {
                    if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshBasicMaterial) {
                      m.color.set(PANTS_COLOR);
                    }
                  });
                } else if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
                  mesh.material.color.set(PANTS_COLOR);
                }
              }
            }
          }
        });

        wrapper.add(model);

        // Animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        }
      },
      undefined,
      (err) => {
        console.warn('GLTF fallback retained:', err);
      }
    );

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth head gaze
      if (headBoneRef.current && !isZBMode) {
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.y,
          targetMouseX * 0.35,
          0.06
        );
        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.x,
          targetMouseY * 0.25,
          0.06
        );
      }

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
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, [isZBMode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[580px] lg:h-[720px] flex items-center justify-center relative pointer-events-none"
      aria-label="3D Avatar Character"
    />
  );
};
