import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeContact({ themeMode = 'light' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Environment Map Generator for Specular Highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(themeMode === 'dark' ? '#060e2e' : '#cbe3f7');
    
    const lightGeo = new THREE.SphereGeometry(6, 16, 16);
    const lightMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff') });
    const lightMesh1 = new THREE.Mesh(lightGeo, lightMat1);
    lightMesh1.position.set(10, 14, 12);
    envScene.add(lightMesh1);

    const lightMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color('#38bdf8') });
    const lightMesh2 = new THREE.Mesh(lightGeo, lightMat2);
    lightMesh2.position.set(-12, -12, -8);
    envScene.add(lightMesh2);

    scene.environment = pmremGenerator.fromScene(envScene).texture;

    // 4. Physical Materials matching Hero Section Hello Model
    const isDark = themeMode === 'dark';

    const contactMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark ? '#1f55f2' : '#3d83d9'),
      emissive: new THREE.Color(isDark ? '#081966' : '#0c2b54'),
      emissiveIntensity: isDark ? 0.45 : 0.2,
      roughness: 0.04,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: isDark ? 0.35 : 0.6,
      transparent: true,
      ior: 1.5,
      thickness: 2.2,
      specularIntensity: 2.5,
      specularColor: new THREE.Color('#ffffff'),
      envMapIntensity: isDark ? 3.0 : 2.2,
    });

    const accentMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDark ? '#ffeb3b' : '#ff0055'),
      emissive: new THREE.Color(isDark ? '#665200' : '#660022'),
      emissiveIntensity: 0.4,
      roughness: 0.04,
      metalness: 0.2,
      clearcoat: 1.0,
      specularIntensity: 2.5,
    });

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 5. Load 3D Font & Create Inflated Tube Cursive Script for "contact" (Top) and "me" (Bottom)
    const fontLoader = new FontLoader();
    fontLoader.load(
      '/fonts/helvetiker_bold.typeface.json',
      (font) => {
        // Line 1: contact (rounded 3D tube calligraphy)
        const contactGeo = new TextGeometry('contact', {
          font: font,
          size: 1.85,
          depth: 0.45,
          curveSegments: 16,
          bevelEnabled: true,
          bevelThickness: 0.32,
          bevelSize: 0.22,
          bevelOffset: 0,
          bevelSegments: 10,
        });

        contactGeo.computeBoundingBox();
        const contactWidth = contactGeo.boundingBox.max.x - contactGeo.boundingBox.min.x;
        const contactMesh = new THREE.Mesh(contactGeo, contactMaterial);
        contactMesh.position.x = -0.5 * contactWidth;
        contactMesh.position.y = 0.8;
        contactMesh.castShadow = true;
        contactMesh.receiveShadow = true;
        modelGroup.add(contactMesh);

        // Line 2: me (bottom line under contact)
        const meGeo = new TextGeometry('me', {
          font: font,
          size: 1.95,
          depth: 0.45,
          curveSegments: 16,
          bevelEnabled: true,
          bevelThickness: 0.32,
          bevelSize: 0.22,
          bevelOffset: 0,
          bevelSegments: 10,
        });

        meGeo.computeBoundingBox();
        const meWidth = meGeo.boundingBox.max.x - meGeo.boundingBox.min.x;
        const meMesh = new THREE.Mesh(meGeo, contactMaterial);
        meMesh.position.x = -0.5 * meWidth - 0.5;
        meMesh.position.y = -1.8;
        meMesh.castShadow = true;
        meMesh.receiveShadow = true;
        modelGroup.add(meMesh);

        // Load 3D Accent Star/Sticker beside "me"
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/model/cnt.gltf', (gltf) => {
          const cntModel = gltf.scene;
          cntModel.traverse((child) => {
            if (child.isMesh) {
              child.material = accentMaterial;
            }
          });
          cntModel.scale.set(0.85, 0.85, 0.85);
          cntModel.position.set(meMesh.position.x + meWidth + 0.8, -1.4, 0.5);
          modelGroup.add(cntModel);
        }, undefined, () => {});
      },
      undefined,
      (err) => {
        console.error('Error loading font for 3D text:', err);
      }
    );

    // 6. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 2.8 : 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 4.0 : 3.5);
    keyLight.position.set(12, 18, 15);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, isDark ? 3.5 : 2.8);
    rimLight.position.set(-15, -12, -8);
    scene.add(rimLight);

    const mouseLight = new THREE.PointLight(0xffffff, 2.5, 35);
    mouseLight.position.set(0, 0, 10);
    scene.add(mouseLight);

    // 7. Mouse Drag Rotation & Lighting Tracking
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseLight.position.x = mouseX * 10;
      mouseLight.position.y = mouseY * 10;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        targetRotY = mouseX * 0.35;
        targetRotX = -mouseY * 0.35;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.06;
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.06;

      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.2;
      modelGroup.position.x = Math.cos(elapsedTime * 1.2) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      pmremGenerator.dispose();
      envScene.clear();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      contactMaterial.dispose();
      accentMaterial.dispose();
    };
  }, [themeMode]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
