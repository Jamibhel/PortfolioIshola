import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useApp } from '../context/AppContext';

interface Avatar3DProps {
  lookAtTarget?: { x: number; y: number } | null;
}

// Color Tokens for Bello Jamiu Ishola 3D Avatar
const JAMIU_SKIN_COLOR = new THREE.Color('#4d2e1b');
const JAMIU_HAIR_COLOR = new THREE.Color('#0c0d10');
const SWEATER_NAVY = new THREE.Color('#162032');
const SWEATER_CREAM = new THREE.Color('#e5dac7');
const SWEATER_RED = new THREE.Color('#dc2626');
const ZB_SWEATER_BASE = new THREE.Color('#ea580c');
const PANTS_COLOR = new THREE.Color('#0f172a');

// Procedural 2048x2048 UV Texture Map for Bello Jamiu Ishola
function createJamiuTexture(isZBMode = false): THREE.CanvasTexture {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const toX = (pct: number) => (pct / 100) * size;
  const toY = (pct: number) => (pct / 100) * size;

  // Colors
  const skinBase = '#4d2e1b';
  const skinHighlight = '#633e28';
  const skinShadow = '#381f11';
  const hairColor = '#0c0d10';
  const navyKnit = isZBMode ? '#9a3412' : '#182438';
  const navyDark = isZBMode ? '#7c2d12' : '#101827';
  const creamStripe = isZBMode ? '#ffedd5' : '#e5dac7';
  const redStripe = isZBMode ? '#fbbf24' : '#dc2626';
  const pantsColorHex = '#0f172a';

  // 1. Base Fill
  ctx.fillStyle = navyDark;
  ctx.fillRect(0, 0, size, size);

  // 2. Sweater Torso, Lower Panels & Sleeves
  const sweaterRegions = [
    { x: 0, y: toY(45), w: toX(52), h: toY(55) }, // Lower torso & jacket panels
    { x: toX(14), y: toY(20), w: toX(37), h: toY(28) }, // Upper chest & back
    { x: 0, y: toY(10), w: toX(16), h: toY(38) }, // Left sleeve
    { x: toX(80), y: toY(5), w: toX(20), h: toY(42) }, // Right sleeve
  ];

  sweaterRegions.forEach((r) => {
    const grad = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
    grad.addColorStop(0, navyDark);
    grad.addColorStop(0.5, navyKnit);
    grad.addColorStop(1, navyDark);
    ctx.fillStyle = grad;
    ctx.fillRect(r.x, r.y, r.w, r.h);

    // Knit texture lines
    ctx.strokeStyle = isZBMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 2;
    for (let y = r.y; y < r.y + r.h; y += 8) {
      ctx.beginPath();
      ctx.moveTo(r.x, y);
      ctx.lineTo(r.x + r.w, y);
      ctx.stroke();
    }
  });

  // 3. Signature Beige/Cream & Red Horizontal Chest & Sleeve Stripes
  const frontStripeY = toY(27);
  const stripeHeight = toY(6);

  // Cream horizontal band across chest & back
  ctx.fillStyle = creamStripe;
  ctx.fillRect(toX(14), frontStripeY, toX(37), stripeHeight);

  // Distinctive Red horizontal accent stripe on chest
  ctx.fillStyle = redStripe;
  ctx.fillRect(toX(22), frontStripeY + toY(0.8), toX(7), stripeHeight - toY(1.6));

  // Sleeve stripes
  ctx.fillStyle = creamStripe;
  ctx.fillRect(0, toY(21), toX(16), stripeHeight * 0.9);
  ctx.fillStyle = redStripe;
  ctx.fillRect(toX(4), toY(21.5), toX(4.5), stripeHeight * 0.7);

  ctx.fillStyle = creamStripe;
  ctx.fillRect(toX(80), toY(18), toX(20), stripeHeight * 0.9);
  ctx.fillStyle = redStripe;
  ctx.fillRect(toX(88), toY(18.5), toX(4.5), stripeHeight * 0.7);

  // 4. Pants & Legs
  const pantsGrad = ctx.createLinearGradient(toX(50), toY(30), toX(75), toY(72));
  pantsGrad.addColorStop(0, '#111827');
  pantsGrad.addColorStop(0.5, pantsColorHex);
  pantsGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = pantsGrad;
  ctx.fillRect(toX(50), toY(30), toX(26), toY(43));

  // 5. Shoes
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(toX(48), toY(75), toX(28), toY(25));
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(toX(50), toY(94), toX(24), toY(2.5));

  // 6. Hands & Neck
  const handRegions = [
    { x: 0, y: 0, w: toX(15), h: toY(12) },
    { x: toX(28), y: 0, w: toX(10), h: toY(12) },
    { x: toX(56), y: 0, w: toX(10), h: toY(18) },
  ];
  handRegions.forEach((h) => {
    ctx.fillStyle = skinBase;
    ctx.fillRect(h.x, h.y, h.w, h.h);
  });

  const neckGrad = ctx.createRadialGradient(toX(43), toY(14), 10, toX(43), toY(14), toX(8));
  neckGrad.addColorStop(0, skinHighlight);
  neckGrad.addColorStop(1, skinBase);
  ctx.fillStyle = neckGrad;
  ctx.fillRect(toX(36), toY(5), toX(15), toY(17));

  // 7. Face & Head (Top-Left: x: 14% to 28%, y: 5% to 26%)
  const faceX = toX(14);
  const faceY = toY(5);
  const faceW = toX(14);
  const faceH = toY(21);

  // Face Skin Base with warm sunlight gradient
  const faceGrad = ctx.createRadialGradient(
    faceX + faceW * 0.5,
    faceY + faceH * 0.45,
    faceW * 0.1,
    faceX + faceW * 0.5,
    faceY + faceH * 0.5,
    faceW * 0.65
  );
  faceGrad.addColorStop(0, skinHighlight);
  faceGrad.addColorStop(0.7, skinBase);
  faceGrad.addColorStop(1, skinShadow);
  ctx.fillStyle = faceGrad;
  ctx.fillRect(faceX, faceY, faceW, faceH);

  // Short Textured Dark Hair on Top
  ctx.fillStyle = hairColor;
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.18, faceW * 0.48, faceH * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.fillStyle = '#0a0a0c';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.32, faceY + faceH * 0.38, faceW * 0.12, faceH * 0.035, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.68, faceY + faceH * 0.38, faceW * 0.12, faceH * 0.035, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Eyes & Specular Reflections
  // Left Eye
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.33, faceY + faceH * 0.45, faceW * 0.08, faceH * 0.038, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c130d';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.33, faceY + faceH * 0.45, faceW * 0.045, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#050505';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.33, faceY + faceH * 0.45, faceW * 0.024, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.315, faceY + faceH * 0.44, faceW * 0.012, 0, Math.PI * 2);
  ctx.fill();

  // Right Eye
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.67, faceY + faceH * 0.45, faceW * 0.08, faceH * 0.038, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c130d';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.67, faceY + faceH * 0.45, faceW * 0.045, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#050505';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.67, faceY + faceH * 0.45, faceW * 0.024, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.655, faceY + faceH * 0.44, faceW * 0.012, 0, Math.PI * 2);
  ctx.fill();

  // Nose bridge & Nostrils
  ctx.fillStyle = 'rgba(40, 20, 10, 0.45)';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.58, faceW * 0.07, faceH * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.arc(faceX + faceW * 0.46, faceY + faceH * 0.59, faceW * 0.018, 0, Math.PI * 2);
  ctx.arc(faceX + faceW * 0.54, faceY + faceH * 0.59, faceW * 0.018, 0, Math.PI * 2);
  ctx.fill();

  // Mustache
  ctx.fillStyle = '#121214';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.66, faceW * 0.16, faceH * 0.032, 0, 0, Math.PI);
  ctx.fill();

  // Open smiling mouth with clean white teeth
  ctx.fillStyle = '#422118';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.73, faceW * 0.18, faceH * 0.055, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#150a06';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.73, faceW * 0.14, faceH * 0.038, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.72, faceW * 0.11, faceH * 0.02, 0, Math.PI, 0, true);
  ctx.fill();

  // Goatee & Chin Stubble
  ctx.fillStyle = 'rgba(18, 18, 20, 0.75)';
  ctx.beginPath();
  ctx.ellipse(faceX + faceW * 0.5, faceY + faceH * 0.85, faceW * 0.14, faceH * 0.065, 0, 0, Math.PI * 2);
  ctx.fill();

  // 8. Side / Back of Head
  const sideX = toX(65);
  const sideY = toY(5);
  const sideW = toX(23);
  const sideH = toY(30);

  ctx.fillStyle = skinBase;
  ctx.fillRect(sideX, sideY, sideW, sideH);
  ctx.fillStyle = hairColor;
  ctx.fillRect(sideX, sideY, sideW, sideH * 0.45);
  ctx.fillStyle = 'rgba(18, 18, 20, 0.6)';
  ctx.fillRect(sideX + sideW * 0.2, sideY + sideH * 0.45, sideW * 0.35, sideH * 0.4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

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

    // Lighting (Warm golden ambient and sunlight matching Jamiu's photo)
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x1e293b, 0.95);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Main Sunlight
    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.4);
    sunLight.position.set(2, 4, 5);
    scene.add(sunLight);

    const sideLight = new THREE.DirectionalLight(0xfef08a, 1.4);
    sideLight.position.set(4, 2, 0);
    scene.add(sideLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.1);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Wrapper group
    const wrapper = new THREE.Group();
    wrapper.scale.set(0.23, 0.205, 0.23);
    wrapper.position.set(0.95, -2.1, 8.5);
    wrapper.rotation.y = 5.65;
    scene.add(wrapper);
    avatarWrapperRef.current = wrapper;

    // --- STYLIZED PROCEDURAL FALLBACK FIGURE (BELLO JAMIU ISHOLA) ---
    const fallbackGroup = new THREE.Group();

    // 1. Sweater Materials
    const sweaterMat = new THREE.MeshStandardMaterial({
      color: isZBMode ? ZB_SWEATER_BASE : SWEATER_NAVY,
      roughness: 0.75
    });
    const stripeCreamMat = new THREE.MeshStandardMaterial({
      color: SWEATER_CREAM,
      roughness: 0.7
    });
    const stripeRedMat = new THREE.MeshStandardMaterial({
      color: SWEATER_RED,
      roughness: 0.65
    });
    const skinMat = new THREE.MeshStandardMaterial({
      color: JAMIU_SKIN_COLOR,
      roughness: 0.55
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: JAMIU_HAIR_COLOR,
      roughness: 0.9
    });

    // Torso Base
    const bodyGeo = new THREE.CylinderGeometry(2.0, 2.2, 4.8, 20);
    const bodyMesh = new THREE.Mesh(bodyGeo, sweaterMat);
    bodyMesh.position.y = 2.5;
    fallbackGroup.add(bodyMesh);

    // Horizontal Cream Chest Stripe
    const creamBandGeo = new THREE.CylinderGeometry(2.06, 2.12, 0.9, 20);
    const creamBand = new THREE.Mesh(creamBandGeo, stripeCreamMat);
    creamBand.position.y = 3.2;
    fallbackGroup.add(creamBand);

    // Red Accent Badge on Chest Stripe
    const redBadgeGeo = new THREE.BoxGeometry(0.7, 0.45, 0.15);
    const redBadge = new THREE.Mesh(redBadgeGeo, stripeRedMat);
    redBadge.position.set(0.6, 3.2, 2.05);
    redBadge.rotation.y = 0.3;
    fallbackGroup.add(redBadge);

    // Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.85, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeo, sweaterMat);
    leftShoulder.position.set(-1.9, 4.4, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeo, sweaterMat);
    rightShoulder.position.set(1.9, 4.4, 0);
    fallbackGroup.add(leftShoulder);
    fallbackGroup.add(rightShoulder);

    // Arms with Sleeve Stripes
    const armGeo = new THREE.CylinderGeometry(0.5, 0.45, 3.8, 16);
    const leftArm = new THREE.Mesh(armGeo, sweaterMat);
    leftArm.position.set(-2.0, 2.6, 0.2);
    leftArm.rotation.z = 0.15;
    const rightArm = new THREE.Mesh(armGeo, sweaterMat);
    rightArm.position.set(2.0, 2.6, 0.2);
    rightArm.rotation.z = -0.15;
    fallbackGroup.add(leftArm);
    fallbackGroup.add(rightArm);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.y = 5.7;

    const headGeo = new THREE.SphereGeometry(1.22, 28, 28);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // Short Textured Dark Hair on Top & Back
    const hairGeo = new THREE.SphereGeometry(1.26, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.rotation.x = -0.15;
    headGroup.add(hairMesh);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.35, 0.06, 0.08);
    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.42, 0.25, 1.15);
    leftBrow.rotation.z = -0.1;
    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.42, 0.25, 1.15);
    rightBrow.rotation.z = 0.1;
    headGroup.add(leftBrow);
    headGroup.add(rightBrow);

    // Eyes
    const eyeWhiteGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const eyePupilGeo = new THREE.SphereGeometry(0.09, 10, 10);
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });

    const leftEye = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    leftEye.position.set(-0.4, 0.08, 1.12);
    const leftPupil = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    leftPupil.position.set(-0.4, 0.08, 1.25);

    const rightEye = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    rightEye.position.set(0.4, 0.08, 1.12);
    const rightPupil = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    rightPupil.position.set(0.4, 0.08, 1.25);

    headGroup.add(leftEye);
    headGroup.add(leftPupil);
    headGroup.add(rightEye);
    headGroup.add(rightPupil);

    // Mustache
    const mustacheGeo = new THREE.BoxGeometry(0.5, 0.08, 0.12);
    const mustacheMesh = new THREE.Mesh(mustacheGeo, hairMat);
    mustacheMesh.position.set(0, -0.32, 1.18);
    headGroup.add(mustacheMesh);

    // Smiling Mouth with White Teeth
    const smileGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12, 1, false, 0, Math.PI);
    const smileMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const smileMesh = new THREE.Mesh(smileGeo, smileMat);
    smileMesh.position.set(0, -0.48, 1.16);
    smileMesh.rotation.x = Math.PI * 0.5;
    headGroup.add(smileMesh);

    // Goatee / Chin Stubble
    const goateeGeo = new THREE.SphereGeometry(0.28, 12, 12);
    const goateeMesh = new THREE.Mesh(goateeGeo, hairMat);
    goateeMesh.position.set(0, -0.72, 1.05);
    goateeMesh.scale.set(1.1, 0.8, 0.6);
    headGroup.add(goateeMesh);

    fallbackGroup.add(headGroup);

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

    // Generate Custom High-Definition Jamiu Canvas Texture
    const jamiuTexture = createJamiuTexture(isZBMode);

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

        // Custom Jamiu PBR Material
        const jamiuMaterial = new THREE.MeshStandardMaterial({
          map: jamiuTexture,
          roughness: 0.62,
          metalness: 0.05,
          side: THREE.DoubleSide
        });

        model.traverse((child) => {
          if ((child as THREE.Bone).isBone && child.name.toLowerCase().includes('head')) {
            headBoneRef.current = child as THREE.Bone;
          }
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = (mesh.name || '').toLowerCase();

            // Remove any old glasses accessories if separate mesh
            if (name.includes('glass') || name.includes('spectacle') || name.includes('eyewear')) {
              mesh.visible = false;
              return;
            }

            // Apply high-res Bello Jamiu Ishola texture map
            mesh.material = jamiuMaterial;
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
      jamiuTexture.dispose();
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
