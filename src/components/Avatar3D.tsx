import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

interface Avatar3DProps {
  lookAtTarget?: { x: number; y: number } | null;
}

export const Avatar3D: React.FC<Avatar3DProps> = ({ lookAtTarget }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isZBMode } = useApp();
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftEyelidRef = useRef<THREE.Mesh | null>(null);
  const rightEyelidRef = useRef<THREE.Mesh | null>(null);
  const spineGroupRef = useRef<THREE.Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Look-at reaction when post-it appears
  useEffect(() => {
    if (!headGroupRef.current || isZBMode) return;
    if (lookAtTarget) {
      const normalizedX = (lookAtTarget.x / 100 - 0.5) * 0.7;
      const normalizedY = (lookAtTarget.y / 600 - 0.5) * 0.4;
      headGroupRef.current.rotation.y = normalizedX;
      headGroupRef.current.rotation.x = normalizedY;
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
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 16.5);
    camera.lookAt(0, 0.8, 0);

    // 3. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting System (Golden Daylight Sun + Warm Ambient + Sky Rim Light)
    // Ambient
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.8);
    scene.add(ambientLight);

    // Hemisphere sky/ground
    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x1e293b, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Key Golden Sunlight (Angled like the ceiling sunlight in Jamiu's photo!)
    const sunLight = new THREE.DirectionalLight(0xffedd5, 3.2);
    sunLight.position.set(3.5, 6, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Warm Side Fill Light
    const fillLight = new THREE.DirectionalLight(0xfef08a, 1.6);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    // Crisp Cool Rim Light (accents silhouette)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-2, 4, -5);
    scene.add(rimLight);

    // Warm Front Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xffedd5, 1.0);
    bounceLight.position.set(0, -3, 3);
    scene.add(bounceLight);

    // --- 5. BESPOKE 3D CHARACTER SCULPTURE: BELLO JAMIU ISHOLA ---
    const characterRoot = new THREE.Group();
    characterRoot.scale.set(0.245, 0.245, 0.245);
    characterRoot.position.set(0.65, -2.6, 7.5);
    characterRoot.rotation.y = 5.85;
    scene.add(characterRoot);

    // --- MATERIALS ---
    // Warm Rich African Skin Tone with Velvet Subsurface Softness
    const skinMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4a2b1a'),
      roughness: 0.58,
      metalness: 0.04,
    });
    const skinHighlightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5a3622'),
      roughness: 0.52,
      metalness: 0.05,
    });
    const lipsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#422218'),
      roughness: 0.45,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0b0e'),
      roughness: 0.92,
      metalness: 0.02,
    });

    // Signature Knit Sweater Materials
    const sweaterNavy = isZBMode ? new THREE.Color('#ea580c') : new THREE.Color('#162236');
    const sweaterKnitMat = new THREE.MeshStandardMaterial({
      color: sweaterNavy,
      roughness: 0.85,
      metalness: 0.02,
    });
    const creamStripeMat = new THREE.MeshStandardMaterial({
      color: isZBMode ? new THREE.Color('#ffedd5') : new THREE.Color('#e7decb'),
      roughness: 0.75,
      metalness: 0.02,
    });
    const redAccentMat = new THREE.MeshStandardMaterial({
      color: isZBMode ? new THREE.Color('#fbbf24') : new THREE.Color('#dc2626'),
      roughness: 0.65,
      metalness: 0.05,
    });
    const ribbingMat = new THREE.MeshStandardMaterial({
      color: isZBMode ? new THREE.Color('#c2410c') : new THREE.Color('#101827'),
      roughness: 0.9,
    });
    const pantsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0f172a'),
      roughness: 0.85,
    });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x1f140c });

    // --- LOWER BODY (Trousers & Shoes) ---
    const lowerBody = new THREE.Group();

    // Hips
    const hipsGeo = new THREE.CylinderGeometry(1.6, 1.5, 1.8, 16);
    const hipsMesh = new THREE.Mesh(hipsGeo, pantsMat);
    hipsMesh.position.y = 1.0;
    lowerBody.add(hipsMesh);

    // Left Leg
    const legGeo = new THREE.CylinderGeometry(0.72, 0.58, 6.2, 16);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.9, -2.5, 0);
    lowerBody.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0.9, -2.5, 0);
    lowerBody.add(rightLeg);

    // Shoes (Modern Dark Sneakers with Crisp White Soles)
    const shoeGeo = new THREE.BoxGeometry(0.9, 0.65, 1.8);
    const shoeSoleGeo = new THREE.BoxGeometry(0.94, 0.22, 1.84);

    const leftShoe = new THREE.Mesh(shoeGeo, hairMat);
    leftShoe.position.set(-0.9, -5.7, 0.3);
    const leftSole = new THREE.Mesh(shoeSoleGeo, whiteMat);
    leftSole.position.set(-0.9, -5.95, 0.3);
    lowerBody.add(leftShoe);
    lowerBody.add(leftSole);

    const rightShoe = new THREE.Mesh(shoeGeo, hairMat);
    rightShoe.position.set(0.9, -5.7, 0.3);
    const rightSole = new THREE.Mesh(shoeSoleGeo, whiteMat);
    rightSole.position.set(0.9, -5.95, 0.3);
    lowerBody.add(rightShoe);
    lowerBody.add(rightSole);

    characterRoot.add(lowerBody);

    // --- UPPER BODY (Spine, Torso, Knit Sweater & Arms) ---
    const spineGroup = new THREE.Group();
    spineGroup.position.y = 1.8;
    characterRoot.add(spineGroup);
    spineGroupRef.current = spineGroup;

    // Torso Base (Navy Knit Sweater)
    const torsoGeo = new THREE.CylinderGeometry(2.1, 1.75, 4.6, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, sweaterKnitMat);
    torsoMesh.position.y = 2.2;
    spineGroup.add(torsoMesh);

    // Hem Ribbing at waist
    const hemGeo = new THREE.CylinderGeometry(1.8, 1.75, 0.45, 24);
    const hemMesh = new THREE.Mesh(hemGeo, ribbingMat);
    hemMesh.position.y = 0.15;
    spineGroup.add(hemMesh);

    // --- SIGNATURE CHEST STRIPES (From Photo!) ---
    // Horizontal Oatmeal / Cream Stripe across chest
    const creamBandGeo = new THREE.CylinderGeometry(2.14, 2.05, 1.05, 24);
    const creamBand = new THREE.Mesh(creamBandGeo, creamStripeMat);
    creamBand.position.y = 3.2;
    spineGroup.add(creamBand);

    // Distinctive Red Accent Stripe on the right side of the chest band
    const redAccentGeo = new THREE.BoxGeometry(0.85, 0.55, 0.22);
    const redAccent = new THREE.Mesh(redAccentGeo, redAccentMat);
    redAccent.position.set(0.8, 3.2, 2.05);
    redAccent.rotation.y = 0.38;
    spineGroup.add(redAccent);

    // Ribbed Collar at Neck
    const collarGeo = new THREE.TorusGeometry(1.05, 0.22, 16, 24);
    const collarMesh = new THREE.Mesh(collarGeo, ribbingMat);
    collarMesh.position.set(0, 4.4, 0);
    collarMesh.rotation.x = Math.PI * 0.5;
    spineGroup.add(collarMesh);

    // Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.95, 20, 20);
    const leftShoulder = new THREE.Mesh(shoulderGeo, sweaterKnitMat);
    leftShoulder.position.set(-2.1, 4.0, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeo, sweaterKnitMat);
    rightShoulder.position.set(2.1, 4.0, 0);
    spineGroup.add(leftShoulder);
    spineGroup.add(rightShoulder);

    // Shoulder Cream Stripes
    const shoulderStripeGeo = new THREE.TorusGeometry(0.85, 0.14, 12, 20);
    const leftShoulderStripe = new THREE.Mesh(shoulderStripeGeo, creamStripeMat);
    leftShoulderStripe.position.set(-2.1, 3.9, 0);
    leftShoulderStripe.rotation.x = Math.PI * 0.5;
    const rightShoulderStripe = new THREE.Mesh(shoulderStripeGeo, creamStripeMat);
    rightShoulderStripe.position.set(2.1, 3.9, 0);
    rightShoulderStripe.rotation.x = Math.PI * 0.5;
    spineGroup.add(leftShoulderStripe);
    spineGroup.add(rightShoulderStripe);

    // Left Arm (upper arm, elbow, forearm, wrist ribbing, hand)
    const upperArmGeo = new THREE.CylinderGeometry(0.56, 0.5, 2.4, 16);
    const leftUpperArm = new THREE.Mesh(upperArmGeo, sweaterKnitMat);
    leftUpperArm.position.set(-2.3, 2.6, 0.2);
    leftUpperArm.rotation.z = 0.2;
    spineGroup.add(leftUpperArm);

    const forearmGeo = new THREE.CylinderGeometry(0.5, 0.44, 2.2, 16);
    const leftForearm = new THREE.Mesh(forearmGeo, sweaterKnitMat);
    leftForearm.position.set(-2.6, 0.6, 0.6);
    leftForearm.rotation.z = 0.15;
    leftForearm.rotation.x = -0.3;
    spineGroup.add(leftForearm);

    // Left Hand & Fingers
    const handGeo = new THREE.SphereGeometry(0.48, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-2.8, -0.6, 1.0);
    leftHand.scale.set(0.8, 1.1, 0.9);
    spineGroup.add(leftHand);

    // Right Arm (relaxed forward pose)
    const rightUpperArm = new THREE.Mesh(upperArmGeo, sweaterKnitMat);
    rightUpperArm.position.set(2.3, 2.6, 0.2);
    rightUpperArm.rotation.z = -0.22;
    spineGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(forearmGeo, sweaterKnitMat);
    rightForearm.position.set(2.6, 0.6, 0.6);
    rightForearm.rotation.z = -0.18;
    rightForearm.rotation.x = -0.35;
    spineGroup.add(rightForearm);

    // Right Hand
    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(2.8, -0.6, 1.0);
    rightHand.scale.set(0.8, 1.1, 0.9);
    spineGroup.add(rightHand);

    // --- HEAD & BESPOKE FACIAL SCULPTURE (BELLO JAMIU ISHOLA) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 5.4, 0.15);
    spineGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.72, 0.85, 1.4, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = -0.55;
    headGroup.add(neckMesh);

    // Main Cranium / Head (Sculpted Stylized Face)
    const craniumGeo = new THREE.SphereGeometry(1.36, 32, 32);
    const craniumMesh = new THREE.Mesh(craniumGeo, skinMat);
    craniumMesh.scale.set(1.0, 1.12, 1.08);
    craniumMesh.position.set(0, 0.45, 0);
    headGroup.add(craniumMesh);

    // Jaw & Chin Definition
    const jawGeo = new THREE.SphereGeometry(0.9, 20, 20);
    const jawMesh = new THREE.Mesh(jawGeo, skinMat);
    jawMesh.scale.set(1.05, 0.95, 1.1);
    jawMesh.position.set(0, -0.15, 0.32);
    headGroup.add(jawMesh);

    // Cheekbones (Warm Highlight definition)
    const cheekGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const leftCheek = new THREE.Mesh(cheekGeo, skinHighlightMat);
    leftCheek.position.set(-0.75, 0.28, 0.95);
    leftCheek.scale.set(0.9, 0.7, 0.8);
    const rightCheek = new THREE.Mesh(cheekGeo, skinHighlightMat);
    rightCheek.position.set(0.75, 0.28, 0.95);
    rightCheek.scale.set(0.9, 0.7, 0.8);
    headGroup.add(leftCheek);
    headGroup.add(rightCheek);

    // --- SHORT TEXTURED FADE HAIRCUT (As in Jamiu's photo!) ---
    const hairCrownGeo = new THREE.SphereGeometry(1.42, 28, 28, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const hairCrown = new THREE.Mesh(hairCrownGeo, hairMat);
    hairCrown.position.set(0, 0.58, -0.05);
    hairCrown.rotation.x = -0.12;
    headGroup.add(hairCrown);

    // Textured Hair Volume details on top
    const hairTopGeo = new THREE.SphereGeometry(1.28, 20, 20);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 1.12, -0.15);
    hairTop.scale.set(0.95, 0.45, 1.05);
    headGroup.add(hairTop);

    // Hair Back & Temple Fade
    const hairBackGeo = new THREE.CylinderGeometry(1.35, 1.25, 1.4, 24, 1, false, Math.PI * 0.5, Math.PI);
    const hairBack = new THREE.Mesh(hairBackGeo, hairMat);
    hairBack.position.set(0, 0.4, -0.12);
    headGroup.add(hairBack);

    // --- EARS ---
    const earGeo = new THREE.TorusGeometry(0.38, 0.12, 12, 16, Math.PI * 1.3);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-1.38, 0.35, -0.05);
    leftEar.rotation.y = Math.PI * 0.35;
    leftEar.rotation.z = -0.2;
    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(1.38, 0.35, -0.05);
    rightEar.rotation.y = -Math.PI * 0.35;
    rightEar.rotation.z = 0.2;
    headGroup.add(leftEar);
    headGroup.add(rightEar);

    // --- EYEBROWS (Arched & Defined) ---
    const browGeo = new THREE.CylinderGeometry(0.08, 0.04, 0.55, 12);
    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.48, 0.62, 1.25);
    leftBrow.rotation.z = Math.PI * 0.42;
    leftBrow.rotation.y = -0.25;
    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.48, 0.62, 1.25);
    rightBrow.rotation.z = -Math.PI * 0.42;
    rightBrow.rotation.y = 0.25;
    headGroup.add(leftBrow);
    headGroup.add(rightBrow);

    // --- EYES & EYELIDS (With Specular Catchlights) ---
    const eyeWhiteGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const irisGeo = new THREE.SphereGeometry(0.14, 14, 14);
    const pupilGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const catchlightGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const eyelidGeo = new THREE.SphereGeometry(0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);

    // Left Eye
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.46, 0.38, 1.15);

    const leftWhite = new THREE.Mesh(eyeWhiteGeo, whiteMat);
    leftWhite.scale.set(1.0, 0.72, 0.65);
    leftEyeGroup.add(leftWhite);

    const leftIris = new THREE.Mesh(irisGeo, irisMat);
    leftIris.position.set(0, 0, 0.16);
    leftEyeGroup.add(leftIris);

    const leftPupil = new THREE.Mesh(pupilGeo, darkMat);
    leftPupil.position.set(0, 0, 0.22);
    leftEyeGroup.add(leftPupil);

    const leftCatchlight = new THREE.Mesh(catchlightGeo, whiteMat);
    leftCatchlight.position.set(-0.04, 0.05, 0.25);
    leftEyeGroup.add(leftCatchlight);

    const leftEyelid = new THREE.Mesh(eyelidGeo, skinHighlightMat);
    leftEyelid.position.set(0, 0.08, 0.02);
    leftEyelid.rotation.x = -Math.PI * 0.48;
    leftEyeGroup.add(leftEyelid);
    leftEyelidRef.current = leftEyelid;

    headGroup.add(leftEyeGroup);

    // Right Eye
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.46, 0.38, 1.15);

    const rightWhite = new THREE.Mesh(eyeWhiteGeo, whiteMat);
    rightWhite.scale.set(1.0, 0.72, 0.65);
    rightEyeGroup.add(rightWhite);

    const rightIris = new THREE.Mesh(irisGeo, irisMat);
    rightIris.position.set(0, 0, 0.16);
    rightEyeGroup.add(rightIris);

    const rightPupil = new THREE.Mesh(pupilGeo, darkMat);
    rightPupil.position.set(0, 0, 0.22);
    rightEyeGroup.add(rightPupil);

    const rightCatchlight = new THREE.Mesh(catchlightGeo, whiteMat);
    rightCatchlight.position.set(-0.04, 0.05, 0.25);
    rightEyeGroup.add(rightCatchlight);

    const rightEyelid = new THREE.Mesh(eyelidGeo, skinHighlightMat);
    rightEyelid.position.set(0, 0.08, 0.02);
    rightEyelid.rotation.x = -Math.PI * 0.48;
    rightEyeGroup.add(rightEyelid);
    rightEyelidRef.current = rightEyelid;

    headGroup.add(rightEyeGroup);

    // --- NOSE (Sculpted bridge & tip) ---
    const noseBridgeGeo = new THREE.BoxGeometry(0.24, 0.42, 0.35);
    const noseBridge = new THREE.Mesh(noseBridgeGeo, skinHighlightMat);
    noseBridge.position.set(0, 0.22, 1.34);
    noseBridge.rotation.x = -0.15;
    headGroup.add(noseBridge);

    const noseTipGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const noseTip = new THREE.Mesh(noseTipGeo, skinHighlightMat);
    noseTip.position.set(0, 0.05, 1.48);
    noseTip.scale.set(1.15, 0.9, 1.0);
    headGroup.add(noseTip);

    // --- MUSTACHE (Trimmed dark mustache above upper lip) ---
    const mustacheGeo = new THREE.CylinderGeometry(0.09, 0.03, 0.85, 16);
    const mustacheMesh = new THREE.Mesh(mustacheGeo, hairMat);
    mustacheMesh.position.set(0, -0.16, 1.36);
    mustacheMesh.rotation.z = Math.PI * 0.5;
    mustacheMesh.scale.set(1.1, 0.8, 0.9);
    headGroup.add(mustacheMesh);

    // --- SMILING MOUTH & WHITE TEETH (Warm confident smile from photo!) ---
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.32, 1.28);

    // Upper & Lower Lips
    const lipUpperGeo = new THREE.TorusGeometry(0.36, 0.075, 12, 16, Math.PI * 0.9);
    const lipUpper = new THREE.Mesh(lipUpperGeo, lipsMat);
    lipUpper.rotation.x = Math.PI * 0.5;
    lipUpper.rotation.z = Math.PI;
    mouthGroup.add(lipUpper);

    const lipLowerGeo = new THREE.TorusGeometry(0.38, 0.085, 12, 16, Math.PI * 0.85);
    const lipLower = new THREE.Mesh(lipLowerGeo, lipsMat);
    lipLower.position.set(0, -0.09, 0.04);
    lipLower.rotation.x = Math.PI * 0.5;
    mouthGroup.add(lipLower);

    // Smiling Open Mouth Interior
    const mouthInteriorGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 16, 1, false, 0, Math.PI);
    const mouthInterior = new THREE.Mesh(mouthInteriorGeo, darkMat);
    mouthInterior.position.set(0, -0.03, 0.02);
    mouthInterior.rotation.x = Math.PI * 0.5;
    mouthGroup.add(mouthInterior);

    // Clean White Upper Teeth Row
    const teethGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 16, 1, false, 0, Math.PI);
    const teeth = new THREE.Mesh(teethGeo, whiteMat);
    teeth.position.set(0, 0.02, 0.05);
    teeth.rotation.x = Math.PI * 0.5;
    mouthGroup.add(teeth);

    headGroup.add(mouthGroup);

    // --- GOATEE & CHIN STUBBLE ---
    const goateeGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const goateeMesh = new THREE.Mesh(goateeGeo, hairMat);
    goateeMesh.position.set(0, -0.62, 1.15);
    goateeMesh.scale.set(0.95, 0.8, 0.7);
    headGroup.add(goateeMesh);

    // --- 6. FLOATING INTERACTIVE ORBITING TECH BADGES (Figma, React, Mobile, Supabase, IoT) ---
    const badgeGroup = new THREE.Group();
    characterRoot.add(badgeGroup);

    const badgeData = [
      { text: 'UI/UX Design', color: '#f59e0b', pos: [-3.2, 4.2, 2.0] },
      { text: 'React & Three.js', color: '#06b6d4', pos: [3.4, 3.8, 1.8] },
      { text: 'Mobile Flutter', color: '#3b82f6', pos: [-2.9, 1.5, 2.4] },
      { text: 'Supabase & Cloud', color: '#10b981', pos: [3.1, 1.2, 2.2] },
    ];

    const badgeMeshes: THREE.Mesh[] = [];

    badgeData.forEach((b) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 256;
      bCanvas.height = 80;
      const bCtx = bCanvas.getContext('2d')!;

      // Pill Background
      bCtx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      bCtx.roundRect(4, 4, 248, 72, 36);
      bCtx.fill();
      bCtx.lineWidth = 4;
      bCtx.strokeStyle = b.color;
      bCtx.roundRect(4, 4, 248, 72, 36);
      bCtx.stroke();

      // Text
      bCtx.font = 'bold 26px sans-serif';
      bCtx.fillStyle = '#f8fafc';
      bCtx.textAlign = 'center';
      bCtx.textBaseline = 'middle';
      bCtx.fillText(b.text, 128, 40);

      const bTexture = new THREE.CanvasTexture(bCanvas);
      bTexture.colorSpace = THREE.SRGBColorSpace;

      const pillGeo = new THREE.PlaneGeometry(1.6, 0.5);
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

    // --- 7. MOUSE TRACKING & PROCEDURAL ANIMATION LOOP ---
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

    let animationFrameId: number;
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // 1. Natural Breathing & Organic Spine Bobbing
      const breath = Math.sin(time * 2.2) * 0.035;
      spineGroup.position.y = 1.8 + breath;
      spineGroup.rotation.z = Math.sin(time * 1.1) * 0.015;

      // 2. Smooth Head Tracking (Follows mouse gracefully)
      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.y,
          targetMouseX * 0.55,
          0.06
        );
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.x,
          targetMouseY * 0.35,
          0.06
        );
        headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          headGroupRef.current.rotation.z,
          -targetMouseX * 0.15,
          0.05
        );
      }

      // 3. Eye Blinking Procedural Routine
      blinkTimer += delta;
      if (blinkTimer > 3.8) {
        isBlinking = true;
        blinkTimer = 0;
      }
      if (isBlinking) {
        if (leftEyelidRef.current && rightEyelidRef.current) {
          leftEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
            leftEyelidRef.current.rotation.x,
            0.1,
            0.35
          );
          rightEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
            rightEyelidRef.current.rotation.x,
            0.1,
            0.35
          );
          if (leftEyelidRef.current.rotation.x > -0.05) {
            isBlinking = false;
          }
        }
      } else {
        if (leftEyelidRef.current && rightEyelidRef.current) {
          leftEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
            leftEyelidRef.current.rotation.x,
            -Math.PI * 0.48,
            0.2
          );
          rightEyelidRef.current.rotation.x = THREE.MathUtils.lerp(
            rightEyelidRef.current.rotation.x,
            -Math.PI * 0.48,
            0.2
          );
        }
      }

      // 4. Floating Tech Badges (Gentle bobbing + billboard orientation)
      badgeMeshes.forEach((mesh, index) => {
        const offset = index * 1.3;
        mesh.position.y = badgeData[index].pos[1] + Math.sin(time * 1.8 + offset) * 0.14;
        mesh.rotation.y = -characterRoot.rotation.y;
      });

      // 5. Light sway on character root
      characterRoot.position.y = -2.6 + Math.sin(time * 1.5) * 0.05;

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
      renderer.dispose();
    };
  }, [isZBMode]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[580px] lg:h-[720px] flex items-center justify-center relative pointer-events-auto cursor-pointer transition-transform duration-300"
      style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
      aria-label="3D Avatar Character of Bello Jamiu Ishola"
    />
  );
};
