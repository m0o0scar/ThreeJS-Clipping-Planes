import { Stage } from '@nospoon/3utils/out';
import * as THREE from 'three';

const stage = new Stage({ enableAxesHelper: true, enableGridHelper: true });

// enable clipping
stage.renderer.localClippingEnabled = true;

// create planes and visualize them with PlaneHelper
const planes = [
  new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
];
const planeHelpers = planes.map(plane => {
  const helper = new THREE.PlaneHelper(plane);
  stage.scene.add(helper);
  return helper;
});

// create a box that will be clipped by the planes
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
boxMaterial.clippingPlanes = planes;
const box = new THREE.Mesh(boxGeometry, boxMaterial);
stage.scene.add(box);

stage.beforeRender(() => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.02;
});
