/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["object"] }] */
import {
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Box3
} from 'three'

import { MTLLoader } from 'three/examples/js/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/js/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/js/controls/OrbitControls'

const scene = new Scene()

/*
* Set the perspective
*/
const camera = new PerspectiveCamera(
  1,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.x = -300
camera.position.z = 250

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/*
* Set the controls to zoom and look around over the bat baseball object
*/
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

/*
* Setup the lighting over the object
*/
const keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1.0)
keyLight.position.set(-100, 0, 100)

const fillLight = new DirectionalLight(new Color('hsl(240, 100%, 75%)'), 0.75)
fillLight.position.set(100, 0, 100)

const backLight = new DirectionalLight(0xffffff, 1.0)
backLight.position.set(100, 0, -100).normalize()

scene.add(keyLight)
scene.add(fillLight)
scene.add(backLight)

/*
* This part loads assests to have the object with textures, then add them to it
*/
const mtlLoader = new MTLLoader()
mtlLoader.setTexturePath('./assets/')
mtlLoader.setPath('./assets/')
mtlLoader.load('baseball_bat.mtl', materials => {
  materials.preload()

  const objLoader = new OBJLoader()
  objLoader.setMaterials(materials)
  objLoader.setPath('./assets/')
  objLoader.load('baseball_bat.obj', object => {
    const box = new Box3().setFromObject(object)
    const boundingBoxSize = box.max.sub(box.min)
    const height = boundingBoxSize.y

    scene.add(object)
    object.position.y = -height / 2
  })
})

/*
* `animate` will iterate using requestAnimatioFrame built-in function to animate the scene. 
*/
export const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
