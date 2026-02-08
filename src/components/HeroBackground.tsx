'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import gsap from 'gsap';

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Set background with gradient-like effect using dark calming colors
    const bgColor = theme === 'dark' ? 0x0a0e27 : 0xf5f5f5;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 100, 400);

    // Create animated particles (flecks)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: theme === 'dark' ? 0x6366f1 : 0x9333ea,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create animated geometries with enhanced styling
    const geometries: THREE.BufferGeometry[] = [];
    const meshes: THREE.Mesh[] = [];

    const colors = theme === 'dark'
      ? [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4] // Calming blues, purples, pinks
      : [0xf59e0b, 0xec4899, 0x8b5cf6, 0x6366f1];

    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5, 4);
      const color = colors[i % colors.length];
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: theme === 'dark' ? 0.3 : 0.1,
        wireframe: false,
        transparent: true,
        opacity: 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
        rotationX: (Math.random() - 0.5) * 0.005,
        rotationY: (Math.random() - 0.5) * 0.005,
        rotationZ: (Math.random() - 0.5) * 0.005,
      };

      scene.add(mesh);
      meshes.push(mesh);
      geometries.push(geometry);
    }

    // Lighting with calming colors for dark mode
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(theme === 'dark' ? 0x6366f1 : 0xfbbf24, 0.8);
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(theme === 'dark' ? 0x8b5cf6 : 0xff6366, 0.6);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    camera.position.z = 20;

    // GSAP animations for smooth particle movement
    meshes.forEach((mesh, index) => {
      gsap.to(mesh.rotation, {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
        duration: 20 + Math.random() * 20,
        repeat: -1,
        ease: 'none',
      });
    });

    // Animate particles
    gsap.to(particles.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 80,
      repeat: -1,
      ease: 'none',
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      meshes.forEach((mesh) => {
        mesh.position.x += mesh.userData.velocity.x;
        mesh.position.y += mesh.userData.velocity.y;
        mesh.position.z += mesh.userData.velocity.z;

        // Bounce effect
        if (Math.abs(mesh.position.x) > 25) mesh.userData.velocity.x *= -1;
        if (Math.abs(mesh.position.y) > 25) mesh.userData.velocity.y *= -1;
        if (Math.abs(mesh.position.z) > 25) mesh.userData.velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach((g) => g.dispose());
      particlesGeometry.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.Material).dispose();
        }
        if (child instanceof THREE.Points) {
          (child.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.4 }}
    />
  );
}
