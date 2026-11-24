"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  /** 0–1 scroll progress through the pinned hero */
  progress: number;
  className?: string;
};

/**
 * Real-time WebGL fly-through — camera exits cabin haze into open sky;
 * a lit jet banks through a cloud field. Scroll drives the shot (Jesko-class).
 */
export function FlightScene({ progress, className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || prefersReducedMotion()) return;

    let disposed = false;
    let raf = 0;
    let removeResize: (() => void) | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !mount) return;

      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b1420, 0.018);

      const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 400);
      camera.position.set(0, 2.2, 14);

      const webgl = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      webgl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      webgl.setSize(w, h);
      webgl.setClearColor(0x0b1420, 1);
      webgl.domElement.style.width = "100%";
      webgl.domElement.style.height = "100%";
      webgl.domElement.style.display = "block";
      mount.appendChild(webgl.domElement);
      renderer = webgl;

      scene.add(new THREE.AmbientLight(0xb8c4d4, 0.55));
      const sun = new THREE.DirectionalLight(0xffe0b8, 2.1);
      sun.position.set(40, 30, -10);
      scene.add(sun);
      const rim = new THREE.DirectionalLight(0x6ec8ff, 0.7);
      rim.position.set(-20, 8, 15);
      scene.add(rim);

      const skyGeo = new THREE.SphereGeometry(180, 48, 32);
      const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
          topColor: { value: new THREE.Color(0x0a1628) },
          midColor: { value: new THREE.Color(0x1c3350) },
          bottomColor: { value: new THREE.Color(0xc4a574) },
          offset: { value: 12 },
          exponent: { value: 0.55 },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 midColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + offset).y;
            float t = max(pow(max(h, 0.0), exponent), 0.0);
            vec3 col = mix(bottomColor, midColor, smoothstep(0.0, 0.45, t));
            col = mix(col, topColor, smoothstep(0.35, 1.0, t));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      scene.add(new THREE.Mesh(skyGeo, skyMat));

      const cloudGroup = new THREE.Group();
      const cloudGeo = new THREE.PlaneGeometry(12, 6);
      for (let i = 0; i < 42; i++) {
        const cloudMat = new THREE.MeshBasicMaterial({
          color: 0xe8eef5,
          transparent: true,
          opacity: 0.1 + Math.random() * 0.1,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const m = new THREE.Mesh(cloudGeo, cloudMat);
        m.position.set(
          (Math.random() - 0.5) * 90,
          (Math.random() - 0.35) * 28 - 4,
          (Math.random() - 0.5) * 100 - 20,
        );
        m.rotation.y = Math.random() * Math.PI;
        m.scale.setScalar(0.6 + Math.random() * 1.8);
        cloudGroup.add(m);
      }
      scene.add(cloudGroup);

      const jet = buildJet(THREE);
      jet.position.set(0, 0.4, 0);
      scene.add(jet);

      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x7ed0ff,
        transparent: true,
        opacity: 0.65,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), glowMat);
      glow.position.set(-0.05, -0.12, 1.55);
      jet.add(glow);

      const onResize = () => {
        if (!mount) return;
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        webgl.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);
      removeResize = () => window.removeEventListener("resize", onResize);

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const p = progressRef.current;

        const camZ = THREE.MathUtils.lerp(9.5, -6, p);
        const camY = THREE.MathUtils.lerp(1.1, 6.5, p);
        const camX = THREE.MathUtils.lerp(0.4, -2.5, p);
        camera.position.set(camX, camY, camZ);
        camera.lookAt(
          THREE.MathUtils.lerp(0, 2, p),
          THREE.MathUtils.lerp(0.3, 2.2, p),
          THREE.MathUtils.lerp(-2, -18, p),
        );
        camera.fov = THREE.MathUtils.lerp(48, 58, p);
        camera.updateProjectionMatrix();

        jet.position.x = Math.sin(t * 0.35) * 0.35 + p * 3.2;
        jet.position.y = 0.2 + Math.sin(t * 0.55) * 0.12 + p * 3.8;
        jet.position.z = -p * 14;
        jet.rotation.z =
          THREE.MathUtils.lerp(-0.12, 0.28, p) + Math.sin(t * 0.4) * 0.03;
        jet.rotation.x = THREE.MathUtils.lerp(0.05, -0.18, p);
        jet.rotation.y = THREE.MathUtils.lerp(0.15, -0.35, p);

        glowMat.opacity = 0.45 + Math.sin(t * 6) * 0.25;
        cloudGroup.rotation.y = t * 0.01;
        cloudGroup.position.z = p * 8;

        if (scene.fog && "density" in scene.fog) {
          (scene.fog as InstanceType<typeof THREE.FogExp2>).density =
            THREE.MathUtils.lerp(0.028, 0.008, p);
        }

        webgl.render(scene, camera);
      };
      animate();
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      removeResize?.();
      if (renderer) {
        const el = renderer.domElement as HTMLCanvasElement;
        el.parentElement?.removeChild(el);
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className={`flight-scene ${className}`} aria-hidden />;
}

function buildJet(THREE: typeof import("three")) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe8e4dc,
    metalness: 0.72,
    roughness: 0.28,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a3340,
    metalness: 0.6,
    roughness: 0.4,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    metalness: 0.85,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x6a9bb8,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
  });

  const fuselage = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.38, 3.2, 8, 16),
    bodyMat,
  );
  fuselage.rotation.x = Math.PI / 2;
  group.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.9, 16), bodyMat);
  nose.rotation.x = -Math.PI / 2;
  nose.position.z = -2.05;
  group.add(nose);

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat,
  );
  cockpit.position.set(0, 0.22, -1.35);
  cockpit.scale.set(1, 0.7, 1.2);
  group.add(cockpit);

  const wing = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.08, 1.1), bodyMat);
  wing.position.set(0, -0.05, 0.2);
  group.add(wing);

  const tipL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 0.5), goldMat);
  tipL.position.set(-2.3, -0.02, 0.15);
  const tipR = tipL.clone();
  tipR.position.x = 2.3;
  group.add(tipL, tipR);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 0.7), darkMat);
  fin.position.set(0, 0.55, 1.55);
  group.add(fin);
  const hStab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.45), bodyMat);
  hStab.position.set(0, 0.15, 1.65);
  group.add(hStab);

  const engGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.9, 14);
  const engL = new THREE.Mesh(engGeo, darkMat);
  engL.rotation.x = Math.PI / 2;
  engL.position.set(-0.85, -0.28, 0.55);
  const engR = engL.clone();
  engR.position.x = 0.85;
  group.add(engL, engR);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.06, 2.8), goldMat);
  stripe.position.set(0.39, 0.05, -0.1);
  group.add(stripe);

  group.scale.setScalar(1.15);
  return group;
}
